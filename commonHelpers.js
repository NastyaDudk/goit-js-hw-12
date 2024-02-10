import{S as E,A as w}from"./assets/vendor-262e40a5.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",async()=>{const l=document.getElementById("gallery"),a=document.getElementById("load-more");document.querySelector(".loader");const c=15;let o=1;const e="https://pixabay.com/api/",t="42153847-0f7baac2d7b2e92d7ce6bbe8e",i=new E(".gallery a");a.addEventListener("click",f);async function f(){try{const r="",n=(await w.get(e,{params:{key:t,q:r,per_page:c,page:o}})).data;if(n.hits.length>0){const d=n.hits,m=o>1;u(d,m),o++}else throw new Error("No images found")}catch(r){console.log(r),g("Error: Failed to fetch images")}}function u(r,s=!1){const n=r.map(({largeImageURL:d,webformatURL:m,tags:p,likes:y,views:h,comments:L,downloads:b})=>`
          <div class="gallery">
            <a href="${d}">
              <img src="${m}" alt="${p}" title="${p}" width="360" height="300" />
              <ul class="info-cards-container">
                <li class="info-cards-elements">likes<span>${y}</span></li>
                <li class="info-cards-elements">views<span>${h}</span></li>
                <li class="info-cards-elements">comments<span>${L}</span></li>
                <li class="info-cards-elements">downloads<span>${b}</span></li>
              </ul>
            </a>
          </div>
        `).join("");s?l.insertAdjacentHTML("beforeend",n):l.innerHTML=n,i.refresh()}function g(r){const s=document.getElementById("error-container"),n=document.createElement("p");n.classList.add("error-message"),n.textContent=r,s.innerHTML="",s.appendChild(n),s.style.display="block"}f()});
//# sourceMappingURL=commonHelpers.js.map
