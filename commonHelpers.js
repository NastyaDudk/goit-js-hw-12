import{i as d,A as g,S as p}from"./assets/vendor-62bdb963.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function c(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(t){if(t.ep)return;t.ep=!0;const i=c(t);fetch(t.href,i)}})();const r={searchQuery:document.querySelector("#searchQuery"),formElem:document.querySelector(".form"),galleryEl:document.querySelector(".gallery-el"),loaderElem:document.querySelector(".loader"),btnLoad:document.querySelector(".load-more-btn")};let n=1;const y=15,h=Math.ceil(500/y);let a="";console.log(a);r.formElem.addEventListener("submit",b);r.loaderElem.style.visibility="hidden";async function b(e){e.preventDefault(),a=r.searchQuery.value.trim(),a!==""&&(r.loaderElem.style.visibility="visible",r.galleryEI.innerHTML="",w()),n=1;const o=await m();o.hits.length>0&a!==""?(r.loaderElem.style.visibility="hidden",u(o.hits),r.btnLoad.style.visibility="visible"):(r.loaderElem.style.visibility="hidden",d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})),e.target.reset()}const v=g.create({baseURL:"https://pixabay.com/api/"});async function m(){return(await v.get("",{params:{key:"42132466-2eec74b8e2a534f613ea758a4",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:y,page:n}})).data}function L(e){const{webformatURL:o,largeImageURL:c,tags:l,likes:t,views:i,comments:s,downloads:f}=e;return`<li>
    <div class="card">
    <div class="img-container">
    <a href="${c}">
    <img src="${o}" alt="${l}" />
    </a>
    </div>
    <div class="img-comments">
    <p class="describe">Likes ${t}</p>
    <p class="describe">Views ${i}</p>
    <p class="describe">Comments ${s}</p>
    <p class="describe">Downloads ${f}</p>
    </div>
    </div>
    </li>
    `}function E(e){return e.map(L).join("")}function u(e){const o=E(e);r.galleryEl.insertAdjacentHTML("beforeend",o),new p(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}async function w(){const e=await m();e.hits.length>0?(u(e.hits),n<h?r.btnLoad.style.visibility="visible":r.btnLoad.style.visibility="hidden"):d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),r.loaderElem.style.visibility="hidden"}r.btnLoad.addEventListener("click",S);async function S(){n+=1;const e=await m();u(e.hits),q(e.totalHits)}function q(e){if(n>=e)return d.error({position:"bottomRight",color:"blue",message:"We're sorry, there are no more posts to load"})}
//# sourceMappingURL=commonHelpers.js.map
