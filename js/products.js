console.log("It is working!");


// Hero slider from Products Page

let slideIndex = 0;
showSlides();

function showSlides() {
  let i,
    slides = document.getElementsByClassName("mySlides"),
    dots = document.getElementsByClassName("dot");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}

// End of Hero slider from Products Page

// card slider

const wrapper = document.querySelector(".wrapper"),
  carousel = document.querySelector(".carousel"),
  firstCardWidth = carousel.querySelector(".card-shop").offsetWidth,
  arrowBtns = document.querySelectorAll(".wrapper .icon"),
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

//popover

const popoverContent = [
  "Succulent blackberries intertwine with whispers of mystery, creating a delightful symphony of sweet and tart notes",
  "Witness the radiant glow of a pineapple sunset, a taste that brings warmth and serenity to your palate.",
  "Let the juicy sweetness of ripe kiwis whisk you away to sun-kissed beaches, while exotic tropical fruits add a touch of ecstasy to every sip. ",
  "Join a luxurious garden soirée with rose-infused cider, a graceful blend that elevates your sipping experience.",
];

function showPopover(event) {
  const target = event.target;
  if (target.id && target.id.startsWith("btn-plus-")) {
    const cardIndex = parseInt(target.id.substring("btn-plus-".length)) - 1;
    const popover = document.getElementById(`popover-${cardIndex + 1}`);

    // Hide all other popovers
    hideAllPopovers();

    if (popover) {
      popover.textContent = popoverContent[cardIndex];
      popover.style.display = "block";

      // Get the dimensions of popover, btn-plus, and img-flavors elements
      const popoverRect = popover.getBoundingClientRect();
      const btnPlusRect = target.getBoundingClientRect();
      const imgFlavorsRect = target.closest('.img-flavors').getBoundingClientRect();

      // Calculate the top position to place the popover above the btn-plus relative to img-flavors
      const topPosition = btnPlusRect.top - imgFlavorsRect.top - popoverRect.height - 10;

      // Set the position of the popover
      popover.style.top = `${topPosition}px`;
      popover.style.left = `${btnPlusRect.left - imgFlavorsRect.left}px`;
    }
  }
}

function hideAllPopovers() {
  const allPopovers = document.querySelectorAll(".popover");
  allPopovers.forEach((popover) => (popover.style.display = "none"));
}

const btnPlusElements = document.querySelectorAll(".btn-plus");
btnPlusElements.forEach((btnPlus) => {
  btnPlus.addEventListener("mouseenter", showPopover);
  btnPlus.addEventListener("mouseleave", hideAllPopovers);
});