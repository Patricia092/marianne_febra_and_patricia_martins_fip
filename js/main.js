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