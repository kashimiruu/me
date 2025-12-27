import Horse from "./class/Horse.js";

await (async () => {
    const hero = document.body.querySelector('#hero');
    const carousel = hero.querySelector('.carousel');

    // fills the carousel
    let assetsCopy = [];
    let horses = [];
    const COUNTS = Math.max(Math.floor(window.innerWidth/80), 12);
    for (let i = COUNTS, width = window.innerWidth; i > 0; i-- ){
        if (assetsCopy.length == 0) assetsCopy = Object.keys(window.assets.list).filter(key => key !== "ocean_eyes");
        const assetName = assetsCopy[Math.floor(Math.random() * assetsCopy.length)];
        assetsCopy.splice(assetsCopy.indexOf(assetName), 1);
	const horse = new Horse(assetName, (i/(COUNTS))*width);
	horse.appendTo(carousel);
        horse.play();
        horses.push(horse);
    };
    Array.from(carousel.children).forEach((horse) => {
        gsap.fromTo(horse, {
            y: 0,
        }, {
            y: `${80*Math.random()-50}vh`,
            duration: 2,
            repeat: -1,
            delay: 3,
            repeatDelay: 10,
            yoyo: true,
            ease: "ease-in",
        });
    });

    let currentWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        if (currentWidth != window.innerWidth) {
            currentWidth = window.innerWidth;
            for (const horse of horses) horse.renewAnimation();
        }
    });
})();