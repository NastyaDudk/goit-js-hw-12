import{S as b,i as d,a as v}from"./assets/vendor-951421c8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const L=document.querySelector(".form"),m=document.querySelector(".gallery-el"),a=document.querySelector(".loader"),p=document.querySelector(".load-more-btn"),w=new b(".photo-card-link",{captionDelay:250,captionsData:"alt"});let r=1;const f=15;let c="";a.style.display="none";let u=0;L.addEventListener("submit",k);p.addEventListener("click",S);function k(o){if(o.preventDefault(),r=1,c=o.target.elements.searchQuery.value.trim(),!c){d.warning({position:"topRight",message:"Please enter a search query."});return}m.innerHTML="",a.style.display="block",y(c).then(t=>g(t)).catch(t=>d.error({position:"topRight",message:`Error: ${t}`})).finally(()=>{o.target.reset(),a.style.display="none"})}async function S(){a.style.display="block";const o=await y(c);g(o),a.style.display="none";const n=document.querySelector(".photo-card").getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}async function y(o){const t=await v.get("https://pixabay.com/api/",{params:{key:"42192602-d8808410d4367b6455b886704",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:f}});return r+=1,t.data}function q(o){const{webformatURL:t,largeImageURL:n,tags:l,likes:e,views:s,comments:i,downloads:h}=o;return`
    <div class="photo-card">
      <a class="photo-card-link" href="${n}">
        <img
          class="photo-card__img"
          src="${t}" 
          alt="${l}" 
        />
      </a>
      <div class="info">
        <p class="info-item">
          <b class="info-item-title">Likes</b>
          <span class="info-item-value">${e}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Views</b>
          <span class="info-item-value">${s}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Comments</b>
          <span class="info-item-value">${i}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Downloads</b>
          <span class="info-item-value">${h}</span>
        </p>
      </div>
    </div>
    `}function g({hits:o,totalHits:t}){if(u=Math.ceil(t/f),o.length>0){const n=o.map(q).join("");m.insertAdjacentHTML("beforeend",n),w.refresh(),R(),r>u&&d.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}else d.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});$()}function $(){r>u&&(p.style.display="none")}function R(){p.style.display="block"}
//# sourceMappingURL=commonHelpers.js.map
