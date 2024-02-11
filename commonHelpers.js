import{n}from"./assets/vendor-a2f273c8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const i=new ImagesApiService,f=document.querySelector("form#search-form"),u=document.querySelector("div.gallery"),a=document.querySelector("button.load-more");f.addEventListener("submit",m);a.addEventListener("click",y);function m(o){if(o.preventDefault(),a.classList.add("is-hidden"),u.innerHTML="",i.query=o.currentTarget.elements.searchQuery.value.trim(),i.resetPage(),i.query===""){n.Notify.info("Please enter your search query!");return}else i.getImage().then(t=>{let r=t.hits;r.length===0?n.Notify.failure("Sorry, there are no images matching your search query. Please try again."):r.length<40?(c(r),a.classList.add("is-hidden"),n.Notify.success(`Hooray! We found ${t.totalHits} images.`)):(c(r),n.Notify.success(`Hooray! We found ${t.totalHits} images.`),a.classList.remove("is-hidden"))}).catch(t=>{n.Notify.info("We're sorry, but you've reached the end of search results."),console.log(t)})}function y(){i.getImage().then(o=>{let t=o.hits;c(t),t.length<40&&(a.classList.add("is-hidden"),n.Notify.info("We're sorry, but you've reached the end of search results."))})}function c(o){const t=o.map(r=>`<div class="photo-card">
  <div class="thumb"><img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" /></div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span>${r.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span>${r.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span>${r.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span>${r.downloads}</span>
    </p>
  </div>
</div>`).join("");u.insertAdjacentHTML("beforeend",t)}
//# sourceMappingURL=commonHelpers.js.map
