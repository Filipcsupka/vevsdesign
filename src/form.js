export function initForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-form-status');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitButton = form.querySelector('.btn-submit');
    const formData = new FormData(form);

    if (formData.get('_honey')) {
      form.reset();
      return;
    }

    status.className = 'form-status';
    status.textContent = 'Správu odosielame...';
    submitButton.disabled = true;
    submitButton.textContent = 'Odosielame...';

    try {
      const response = await fetch(form.dataset.ajaxEndpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) throw new Error('Form submission failed');

      form.reset();
      status.className = 'form-status success';
      status.textContent = 'Ďakujeme, správa bola odoslaná. Ozveme sa vám čo najskôr.';
    } catch {
      status.className = 'form-status error';
      status.textContent = 'Správu sa nepodarilo odoslať. Skúste to prosím znova alebo nám napíšte priamo na email.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Odoslať správu →';
    }
  });
}
