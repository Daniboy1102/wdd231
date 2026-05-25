
const API_KEY = 'd87a105c4a933fae9485e44924570536';
const LAT = -8.8383;
const LON = 13.2344;
const UNITS = 'metric';

async function fetchWeather() {
  if (API_KEY === ' ') {
    document.getElementById('weather-current').innerHTML =
      '<p class="load-error">OpenWeatherMap API key MISSING.</p>';
    return;
  }
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`)
    ]);
    if (!currentRes.ok || !forecastRes.ok) throw new Error('Weather API error');
    const current = await currentRes.json();
    const forecast = await forecastRes.json();
    renderCurrentWeather(current);
    renderForecast(forecast);
  } catch {
    document.getElementById('weather-current').innerHTML =
      '<p class="load-error">Weather data unavailable. Please try again later.</p>';
  }
}

function renderCurrentWeather(data) {
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const high = Math.round(data.main.temp_max);
  const low = Math.round(data.main.temp_min);
  const humidity = data.main.humidity;

  document.getElementById('weather-current').innerHTML = `
    <div class="weather-main">
      <img src="${icon}" alt="${desc}" class="weather-icon" />
      <div class="weather-temp-block">
        <span class="weather-temp">${temp}°C</span>
        <span class="weather-desc">${desc}</span>
      </div>
    </div>
    <div class="weather-details">
      <span>H: ${high}°C</span>
      <span>L: ${low}°C</span>
      <span>Humidity: ${humidity}%</span>
    </div>
  `;
}

function renderForecast(data) {
  const days = {};
  const today = new Date().toISOString().split('T')[0];

  // Prefer the noon reading for each future day
  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    const time = item.dt_txt.split(' ')[1];
    if (date === today) return;
    if (!days[date] && time === '12:00:00') days[date] = item;
  });

  // Fallback: grab first entry of each future day if noon not found
  if (Object.keys(days).length < 3) {
    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (date !== today && !days[date]) days[date] = item;
    });
  }

  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const html = Object.values(days).slice(0, 3).map(item => {
    const d = new Date(item.dt * 1000);
    const dayName = DAY_NAMES[d.getDay()];
    const temp = Math.round(item.main.temp);
    const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
    const desc = item.weather[0].main;
    return `
      <div class="forecast-day">
        <span class="forecast-label">${dayName}</span>
        <img src="${icon}" alt="${desc}" />
        <span class="forecast-temp">${temp}°C</span>
        <span class="forecast-desc">${desc}</span>
      </div>`;
  }).join('');

  document.getElementById('weather-forecast').innerHTML = html;
}

async function loadSpotlights() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error('Failed to load members');
    const members = await res.json();

    // Only gold (3) and silver (2) members are eligible for spotlights
    const eligible = members.filter(m => m.membershipLevel >= 2);

    // Shuffle, then pick 2 or 3 at random
    const shuffled = eligible.sort(() => Math.random() - 0.5);
    const count = shuffled.length >= 3 && Math.random() < 0.5 ? 3 : 2;
    renderSpotlights(shuffled.slice(0, count));
  } catch {
    document.getElementById('spotlights-display').innerHTML =
      '<p class="load-error">Unable to load member spotlights.</p>';
  }
}

function levelLabel(level) {
  if (level === 3) return { label: 'Gold', cls: 'badge-gold' };
  if (level === 2) return { label: 'Silver', cls: 'badge-silver' };
  return { label: 'Member', cls: 'badge-member' };
}

function renderSpotlights(members) {
  const html = members.map(m => {
    const { label, cls } = levelLabel(m.membershipLevel);
    return `
      <article class="spotlight-card">
        <img src="images/${m.image}" alt="${m.name} logo" loading="lazy" />
        <div class="spotlight-body">
          <h3>${m.name}</h3>
          <span class="membership-badge ${cls}">${label}</span>
          <p class="spotlight-phone">${m.phone}</p>
          <p class="spotlight-address">${m.address}</p>
          <a href="${m.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        </div>
      </article>`;
  }).join('');

  document.getElementById('spotlights-display').innerHTML = html;
}

fetchWeather();
loadSpotlights();
