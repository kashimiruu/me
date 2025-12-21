(async () => {
    await import("./gsap.js");
    await import("./assets.js");
    await import("./nav.js");
    await import("./hero.js");
    await import("./about.js");
    await import("./certs.js");
    main();

    //const imports = setInterval( async () => {
        //if (window.gsap && window.gsapPlugins) { // && window.assetsLoaded) {
            // await import("./footer.js");
            //clearInterval(imports);
            // main();
        //}
    //}, 1023);
    
    async function main() {
        // play and pause the videos when in-view and out-view
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    entry.target.play()?.catch((error) => {
                        console.warn(error);
                    }); 
                } else {
                    entry.target.pause();
                }
            });
        });
        document.body.querySelectorAll('video').forEach(video => {
            video.src = window.assets.get[video.dataset.badge];
            video.onload = () => {
                video.muted = true;
                video.autoplay = true;
                video.playsInline = true;
                video.loop = true;
                videoObserver.observe(video);
            }
        });

        // to improve readability in index file
        document.body.querySelectorAll('svg').forEach(svg => {
            svg.xmlns = "http://www.w3.org/2000/svg";
            svg.version = "1.1";
            svg.setAttribute('viewBox', window.svg[svg.dataset.badge].viewBox);
            svg.querySelector('path').setAttribute('d', window.svg[svg.dataset.badge].path);
        });
    }
})();