import{n as i}from"./assets/vendor-a2f273c8.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const u=document.querySelector("form#search-form"),d=document.querySelector("div.gallery"),n=document.querySelector("button.load-more");u.addEventListener("submit",f);n.addEventListener("click",m);function f(o){if(o.preventDefault(),n.classList.add("is-hidden"),d.innerHTML="",imageApiService.query=o.currentTarget.elements.searchQuery.value.trim(),imageApiService.resetPage(),imageApiService.query===""){i.Notify.info("Please enter your search query!");return}else imageApiService.getImage().then(r=>{let t=r.hits;t.length===0?i.Notify.failure("Sorry, there are no images matching your search query. Please try again."):t.length<40?(c(t),n.classList.add("is-hidden"),i.Notify.success(`Hooray! We found ${r.totalHits} images.`)):(c(t),i.Notify.success(`Hooray! We found ${r.totalHits} images.`),n.classList.remove("is-hidden"))}).catch(r=>{i.Notify.info("We're sorry, but you've reached the end of search results."),console.log(r)})}function m(){imageApiService.getImage().then(o=>{let r=o.hits;c(r),r.length<40&&(n.classList.add("is-hidden"),i.Notify.info("We're sorry, but you've reached the end of search results."))})}function c(o){const r=o.map(t=>`<div class="photo-card">
  <div class="thumb"><img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" /></div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span>${t.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span>${t.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span>${t.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span>${t.downloads}</span>
    </p>
  </div>
</div>`).join("");d.insertAdjacentHTML("beforeend",r)}
//# sourceMappingURL=commonHelpers.js.map
