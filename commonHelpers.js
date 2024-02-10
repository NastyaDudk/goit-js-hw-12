import{S as L,i as u,a as m}from"./assets/vendor-951421c8.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();document.querySelector(".searchQuery");const k=document.querySelector(".form"),f=document.querySelector(".gallery-el"),l=document.querySelector(".loader"),c=document.querySelector(".load-more-btn"),w=new L(".photo-card-link",{captionDelay:250,captionsData:"alt"});let n=1;const y=15;let p="";l.style.display="none";let d=0;k.addEventListener("submit",$);c.addEventListener("click",q);function $(o){if(o.preventDefault(),n=1,p=o.target.elements.searchQuery.value.trim(),!p){u.warning({position:"topRight",message:"Please enter a search query."});return}f.innerHTML="",l.style.display="block",g(p).then(s=>h(s)).catch(s=>u.error({position:"topRight",message:`Error: ${s}`})).finally(()=>{o.target.reset(),l.style.display="none"})}async function q(){l.style.display="block";const o=await g(p);h(o),l.style.display="none",window.scrollBy({top:cardHeight*2,behavior:"smooth"})}async function g(o){const s=await m.get("https://pixabay.com/api/",{params:{key:"42192602-d8808410d4367b6455b886704",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:n,per_page:y}});return n+=1,s.data}function S(o){const{webformatURL:s,largeImageURL:i,tags:r,likes:e,views:t,comments:a,downloads:v}=o;return`
    <div class="photo-card">
      <a class="photo-card-link" href="${i}">
        <img class="photo-card__img" src="${s}" alt="${r}" />
      </a>
      <div class="info" style="display: flex; gap: 20px; margin-left: 10px;">
        <p class="info-item">
          <b class="info-item-title">Likes:</b>
          <span class="info-item-value">${e}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Views:</b>
          <span class="info-item-value">${t}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Comments:</b>
          <span class="info-item-value">${a}</span>
        </p>
        <p class="info-item">
          <b class="info-item-title">Downloads:</b>
          <span class="info-item-value">${v}</span>
        </p>
      </div>
    </div>
  `}function h({hits:o,totalHits:s}){if(d=Math.ceil(s/y),o.length>0){const i=o.map(S).join("");f.insertAdjacentHTML("beforeend",i),w.refresh(),b(),n>d&&u.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}else u.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});x()}function x(){n>d&&(c.style.display="none")}function P(o,s){const e=`https://pixabay.com/api/?key=your_api_key&q=${o}&page=${s}&per_page=${12}`;m.get(e).then(t=>{const a=t.data.hits;displayImages(a),b()}).catch(t=>console.error(t))}c.addEventListener("click",()=>{n+=1,P(searchQuery,n)});function b(){c.style.display="block",c.style.textAlign="center"}
//# sourceMappingURL=commonHelpers.js.map
