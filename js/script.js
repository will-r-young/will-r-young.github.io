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
    gsap.registerPlugin(ScrollTrigger)
    const cards = document.querySelectorAll(".card");

    function setupCardListeners() {
        const cardsContainer = document.getElementById("cards");

        if (cardsContainer) {
            cardsContainer.onmousemove = e => {
                for (const card of cards) {
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

        cards.forEach((card, index) => {
            card.setAttribute("tabindex", "0");

            card.addEventListener("click", (event) => {
                const isOpen = card.classList.contains("active");

                cards.forEach(otherCard => {
                    otherCard.classList.remove("active", "open");
                });

                if (!isOpen) {
                    card.classList.add("active", "open");
                    event.stopPropagation();
                }
            });

            card.addEventListener("keydown", (event) => {
                if (event.key === "ArrowRight") {
                    const nextIndex = (index + 1) % cards.length;
                    cards[nextIndex].click();
                    cards[nextIndex].focus();
                } else if (event.key === "ArrowLeft") {
                    const prevIndex = (index - 1 + cards.length) % cards.length;
                    cards[prevIndex].click();
                    cards[prevIndex].focus();
                }
            });
        });

        document.addEventListener("click", (event) => {
            const isClickedInsideCard = event.target.closest('.card');

            if (!isClickedInsideCard) {
                cards.forEach(card => {
                    card.classList.remove("active", "open");
                });
            }
        });
    }

    if (cards.length > 0) {
        setupCardListeners();
    } else {
        let toggle = document.querySelector('.toggle');
        let menu = document.querySelector('.menu');

        toggle.onclick = () => {
            menu.classList.toggle('active');
        };
    }
    
    const canvas = document.getElementById("shirt-scroll");
    const context = canvas.getContext("2d");

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
                // All images are loaded, start animation
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

        render(); // Initial render
    }

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[shirtScroll.frame], 0, 0, canvas.width, canvas.height); 
    }
});
