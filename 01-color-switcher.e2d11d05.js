const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");let o=null;function r(){n.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.addEventListener("click",(function(){t.setAttribute("disabled","disabled"),r(),o=setInterval(r,1e3)})),e.addEventListener("click",(function(){clearInterval(o),t.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.e2d11d05.js.map
