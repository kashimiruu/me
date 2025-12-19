await (async () => {
    await import("./hero-gyro.js");
    await import("./hero-carousel.js");

    // locks the height based on 100dvh with searchbar (for mobile)
    const hero = document.body.querySelector('#hero');
    let currentWidth = 0, elHeight = 0;
    async function lockHeight() {
        if (currentWidth != window.innerWidth) {
            Object.assign(hero.style, {
                minHeight: "100svh",
                height: "auto",
            });
            elHeight = hero.offsetHeight;
            currentWidth = window.innerWidth;
            Object.assign(hero.style, {
                maxHeight: elHeight + "px",
            });
        }
    }
    window.addEventListener('resize', lockHeight);
    await lockHeight();
})();