import{S,a as $,i as w}from"./assets/vendor-b52d9f5e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const l=document.querySelector(".form"),r=document.querySelector(".gallery-el"),c=document.querySelector(".loader"),s=document.querySelector(".load-more-btn");let e=1,t="";p(),s.style.display="none";const i=new S(".gallery a",{captionDelay:250});l.addEventListener("submit",y),s.addEventListener("click",loadMoreImages);async function y(o){o.preventDefault(),L();const a=l.querySelector(".input").value;try{const n=await h(a);if(n.hits.length===0)throw new Error("No images found");t=a,e=1,g(n.hits),s.style.display="block"}catch(n){b(n)}finally{p()}l.reset()}function h(o){const a="https://pixabay.com/api/",u=`?key=42153847-0f7baac2d7b2e92d7ce6bbe8e&q=${o}`,d="&image_type=photo&orientation=horizontal&safesearch=true&per_page=15",f=a+u+d;return $.get(f).then(m=>m.data)}function g(o){const a=o.map(({largeImageURL:n,webformatURL:u,tags:d,likes:f,views:m,comments:E,downloads:v})=>`
        <div class="gallery">
          <a href="${n}">
            <img src="${u}" alt="${d}" title="${d}" width="360" height="300" />
            <ul class="info-cards-container">
              <li class="info-cards-elements">likes<span>${f}</span></li>
              <li class="info-cards-elements">views<span>${m}</span></li>
              <li class="info-cards-elements">comments<span>${E}</span></li>
              <li class="info-cards-elements">downloads<span>${v}</span></li>
            </ul>
          </a>
        </div>
      `).join("");r.insertAdjacentHTML("beforeend",a),i.refresh()}function b(o){r.innerHTML="",w.show({message:`❌ "${o.message}". Please try again!`,color:"red",position:"topRight",maxWidth:"400px"})}function L(){c.style.display="block"}function p(){c.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
