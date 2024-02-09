import{S as w,a as E}from"./assets/vendor-8da312b8.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector(".form"),a=document.querySelector(".gallery-el");document.querySelector(".loader");const d=document.getElementById("load-more-btn");let o=1,e="";hideLoader();const t=new w(".gallery a",{captionDelay:250});i.addEventListener("submit",s),d.addEventListener("click",g);async function s(r){r.preventDefault(),showLoader(),e=i.querySelector(".input").value,o=1;try{const n=await y(e,o);L(n.hits)}catch(n){renderError(n)}finally{hideLoader()}i.reset()}async function g(){showLoader();try{o++;const r=await y(e,o);if(r.hits.length===0)throw new Error("No more images found");appendImages(r.hits)}catch(r){renderError(r)}finally{hideLoader()}}async function y(r,n){const u="https://pixabay.com/api/",l=`?key=42153847-0f7baac2d7b2e92d7ce6bbe8e&q=${r}`,f="&image_type=photo&orientation=horizontal&safesearch=true&per_page=15",m=u+l+f+`&page=${n}`,p=await E.get(m),{data:c}=p;if(c.total===0)throw new Error("No images found");return c}function L(r){const n=r.map(({largeImageURL:u,webformatURL:h,tags:l,likes:f,views:m,comments:p,downloads:c})=>`
        <div class="gallery">
          <a href="${u}">
            <img src="${h}" alt="${l}" title="${l}" width="360" height="300" />
            <ul class="info-cards-container">
              <li class="info-cards-elements">likes<span>${f}</span></li>
              <li class="info-cards-elements">views<span>${m}</span></li>
              <li class="info-cards-elements">comments<span>${p}</span></li>
              <li class="info-cards-elements">downloads<span>${c}</span></li>
            </ul>
          </a>
        </div>
      `).join("");a.innerHTML=n,t.refresh()}});
//# sourceMappingURL=commonHelpers.js.map
