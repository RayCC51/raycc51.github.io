+++
title = 'Moving from a Jekyll blog to a Hugo blog'
summary = "Jekyll al-folio theme -> Hugo kayal theme"
date = "2025-03-19"
# lastmod = 2025-03-11
tags = ["blog", "hugo", "kayal", "jekyll", "al-folio"]
coverImg = "jekyll2hugo.webp"
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = true
showToC = false
showComments = true
+++

Jekyll theme: [al-folio](https://github.com/alshedivat/al-folio)

Hugo theme: [kayal](https://github.com/mnjm/kayal)

### Why I select *al-folio* theme

- A lot of stars on GitHub.
- Many features.
- Good design.

### Why I moved my blog

- As you can see, I don't expect many features from my blog.
- *al-folio* was too heavy.
  - Request: ~80
  - Repo size: ~70mb
  - Demo site size: ~2mb
  - Build time: ~1s
  - Too many javascript.
- Hard to customizing.
  - The plugins are complicated.
  - i18n.

### Why I select Hugo

- Famous.
- Fast.

### Why I select *kayal* theme

- It has search feature.
- Lightweight.
  - Request: ~10
  - Repo size: ~6mb
  - Demo site size: ~150kb
  - Build time: ~50ms

### Cons of the *Kayal* theme

- Design -> I rewrote the CSS following the design of the *al-folio* theme.
- Less feature -> I made it.
- The official documentation for the Kayal theme is lacking. -> I needed to refer to the official Hugo documentation.

### Conclusion

- I like hugo and *kayal*.
- Now my blog is light and fast.
  - Home page size: ~40kb
  - Home page request: 10
