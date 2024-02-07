import{S,i as l,a as x}from"./assets/vendor-b52d9f5e.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const s={formSearch:document.querySelector(".form"),imageList:document.querySelector(".gallery"),preload:document.querySelector(".loader"),nextBtn:document.querySelector(".load-more-btn")},o="is-hidden";let d=0,g="";const u=new S(".gallery a",{captionsData:"alt",captionDelay:250});s.formSearch.addEventListener("submit",b);async function b(e){e.preventDefault();const i=e.currentTarget.elements.input.value.trim(),n=e.currentTarget;if(g=i,d=1,s.nextBtn.classList.add(o),s.imageList.innerHTML="",!i){l.show({title:"❕",theme:"light",message:"Please, fill in the search field",messageSize:"20px",messageColor:"#808080",backgroundColor:"#e7fc44",position:"topRight",timeout:3e3});return}s.preload.classList.remove(o);try{const a=await f();if(a.hits.length===0){l.show({iconUrl:icon,theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),n.reset();return}s.imageList.innerHTML=m(a.hits),u.refresh(),a.hits.length>=40&&v(),p(),n.reset()}catch(a){y(a)}finally{s.preload.classList.add(o)}}async function f(){const e="https://pixabay.com/api",i=new URLSearchParams({key:"41861239-c6b09579488337e808a164f07",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40});return(await x.get(`${e}/?${i}&q=${g}&page=${d}`)).data}function m(e){return e.map(({webformatURL:i,largeImageURL:n,tags:a,likes:t,views:r,comments:c,downloads:w})=>`<li class="gallery-item">
      <a class="gallery-link" href="${n}">
        <img class="gallery-image" src="${i}" alt="${a}" />
      </a>
      <div class="container-additional-info">
        <div class="container-descr-inner">
          <p class="description">Likes</p>
          <span class="description-value">${t}</span>
        </div>
        <div class="container-descr-inner">
          <p class="description">Views</p>
          <span class="description-value">${r}</span>
        </div>
        <div class="container-descr-inner">
          <p class="description">Comments</p>
          <span class="description-value">${c}</span>
        </div>
        <div class="container-descr-inner">
          <p class="description">Downloads</p>
          <span class="description-value">${w}</span>
        </div>
      </div>
    </li>`).join("")}function y(e){console.error(e),s.imageList.innerHTML="",l.show({iconUrl:icon,theme:"dark",message:e.stack,messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),h()}async function L(){s.preload.classList.remove(o),h(),d+=1;try{const e=await f();if(d*40>=e.totalHits){l.show({title:"❕",theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageSize:"16px",messageColor:"white",backgroundColor:"#4e75ff",position:"topRight",timeout:5e3}),s.imageList.innerHTML+=m(e.hits),u.refresh(),h(),p();return}s.imageList.innerHTML+=m(e.hits),u.refresh(),p(),v()}catch(e){y(e)}finally{s.preload.classList.add(o)}}function p(){window.scrollBy({top:640,behavior:"smooth"})}function v(){s.nextBtn.classList.remove(o),s.nextBtn.addEventListener("click",L)}function h(){s.nextBtn.classList.add(o),s.nextBtn.removeEventListener("click",L)}
//# sourceMappingURL=commonHelpers.js.map
