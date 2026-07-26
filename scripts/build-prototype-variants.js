#!/usr/bin/env node
// Derives end-2-end/, mvp/, and phase0/ prototype builds (plus a root chooser page)
// from the single source tree in prototypes/bells-bliss-n-more/, using an HTML-comment
// marker convention rather than hand-duplicated files. See SCOPE section in
// .stratum/artifacts/scope-matrix.md for what belongs in which tier.
'use strict';
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'prototypes', 'bells-bliss-n-more');
const OUT = process.argv[2] || path.join(__dirname, '..', '_site');

// Whole files that don't trace to a Discovery Brief v1 requirement — E2E backlog only.
const MVP_EXCLUDE_FILES = new Set([
  'reviews.html',
  'admin-reviews.html',
  'admin-review-edit.html',
  'admin-hero-edit.html',
]);

// Phase 0 is a static, zero-automation site: only these files ship.
const PHASE0_WHITELIST = new Set([
  'index.html',
  'catalog.html',
  'item-detail.html',
  'planning-services.html',
  'privacy-policy.html',
  'style.css',
  'content-data.js',
  'prototype-behavior.js',
]);

const MARKERS = ['MVP-EXCLUDE', 'PHASE0-EXCLUDE', 'PHASE0-ONLY'];

// keepMap[name] = true keeps the content between <!-- NAME:start --> and <!-- NAME:end -->
// (marker comments themselves are always stripped); false drops the content entirely.
function applyMarkers(content, keepMap) {
  let out = content;
  for (const name of MARKERS) {
    const re = new RegExp('<!--\\s*' + name + ':start\\s*-->([\\s\\S]*?)<!--\\s*' + name + ':end\\s*-->', 'g');
    out = out.replace(re, (_match, inner) => (keepMap[name] ? inner : ''));
  }
  return out;
}

const BANNERS = {
  'end-2-end': 'END-TO-END VISION — includes backlog features not yet in MVP. For review only.',
  mvp: 'MVP PROTOTYPE — the scoped v1 build. For review only.',
  phase0: 'PHASE 0 — informational only, no online booking yet. For review only.',
};

function injectBanner(html, text) {
  const banner = '<div style="background:#3d3320;color:#f6eedb;text-align:center;' +
    'font-size:0.8rem;letter-spacing:0.02em;padding:0.45rem 1rem;">' + text + '</div>';
  return html.replace('<body>', '<body>\n' + banner);
}

function injectNoindex(html) {
  return html.replace('</head>', '<meta name="robots" content="noindex">\n</head>');
}

function buildVariant(outDir, opts) {
  fs.mkdirSync(outDir, { recursive: true });
  for (const name of fs.readdirSync(SRC)) {
    const srcPath = path.join(SRC, name);
    if (fs.statSync(srcPath).isDirectory()) continue;
    if (opts.whitelist && !opts.whitelist.has(name)) continue;
    if (opts.excludeFiles && opts.excludeFiles.has(name)) continue;
    const destPath = path.join(outDir, name);
    if (name.endsWith('.html')) {
      let html = fs.readFileSync(srcPath, 'utf8');
      html = applyMarkers(html, opts.keepMap);
      html = injectNoindex(html);
      html = injectBanner(html, opts.bannerText);
      fs.writeFileSync(destPath, html);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

buildVariant(path.join(OUT, 'end-2-end'), {
  keepMap: { 'MVP-EXCLUDE': true, 'PHASE0-EXCLUDE': true, 'PHASE0-ONLY': false },
  bannerText: BANNERS['end-2-end'],
});

buildVariant(path.join(OUT, 'mvp'), {
  excludeFiles: MVP_EXCLUDE_FILES,
  keepMap: { 'MVP-EXCLUDE': false, 'PHASE0-EXCLUDE': true, 'PHASE0-ONLY': false },
  bannerText: BANNERS.mvp,
});

buildVariant(path.join(OUT, 'phase0'), {
  whitelist: PHASE0_WHITELIST,
  keepMap: { 'MVP-EXCLUDE': true, 'PHASE0-EXCLUDE': false, 'PHASE0-ONLY': true },
  bannerText: BANNERS.phase0,
});

const chooserHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Bells Bliss N More — Prototype Links</title>
</head>
<body style="max-width:640px;margin:4rem auto;padding:2rem 1.5rem;font-family:system-ui,-apple-system,sans-serif;color:#2b2412;background:#FBF6EC;min-height:calc(100vh - 4rem);box-sizing:border-box;">
<h1 style="margin-bottom:0.25rem;color:#2b2412;">Bells Bliss N More</h1>
<p style="color:#6b5f3f;margin-top:0;">Prototype review links</p>
<ul style="line-height:2.4;font-size:1.05rem;padding-left:1.2rem;">
  <li><a href="phase0/index.html" style="color:#7C5F20;">Phase 0</a> — static site, real pricing, no online booking yet</li>
  <li><a href="mvp/index.html" style="color:#7C5F20;">MVP</a> — the scoped v1 build: full self-serve booking &amp; payment</li>
  <li><a href="end-2-end/index.html" style="color:#7C5F20;">End-to-End</a> — full current vision, including backlog features</li>
</ul>
</body>
</html>
`;
fs.writeFileSync(path.join(OUT, 'index.html'), chooserHtml);

console.log('Prototype variants generated at', OUT);
