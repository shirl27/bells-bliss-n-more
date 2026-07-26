// Shared behavior used across prototype pages: cart count, auth-state header slot,
// review rendering/toggling, popular-card rendering, and the footer map picker.

// --- Cart (persisted via localStorage, standing in for real session/cart state) ---
function getCartCount() { return parseInt(localStorage.getItem('bbnm_cart_count') || '0', 10); }
function setCartCount(n) {
  localStorage.setItem('bbnm_cart_count', String(n));
  document.querySelectorAll('.cart-count').forEach(function (el) { el.textContent = n; });
}
function showToast(message) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 1800);
}

// --- Hero config: admin-editable override, layered on top of content-data.js's default ---
var HERO_CONFIG_KEY = 'bbnm_hero_config_override';
function getEffectiveHeroConfig() {
  var saved = localStorage.getItem(HERO_CONFIG_KEY);
  if (saved) {
    try { return Object.assign({}, heroConfig, JSON.parse(saved)); } catch (e) { /* fall through to default */ }
  }
  return heroConfig;
}
function saveHeroConfigOverride(config) {
  localStorage.setItem(HERO_CONFIG_KEY, JSON.stringify(config));
}
function resetHeroConfigOverride() {
  localStorage.removeItem(HERO_CONFIG_KEY);
}

// --- Auth state ("Hello, Sign in" / "Hello, Maria" in the header, Amazon-style) ---
function isLoggedIn() { return localStorage.getItem('bbnm_logged_in') === '1'; }
function getUserName() { return localStorage.getItem('bbnm_user_name') || 'Maria'; }
function logIn(name) {
  localStorage.setItem('bbnm_logged_in', '1');
  localStorage.setItem('bbnm_user_name', name || 'Maria');
}
function logOut() {
  localStorage.removeItem('bbnm_logged_in');
  localStorage.removeItem('bbnm_user_name');
}
function renderAuthState() {
  document.querySelectorAll('[data-auth-slot]').forEach(function (slot) {
    slot.innerHTML = isLoggedIn()
      ? '<span class="auth-greeting">Hello, <a class="auth-link" href="account-dashboard.html">' + getUserName() + '</a></span>'
      : '<span class="auth-greeting">Hello, <a class="auth-link" href="login.html">Sign in</a></span>';
  });
}

// --- Reviews: correct stars from a numeric rating, "First L." display name, read-more toggle ---
function renderStars(rating) {
  return { text: '★'.repeat(rating) + '☆'.repeat(5 - rating), label: rating + ' out of 5 stars' };
}
function shortName(fullName) {
  var parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return fullName;
  return parts[0] + ' ' + parts[parts.length - 1].charAt(0) + '.';
}
function buildReviewCardHTML(review, useShortName) {
  var stars = renderStars(review.rating);
  var displayName = useShortName ? shortName(review.name) : review.name;
  return '<div class="review-card">' +
    '<div class="review-stars" aria-label="' + stars.label + '">' + stars.text + '</div>' +
    '<p class="review-text">' + review.text + '</p>' +
    '<button class="review-read-more" onclick="toggleReview(this)">Read more</button>' +
    '<div class="review-footer"><span class="review-name">' + displayName + '</span><span>' + review.date + '</span></div>' +
    '</div>';
}
function renderReviewCards(containerId, reviewsArray, useShortName) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = reviewsArray.map(function (r) { return buildReviewCardHTML(r, useShortName); }).join('');
  applyReviewOverflow();
}
function applyReviewOverflow() {
  document.querySelectorAll('.review-text').forEach(function (el) {
    var btn = el.nextElementSibling;
    if (!btn || !btn.classList.contains('review-read-more')) return;
    btn.hidden = !(el.scrollHeight > el.clientHeight + 4);
  });
}
function toggleReview(btn) {
  var text = btn.previousElementSibling;
  var expanded = text.classList.toggle('expanded');
  btn.textContent = expanded ? 'Show less' : 'Read more';
}

// --- Popular rentals cards (Home) ---
function buildPopularCardHTML(item) {
  var saleBadge = item.onSale ? '<span class="badge-sale">SALE</span>' : '';
  var priceHTML = item.onSale
    ? '<span class="price-was">$' + item.priceWas + '</span><span class="price-current">$' + item.priceCurrent + '</span>'
    : '<span class="price-current">$' + item.priceCurrent + '</span>';
  return '<div class="home-scroll-card">' +
    '<div class="card-media" aria-hidden="true">' + saleBadge + item.image + '</div>' +
    '<div class="home-scroll-card-body"><h3>' + item.name + '</h3><div class="price-row">' + priceHTML + '</div></div>' +
    '</div>';
}
function renderPopularCards(containerId, items) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map(buildPopularCardHTML).join('');
}

// --- Footer address picker (Google Maps / Apple Maps / Waze) ---
function outsideMapPickerClick(e) {
  if (!e.target.closest('.map-picker') && !e.target.closest('.footer-address-btn')) closeMapPicker();
}
function closeMapPicker() {
  document.querySelectorAll('.map-picker').forEach(function (p) { p.remove(); });
  document.removeEventListener('click', outsideMapPickerClick);
}
function openMapPicker(evt) {
  evt.preventDefault();
  var alreadyOpen = evt.currentTarget.parentElement.querySelector('.map-picker');
  closeMapPicker();
  if (alreadyOpen) return;
  var btn = evt.currentTarget;
  var encoded = encodeURIComponent(btn.getAttribute('data-address'));
  var popover = document.createElement('div');
  popover.className = 'map-picker';
  popover.innerHTML =
    '<a href="https://www.google.com/maps/search/?api=1&query=' + encoded + '" target="_blank" rel="noopener noreferrer">Google Maps</a>' +
    '<a href="https://maps.apple.com/?q=' + encoded + '" target="_blank" rel="noopener noreferrer">Apple Maps</a>' +
    '<a href="https://waze.com/ul?q=' + encoded + '&navigate=yes" target="_blank" rel="noopener noreferrer">Waze</a>';
  btn.parentElement.style.position = 'relative';
  btn.parentElement.appendChild(popover);
  setTimeout(function () { document.addEventListener('click', outsideMapPickerClick); }, 0);
}

document.addEventListener('DOMContentLoaded', function () {
  setCartCount(getCartCount());
  renderAuthState();
});
