document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle (dark/light mode)
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
  document.querySelector(".nav-container").appendChild(themeToggle);

  const root = document.documentElement;
  const isDarkMode = localStorage.getItem("theme") === "dark";

  if (isDarkMode) {
    root.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
  }

  themeToggle.addEventListener("click", () => {
    root.classList.toggle("dark-mode");
    const isDark = root.classList.contains("dark-mode");
    themeToggle.innerHTML = isDark ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Cart icon click
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      alert("Cart functionality is coming soon!");
    });
  }

  // Contact form handling
  const contactForm = document.querySelector("form");
  const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

  if (contactForm && submitButton) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (submitButton) submitButton.disabled = true;
      if (submitButton) submitButton.textContent = "Sending...";

      const formData = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });
        console.log("Formspree Response Status:", response.status);
        console.log("Formspree Response:", await response.text());
        if (response.ok) {
          alert("Thank you! Your message has been sent successfully.");
          contactForm.reset();
        } else {
          alert("Oops! Something went wrong. Please try again. Status: " + response.status);
        }
      } catch (error) {
        console.error("Network Error:", error);
        alert("Network error. Please check your connection and try again.");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
        }
      }
    });
  }

  // Responsive nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("change", () => {
      navLinks.classList.toggle("active");
    });
  }

  // SPA-like navigation
  const sections = document.querySelectorAll(".section");
  const navLinksAll = document.querySelectorAll("[data-section]");
  const shoppingCharacter = document.querySelector(".shopping-character");

  console.log("navLinksAll elements:", navLinksAll); // Debug: List all elements with data-section

  function showSection(sectionId) {
    sections.forEach((section) => {
      if (section.getAttribute("data-section") === sectionId) {
        section.classList.remove("hidden");
        section.classList.add("visible");
        if (section.getAttribute("data-section") === "hero" && shoppingCharacter) {
          shoppingCharacter.classList.remove("paused");
        }
      } else {
        section.classList.remove("visible");
        section.classList.add("hidden");
        if (section.getAttribute("data-section") === "hero" && shoppingCharacter) {
          shoppingCharacter.classList.add("paused");
        }
      }
    });

    navLinksAll.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-section") === sectionId);
    });
  }

  navLinksAll.forEach((link) => {
    link.addEventListener("click", (e) => {
      console.log("Clicked element:", link); // Debug: Log the clicked element
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      showSection(sectionId);
      if (navToggle && navToggle.checked) {
        navToggle.checked = false;
        navLinks.classList.remove("active");
      }
    });
  });

  // Specific handler for "Shop Now" button
  const shopNowButton = document.querySelector('.hero .btn[data-section="shop"]');
  if (shopNowButton) {
    shopNowButton.addEventListener("click", (e) => {
      console.log("Shop Now clicked");
      e.preventDefault();
      showSection("shop");
    });
  }

  // Initialize with Home section
  showSection("hero");
});