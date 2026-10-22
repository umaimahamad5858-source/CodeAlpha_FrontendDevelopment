// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});
// Close the mobile menu after navigation.
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Scroll reveal and skill bars
const revealEls = document.querySelectorAll(".reveal");

function fillBars(container) {
  container.querySelectorAll(".fill").forEach((bar) => {
    bar.style.width = bar.dataset.level + "%";
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fillBars(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback for browsers without IntersectionObserver.
  revealEls.forEach((el) => { el.classList.add("visible"); fillBars(el); });
}

// Active navigation link
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".menu a");
const toTop = document.getElementById("toTop");

function onScroll() {
  const y = window.scrollY + 120;
  let currentId = "home";
  sections.forEach((s) => { if (y >= s.offsetTop) currentId = s.id; });
  links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + currentId));
  toTop.classList.toggle("show", window.scrollY > 500);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Contact form validation
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  formMsg.className = "form-msg";
  if (!name || !email || !message) {
    formMsg.textContent = "Please fill in all the fields.";
    formMsg.classList.add("error");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formMsg.textContent = "Please enter a valid email address.";
    formMsg.classList.add("error");
    return;
  }

  // Opens the visitor's default email client with a pre-filled message.
  const myEmail = "umaimahamadofficial@gmail.com";
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:" + myEmail + "?subject=" + subject + "&body=" + body;

  formMsg.textContent = "Opening your email client...";
  formMsg.classList.add("ok");
});
