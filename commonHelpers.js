import{i as m,S as w}from"./assets/vendor-9310f15c.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const g of r.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&d(g)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();const l=document.querySelector(".gallery"),s=document.getElementById("loader"),I=document.getElementById("search-form"),c=document.getElementById("load-more"),f=document.getElementById("loading-indicator"),$="42175181-9f2e4ea0c75ffabf50c3ef9f9";let a=1,y="",v=0;function h(e){m.success({title:"Success",message:e,position:"topRight"})}function i(e){m.error({title:"Error",message:e,position:"topRight"})}function E(e){c.style.display=e?"block":""}function B(){c.style.display="none"}function u(){c.style.display=""}async function p(e,n=1){const t=`https://pixabay.com/api/?key=${$}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=15`;return(await(await fetch(t)).json()).hits}I.addEventListener("submit",async function(e){e.preventDefault(),E(!1);const n=document.getElementById("query").value.trim();if(!n){m.warning({title:"Warning",message:"Search images..."});return}try{s.style.display="block",y=n,a=1;const t=await p(n,a);t.length>0?(C(t),h(`Was found: ${t.length} images`),b(),B()):(l.innerHTML="",i("Sorry, there are no images matching your search query. Please try again!"),u())}catch(t){console.error("Error fetching images:",t),i("Failed to fetch images.")}finally{s.style.display="none"}});c.addEventListener("click",async function(){try{s.style.display="block",f.style.display="block",a++;const e=await p(y,a);e.length>0?(L(e),h(`Loaded additional ${e.length} images`),b(),e.length<15&&(i("No more images to load"),u()),S()):(i("No more images to load"),u())}catch(e){console.error("Error fetching images:",e),i("Failed to fetch additional images.")}finally{s.style.display="none",f.style.display="none"}});function S(){const n=l.querySelector(".image-card").getBoundingClientRect().height*2;window.scrollBy({top:n,behavior:"smooth"})}function C(e){l.innerHTML="",L(e)}function L(e){const n=e.map(t=>`
            <div class="image-card">
                <a href="${t.largeImageURL}" data-lightbox="image-set" data-title="${t.tags}">
                    <img src="${t.webformatURL}" alt="${t.tags}">
                    <div class="info">Likes: ${t.likes}, Views: ${t.views}, Comments: ${t.comments}, Downloads: ${t.downloads}</div>
                </a>
            </div>
        `);l.innerHTML+=n.join(""),v+=e.length}function b(){new w(".gallery a").refresh()}
//# sourceMappingURL=commonHelpers.js.map
