await (async () => {
    // Cursor popper displaying the badges and logos
    const certifications = document.querySelector('#certifications');
    const certificates = certifications.querySelectorAll('.item');
    const table = certifications.querySelector('.table');
    table.style.position = "relative";

    // popper badges
    certificates.forEach(item => {
        item.popper = document.createElement('img');
        item.popper.src = item.dataset.badge;
        item.popper.style.width = "100px";
        item.popper.style.background = "white";
        item.popper.style.border = "10px solid white";
        item.popper.style.borderRadius = "5px";
        item.popper.defaultTop = item.offsetTop;
        item.popper.reset = {
            left: item.offsetLeft,
            opacity: 0,
            position: "absolute",
            top: item.offsetTop,
            transform: "translateX(-100%)",
        }
    });

    // traverse animation
    let delay = 0
    certificates.forEach( (item, index) => {
        if (index === certificates.length - 1) return;
        let duration = 3;
        item.animation?.kill();
        item.animation = gsap.timeline({
            repeat: -1,
            delay: delay,
        });
        item.animation.call(() => {
            item.style.position = "relative";
            table.appendChild(item.popper);
        });
        item.animation.fromTo(item.popper, item.popper.reset, {
            opacity: 1, 
            duration: 0.5,
        });
        item.animation.fromTo(item, {
            background: "transparent",
        }, {
            background: "#333",
            duration: 0.5,
        }, "<");
        item.animation.to(item.popper, {duration: duration - 1});
        item.animation.to(item.popper, {opacity: 0, duration: 0.5});
        item.animation.to(item, {background: "transparent", duration: 0.5,  }, "<");
        item.animation.to(item.popper, {duration: duration * (certificates.length - 1)});
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
 
})();