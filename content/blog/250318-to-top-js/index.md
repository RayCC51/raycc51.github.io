+++
title = 'To top floating button in JS'
description = "Using pure js to create floating button"
summary = "Using pure js to create floating button"
date = 2025-03-18
# lastmod = 2025-03-11
tags = ["js", "javascript", "snippet"]
# coverImg = 
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = true
showToC = false
showComments = true
+++

### HTML

```html {linenos=true}
<button id="scrollToTopBtn" title="Go to top">
    ↑
</button>
```

### JavaScript

```js {linenos=true}
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

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
  };
  scrollToTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
});
```

### CSS

```css {linenos=true}
#scrollToTopBtn {
  position: fixed;
  bottom: 1em;
  right: 1em;
  display: none;
  width: 3em;
  height: 3em;
  padding: 1em;
  background-color: black;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 5;
}
```