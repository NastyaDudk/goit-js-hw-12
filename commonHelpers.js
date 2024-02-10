import{i as d,A as g,S as p}from"./assets/vendor-62bdb963.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(e){if(e.ep)return;e.ep=!0;const i=n(e);fetch(e.href,i)}})();const r={searchQuery:document.querySelector("#searchQuery"),formElem:document.querySelector(".form"),galleryEl:document.querySelector(".gallery-el"),loaderElem:document.querySelector(".loader"),btnLoad:document.querySelector(".load-more-btn")};let c=1;const m=15,h=Math.ceil(500/m);let a="";console.log(a);r.formElem.addEventListener("submit",b);r.loaderElem.style.visibility="hidden";r.btnLoad.style.visibility="hidden";async function b(t){t.preventDefault(),a=r.searchQuery.value.trim(),a!==""&&(r.loaderElem.style.visibility="visible",r.galleryEl.innerHTML="",S()),c=1;const s=await u();s.hits.length>0&a!==""?(r.loaderElem.style.visibility="hidden",y(s.hits),r.btnLoad.style.visibility="visible"):(r.loaderElem.style.visibility="hidden",d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})),t.target.reset()}const v=g.create({baseURL:"https://pixabay.com/api/"});async function u(){return(await v.get("",{params:{key:"42132466-2eec74b8e2a534f613ea758a4",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:m,page:c}})).data}function L(t){const{webformatURL:s,largeImageURL:n,tags:l,likes:e,views:i,comments:o,downloads:f}=t;return`<li>
    <div class="card">
    <div class="img-container">
    <a href="${n}">
    <img src="${s}" alt="${l}" />
    </a>
    </div>
    <div class="img-comments">
    <p class="describe">Likes ${e}</p>
    <p class="describe">Views ${i}</p>
    <p class="describe">Comments ${o}</p>
    <p class="describe">Downloads ${f}</p>
    </div>
    </div>
    </li>
    `}function E(t){return t.map(L).join("")}function y(t){const s=E(t);r.galleryEl.insertAdjacentHTML("beforeend",s),new p(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}async function S(){const t=await u();t.hits.length>0?(y(t.hits),c<h?r.btnLoad.style.visibility="visible":r.btnLoad.style.visibility="hidden"):d.error({message:"Sorry, there are no images matching your search query"})}
//# sourceMappingURL=commonHelpers.js.map
