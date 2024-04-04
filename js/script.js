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
	
	
    const cards = document.querySelectorAll(".card");

    function setupCardListeners() {
        const cardsContainer = document.getElementById("cards");

        if (cardsContainer) {
            cardsContainer.onmousemove = e => {
                for (const card of cards) {
                    const rect = card.getBoundingClientRect(),
                        x = e.clientX - rect.left,
                        y = e.clientY - rect.top;

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
});

var currentImageIndex = 1;
var totalImages = 4;
var lastScrollPosition = 0; // Define lastScrollPosition variable

function changeImage(direction) {
  var imageUrl;

  if (direction === 1) {
    currentImageIndex++;
    if (currentImageIndex > totalImages) {
      currentImageIndex = 1;
    }
  } else if (direction === -1) {
    currentImageIndex--;
    if (currentImageIndex < 1) {
      currentImageIndex = totalImages;
    }
  }

  // Set image URL based on currentImageIndex
  switch (currentImageIndex) {
    case 1:
      imageUrl = 'imgs/shirt_scroll/shirt_1.png';
      break;
    case 2:
      imageUrl = 'imgs/shirt_scroll/shirt_2.png';
      break;
    case 3:
      imageUrl = 'imgs/shirt_scroll/shirt_3.png';
      break;
    case 4:
      imageUrl = 'imgs/shirt_scroll/shirt_4.png';
      break;
    default:
      imageUrl = 'imgs/shirt_scroll/shirt_1.png'; // Default to the first image
  }

  // Update the image source
  document.getElementById('shirtImage').src = imageUrl;
}

window.onscroll = function() {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > lastScrollPosition) {
    changeImage(1); // Scroll down
  } else {
    changeImage(-1); // Scroll up
  }

  lastScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition; // Prevent negative values
};

  
