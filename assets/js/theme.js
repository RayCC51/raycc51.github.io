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
