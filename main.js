// Responsive navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Smooth scroll for anchor links
document.querySelectorAll('a.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    navMenu.classList.remove('active');
    const targetID = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Cookie consent banner
const cookieConsent = document.getElementById('cookie-consent');
const acceptCookiesBtn = document.getElementById('accept-cookies');
const managePreferencesBtn = document.getElementById('manage-preferences');

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

function checkCookieConsent() {
  const consent = getCookie('cras_cookie_consent');
  if (consent === "accepted") {
    cookieConsent.style.display = 'none';
  } else {
    cookieConsent.style.display = 'flex';
  }
}

acceptCookiesBtn.addEventListener('click', () => {
  setCookie('cras_cookie_consent', 'accepted', 365);
  cookieConsent.style.display = 'none';
});

managePreferencesBtn.addEventListener('click', () => {
  alert('Cookie preferences management is not implemented in this demo.');
});

// Initialize
checkCookieConsent();
