(() => {
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
