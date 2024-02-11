import{S as b,i as n,a as F}from"./assets/vendor-b52d9f5e.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))y(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&y(d)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function y(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const m=document.querySelector(".form"),p=document.querySelector(".gallery-el"),i=document.querySelector(".loader"),l=document.querySelector(".load-more-btn"),w=new b(".button");let a=1,u=15;l.style.display="none";i.style.display="none";const c={key:"42129451-ab1d1e3d1abd6a79c6499a83d",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:u};m.addEventListener("submit",async t=>{t.preventDefault(),a=1,l.style.display="none",p.innerHTML="";const s=m.elements.search.value.trim();if(s===""){n.show({message:"Please write search image",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}else{i.style.display="inline-block",c.q=s,c.page=a;try{const e=await g();e.totalHits===0?(n.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"}),i.style.display="none"):(h(e),e.totalHits<u?f():l.style.display="block")}catch(e){n.show({message:`Sorry, ${e}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}}m.reset()});l.addEventListener("click",async()=>{a+=1,c.page=a,i.style.display="inline-block";try{const t=await g();h(t),v(),u*a>t.totalHits&&f()}catch(t){n.show({message:`Sorry, ${t}`,messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"bottomCenter"})}});async function g(){const t=new URLSearchParams(c);return(await F.get(`https://pixabay.com/api/?${t}`)).data}function h(t){const s=t.hits.map(e=>`<li class="gallery-item">
    <a class="gallery-link" href="${e.largeImageURL}" >
      <img
        class="gallery-image"
        src="${e.webformatURL}"
        alt="${e.tags}"
        width = "360"
      />
    </a>
    <div class="img-text">
      <div class="img-info">
        <h3>Likes</h3>
        <p> ${e.likes}</p>
      </div>
      <div class="img-info">
        <h3>Views</h3>
        <p> ${e.views}</p>
      </div>
      <div class="img-info">
        <h3>Comments</h3>
        <p> ${e.comments}</p>
      </div>
      <div class="img-info">
        <h3>Downloads</h3>
        <p> ${e.downloads}</p>
      </div>
    </div>
  </li>`).join("");p.insertAdjacentHTML("beforeend",s),w.refresh(),i.style.display="none"}function f(){n.show({message:"We are sorry, but you have reached the end of search results.",messageColor:"#FAFAFB",backgroundColor:"#1DB8F5",position:"topRight"}),l.style.display="none",i.style.display="none"}function v(){const s=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:s,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
