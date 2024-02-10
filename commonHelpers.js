import{i as d}from"./assets/vendor-4d6948b9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const t of o.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&n(t)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();document.getElementById(".gallery-el");const y=document.querySelector("[type='submit']"),l=document.getElementById(".load-more-btn");document.querySelector(".loader");const f=document.querySelector(".form"),m="https://pixabay.com/api/",p="2208122-c38407f0c226da94dd817bfa0",g=100,c=15;let i=1;f.addEventListener("input",debounce(s=>{const r=s.target.value;localStorage.setItem("search-term",r.trim())},g));y.addEventListener("click",s=>{s.preventDefault();const r=localStorage.getItem("search-term");if(r===null||r===""){d.iziToast.info("Please type something in the search input.");return}i=1,h(r,i)});const h=async(s,r)=>{let a="",n=new URLSearchParams({key:p,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:c});try{const o=(await axios.get(`${m}?${n}&page=${r}`)).data.hits;if(o.length===0){d.iziToast.failure("Sorry, there are no images matching your search query. Please try again.");return}l.style.display="block",footer.style.display="flex",a=o.map(t=>`
        <div class="photo-card">
          <div class ="thumb">
            <img class="img" src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${t.likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${t.views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${t.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${t.downloads}
            </p>
          </div>
        </div>
      `).join(""),gallery.innerHTML=a}catch(e){console.error(e)}},b=async(s,r)=>{let a="",n=new URLSearchParams({key:p,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:c});try{const o=(await axios.get(`${m}?${n}&page=${r}`)).data.hits;if(o.length===0){Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");return}a=o.map(t=>`
        <div class="photo-card">
          <div class ="thumb">
            <img class="img" src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${t.likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${t.views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${t.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${t.downloads}
            </p>
          </div>
        </div>
      `).join(""),gallery.insertAdjacentHTML("beforeend",a)}catch(e){console.error(e)}};l.addEventListener("click",async()=>{const s=localStorage.getItem("search-term");i++;let r=new URLSearchParams({key:p,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:c});try{const a=await axios.get(`${m}?${r}&page=${i}`),n=a.data.hits,e=c,t=a.data.totalHits/e,u=Math.ceil(t);console.log("currentPage: ",i),console.log("maxPageNumber: ",t),console.log("maxPageNumberRoundUp: ",u),i===u&&(footer.style.display="none",l.style.display="none",d.iziToast.info("We're sorry, but you've reached the end of search results.")),b(s,i)}catch(a){console.error(a)}});morebut.style.display="none";l.style.display="none";
//# sourceMappingURL=commonHelpers.js.map
