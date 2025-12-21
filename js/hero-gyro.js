await (async () => {
    function addDepth(div, depth) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('3d-wrapper');
        wrapper.style.position = "relative";
        div.parentElement.appendChild(wrapper);
        wrapper.appendChild(div);
        for (let i = 1; i <= depth; i++) {
            const clone = div.cloneNode(true);
            clone.style.position = "absolute";
            clone.style.top = 0;
            clone.style.left = 0;
            clone.style.transform = `translateZ(${-i}px)`;
            clone.style.filter = "brightness(40%)";
            wrapper.appendChild(clone);
        }
        return wrapper;
    }

    const wrapper = addDepth(document.querySelector('#hero .header'), 36);
    wrapper.style.transformStyle = "preserve-3d";

    const hero = document.querySelector('#hero');
    const maxTiltMouse = 45;
    const maxTiltGyro = 30;
    let lastTap = 0;
    const DOUBLE_TAP_DURATION = 300;

    let startingGyro = {};

    function clamp(num) {
        return Math.max(-1, Math.min(1, num));
    }

    function handleMouseMove(e) {
        const midX = window.innerWidth / 2;
        const midY = window.innerHeight / 2;
        const x = clamp((e.clientX - midX) / midX) * maxTiltMouse;
        const y = clamp((e.clientY - midY) / midY) * maxTiltMouse;
        wrapper.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
    }

    function handleGyro(e) {
        const x = clamp((e.gamma - startingGyro.g) / 45) * maxTiltGyro;
        const y = clamp((e.beta - startingGyro.b) / 45) * maxTiltGyro;
        wrapper.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
    }

    function resetGyro() {
        window.addEventListener('deviceorientation', (e) => {
            startingGyro = {
                g: e.gamma, 
                b: e.beta
            };
        }, {once: true});
    }

    const heroObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                resetGyro();
                hero.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('deviceorientation', handleGyro);
                hero.addEventListener('touchend', (e) => {
                    const now = Date.now();
                    if (now - lastTap <= DOUBLE_TAP_DURATION) {
                        resetGyro();
                        lastTap = now;
                    }
                });
            } else {
                window.removeEventListener('deviceorientation', handleGyro);
            }
        });
    });
    heroObserver.observe(hero);
})();