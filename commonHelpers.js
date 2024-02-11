import{S as $,i as v}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const l=document.querySelector(".form"),r=document.querySelector(".gallery-el"),a=document.querySelector(".loader"),c=document.querySelector(".load-more");u(),hideLoadMoreButton();const e=new $(".gallery a",{captionDelay:250});l.addEventListener("submit",i),c.addEventListener("click",b);let t="";function i(o){o.preventDefault(),g(),t=l.querySelector(".input").value,h(t).then(n=>{p(n.hits)}).catch(n=>{y(n)}).finally(()=>{u(),showLoadMoreButton()}),l.reset()}function b(){g(),h(t).then(o=>{p(o.hits)}).catch(o=>{y(o)}).finally(()=>{u()})}function h(o){const n="https://pixabay.com/api/",f=`?key=42153847-0f7baac2d7b2e92d7ce6bbe8e&q=${o}`,d="&image_type=photo&orientation=horizontal&safesearch=true&per_page=20",m=n+f+d;return fetch(m).then(s=>s.json()).then(s=>{if(s.total===0)throw new Error("No images found");return s})}function p(o){let n="";o.forEach(({largeImageURL:L,webformatURL:f,tags:d,likes:m,views:s,comments:E,downloads:S})=>{n+=`
          <div class="gallery">
            <a href="${L}">
              <img src="${f}" alt="${d}" title="${d}" width="360" height="300" />
              <ul class="info-cards-container">
                <li class="info-cards-elements">likes<span>${m}</span></li>
                <li class="info-cards-elements">views<span>${s}</span></li>
                <li class="info-cards-elements">comments<span>${E}</span></li>
                <li class="info-cards-elements">downloads<span>${S}</span></li>
              </ul>
            </a>
          </div>
        `}),r.insertAdjacentHTML("beforeend",n),e.refresh()}function y(o){r.innerHTML="",v.show({message:`❌ "${o.message}". Please try again!`,color:"red",position:"topRight",maxWidth:"400px"})}function g(){a.style.display="block"}function u(){a.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
