document.getElementById('timestamp').value = new Date().toLocaleString();

document.querySelectorAll('.modal-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const modal = document.getElementById(link.dataset.modal);
    if (modal) modal.showModal();
  });
});

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('dialog').close());
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });
});
