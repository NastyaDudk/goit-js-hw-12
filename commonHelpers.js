import{S as L,i as v,A as S}from"./assets/vendor-62bdb963.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&f(u)}).observe(document,{childList:!0,subtree:!0});function d(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function f(e){if(e.ep)return;e.ep=!0;const r=d(e);fetch(e.href,r)}})();document.querySelector(".loader");document.querySelector(".load-more-btn");document.getElementById("search-form");const n={galleryEl:document.getElementById(".gallery-el"),submitBtn:document.querySelector("[type='submit']"),loadMoreBtn:document.getElementById(".load-more-btn"),loaderEl:document.querySelector(".loader"),searchForm:document.querySelector(".form")};let c=1;const y=15;let s=0,i="";const h=new L(".gallery a",{captionsData:"alt",captionDelay:250});n.formEl.addEventListener("search-form",B);l();async function B(t){if(t.preventDefault(),n.galleryEl.innerHTML="",m(),i=t.target.elements.valueGallery.value.trim(),!i){a("Sorry, there are no images matching your search query. Please try again!");return}if(i!==""){p(),c=1;try{const o=await b();o.hits.length>=1?(l(),renderImages(o.hits),h.refresh(),o.hits.length<y?(m(),a("We're sorry, there are no more posts to load")):q()):(l(),a("Sorry, there are no images matching your search query. Please try again!"))}catch{s=0,g(s)}}t.target.reset()}n.btnLoad.addEventListener("click",E);async function E(){c+=1,p();const t=await b();renderImages(t.hits),h.refresh(),g(t.totalHits),l();let d=2*document.querySelector(".card").getBoundingClientRect().height;window.scrollBy({top:d,behavior:"smooth"})}function g(t){s=Math.ceil(t/y),s<=c&&(m(),a("We're sorry, there are no more posts to load"))}function a(t){return v.error({position:"topRight",color:"blue",message:t})}function p(){n.loader.style.visibility="visible"}function l(){n.loader.style.visibility="hidden"}function q(){n.btnLoad.style.visibility="visible"}function m(){n.btnLoad.style.visibility="hidden"}const w=S.create({baseURL:"https://pixabay.com/api/"});async function b(){return(await w.get("",{params:{key:"42132466-2eec74b8e2a534f613ea758a4",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:y,page:c}})).data}
//# sourceMappingURL=commonHelpers.js.map
