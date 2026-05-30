const params = new URLSearchParams(window.location.search);

const fields = [
  { label: 'First Name',     key: 'first-name' },
  { label: 'Last Name',      key: 'last-name' },
  { label: 'Email',          key: 'email' },
  { label: 'Mobile Phone',   key: 'mobile-phone' },
  { label: 'Business Name',  key: 'org-name' },
  { label: 'Date Submitted', key: 'timestamp' },
];

const container = document.getElementById('submitted-data');

fields.forEach(({ label, key }) => {
  const value = params.get(key);
  if (value) {
    const item = document.createElement('div');
    item.className = 'data-item';
    item.innerHTML =
      `<span class="data-label">${label}</span><span class="data-value">${value}</span>`;
    container.appendChild(item);
  }
});
