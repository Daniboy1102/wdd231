const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('primary-nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});
