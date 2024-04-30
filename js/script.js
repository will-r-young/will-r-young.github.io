window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    if (loader && loader.parentNode) {
        loader.classList.add("loader-hidden");

        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 1000);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    /* gsap.registerPlugin(ScrollTrigger); */
    const allCards = document.querySelectorAll(".card");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    function setupCardListeners() {
        const cardsContainer = document.getElementById("cards");

        if (cardsContainer) {
            cardsContainer.onmousemove = e => {
                for (const card of allCards) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    card.style.setProperty("--mouse-x", `${x}px`);
                    card.style.setProperty("--mouse-y", `${y}px`);
                }
            };
        }

        let toggle = document.querySelector('.toggle');
        let menu = document.querySelector('.menu');

        toggle.onclick = () => {
            menu.classList.toggle('active');
        };

        allCards.forEach((card, index) => {
            card.setAttribute("tabindex", "0");

            card.addEventListener("click", (event) => {
                const isOpen = card.classList.contains("active");

                allCards.forEach(otherCard => {
                    otherCard.classList.remove("active", "open");
                });

                if (!isOpen) {
                    card.classList.add("active", "open");
                    event.stopPropagation();
                }
            });

            card.addEventListener("keydown", (event) => {
                if (event.key === "ArrowRight" || event.key === "Tab" || event.key === "ArrowDown") {
                    const nextIndex = (index + 1) % allCards.length;
                    allCards[nextIndex].click();
                    allCards[nextIndex].focus();
                } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                    const prevIndex = (index - 1 + allCards.length) % allCards.length;
                    allCards[prevIndex].click();
                    allCards[prevIndex].focus();
                }
            });
        });

        prevButton.addEventListener("click", function () {
            const leftArrow = document.querySelector(".card-nav-arrow-l button");
            leftArrow.click();
        });

        nextButton.addEventListener("click", function () {
            const rightArrow = document.querySelector(".card-nav-arrow-r button");
            rightArrow.click();
        });

        document.addEventListener("click", (event) => {
            const isClickedInsideCard = event.target.closest('.card');

            allCards.forEach(card => {
                if (card !== isClickedInsideCard) {
                    card.classList.remove("active", "open");
                }
            });
        });
    }

    if (allCards.length > 0) {
        setupCardListeners();
    } else {
        let toggle = document.querySelector('.toggle');
        let menu = document.querySelector('.menu');

        toggle.onclick = () => {
            menu.classList.toggle('active');
        };
    }

    /* const canvas = document.getElementById("shirt-scroll");

    if (!canvas) {
        console.error("Canvas element with ID 'shirt-scroll' not found.");
        return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
        console.error("Failed to get 2D context for canvas.");
        return;
    }

    canvas.width = 1080;
    canvas.height = 1080;

    const frameCount = 14;
    const images = [];
    const shirtScroll = {
        frame: 0
    };

    function currentFrame(index) {
        return `imgs/shirt_scroll/shirt_${(index + 1).toString()}.png`;
    }

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.onload = () => {
            images.push(img);
            if (images.length === frameCount) {
                setupAnimation();
            }
        };
        img.src = currentFrame(i);
    }

    function setupAnimation() {
        gsap.to(shirtScroll, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                scrub: 0.5
            },
            onUpdate: render
        });

        render();
    }

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[shirtScroll.frame], 0, 0, canvas.width, canvas.height);
    } */

    const videos = document.querySelectorAll(".card-video");

    videos.forEach(video => {
        video.addEventListener("ended", () => {
            video.currentTime = 0;
            video.play();
        });
    });

});
