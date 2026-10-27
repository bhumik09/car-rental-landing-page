
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


document.getElementById("year").textContent = new Date().getFullYear();


const filterButtons = document.querySelectorAll(".filter-button");
const carCards = document.querySelectorAll(".car-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    carCards.forEach((card) => {
      const matches =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.hidden = !matches;
    });
  });
});


const pickupDate = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");

function getLocalDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const today = getLocalDate();

pickupDate.min = today;
returnDate.min = today;

pickupDate.addEventListener("change", () => {
  returnDate.min = pickupDate.value || today;

  if (returnDate.value && returnDate.value < returnDate.min) {
    returnDate.value = "";
  }
});

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (returnDate.value < pickupDate.value) {
    bookingMessage.textContent =
      "Return date cannot be before the pickup date.";
    return;
  }

  const location = document.getElementById("location").value;

  bookingMessage.textContent =
    `Your search is ready for ${location}! ` +
    "This is a demo form; no booking has been made.";
});


document.querySelectorAll(".car-link").forEach((link) => {
  link.addEventListener("click", () => {
    const selectedCar = link.dataset.car;

    bookingMessage.textContent =
      `${selectedCar} selected. Choose your location and dates below.`;
  });
});
