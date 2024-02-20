import{i as f,S as B,a as C}from"./assets/vendor-2618a76b.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const u=document.querySelector(".gallery"),c=document.getElementById("loader"),k=document.getElementById("search-form"),h=document.getElementById("load-more"),y=document.getElementById("loading-indicator"),q="42175181-9f2e4ea0c75ffabf50c3ef9f9";let d=1,p="",S=0;function s(e){h.style.display=e?"block":"none"}function L(e){f.success({title:"Success",message:e,position:"topRight"})}function l(e){f.error({title:"Error",message:e,position:"topRight"})}let x=0;async function b(e,n=1){const a=`https://pixabay.com/api/?key=${q}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=15`;try{const r=await C.get(a);return x=r.data.totalHits,r.data.hits}catch(r){throw console.error("Error fetching images:",r),l("Failed to fetch images."),r}}async function H(){const e=u.querySelector(".image-card").getBoundingClientRect().height;window.scrollBy({top:2*e,left:0,behavior:"smooth"})}k.addEventListener("submit",async function(e){e.preventDefault(),s(!1);const n=document.getElementById("query").value.trim();if(!n){f.warning({title:"Warning",message:"Please enter a search query."});return}try{c.style.display="block",p=n,d=1;const a=await b(n,d);a.length>0?(M(a),L(`Was found: ${a.length} images`),E(),s(!0)):(u.innerHTML="",l("Sorry, there are no images matching your search query. Please try again!"),s(!1))}finally{c.style.display="none"}});h.addEventListener("click",async function(){try{c.style.display="block",y.style.display="block",d++;const e=await b(p,d);e.length>0?(w(e),L(`Loaded additional ${e.length} images`),E(),e.length<15&&(l("We are sorry, but you have reached the end of search results."),s(!1)),H()):(l("No more images to load"),s(!1))}catch(e){console.error("Error fetching images:",e),l("Failed to fetch additional images.")}finally{c.style.display="none",y.style.display="none"}});function M(e){u.innerHTML="",w(e)}function w(e){const n=document.createDocumentFragment();e.forEach(a=>{const{largeImageURL:r,webformatURL:t,tags:o,likes:i,views:I,comments:$,downloads:v}=a,g=document.createElement("div");g.classList.add("image-card"),g.innerHTML=`
            <a href="${r}" data-lightbox="image-set" data-title="${o}">
                <img src="${t}" alt="${o}">
                <div class="info">Likes: ${i}, Views: ${I}, Comments: ${$}, Downloads: ${v}</div>
            </a>
        `,n.appendChild(g)}),u.appendChild(n),S+=e.length}let m=null;function E(){m&&m.destroy(),m=new B(".gallery a")}
//# sourceMappingURL=commonHelpers.js.map
