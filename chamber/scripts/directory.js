const membersDisplay = document.getElementById('members-display');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

const LEVEL_LABELS = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
const LEVEL_CLASSES = { 1: 'member', 2: 'silver', 3: 'gold' };
const BADGE_CLASSES = { 1: 'badge-member', 2: 'badge-silver', 3: 'badge-gold' };

async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
  } catch (err) {
    membersDisplay.innerHTML = '<p class="load-error">Unable to load member data. Please try again later.</p>';
    return [];
  }
}

function createCard(member) {
  const card = document.createElement('article');
  card.classList.add('member-card', `level-${LEVEL_CLASSES[member.membershipLevel]}`);
  card.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="300" height="140" />
    <div class="card-body">
      <h2>${member.name}</h2>
      <span class="membership-badge ${BADGE_CLASSES[member.membershipLevel]}">${LEVEL_LABELS[member.membershipLevel]}</span>
      <p class="card-address">${member.address}</p>
      <p class="card-phone">${member.phone}</p>
      <p class="card-desc">${member.description}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
    </div>
  `;
  return card;
}

function createListItem(member) {
  const item = document.createElement('article');
  item.classList.add('member-list-item', `level-${LEVEL_CLASSES[member.membershipLevel]}`);
  item.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="64" height="64" />
    <div class="list-info">
      <h2>${member.name}</h2>
      <span class="membership-badge ${BADGE_CLASSES[member.membershipLevel]}">${LEVEL_LABELS[member.membershipLevel]}</span>
      <span class="list-address">${member.address}</span>
      <span class="list-phone">${member.phone}</span>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Website ↗</a>
    </div>
  `;
  return item;
}

let allMembers = [];

function render(view) {
  membersDisplay.innerHTML = '';
  membersDisplay.className = view === 'grid' ? 'members-grid' : 'members-list';
  allMembers.forEach(member => {
    membersDisplay.appendChild(view === 'grid' ? createCard(member) : createListItem(member));
  });
}

gridBtn.addEventListener('click', () => {
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
  render('grid');
});

listBtn.addEventListener('click', () => {
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
  render('list');
});

fetchMembers().then(members => {
  allMembers = members;
  render('grid');
});
