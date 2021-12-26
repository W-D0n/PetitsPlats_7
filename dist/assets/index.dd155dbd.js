const L=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}};L();let v="/public/icons/logo.png",_=["footer","main","header"],w=["result__section","dropdown__section","tag-list__section","searchArea"],E=["ingredients","appliance","ustensils"];const b=e=>`
  <${e}></${e}>
  `,T=e=>`
  <a class="homepage__link" href="../../../index.html" aria-label="link to homepage">
    <img class="logo" src="${e}" alt="" />
  </a> 
  `,S=e=>`
  <div id="${e}"></div>
  `,$=()=>`
  <form id="searchBar" class="searchBar">
    <label class="offscreen" for="mainField"></label>
    <input type="search" spellcheck="true" id="mainField" data-type="global" autocomplete="off" aria-label="search by name, ingredient or description" placeholder="Rechercher un ingr\xE9dient, un appareil, un ustensile, une recette\u2026">
    <span class="bi bi-search"></span>
  </form>
  `,A=()=>`
    <nav class="navbar"></nav>
  `,q=e=>`
    <div class="dropdown__container ${e}">
      <input type="text" class="search__field dropdown" data-type="${e}" autocomplete="off" placeholder="${e}" aria-label="search by ${e}">
      <ul class="dropdown__content" id="${e}List"></ul>
    </div>
  `;function y(e,t,n){t.forEach(s=>{let i=e(s);n[0].insertAdjacentHTML("afterbegin",i)})}function B(e){document.getElementsByTagName("header")[0].insertAdjacentHTML("beforeend",T(e))}function I(){document.getElementById("searchArea").insertAdjacentHTML("beforeend",$())}function M(){document.getElementById("dropdown__section").insertAdjacentHTML("beforeend",A());const t=document.getElementById("tag-list__section"),n=document.createElement("ul");n.classList.add("tag-list"),t.appendChild(n)}function C(e){const t=document.querySelector(".navbar");e.forEach(n=>{t.insertAdjacentHTML("beforeend",q(n))})}const D=(e,t)=>`
  <li class="tag-list__item" data-type="${e}" data-value="${t}">${t}<span class="tag__close"></span></li>
  `;function F(e,t){const n=document.querySelector(".tag-list");n.querySelector(`[data-type="${e}"][data-value="${t}"]`)||n.insertAdjacentHTML("beforeend",D(e,t))}function H(){const e=document.getElementById("result__section"),t=document.createElement("p");t.classList.add("error"),t.innerHTML="Aucune recette ne correspond \xE0 votre crit\xE8re... vous pouvez chercher \xAB tarte aux pommes \xBB, \xAB poisson \xBB, etc.",e.insertAdjacentElement("beforeend",t)}function j(){y(b,_,document.getElementsByTagName("body")),y(S,w,document.getElementsByTagName("main")),B(v),I(),M(),C(E)}const x="../../data/recipes.json";async function N(){let e=new Request(x,{method:"GET",mode:"cors"});try{return(await(await fetch(e)).json()).recipes}catch(t){console.error(t.status)}}const m=await N();function R(e,t){for(let n=0;n<t.length;n++)if(t[n].ingredient.toLowerCase().match(e))return!0;return!1}function O(e){const t=Array.from(o.ingredients),n=e.map(s=>s.ingredient.toLowerCase());for(let s=0;s<t.length;s++){const i=t[s].toLowerCase();if(!n.includes(i))return!1}return!0}function k(e){const t=Array.from(o.ustensils);for(let n=0;n<t.length;n++){const s=t[n];if(!e.includes(s))return!1}return!0}function z(e){let t=document.querySelectorAll(`#${e.dataset.type}List li`);P(t,e.value.toLowerCase())}function P(e,t){for(let n=0;n<e.length;n++){const s=e[n];s.textContent.toLowerCase().match(t)?s.style.display="block":s.style.display="none"}}function V(e){let t=document.querySelectorAll(`#${e}List li`);for(let n=0;n<t.length;n++){const s=t[n];s.style.display="block"}}function g(e){let t=[...m];const n=e.value.length>2;for(let s=0;s<t.length;s++){const i=t[s];(n&&!i.name.toLowerCase().match(e.value)&&!i.description.toLowerCase().match(e.value)&&!R(e.value,i.ingredients)||o.ingredients.size>0&&!O(i.ingredients)||o.appliance&&i.appliance!=o.appliance||o.ustensils.size>0&&!k(i.ustensils))&&(t.splice(s,1),s--)}return t}const W=({id:e,name:t,photo:n,time:s,description:i})=>`
  <div class="card__container" data-id="${e}">
    <img src="https://via.placeholder.com/350x150" alt="${n}" class="card__thumb">
    <div class="card__content">
      <div class="card__head">
        <h2 class="recipe__name">${t}</h2>
        <div class="time">          
          <p class="duration"> ${s} min</p>
        </div>
      </div>
      <div class="card__info">
        <div class="card__details">       
          <ul class="ingredients__details" id="ingredientList${e}"></ul>
        </div>
        <div class="card__desc">
          <p class="description">${i}</p>
        </div>
      </div>
    </div>
  </div>
  `;function G({id:e,ingredients:t}){const n=document.getElementById(`ingredientList${e}`);for(let s=0;s<t.length;s++){const i=t[s];n.insertAdjacentHTML("beforeend",K(i)),i.quantity==null?i.quantity="":i.quantity,i.unit==null?i.unit="":i.unit,i.unit=="grammes"?i.unit="g":i.unit,i.unit=="cuill\xE8res \xE0 soupe"?i.unit="cs":i.unit,i.unit=="Cuill\xE8res \xE0 soupe"?i.unit="cs":i.unit,i.unit=="cuill\xE8res \xE0 caf\xE9"?i.unit="cc":i.unit}}const K=e=>`
    <li>${e.ingredient}  <span>${e.quantity} ${e.unit}</span></li>
  `;function U(e){const t=document.getElementById("result__section");t.innerHTML="";for(let n=0;n<e.length;n++){const s=e[n];t.insertAdjacentHTML("beforeend",W(s)),G(s)}}function c(e){U(e)}let a=[],o={ingredients:new Set,appliance:"",ustensils:new Set};function Z(){const e=document.getElementById("mainField"),t=[...document.querySelectorAll(".dropdown-item")];for(const n of t)n.addEventListener("click",()=>{const s=n.dataset.type,i=n.dataset.value;s!="appliance"?o[s].add(i):o[s]=i,F(s,i),a=g(e),c(a),p(a),te(s,i)})}function J(){const e=document.getElementById("mainField"),t=document.querySelectorAll(".tag-list__item span");for(const n of t)n.addEventListener("click",()=>{const s=n.parentNode,i=n.parentNode.dataset.type,r=n.parentNode.dataset.value;s.remove(),i!="appliance"?o[i].delete(r):o.appliance="",a=g(e),c(a),p(a)})}function Q(e){c(e)}let l=[],d=[],u=[];function X(e){l=[],d=[],u=[];for(let t in e){const n=e[t];n.ingredients.forEach(s=>{l.includes(s.ingredient)||l.push(s.ingredient)}),n.ustensils.forEach(s=>{u.includes(s)||u.push(s)}),d.includes(n.appliance)||d.push(n.appliance)}return{ingredientList:l,applianceList:d,ustensilList:u}}function Y(e){const{ingredientList:t,applianceList:n,ustensilList:s}=X(e);h(t,"ingredients"),h(n,"appliance"),h(s,"ustensils"),Z(),J()}function h(e,t){const n=document.getElementById(`${t}List`);n.innerHTML="";for(let s=0;s<e.length;s++){const i=e[s],r=document.createElement("li");r.setAttribute("class","dropdown-item"),r.setAttribute("data-value",`${i}`),r.setAttribute("data-type",`${t}`),r.textContent=i,n.appendChild(r)}}function ee(){const e=Array.from(document.querySelectorAll(".dropdown__container")),t=document.getElementById("ingredientsList"),n=document.getElementById("applianceList"),s=document.getElementById("ustensilsList");for(const i of e)i.addEventListener("mouseover",()=>{i.contains(document.querySelector(".ingredients"))&&t.classList.add("show"),i.contains(document.querySelector(".appliance"))&&n.classList.add("show"),i.contains(document.querySelector(".ustensils"))&&s.classList.add("show")}),i.addEventListener("mouseout",()=>{i.contains(document.querySelector(".ingredients"))&&t.classList.remove("show"),i.contains(document.querySelector(".appliance"))&&n.classList.remove("show"),i.contains(document.querySelector(".ustensils"))&&s.classList.remove("show")})}function te(e,t){const n=document.querySelector(`#${e}List > li[data-value="${t}"]`);n.style.display="none"}function p(e){Y(e)}function ne(){ee()}function ie(){const e=document.getElementById("mainField"),t=[...document.querySelectorAll(".search__field")];let n=[];e.addEventListener("input",()=>{n=g(e),c(n),p(n),n.length===0&&H()});for(const s of t)s.addEventListener("input",()=>{s.value.length>2?z(s):s.value.length<3&&V(s.dataset.type)})}function se(){document.querySelector(".searchBar").addEventListener("submit",t=>{t.preventDefault()})}function re(e){ie(),se()}const oe=e=>{j(),p(e),ne(),c(e)};document.addEventListener("DOMContentLoaded",oe(m));re();Q(m);
