import{S as L,i as E}from"./assets/vendor-46aac873.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&u(i)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector(".form"),n=document.querySelector(".gallery-el"),c=document.querySelector(".loader");document.querySelector(".load-more-btn"),p();const u=new L(".gallery a",{captionDelay:250});a.addEventListener("submit",e);function e(o){o.preventDefault(),y();const l=a.querySelector(".input").value;t(l).then(r=>{i(r.hits)}).catch(r=>{h(r)}).finally(()=>{p()}),a.reset()}function t(o){const l="https://pixabay.com/api/",f=`?key=42153847-0f7baac2d7b2e92d7ce6bbe8e&q=${o}`,d="&image_type=photo&orientation=horizontal&safesearch=true&per_page=20",m=l+f+d;return fetch(m).then(s=>s.json()).then(s=>{if(s.total===0)throw new Error("No images found");return s})}function i(o){const l=o.map(({largeImageURL:r,webformatURL:f,tags:d,likes:m,views:s,comments:g,downloads:b})=>`
        <div class="gallery">
          <a href="${r}">
            <img src="${f}" alt="${d}" title="${d}" width="360" height="300" />
            <ul class="info-cards-container">
              <li class="info-cards-elements">likes<span>${m}</span></li>
              <li class="info-cards-elements">views<span>${s}</span></li>
              <li class="info-cards-elements">comments<span>${g}</span></li>
              <li class="info-cards-elements">downloads<span>${b}</span></li>
            </ul>
          </a>
        </div>
      `).join("");n.innerHTML=l,u.refresh()}function h(o){n.innerHTML="",E.show({message:`❌ "${o.message}". Please try again!`,color:"red",position:"topRight",maxWidth:"400px"})}function y(){c.style.display="block"}function p(){c.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
