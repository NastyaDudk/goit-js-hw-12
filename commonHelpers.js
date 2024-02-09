import{S as b,i as w}from"./assets/vendor-46aac873.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector(".form"),n=document.querySelector(".gallery-el"),l=document.querySelector(".loader");p();const c=new b(".gallery a",{captionDelay:250});a.addEventListener("submit",e);function e(o){o.preventDefault(),g();const i=a.querySelector(".input").value;t(i).then(r=>{s(r.hits)}).catch(r=>{h(r)}).finally(()=>{p()}),a.reset()}async function t(o){const i="https://pixabay.com/api/",f=`?key=42153847-0f7baac2d7b2e92d7ce6bbe8e&q=${o}`,d="&image_type=photo&orientation=horizontal&safesearch=true&per_page=20",m=i+f+d,u=await(await fetch(m)).json();if(u.total===0)throw new Error("No images found");return u}function s(o){const i=o.map(({largeImageURL:r,webformatURL:f,tags:d,likes:m,views:y,comments:u,downloads:L})=>`
        <div class="gallery">
          <a href="${r}">
            <img src="${f}" alt="${d}" title="${d}" width="360" height="300" />
            <ul class="info-cards-container">
              <li class="info-cards-elements">likes<span>${m}</span></li>
              <li class="info-cards-elements">views<span>${y}</span></li>
              <li class="info-cards-elements">comments<span>${u}</span></li>
              <li class="info-cards-elements">downloads<span>${L}</span></li>
            </ul>
          </a>
        </div>
      `).join("");n.innerHTML=i,c.refresh()}function h(o){n.innerHTML="",w.show({message:`❌ "${o.message}". Please try again!`,color:"red",position:"topRight",maxWidth:"400px"})}function g(){l.style.display="block"}function p(){l.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
