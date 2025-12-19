await ( async () => {
    const nav = document.body.querySelector('nav');
    const menuBtn = nav.querySelector('.menu-icon');
    const menuItms = nav.querySelector('.menu-items');

    menuBtn.animation = gsap.fromTo(menuItms, {
        opacity: 0,
    }, {
        opacity: 1,
        duration: 0.5,
    });
    menuBtn.animation.pause();

    document.addEventListener('pointerdown', (e) => {
        // open
        if (!menuBtn.openState && menuBtn.contains(e.target)) {
            menuBtn.animation.restart();
            menuBtn.openState = true;
        }
        // close
        else if (menuBtn.openState && !menuItms.contains(e.target)) {
            menuBtn.animation.reverse();
            menuBtn.openState = false;
        }
    });
    nav.resize = () => { (window.innerWidth <= 576) ? menuBtn.animation.reverse() : menuBtn.animation.restart(); }
    window.addEventListener('resize', nav.resize);
    nav.resize();

    for (const item of menuItms.children) {
        item.onclick = () => { 
            window.location.href = item.dataset.href 
        };
    }
})();                       