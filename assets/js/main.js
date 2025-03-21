//
// To top floating button
//
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const myBar = document.getElementById("myBar");

document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
    scrollIndicator();
  };
  scrollToTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
});

//
// Scroll Indicator
//
function scrollIndicator() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  myBar.style.width = scrolled + "%";
}

//
// Copy Code
//
const copyIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M288 448L64 448l0-224 64 0 0-64-64 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-64-64 0 0 64zm-64-96l224 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L224 0c-35.3 0-64 28.7-64 64l0 224c0 35.3 28.7 64 64 64z"/></svg>';
const copiedIcon =
  'Copied! <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>';

document.querySelectorAll(".copy-button").forEach((item) =>
  item.addEventListener("click", () => {
    if ("clipboard" in navigator) {
      let code;
      const codeBlock = item.previousElementSibling;
      if (codeBlock.children[0].tagName === "PRE") {
        code = codeBlock.textContent;
      } else {
        code = codeBlock.querySelector("td:last-child").textContent;
      }

      navigator.clipboard.writeText(code);

      item.innerHTML = copiedIcon;
      setTimeout(() => {
        item.innerHTML = copyIcon;
      }, 500);
    }
  })
);

//
// Theme
// key: "t" : theme
// value: "l" or "d" : light or dark
//
function toggleTheme() {
  if (document.documentElement.className.includes("dark")) {
    document.documentElement.classList.remove("dark");
    sessionStorage.setItem("t", "l");
    changeGiscusTheme("l");
  } else {
    document.documentElement.classList.add("dark");
    sessionStorage.setItem("t", "d");
    changeGiscusTheme("d");
  }
}

const switcher = document.getElementById("theme-switcher");

if (switcher) {
    switcher.addEventListener("click", toggleTheme);
}

  // listener to check for user's os preference changes
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

mediaQuery.addEventListener("change", (event) => {
      if (event.matches && sessionStorage.getItem("t") === "l") {
        toggleTheme();
   }
});

// Giscus Theme
function changeGiscusTheme(theme) {
  theme = theme === "l" ? "light_protanopia" : "dark_protanopia";

  function sendMessage(message) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  }

  sendMessage({
    setConfig: {
      theme: theme,
    },
  });
}
