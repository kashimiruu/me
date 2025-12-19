(async () => {
    const about = document.body.querySelector('#about');
    const strong = about.querySelector('b');
    const star = strong.innerHTML;
    const scattered = [];

    strong.parentElement.style.opacity = 0;

    const strongObserver = new IntersectionObserver( (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.animation = gsap.fromTo(entry.target, {
                    opacity: 0,
                    y: 50,
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.5,
                });
                scattered.forEach(frag => {
                    frag.animation.restart();
                });
                observer.unobserve(entry.target);
            }
        });
    }); 
    strongObserver.observe(strong.parentElement);
 
    strong.innerHTML = "";
    star.split('').forEach((char) => {
	const rock = document.createElement('div');
        Object.assign(rock.style, {
            display: "inline",
            position: "relative",
        });
        rock.innerHTML = `<div style="display: inline">${char}</div>`;
        strong.appendChild(rock);

        const frag = document.createElement('div');
        Object.assign(frag.style, {
            position: "absolute",
            top: 0,
            left: 0,
        });
        frag.innerHTML = char;
        rock.appendChild(frag);
        scattered.push(frag);

        
        const floor =  about.offsetHeight - strong.parentElement.offsetTop - frag.parentElement.offsetTop - 20;
        frag.animation = gsap.timeline({delay: 2});
        frag.animation.fromTo(frag, {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1,
            delay: 1,
        });
        frag.animation.fromTo(frag, {
            y: "-100vh",
        }, {
            y: "50vh",
            delay: 0.5,
        }, "<");
        frag.animation.fromTo(frag, {}, {});
        frag.animation.to(frag, {
            keyframes: {
                y: [floor, floor - 50, floor],
            }
        }, "<");
        frag.animation.to(frag, {
            x: Math.random() * 100 - 50 + "vw",
        }, "<");
        frag.animation.to(frag, {
            x: 0,
            y: 0,
            delay: 0.5,
            duration: 2,
        });
        frag.animation.fromTo(frag.parentElement.firstChild, {
            opacity: 0,
        }, {
            opacity: 1,
        });
        frag.animation.pause();
    });

})();