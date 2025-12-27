await (async () => {
    // Cursor popper displaying the badges and logos
    const certifications = document.querySelector('#certifications');
    const certificates = certifications.querySelectorAll('.item');
    const table = certifications.querySelector('.table');
    table.style.position = "relative";

    // popper badges
    certificates.forEach((item, index) => {
        if (index === certificates.length - 1) return;
        item.style.position = "relative";
        item.popper = document.createElement('img');
        item.popper.src = item.dataset.badge;
        Object.assign(item.popper.style, {
            width: "100px",
            background: "white",
            border: "10px solid white",
            borderRadius: "5px",
            cursor: "pointer",
            position: "absolute",
            top: item.offsetTop + "px",
            left: item.offsetLeft + "px",
            transform: "translateX(-100%)",
        });
        table.appendChild(item.popper);
        item.popper.onclick = () => {window.open(item.href, '_self')};
    });

    // traverse animation
    let delay = 0;
    let duration = 3; 
    certificates.forEach( (item, index) => {
        if (index === certificates.length - 1) return;
        item.animation = gsap.timeline({
            repeat: -1,
            delay: delay,
            repeatDelay: duration * (certificates.length - 1),
        });
        item.animation.call(() => {
            table.appendChild(item.popper);
        });
        item.animation.fromTo(item.popper, {
            opacity: 0,
        }, {
            opacity: 1, 
            duration: 0.5,
        });
        item.animation.fromTo(item, {
            background: "transparent",
        }, {
            background: "#333",
            duration: 0.5,
        }, "<");
        item.animation.to(item.popper, {
            opacity: 0, 
            duration: 0.5,
            delay: duration - 1
        });
        item.animation.to(item, { 
            background: "transparent", 
            duration: 0.5,
        }, "<");
        item.animation.call(() => {
            item.popper.remove();
        });
        item.animation.pause();
        delay += duration;
    });
    
    const certificationObserver = new IntersectionObserver ( entries => {
        entries.forEach( entry => {
            if (entry.isIntersecting) { 
                certificates.forEach( item => {
                    item.animation?.play();
                });
            } else {
                certificates.forEach( item => {
                    item.animation?.pause();
                });
            }
        });
    });
    certificationObserver.observe(certifications);

    window.addEventListener('resize', () => {
        certificates.forEach(item => {if(item.popper) item.popper.style.left = item.offsetLeft + "px"});
    });
})();