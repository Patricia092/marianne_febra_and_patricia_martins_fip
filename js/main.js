console.log("It is working!");


function checkAge() {
    const birthYearInput = document.getElementById("birthYear");
    const birthYear = birthYearInput.value;
    const currentYear = new Date().getFullYear();

    if (currentYear - birthYear >= 21) {
        document.getElementById("ageModal").style.display = "none";
    } else {
        window.location.href = "https://www.wise-drinking.com/";
    }
}
// Function to check if the modal has been shown before
function hasModalBeenShown() {
    return localStorage.getItem("modalShown") === "true";
}

// Function to set the flag in local storage indicating the modal has been shown
function setModalShown() {
    localStorage.setItem("modalShown", "true");
}

window.onload = function () {
    const ageModal = document.getElementById("ageModal");

    // Check if the modal has been shown before, if not, show it
    if (!hasModalBeenShown()) {
        ageModal.style.display = "block";

        // Setup the close button to hide the modal and set the flag when closed
        const closeButton = ageModal.querySelector("button");
        closeButton.addEventListener("click", function () {
            ageModal.style.display = "none";
            setModalShown();
        });
    }
};



// card slider

const wrapper = document.querySelector(".wrapper"),
    carousel = document.querySelector(".carousel"),
    firstCardWidth = carousel.querySelector(".card-shop-main").offsetWidth,
    arrowBtns = document.querySelectorAll(".wrapper .icon-main"),
    carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
