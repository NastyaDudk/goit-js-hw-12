import{i as m,S as v,a as B}from"./assets/vendor-2618a76b.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const u=document.querySelector(".gallery"),c=document.getElementById("loader"),C=document.getElementById("search-form"),y=document.getElementById("load-more"),f=document.getElementById("loading-indicator"),k="42175181-9f2e4ea0c75ffabf50c3ef9f9";let d=1,h="",q=0;function p(e){m.success({title:"Success",message:e,position:"topRight"})}function s(e){m.error({title:"Error",message:e,position:"topRight"})}function l(e){y.style.display=e?"block":"none"}let S=0;async function L(e,n=1){const a=`https://pixabay.com/api/?key=${k}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=15`;try{const r=await B.get(a);return S=r.data.totalHits,r.data.hits}catch(r){throw console.error("Error fetching images:",r),s("Failed to fetch images."),r}}async function M(){const e=u.querySelector(".image-card").getBoundingClientRect().height;window.scrollBy({top:2*e,left:0,behavior:"smooth"})}C.addEventListener("submit",async function(e){e.preventDefault(),l(!1);const n=document.getElementById("query").value.trim();if(!n){m.warning({title:"Warning",message:"Please enter a search query."});return}try{c.style.display="block",h=n,d=1;const a=await L(n,d);a.length>0?(x(a),p(`Was found: ${a.length} images`),w(),l(!0)):(u.innerHTML="",s("Sorry, there are no images matching your search query. Please try again!"),l(!1))}finally{c.style.display="none"}});y.addEventListener("click",async function(){try{c.style.display="block",f.style.display="block",d++;const e=await L(h,d);e.length>0?(b(e),p(`Loaded additional ${e.length} images`),w(),e.length<15&&(s("We are sorry, but you have reached the end of search results."),toggleLoadMoreBtn(!1)),M()):(s("No more images to load"),l(!1))}catch(e){console.error("Error fetching images:",e),s("Failed to fetch additional images.")}finally{c.style.display="none",f.style.display="none"}});function x(e){u.innerHTML="",b(e)}function b(e){const n=document.createDocumentFragment();e.forEach(a=>{const{largeImageURL:r,webformatURL:t,tags:o,likes:i,views:E,comments:I,downloads:$}=a,g=document.createElement("div");g.classList.add("image-card"),g.innerHTML=`
            <a href="${r}" data-lightbox="image-set" data-title="${o}">
                <img src="${t}" alt="${o}">
                <div class="info">Likes: ${i}, Views: ${E}, Comments: ${I}, Downloads: ${$}</div>
            </a>
        `,n.appendChild(g)}),u.appendChild(n),q+=e.length}function w(){new v(".gallery a").refresh()}
//# sourceMappingURL=commonHelpers.js.map
