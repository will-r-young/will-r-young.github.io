window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    document.getElementById("cards").onmousemove = e => {
        for (const card of document.getElementsByClassName("card")) {
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    };

    cards.forEach((card, index) => {
        card.setAttribute("tabindex", "0"); // Make cards focusable

        card.addEventListener("click", () => {
            const isOpen = card.classList.contains("active");

            cards.forEach(otherCard => {
                otherCard.classList.remove("active", "open");
            });

            if (!isOpen) {
                card.classList.add("active", "open");
            } else {
                card.classList.remove("active");
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
});
