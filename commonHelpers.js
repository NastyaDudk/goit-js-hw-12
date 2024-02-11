import{S as E,a as w,i as S}from"./assets/vendor-951421c8.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&d(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const l=document.querySelector(".form"),n=document.querySelector(".gallery-el"),c=document.querySelector(".loader"),d=document.querySelector(".load-more-button");hideLoader();const e=new E(".gallery a",{captionDelay:250});HTMLFormElement.addEventListener("submit",t=>{t.preventDefault(),l.addEventListener("submit",s),d.addEventListener("click",onLoadMore);async function s(o){o.preventDefault(),y();const a=l.querySelector(".input").value;try{const r=await f(a);m(r.hits)}catch(r){p(r)}finally{h()}l.reset()}async function f(o,a=1){const u={key:"42153847-0f7baac2d7b2e92d7ce6bbe8e",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:a},i=await w.get("https://pixabay.com/api/",{params:u});if(i.data.total===0)throw new Error("No images found");return i.data}function m(o){const a=o.map(({largeImageURL:r,webformatURL:u,tags:i,likes:g,views:L,comments:b,downloads:v})=>`
        <div class="gallery">
          <a href="${r}">
            <img src="${u}" alt="${i}" title="${i}" width="360" height="300" />
            <ul class="info-cards-container">
              <li class="info-cards-elements">likes<span>${g}</span></li>
              <li class="info-cards-elements">views<span>${L}</span></li>
              <li class="info-cards-elements">comments<span>${b}</span></li>
              <li class="info-cards-elements">downloads<span>${v}</span></li>
            </ul>
          </a>
        </div>
      `).join("");n.innerHTML+=a,e.refresh()}function p(o){n.innerHTML="",S.show({message:`❌ "${o.message}". Please try again!`,color:"red",position:"topRight",maxWidth:"400px"})}function y(){c.style.display="block"}function h(){c.style.display="none"}})});
//# sourceMappingURL=commonHelpers.js.map
