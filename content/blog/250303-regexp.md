+++
title = 'RegExp cheat sheet'
description = "Regular expression summary"
summary = "Regular expression summary"
date = 2025-03-03
# lastmod = 2025-03-11
tags = ["regexp", "study", "cheatsheet"]
# coverImg = 
# externalUrl = "https://www.example.com" # Redirect
draft = false
showDate = true
showReadingTime = true
showToC = true
showComments = true
+++


|||
|:--|:--|:--|
| ? | X? | 0 or 1 |
| * | X* | 0 or many |
| + | X+ | more then 0 |
| {N} | X{N} | N times |
| {N,} | X{N, } | more then N |
| {N, M} | X{N, M} | more then N, less then M |
||||
| ^ | ^X | start with X |
| $ | X$ | end with X |
||||
| [0-9] || number |
| [a-z] || lower case alphabet |
| [A-Z] || upper case alphabet |
| [a-zA-z0-9.-] || alphabet, number, dot, hyphen |
| [X^Y] || X without Y |
||||
| . || any letter without \n |
| \d || [0-9] |
| \D || [^0-9] |
| \w || [a-zA-Z0-9_] |
| \W || [^a-zA-Z0-9_] |
| \s || [\f\n\r\t\v] |
| \S || [^\f\n\r\t\v] |
| \f || formfeed, \n LF, \r CR, \t tab, \v vertical tab |
||||
| \/ || / |
| \. || . |

<br/>

PATTERN

|||
|:--|:--|
| \1 | 1st matched sub-expression |
| \2 | 2nd matched sub-expression |
| (?=PATTERN) | lookahead |
| (?!PATTERN) | negative lookahead |
| ?(BR)EX | if BR is true, then EX |
| ?(BR)EX1\|EX2 | if BR is true, then EX1, else EX2 |

<br/>

EX

|||
|:--|:--|
| email |/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ |