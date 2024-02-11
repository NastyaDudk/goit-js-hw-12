import{S as M,i as S}from"./assets/vendor-46aac873.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector(".form"),s=document.querySelector(".gallery-el"),l=document.querySelector(".loader"),c=document.querySelector(".load-more");u(),hideLoadMoreButton();const e=new M(".gallery a",{captionDelay:250});a.addEventListener("submit",E),c.addEventListener("click",$);let t="",n=1;function E(o){o.preventDefault(),L(),t=a.querySelector(".input").value,n=1,p(t,n).then(r=>{y(r.hits),showLoadMoreButton()}).catch(r=>{g(r),hideLoadMoreButton()}).finally(()=>{u()}),a.reset()}function $(){L(),n++,p(t,n).then(o=>{y(o.hits),showLoadMoreButton()}).catch(o=>{g(o),hideLoadMoreButton()}).finally(()=>{u()})}function p(o,r){const f="https://pixabay.com/api/",d=`?key=42153847-0f7baac2d7b2e92d7ce6bbe8e&q=${o}`,m="&image_type=photo&orientation=horizontal&safesearch=true&per_page=20",h=f+d+m+`&page=${r}`;return fetch(h).then(i=>i.json()).then(i=>{if(i.total===0)throw new Error("No images found");return i})}function y(o){let r="";o.forEach(({largeImageURL:f,webformatURL:b,tags:d,likes:m,views:h,comments:i,downloads:w})=>{r+=`
          <div class="gallery">
            <a href="${f}">
              <img src="${b}" alt="${d}" title="${d}" width="360" height="300" />
              <ul class="info-cards-container">
                <li class="info-cards-elements">likes<span>${m}</span></li>
                <li class="info-cards-elements">views<span>${h}</span></li>
                <li class="info-cards-elements">comments<span>${i}</span></li>
                <li class="info-cards-elements">downloads<span>${w}</span></li>
              </ul>
            </a>
          </div>
        `}),s.insertAdjacentHTML("beforeend",r),e.refresh()}function g(o){s.innerHTML="",S.show({message:`❌ "${o.message}". Please try again!`,color:"red",position:"topRight",maxWidth:"400px"})}function L(){l.style.display="block"}function u(){l.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
