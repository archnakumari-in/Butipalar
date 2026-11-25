/* ============================================
   EDIT YOUR PHONE NUMBER HERE (only place needed)
   Format: country code + number, no + or spaces
   ============================================ */
const PHONE_INTL = "919999999999";   // WhatsApp number, e.g. 919876543210
const PHONE_SHOW = "+91 99999 99999"; // How the number appears on the site

// Call and WhatsApp links
document.querySelectorAll("[data-call]").forEach(function (a) {
  a.href = "tel:+" + PHONE_INTL;
  if (!a.textContent.trim()) a.textContent = PHONE_SHOW;
});
document.querySelectorAll("[data-wa]").forEach(function (a) {
  a.href = "https://wa.me/" + PHONE_INTL + "?text=" +
    encodeURIComponent("Hello Priyanka Beauty Parlour, I want to know more about your services.");
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
var toggle = document.querySelector(".nav-toggle");
var nav = document.getElementById("nav");
toggle.addEventListener("click", function () {
  var open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
nav.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Price tabs (with arrow-key support)
var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
function selectTab(tab) {
  tabs.forEach(function (t) {
    var on = t === tab;
    t.setAttribute("aria-selected", on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  });
}
tabs.forEach(function (tab, i) {
  tab.addEventListener("click", function () { selectTab(tab); });
  tab.addEventListener("keydown", function (e) {
    var next = null;
    if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
    if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
    if (next) { e.preventDefault(); selectTab(next); next.focus(); }
  });
});

// Bridal "Enquire" buttons pre-select the service
document.querySelectorAll("[data-pack]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var map = {
      "Engagement look": "Engagement look",
      "Bridal HD makeup": "Bridal makeup",
      "Pre-bridal care": "Pre-bridal care"
    };
    document.querySelector('select[name="service"]').value = map[btn.dataset.pack] || "";
  });
});

// Booking form -> WhatsApp
var form = document.getElementById("bookForm");
var err = document.getElementById("formError");
var dateInput = form.elements.date;
dateInput.min = new Date().toISOString().split("T")[0];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var f = form.elements;
  var phone = f.phone.value.replace(/\D/g, "");
  var problem = "";
  if (!f.name.value.trim()) problem = "Please enter your name.";
  else if (phone.length < 10) problem = "Please enter a 10-digit mobile number.";
  else if (!f.service.value) problem = "Please choose a service.";
  else if (!f.date.value) problem = "Please choose a date.";
  else if (!f.time.value) problem = "Please choose a time.";

  if (problem) {
    err.textContent = problem;
    err.hidden = false;
    return;
  }
  err.hidden = true;

  var msg =
    "Hello Priyanka Beauty Parlour, I want to book an appointment.\n" +
    "Name: " + f.name.value.trim() + "\n" +
    "Mobile: " + phone + "\n" +
    "Service: " + f.service.value + "\n" +
    "Date: " + f.date.value + "\n" +
    "Time: " + f.time.value;

  window.open("https://wa.me/" + PHONE_INTL + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
});
