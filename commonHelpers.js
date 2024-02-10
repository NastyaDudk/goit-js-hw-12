import{S as b,i as p,a as v}from"./assets/vendor-951421c8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();document.querySelector(".searchQuery");const L=document.querySelector(".form"),m=document.querySelector(".gallery-el"),a=document.querySelector(".loader"),u=document.querySelector(".load-more-btn"),w=new b(".photo-card-link",{captionDelay:250,captionsData:"alt"});let r=1;const f=15;let c="";a.style.display="none";let d=0;L.addEventListener("submit",k);u.addEventListener("click",S);function k(t){if(t.preventDefault(),r=1,c=t.target.elements.searchQuery.value.trim(),!c){p.warning({position:"topRight",message:"Please enter a search query."});return}m.innerHTML="",a.style.display="block",y(c).then(o=>g(o)).catch(o=>p.error({position:"topRight",message:`Error: ${o}`})).finally(()=>{t.target.reset(),a.style.display="none"})}async function S(){a.style.display="block";const t=await y(c);g(t),a.style.display="none",window.scrollBy({top:cardHeight*2,behavior:"smooth"})}async function y(t){const o=await v.get("https://pixabay.com/api/",{params:{key:"42192602-d8808410d4367b6455b886704",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:f}});return r+=1,o.data}function q(t){const{webformatURL:o,largeImageURL:n,tags:l,likes:e,views:s,comments:i,downloads:h}=t;return`
    <div class="photo-card">
      <a class="photo-card-link" href="${n}">
        <img
          class="photo-card__img"
          src="${o}" 
          alt="${l}" 
        />
      </a>
      <div class="info" style = display: flex;
  gap: 20px;
  margin-left: 10px;>
        <p class="info-item">
          <b class="info-item-title">Likes:</b>
          <span class="info-item-value">${e}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Views:</b>
          <span class="info-item-value">${s}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Comments:</b>
          <span class="info-item-value">${i}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Downloads:</b>
          <span class="info-item-value">${h}</span>
        </p>
      </div>
    </div>
    `}function g({hits:t,totalHits:o}){if(d=Math.ceil(o/f),t.length>0){const n=t.map(q).join("");m.insertAdjacentHTML("beforeend",n),w.refresh(),$(),r>d&&p.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}else p.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});x()}function x(){r>=d&&(u.style.display="none")}function $(){u.style.display="block",u.style.textAlign="center"}
//# sourceMappingURL=commonHelpers.js.map
