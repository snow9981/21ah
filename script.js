(() => {
  const sidePicker = document.querySelector('.dental-side-picker');
  if (sidePicker) {
    sidePicker.hidden = false;
    const selectSide = side => {
      sidePicker.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.dentalSide === side)));
      document.querySelectorAll('[data-dental-panel]').forEach(panel => { panel.hidden = panel.dataset.dentalPanel !== side; });
    };
    sidePicker.addEventListener('click', event => {
      const button = event.target.closest('[data-dental-side]');
      if (button) selectSide(button.dataset.dentalSide);
    });
    selectSide('left');
  }
  const comparison = document.querySelector('.program-comparison');
  if (comparison) {
    const desktop = matchMedia('(min-width: 900px)');
    const syncComparison = () => { comparison.open = desktop.matches; };
    syncComparison();
    desktop.addEventListener('change', syncComparison);
    document.querySelectorAll('[data-plan]').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-plan]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        document.querySelectorAll('[data-plan-panel]').forEach(panel => { panel.hidden = panel.dataset.planPanel !== button.dataset.plan; });
      });
    });
  }
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  toggle.hidden = false;
  function close() {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });
  menu.addEventListener('click', e => { if(e.target.closest('a')) close(); });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && !menu.hidden) { close(); toggle.focus(); }
  });
  document.addEventListener('click', e => { if(!e.target.closest('.header')) close(); });
  matchMedia('(min-width: 900px)').addEventListener('change', close);
})();
