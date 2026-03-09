/* ═══════════════════════════════════════════════════════════════
   PASSPORT — Pi Network Web3 Travel App
   script.js
═══════════════════════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════════════════════════
// DATA STORE
// ══════════════════════════════════════════════════════

const COUNTRIES = [
  'Tunisia', 'Morocco', 'France', 'USA', 'UAE', 'Japan',
  'Germany', 'Brazil', 'Indonesia', 'Nigeria', 'Turkey',
  'India', 'Spain', 'Italy', 'Egypt', 'South Korea', 'Philippines', 'Vietnam'
];

const COUNTRY_EMOJIS = {
  Tunisia: '🇹🇳', Morocco: '🇲🇦', France: '🇫🇷', USA: '🇺🇸',
  UAE: '🇦🇪', Japan: '🇯🇵', Germany: '🇩🇪', Brazil: '🇧🇷',
  Indonesia: '🇮🇩', Nigeria: '🇳🇬', Turkey: '🇹🇷', India: '🇮🇳',
  Spain: '🇪🇸', Italy: '🇮🇹', Egypt: '🇪🇬', 'South Korea': '🇰🇷',
  Philippines: '🇵🇭', Vietnam: '🇻🇳'
};

const STAMP_ICONS = ['🏛️','🏖️','🌄','🗺️','🏝️','🌃','🏔️','🎭','🌿','🏜️','🎪','🌊'];

const BADGE_DEFINITIONS = [
  { id: 'explorer_tn',   emoji: '🌴', name: 'Explorer Tunisia',     country: 'Tunisia',   threshold: 0 },
  { id: 'traveler_ma',   emoji: '🕌', name: 'Traveler Morocco',     country: 'Morocco',   threshold: 0 },
  { id: 'pioneer_fr',    emoji: '🗼', name: 'French Pioneer',       country: 'France',    threshold: 0 },
  { id: 'globemaster',   emoji: '🌍', name: 'Globe Master',         country: null,        threshold: 5 },
  { id: 'world_pioneer', emoji: '🚀', name: 'Global Pioneer',       country: null,        threshold: 10 },
  { id: 'pi_explorer',   emoji: 'π',  name: 'Pi Explorer',          country: null,        threshold: 1 },
  { id: 'jet_setter',    emoji: '✈️', name: 'Jet Setter',           country: null,        threshold: 3 },
];

const PI_PLACES = [
  { id: 1, name: 'Hotel La Marsa', country: 'Tunisia', category: 'hotel',      rating: 4.8, icon: '🏨', tag: 'Premium Stay' },
  { id: 2, name: 'Dar Zitoun',     country: 'Morocco', category: 'restaurant', rating: 4.6, icon: '🍽️', tag: 'Local Cuisine' },
  { id: 3, name: 'Atlas Taxis',    country: 'Morocco', category: 'transport',  rating: 4.3, icon: '🚗', tag: 'City Rides' },
  { id: 4, name: 'Sahara Tours',   country: 'Tunisia', category: 'tour',       rating: 4.9, icon: '🐪', tag: 'Desert Tour' },
  { id: 5, name: 'Hotel Riviera',  country: 'France',  category: 'hotel',      rating: 4.7, icon: '🏨', tag: 'Luxury' },
  { id: 6, name: 'Pi Sushi Bar',   country: 'Japan',   category: 'restaurant', rating: 4.5, icon: '🍣', tag: 'Asian Fusion' },
  { id: 7, name: 'Dubai Wheels',   country: 'UAE',     category: 'transport',  rating: 4.4, icon: '🚌', tag: 'Airport Transfer' },
  { id: 8, name: 'Nile Adventures',country: 'Egypt',   category: 'tour',       rating: 4.8, icon: '🛶', tag: 'River Tour' },
  { id: 9, name: 'Lagos Pi Hotel', country: 'Nigeria', category: 'hotel',      rating: 4.2, icon: '🏩', tag: 'Business Hotel' },
  { id:10, name: 'Istanbul Taste', country: 'Turkey',  category: 'restaurant', rating: 4.7, icon: '🥙', tag: 'Turkish Delights' },
  { id:11, name: 'Pi Cab Jakarta', country: 'Indonesia',category: 'transport', rating: 4.3, icon: '🛺', tag: 'City Express' },
  { id:12, name: 'Rio Explorer',   country: 'Brazil',  category: 'tour',       rating: 4.6, icon: '🎭', tag: 'Cultural Tour' },
];

const LEADERBOARD_DATA = [
  { name: 'Pioneer Alex',  country: 'Tunisia',   score: 95, stamps: 18, avatar: 'A', color: '#7c3aed' },
  { name: 'Sara Khan',     country: 'India',     score: 88, stamps: 14, avatar: 'S', color: '#2563eb' },
  { name: 'Marco Rossi',   country: 'Italy',     score: 82, stamps: 12, avatar: 'M', color: '#06b6d4' },
  { name: 'Fatima Z.',     country: 'Morocco',   score: 79, stamps: 11, avatar: 'F', color: '#f59e0b' },
  { name: 'Li Wei',        country: 'Indonesia', score: 73, stamps: 9,  avatar: 'L', color: '#10b981' },
  { name: 'David O.',      country: 'Nigeria',   score: 68, stamps: 8,  avatar: 'D', color: '#fb923c' },
];

const FEED_POSTS = [
  { user: 'Pioneer Alex',  avatar: 'A', color: '#7c3aed', text: '🌴 Just arrived in Tunisia using Pi! Amazing local coffee paid entirely with Pi Network.', time: '2 mins ago',  likes: 24 },
  { user: 'Sara Khan',     avatar: 'S', color: '#2563eb', text: '🕌 Visited the magical Medina in Morocco. Hotel & tour were 100% Pi-powered!', time: '15 mins ago', likes: 18 },
  { user: 'Marco Rossi',   avatar: 'M', color: '#06b6d4', text: '🗼 Paris boulangerie now accepts Pi! The croissants were worth every π 🥐', time: '1 hour ago',  likes: 41 },
  { user: 'Fatima Z.',     avatar: 'F', color: '#f59e0b', text: '🐪 Sahara desert tour booked fully with Pi. This is the future of travel! 🚀', time: '3 hours ago', likes: 67 },
  { user: 'Li Wei',        avatar: 'L', color: '#10b981', text: '🍣 Tokyo sushi restaurant just added Pi payments! Japan is adopting fast! 🇯🇵', time: '5 hours ago', likes: 33 },
];

const TRANSACTIONS = [
  { desc: '🏨 Hotel La Marsa',  amount: '+50', type: 'pos' },
  { desc: '🍽️ Dar Zitoun',      amount: '-12', type: 'neg' },
  { desc: '🚗 Atlas Taxis',     amount: '-8',  type: 'neg' },
  { desc: '🎁 Referral Bonus',  amount: '+25', type: 'pos' },
];

const USERNAMES = ['PioneerAlex','SaraK','MarcoR','FatimaZ','LiWei','DavidO','ElaraP','NasimT','BenjiM','IkennaN'];

// ══════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════

let currentUser   = null;
let stamps        = [];
let badges        = [];
let currentTab    = 'home';
let qrCodeInited  = false;
let qrModalInited = false;
let feedLikes     = {};

// ══════════════════════════════════════════════════════
// UTILITY
// ══════════════════════════════════════════════════════

function uid() {
  return 'PI' + Math.random().toString(36).substr(2,8).toUpperCase();
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatDate(d) {
  const date = d || new Date();
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  const m = document.getElementById('toast-msg');
  m.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.add('hidden'), 2800);
}

function $(id) { return document.getElementById(id); }

function getTrustLevel(score) {
  if (score >= 75) return 'Global Pioneer';
  if (score >= 50) return 'Adventurer';
  if (score >= 25) return 'Explorer';
  return 'Beginner';
}

// ══════════════════════════════════════════════════════
// GENERATE QR CODE
// ══════════════════════════════════════════════════════

function generateQR(containerId, text, size) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = '';
  try {
    new QRCode(container, {
      text: text,
      width:  size || 160,
      height: size || 160,
      colorDark:  '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch(e) {
    container.innerHTML = '<div style="color:#666;font-size:0.7rem;text-align:center;padding:10px;">QR unavailable</div>';
  }
}

// ══════════════════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════════════════

function loginWithPi() {
  const btn     = document.getElementById('loginBtn');
  const loading = document.getElementById('login-loading');

  btn.classList.add('hidden');
  loading.classList.remove('hidden');

  setTimeout(() => {
    const username  = randomFrom(USERNAMES);
    const country   = randomFrom(COUNTRIES);
    const trustScore = Math.floor(Math.random() * 40) + 30;
    const balance   = Math.floor(Math.random() * 200) + 50;

    currentUser = {
      username,
      uid:          uid(),
      country,
      trustScore,
      travelLevel:  getTrustLevel(trustScore),
      passportID:   'PP' + Math.random().toString(36).substr(2,10).toUpperCase(),
      balance,
    };

    stamps  = JSON.parse(localStorage.getItem('pp_stamps')  || '[]');
    badges  = JSON.parse(localStorage.getItem('pp_badges')  || '[]');
    feedLikes = JSON.parse(localStorage.getItem('pp_likes') || '{}');

    localStorage.setItem('pp_user', JSON.stringify(currentUser));
    loading.classList.add('hidden');
    initApp();
  }, 2200);
}

// ══════════════════════════════════════════════════════
// INIT APP
// ══════════════════════════════════════════════════════

function initApp() {
  const u = currentUser;

  // Show app, hide login
  document.getElementById('login-screen').classList.add('hidden');
  const app = document.getElementById('app-screen');
  app.classList.remove('hidden');
  app.style.display = 'flex';

  // Inject SVG gradient defs
  if (!document.getElementById('svgDefs')) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'svgDefs';
    svg.style.cssText = 'position:absolute;width:0;height:0;';
    svg.innerHTML = `<defs>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#7c3aed"/>
        <stop offset="100%" stop-color="#06b6d4"/>
      </linearGradient>
    </defs>`;
    document.body.appendChild(svg);
  }

  populateAll();
  navigateTo('home');
}

function populateAll() {
  const u = currentUser;

  // Header
  $('header-balance').textContent = u.balance;
  $('header-avatar').textContent  = u.username[0].toUpperCase();

  // Home welcome
  $('welcome-username').textContent = u.username;

  // Home stats
  updateHomeStats();

  // Passport card
  updatePassportCard();

  // Trust section
  updateTrustSection();

  // Community feed
  buildCommunityFeed();

  // Leaderboard
  buildLeaderboard();

  // Places
  buildPlaces('all');

  // Wallet
  $('wallet-balance').textContent = u.balance;
  buildTransactions();

  // Profile
  updateProfile();

  // Badges
  updateBadges();

  // Stamps
  renderStamps();
}

// ══════════════════════════════════════════════════════
// HOME STATS
// ══════════════════════════════════════════════════════

function updateHomeStats() {
  const u = currentUser;
  const countries = [...new Set(stamps.map(s => s.country))];

  $('stat-stamps').textContent    = stamps.length;
  $('stat-badges').textContent    = badges.length;
  $('stat-countries').textContent = countries.length;
  $('stat-pi').textContent        = u.balance;

  // Trust ring
  const fill   = $('home-ring-fill');
  const score  = $('home-ring-score');
  const offset = 213 - (213 * u.trustScore / 100);
  score.textContent = u.trustScore;
  if (fill) {
    setTimeout(() => {
      fill.style.strokeDashoffset = offset;
      fill.setAttribute('stroke', 'url(#ringGrad)');
    }, 300);
  }
}

// ══════════════════════════════════════════════════════
// PASSPORT CARD
// ══════════════════════════════════════════════════════

function updatePassportCard() {
  const u = currentUser;

  $('p-username').textContent = u.username.toUpperCase();
  $('p-country').textContent  = (COUNTRY_EMOJIS[u.country] || '') + ' ' + u.country;
  $('p-level').textContent    = u.travelLevel;
  $('p-trust').textContent    = u.trustScore + ' / 100';
  $('p-pid').textContent      = u.passportID;
  $('passport-avatar').textContent = u.username[0].toUpperCase();

  // MRZ line
  const mrzName = u.username.toUpperCase().padEnd(20,'<').substr(0,20);
  $('passport-mrz').textContent = 'P<PI' + mrzName + '<<<<<<<<<<<<<<';

  // QR code on card
  const qrText = `PASSPORTID:${u.passportID}|USER:${u.username}|TRUST:${u.trustScore}|PI`;
  if (!qrCodeInited) {
    generateQR('passport-qr', qrText, 57);
    qrCodeInited = true;
  }

  // QR modal ID
  $('qr-modal-id').textContent = 'Passport ID: ' + u.passportID;
}

// ══════════════════════════════════════════════════════
// TRUST SECTION
// ══════════════════════════════════════════════════════

function updateTrustSection() {
  const u    = currentUser;
  const pct  = u.trustScore;
  const lvl  = getTrustLevel(pct);

  $('trust-score-display').textContent = pct;
  $('trust-level-badge').textContent   = lvl;

  // Animated bar
  setTimeout(() => {
    $('trust-fill').style.width = pct + '%';
  }, 400);

  // Milestone highlights
  const milestones = document.querySelectorAll('.tm');
  milestones.forEach(el => el.classList.remove('active'));
  if (pct >= 75) milestones[3].classList.add('active');
  else if (pct >= 50) milestones[2].classList.add('active');
  else if (pct >= 25) milestones[1].classList.add('active');
  else milestones[0].classList.add('active');

  // Trust factors
  const tfStamps    = $('tf-stamps');
  const tfCommunity = $('tf-community');
  if (stamps.length > 0) tfStamps.classList.add('active');
  tfCommunity.classList.add('active'); // always active once logged in
}

// ══════════════════════════════════════════════════════
// COMMUNITY FEED
// ══════════════════════════════════════════════════════

function buildCommunityFeed() {
  const container = $('community-feed');
  container.innerHTML = '';

  FEED_POSTS.forEach((post, i) => {
    const liked   = feedLikes[i] || false;
    const likes   = post.likes + (liked ? 1 : 0);
    const card    = document.createElement('div');
    card.className = 'feed-card';
    card.innerHTML = `
      <div class="feed-avatar" style="background:${post.color}">${post.avatar}</div>
      <div class="feed-body">
        <div class="feed-user">${post.user}</div>
        <div class="feed-text">${post.text}</div>
        <div class="feed-time">${post.time}</div>
        <div class="feed-actions">
          <button class="like-btn ${liked ? 'liked' : ''}" id="like-${i}" onclick="toggleLike(${i},${post.likes})">
            ❤️ <span>${likes}</span>
          </button>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

function toggleLike(idx, baseLikes) {
  feedLikes[idx] = !feedLikes[idx];
  localStorage.setItem('pp_likes', JSON.stringify(feedLikes));
  const btn = $('like-' + idx);
  const liked = feedLikes[idx];
  btn.classList.toggle('liked', liked);
  btn.querySelector('span').textContent = baseLikes + (liked ? 1 : 0);
}

// ══════════════════════════════════════════════════════
// LEADERBOARD
// ══════════════════════════════════════════════════════

function buildLeaderboard() {
  // Merge current user into leaderboard
  const myEntry = {
    name: currentUser.username,
    country: currentUser.country,
    score: currentUser.trustScore,
    stamps: stamps.length,
    avatar: currentUser.username[0].toUpperCase(),
    color: '#7c3aed',
    isMe: true
  };

  let lb = [...LEADERBOARD_DATA];
  lb.push(myEntry);
  lb.sort((a,b) => b.score - a.score);
  lb = lb.slice(0, 6);

  const rankClasses = ['gold','silver','bronze','','',''];
  const medals = ['🥇','🥈','🥉','4','5','6'];

  // Preview (home)
  const preview = $('leaderboard-preview');
  preview.innerHTML = '';
  lb.slice(0,3).forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'lb-item';
    el.innerHTML = `
      <div class="lb-rank ${rankClasses[i]}">${medals[i]}</div>
      <div class="lb-avatar" style="background:${p.color}">${p.avatar}</div>
      <div class="lb-info">
        <div class="lb-name">${p.name}${p.isMe ? ' <span style="color:var(--purple-light);font-size:0.65rem;">(You)</span>' : ''}</div>
        <div class="lb-sub">${COUNTRY_EMOJIS[p.country]||'🌍'} ${p.country} · ${p.stamps} stamps</div>
      </div>
      <div class="lb-score">${p.score}</div>`;
    preview.appendChild(el);
  });

  // Full (profile)
  const full = $('leaderboard-full');
  full.innerHTML = '';
  lb.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'lb-item';
    el.innerHTML = `
      <div class="lb-rank ${rankClasses[i]}">${medals[i]}</div>
      <div class="lb-avatar" style="background:${p.color}">${p.avatar}</div>
      <div class="lb-info">
        <div class="lb-name">${p.name}${p.isMe ? ' <span style="color:var(--purple-light);font-size:0.65rem;">(You)</span>' : ''}</div>
        <div class="lb-sub">${COUNTRY_EMOJIS[p.country]||'🌍'} ${p.country} · ${p.stamps} stamps</div>
      </div>
      <div class="lb-score">${p.score}</div>`;
    full.appendChild(el);
  });
}

// ══════════════════════════════════════════════════════
// PLACES
// ══════════════════════════════════════════════════════

function buildPlaces(category) {
  const list = $('places-list');
  list.innerHTML = '';

  const filtered = category === 'all'
    ? PI_PLACES
    : PI_PLACES.filter(p => p.category === category);

  filtered.forEach(place => {
    const card = document.createElement('div');
    card.className = 'place-card';
    const stars = '⭐'.repeat(Math.floor(place.rating));
    card.innerHTML = `
      <div class="place-type-icon">${place.icon}</div>
      <div class="place-info">
        <div class="place-name">${place.name}</div>
        <div class="place-location">${COUNTRY_EMOJIS[place.country]||'🌍'} ${place.country}</div>
        <div class="place-meta">
          <span class="place-rating">${stars} ${place.rating}</span>
          <span class="pi-badge">π Accepts Pi</span>
          <span style="font-size:0.7rem;color:var(--text-dim);">${place.tag}</span>
        </div>
      </div>`;
    list.appendChild(card);
  });
}

function filterPlaces(category, btn) {
  document.querySelectorAll('.place-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  buildPlaces(category);
}

// ══════════════════════════════════════════════════════
// BADGES
// ══════════════════════════════════════════════════════

function updateBadges() {
  renderBadgesTo('badges-grid');
  renderBadgesTo('profile-badges');
}

function renderBadgesTo(containerId) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = '';

  if (badges.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'badge-empty';
    empty.textContent = 'No badges yet. Start traveling! ✈️';
    container.appendChild(empty);
    return;
  }

  badges.forEach(bid => {
    const def = BADGE_DEFINITIONS.find(b => b.id === bid);
    if (!def) return;
    const card = document.createElement('div');
    card.className = 'badge-card';
    card.innerHTML = `
      <span class="badge-emoji">${def.emoji}</span>
      <div class="badge-name">${def.name}</div>
      <div class="badge-country">${def.country ? (COUNTRY_EMOJIS[def.country]||'') + ' ' + def.country : '🌐 Global'}</div>`;
    container.appendChild(card);
  });
}

function checkAndAwardBadges() {
  const uniqueCountries = [...new Set(stamps.map(s => s.country))];

  BADGE_DEFINITIONS.forEach(def => {
    if (badges.includes(def.id)) return;

    let earned = false;
    if (def.country && uniqueCountries.includes(def.country)) earned = true;
    if (!def.country && def.threshold !== undefined && stamps.length >= def.threshold) earned = true;

    if (earned) {
      badges.push(def.id);
      showToast('🏅 New Badge Earned: ' + def.name + '!');
    }
  });

  localStorage.setItem('pp_badges', JSON.stringify(badges));
  updateBadges();
  updateProfileStats();
}

// ══════════════════════════════════════════════════════
// STAMPS / CHECK-IN
// ══════════════════════════════════════════════════════

function renderStamps() {
  const grid = $('stamps-grid');
  grid.innerHTML = '';

  if (stamps.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'stamps-empty';
    empty.textContent = 'No stamps yet. Check-in your first location! 🌍';
    grid.appendChild(empty);
    return;
  }

  stamps.forEach(stamp => {
    const card = document.createElement('div');
    card.className = 'stamp-card';
    card.innerHTML = `
      <span class="stamp-icon">${stamp.icon}</span>
      <div class="stamp-country">${stamp.country}</div>
      <div class="stamp-city">${stamp.city}</div>
      <div class="stamp-date">${stamp.date}</div>`;
    grid.appendChild(card);
  });
}

function openCheckin() {
  $('checkin-modal').classList.remove('hidden');
}

function closeCheckin() {
  $('checkin-modal').classList.add('hidden');
  $('checkin-country').value = '';
  $('checkin-city').value    = '';
  $('checkin-note').value    = '';
}

function confirmCheckin() {
  const country = $('checkin-country').value;
  const city    = $('checkin-city').value.trim();

  if (!country) { showToast('⚠️ Please select a country'); return; }
  if (!city)    { showToast('⚠️ Please enter a city');    return; }

  const stamp = {
    id:      Date.now(),
    country,
    city,
    date:    formatDate(new Date()),
    icon:    randomFrom(STAMP_ICONS),
    note:    $('checkin-note').value.trim(),
  };

  stamps.unshift(stamp);
  localStorage.setItem('pp_stamps', JSON.stringify(stamps));

  // Update trust score slightly
  currentUser.trustScore = Math.min(100, currentUser.trustScore + 3);
  currentUser.travelLevel = getTrustLevel(currentUser.trustScore);
  localStorage.setItem('pp_user', JSON.stringify(currentUser));

  closeCheckin();
  showToast('📍 Travel Stamp Added: ' + city + ', ' + country + '!');

  // Re-render
  renderStamps();
  checkAndAwardBadges();
  updateHomeStats();
  updateTrustSection();
  updateProfile();
  buildLeaderboard();
}

// ══════════════════════════════════════════════════════
// PROFILE
// ══════════════════════════════════════════════════════

function updateProfile() {
  const u = currentUser;
  $('profile-username').textContent  = u.username;
  $('profile-uid').textContent       = 'UID: ' + u.uid;
  $('profile-level-badge').textContent = u.travelLevel;
  $('profile-avatar').textContent    = u.username[0].toUpperCase();

  $('profile-pid').textContent     = u.passportID;
  $('profile-country').textContent = (COUNTRY_EMOJIS[u.country]||'') + ' ' + u.country;
  $('profile-tlevel').textContent  = u.travelLevel;
  $('profile-balance').textContent = u.balance + ' π';

  updateProfileStats();
}

function updateProfileStats() {
  const u = currentUser;
  $('ps-trust').textContent        = u.trustScore;
  $('ps-stamps').textContent       = stamps.length;
  $('ps-badges-count').textContent = badges.length;
  $('ps-pi').textContent           = u.balance;

  $('stat-stamps').textContent    = stamps.length;
  $('stat-badges').textContent    = badges.length;
  $('stat-pi').textContent        = u.balance;

  const countries = [...new Set(stamps.map(s => s.country))];
  $('stat-countries').textContent = countries.length;
}

// ══════════════════════════════════════════════════════
// WALLET
// ══════════════════════════════════════════════════════

function buildTransactions() {
  const container = $('wallet-tx');
  let html = '<p class="tx-title">Recent Transactions</p>';
  TRANSACTIONS.forEach(tx => {
    html += `<div class="tx-item">
      <span class="tx-desc">${tx.desc}</span>
      <span class="tx-amount ${tx.type}">${tx.amount} π</span>
    </div>`;
  });
  container.innerHTML = html;
}

function simulateSend() {
  if (currentUser.balance < 5) { showToast('⚠️ Insufficient balance'); return; }
  const amt = Math.floor(Math.random() * 15) + 5;
  currentUser.balance = Math.max(0, currentUser.balance - amt);
  localStorage.setItem('pp_user', JSON.stringify(currentUser));
  $('wallet-balance').textContent = currentUser.balance;
  $('header-balance').textContent = currentUser.balance;
  $('stat-pi').textContent        = currentUser.balance;
  $('ps-pi').textContent          = currentUser.balance;
  $('profile-balance').textContent = currentUser.balance + ' π';
  TRANSACTIONS.unshift({ desc: '📤 Sent Pi', amount: '-' + amt, type: 'neg' });
  buildTransactions();
  showToast('📤 Sent ' + amt + ' π successfully!');
}

function simulateReceive() {
  const amt = Math.floor(Math.random() * 30) + 10;
  currentUser.balance += amt;
  localStorage.setItem('pp_user', JSON.stringify(currentUser));
  $('wallet-balance').textContent = currentUser.balance;
  $('header-balance').textContent = currentUser.balance;
  $('stat-pi').textContent        = currentUser.balance;
  $('ps-pi').textContent          = currentUser.balance;
  $('profile-balance').textContent = currentUser.balance + ' π';
  TRANSACTIONS.unshift({ desc: '📥 Received Pi', amount: '+' + amt, type: 'pos' });
  buildTransactions();
  showToast('📥 Received ' + amt + ' π!');
}

// ══════════════════════════════════════════════════════
// QR MODAL
// ══════════════════════════════════════════════════════

function toggleQRModal() {
  $('qr-modal').classList.remove('hidden');
  if (!qrModalInited && currentUser) {
    const qrText = `PASSPORTID:${currentUser.passportID}|USER:${currentUser.username}|TRUST:${currentUser.trustScore}|PI`;
    generateQR('qr-modal-code', qrText, 160);
    qrModalInited = true;
  }
}

function closeQRModal() {
  $('qr-modal').classList.add('hidden');
}

// ══════════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════════

function navigateTo(tab) {
  // Deactivate all
  document.querySelectorAll('.app-section').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  // Activate target
  const section = $('sec-' + tab);
  const navBtn  = $('nav-' + tab);
  if (section) {
    section.style.display = 'block';
    requestAnimationFrame(() => section.classList.add('active'));
  }
  if (navBtn)  navBtn.classList.add('active');

  currentTab = tab;

  // Re-sync data on tab switch
  if (tab === 'passport') updatePassportCard();
  if (tab === 'profile')  { updateProfile(); updateBadges(); buildLeaderboard(); }
  if (tab === 'travel')   { renderStamps(); $('wallet-balance').textContent = currentUser.balance; }
}

// ══════════════════════════════════════════════════════
// LOGOUT
// ══════════════════════════════════════════════════════

function logout() {
  if (!confirm('Are you sure you want to logout?')) return;
  localStorage.removeItem('pp_user');
  localStorage.removeItem('pp_stamps');
  localStorage.removeItem('pp_badges');
  localStorage.removeItem('pp_likes');

  currentUser   = null;
  stamps        = [];
  badges        = [];
  qrCodeInited  = false;
  qrModalInited = false;

  const app = document.getElementById('app-screen');
  app.classList.add('hidden');
  app.style.display = 'none';

  const login = document.getElementById('login-screen');
  login.classList.remove('hidden');
  login.style.display = 'flex';

  const loginBtn  = document.getElementById('loginBtn');
  const loading   = document.getElementById('login-loading');
  loginBtn.classList.remove('hidden');
  loading.classList.add('hidden');

  showToast('👋 Logged out successfully');
}

// ══════════════════════════════════════════════════════
// RIPPLE EFFECT
// ══════════════════════════════════════════════════════

document.addEventListener('click', function(e) {
  const btn = e.target.closest('button');
  if (!btn) return;
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  const rect = btn.getBoundingClientRect();
  ripple.style.left = (e.clientX - rect.left) + 'px';
  ripple.style.top  = (e.clientY - rect.top)  + 'px';
  btn.style.position = btn.style.position || 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// ══════════════════════════════════════════════════════
// AUTO-LOGIN FROM LOCALSTORAGE
// ══════════════════════════════════════════════════════

(function autoLogin() {
  const saved = localStorage.getItem('pp_user');
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
      stamps      = JSON.parse(localStorage.getItem('pp_stamps') || '[]');
      badges      = JSON.parse(localStorage.getItem('pp_badges') || '[]');
      feedLikes   = JSON.parse(localStorage.getItem('pp_likes')  || '{}');
      initApp();
    } catch(e) {
      localStorage.clear();
    }
  }
})();
