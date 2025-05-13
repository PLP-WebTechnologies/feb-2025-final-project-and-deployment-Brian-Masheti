document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme toggle
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

  // Cart icon functionality
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      alert("Cart functionality is coming soon!");
    });
  }

  // Form submission handling
  const contactForm = document.querySelector("form");
  const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

  // Create an on-screen message element
  const messageDiv = document.createElement("div");
  messageDiv.className = "form-message";
  messageDiv.style.marginTop = "1rem";
  messageDiv.style.padding = "0.5rem";
  messageDiv.style.borderRadius = "5px";
  messageDiv.style.display = "none";
  if (contactForm) {
    contactForm.appendChild(messageDiv);
  }

  if (contactForm && submitButton) {
    console.log("Contact form and submit button found.");

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Form submission triggered.");

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
      messageDiv.style.display = "none"; // Hide previous messages

      const formData = new FormData(contactForm);
      console.log("Form data prepared:", Object.fromEntries(formData));

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        console.log("Formspree Response Status:", response.status);
        const responseText = await response.text();
        console.log("Formspree Response:", responseText);

        if (response.ok) {
          console.log("Form submission successful.");
          messageDiv.textContent = "Message sent successfully!";
          messageDiv.style.color = "#28a745"; // Green for success
          messageDiv.style.backgroundColor = "#e6ffe6";
          messageDiv.style.display = "block";
          contactForm.reset();
        } else {
          console.log("Form submission failed.");
          messageDiv.textContent = `Oops! Something went wrong. Status: ${response.status} - ${responseText}`;
          messageDiv.style.color = "#dc3545"; // Red for error
          messageDiv.style.backgroundColor = "#ffe6e6";
          messageDiv.style.display = "block";
        }
      } catch (error) {
        console.error("Network Error:", error);
        messageDiv.textContent = "Network error. Please check your connection and try again.";
        messageDiv.style.color = "#dc3545";
        messageDiv.style.backgroundColor = "#ffe6e6";
        messageDiv.style.display = "block";
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    });
  } else {
    console.error("Contact form or submit button not found.");
  }

  // Responsive navigation toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("change", () => {
      navLinks.classList.toggle("active");
    });
  }

  // SPA-like navigation logic
  const sections = document.querySelectorAll(".section");
  const navLinksAll = document.querySelectorAll("[data-section]");
  const shoppingCharacter = document.querySelector(".shopping-character");

  function showSection(sectionId) {
    console.log(`Navigating to section: ${sectionId}`);
    sections.forEach((section) => {
      const isTargetSection = section.getAttribute("data-section") === sectionId;
      section.classList.toggle("visible", isTargetSection);
      section.classList.toggle("hidden", !isTargetSection);
      if (section.getAttribute("data-section") === "hero" && shoppingCharacter) {
        shoppingCharacter.classList.toggle("paused", !isTargetSection);
      }
    });

    navLinksAll.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-section") === sectionId);
    });
  }

  navLinksAll.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      console.log(`Clicked link for section: ${sectionId}`);
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
      console.log("Shop Now button clicked");
      e.preventDefault();
      showSection("shop");
    });
  }

  // Initialize with Home section
  showSection("hero");
});