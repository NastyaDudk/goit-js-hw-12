import{S as y,a as g,i as h}from"./assets/vendor-2618a76b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const L=document.querySelector("#form"),l=document.querySelector(".gallery-el"),c=document.querySelector("#loader"),b=document.querySelector(".load-more-btn");let v=15,a=1;const u=new y(".gallery-image",{captionsData:"alt",captionDelay:250});function S(o){const t=o.map(({webformatURL:i,largeImageURL:n,tags:e,likes:r,views:s,comments:m,downloads:p})=>`
          <div class="gallery-item">
            <a href="${n}">
              <img src="${i}" alt="${e}" class="gallery-image" />
            </a>
            <ul class="image-info">
              <li><p>Likes</p>${r}</li>
              <li><p>Views</p>${s}</li>
              <li><p>Comments</p>${m}</li>
              <li><p>Downloads</p>${p}</li>
            </ul>
          </div>
        `).join("");l.insertAdjacentHTML("beforeend",t),u.refresh()}async function d(o){const t="42045393-d503a5a54b8da83761f9aabf4";try{const n=(await g.get("https://pixabay.com/api/",{params:{key:t,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:v}})).data.hits;n.length>0?(S(n),a+=1):h.error({position:"topRight",message:"Sorry, no images found for your search query. Please try again!"})}catch(i){console.log("Error:",i)}finally{c.classList.remove("loader_show")}}L.addEventListener("submit",o=>{o.preventDefault();const t=document.querySelector("#searchQuery").value.trim();t&&(w(),f(),d(t))});b.addEventListener("click",()=>{const o=document.querySelector("#searchQuery").value.trim();o&&(f(),d(o))});function f(){c.classList.toggle("loader_show")}function w(){l.innerHTML="",a=1}window.addEventListener("DOMContentLoaded",()=>{u.refresh()});
//# sourceMappingURL=commonHelpers.js.map
