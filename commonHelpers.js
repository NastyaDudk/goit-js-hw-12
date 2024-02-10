import{i as d,A as p,S as y}from"./assets/vendor-62bdb963.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const i={searchQuery:document.querySelector(".searchQuery"),formElem:document.querySelector(".form"),galleryEl:document.querySelector(".gallery-el"),loaderElem:document.querySelector(".loader"),btnLoad:document.querySelector(".load-more-btn")};let n=1;const g=15;let c="";console.log(c);i.formElem.addEventListener("submit",h);i.loaderElem.style.visibility="hidden";async function h(t){t.preventDefault(),i.galleryEl.innerHTML=searchQuery.value.trim(),n=1;const o=await m();o.hits.length>0&c!==""?(i.loaderElem.style.visibility="hidden",u(o.hits),i.btnLoad.style.visibility="visible"):(i.loaderElem.style.visibility="hidden",d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})),t.target.reset()}const b=p.create({baseURL:"https://pixabay.com/api/"});async function m(){return(await b.get("",{params:{key:"42132466-2eec74b8e2a534f613ea758a4",q:c,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:g,page:n}})).data}function v(t){const{webformatURL:o,largeImageURL:l,tags:a,likes:e,views:r,comments:s,downloads:f}=t;return`<li>
    <div class="card">
    <div class="img-container">
    <a href="${l}">
    <img src="${o}" alt="${a}" />
    </a>
    </div>
    <div class="img-comments">
    <p class="describe">Likes ${e}</p>
    <p class="describe">Views ${r}</p>
    <p class="describe">Comments ${s}</p>
    <p class="describe">Downloads ${f}</p>
    </div>
    </div>
    </li>
    `}function L(t){return t.map(v).join("")}function u(t){const o=L(t);i.galleryEl.insertAdjacentHTML("beforeend",o),new y(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}i.btnLoad.addEventListener("click",E);async function E(){n+=1;const t=await m();u(t.hits),w(t.totalHits)}function w(t){if(n>t)return d.error({position:"bottomRight",color:"blue",message:"We're sorry, there are no more posts to load"})}
//# sourceMappingURL=commonHelpers.js.map
