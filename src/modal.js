export function initModal() {
  const packageCards = document.querySelectorAll('.balik-card[data-detail]');
  const modal = document.getElementById('balik-modal');
  const modalContent = document.getElementById('balik-modal-content');
  const modalCta = document.getElementById('balik-modal-cta');
  const modalClose = modal.querySelector('.balik-modal-close');
  const packageSelect = document.querySelector('select[name="balik"]');
  let lastFocusedCard = null;

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    modalContent.innerHTML = '';
    if (lastFocusedCard) lastFocusedCard.focus();
  }

  function openModal(card) {
    const detailEl = document.getElementById(card.dataset.detail);
    if (!detailEl) return;
    lastFocusedCard = card;
    modalContent.innerHTML = detailEl.innerHTML;
    const modalTitle = modalContent.querySelector('.balik-modal-name');
    if (modalTitle) modalTitle.id = 'balik-modal-name';
    modalCta.dataset.package = card.dataset.package || '';
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modalClose.focus();
  }

  packageCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  modal.addEventListener('click', e => {
    if (e.target.hasAttribute('data-close-modal')) closeModal();
  });

  modalCta.addEventListener('click', () => {
    const pkg = modalCta.dataset.package;
    if (packageSelect && pkg) packageSelect.value = pkg;
    closeModal();
  });

  document.addEventListener('keydown', e => {
    if (!modal.hidden && e.key === 'Escape') closeModal();
  });
}
