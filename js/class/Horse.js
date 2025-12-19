export default class Horse {
    constructor(assetName, xCoordinate) {
        this.x = xCoordinate;
        this.duration = 15;
        this.asset = (window.assets.isImg(assetName)) ? document.createElement("img") : document.createElement("video");
        Object.assign(this.asset.style, {
            height: "300px",
            width: "auto",
            position: "absolute",
            top: "calc(50% - 150px)",
            left: this.x + "px",
            opacity: "100%",
        });
        
        if (this.asset instanceof HTMLVideoElement) {
            this.asset.dataset.badge = assetName;
            this.asset.autoplay = true;
            this.asset.loop = true;
            this.asset.muted = true;
            this.asset.play();
        } else {
            this.asset.src = window.assets.list[assetName];
        }

        this.animation = null;
        this.renewAnimation();
        this.animation.pause();
    }

    renewAnimation() {
        //gsap animation
        this.animation?.kill();
        this.animation = gsap.timeline();
        this.animation.fromTo(this.asset, { 
            left: window.innerWidth,
            transform: "rotateY(0deg)",
        },{
            left: 0,
            ease: "none",
            duration: this.duration,
            transform: "rotateY(180deg)",
            transformOrigin: "center left",
            repeat: -1,
            keyframes: {
                scale: [1, 0.3, 1],
                opacity: [1, 0.3, 1],
                zIndex: [-1, -20, -1],
            },
        });
        this.animation.seek(this.duration * this.x/window.innerWidth);
    }

    appendTo(parent) {
        parent.appendChild(this.asset)
    }

    pause() {
       this.animation.pause();
    }

    play() {
       this.animation.play();
    }
}
