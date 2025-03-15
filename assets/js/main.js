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
var copyText =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M288 448L64 448l0-224 64 0 0-64-64 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-64-64 0 0 64zm-64-96l224 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L224 0c-35.3 0-64 28.7-64 64l0 224c0 35.3 28.7 64 64 64z"/></svg>';
var copiedText =
  'Copied! <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>';

function createCopyButton(codeblock) {
  const container = codeblock.parentNode.parentNode;

  const copyButton = document.createElement("button");
  copyButton.classList.add("copy-button");
  copyButton.innerHTML = copyText;

  function copyingDone() {
    copyButton.innerHTML = copiedText;
    setTimeout(() => {
      copyButton.innerHTML = copyText;
    }, 500);
  }

  copyButton.addEventListener("click", (cb) => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(codeblock.textContent);
      copyingDone();
      return;
    }

    const range = document.createRange();
    range.selectNodeContents(codeblock);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
      copyingDone();
    } catch (e) {}
    selection.removeRange(range);
  });

  if (container.classList.contains("highlight")) {
    container.appendChild(copyButton);
  } else if (container.parentNode.firstChild == container) {
    // td containing LineNos
  } else if (
    codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName ==
    "TABLE"
  ) {
    // table containing LineNos and code
    codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(
      copyButton
    );
  } else {
    // code blocks not having highlight as parent class
    codeblock.parentNode.appendChild(copyButton);
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  document
    .querySelectorAll("pre > code")
    .forEach((codeblock) => createCopyButton(codeblock));
});

//
// Theme
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

// Theme
// key: "t" : theme
// value: "l" or "d" : light or dark
window.addEventListener("DOMContentLoaded", (event) => {
  const switcher = document.getElementById("theme-switcher");
  if (switcher) {
    switcher.addEventListener("click", () => {
      toggleTheme();
    });
  }

  // listener to check for user's os preference changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (event.matches && sessionStorage.getItem("t") === "l") {
        toggleTheme();
      }
    });
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
