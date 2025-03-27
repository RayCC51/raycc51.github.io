+++
title = 'Scroll indicator in JS'
summary = "Using pure js to create scroll indicator"
date = 2025-03-18
# lastmod = 2025-03-11
tags = ["js", "javascript", "snippet"]
coverImg = "scroll-indicator.gif"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = true
showToC = false
showComments = true
+++

Source: <https://www.w3schools.com/howto/howto_js_scroll_indicator.asp>

### HTML

```html {linenos=true}
<div class="progress-container">
  <div class="progress-bar" id="myBar"></div>
</div>
```


### JavaScript

```js {linenos=true}
const myBar = document.getElementById("myBar");

document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    myBar.style.width = scrolled + "%";
  };
});
```


### CSS

```css {linenos=true}
.progress-container {
  width: 100%;
  height: 1px;
  background: white;
  position: sticky;
  /* position: fixed; */
}

.progress-bar {
  height: 1px;
  background: black;
  width: 0%;
}
```