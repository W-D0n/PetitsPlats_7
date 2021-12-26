const L=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};L();let v="../../icons/logo.png",_=["footer","main","header"],w=["result__section","dropdown__section","tag-list__section","searchArea"],E=["ingredients","appliance","ustensils"];const b=e=>`
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
  `;function y(e,t,n){t.forEach(i=>{let s=e(i);n[0].insertAdjacentHTML("afterbegin",s)})}function B(e){document.getElementsByTagName("header")[0].insertAdjacentHTML("beforeend",T(e))}function I(){document.getElementById("searchArea").insertAdjacentHTML("beforeend",$())}function M(){document.getElementById("dropdown__section").insertAdjacentHTML("beforeend",A());const t=document.getElementById("tag-list__section"),n=document.createElement("ul");n.classList.add("tag-list"),t.appendChild(n)}function C(e){const t=document.querySelector(".navbar");e.forEach(n=>{t.insertAdjacentHTML("beforeend",q(n))})}const D=(e,t)=>`
  <li class="tag-list__item" data-type="${e}" data-value="${t}">${t}<span class="tag__close"></span></li>
  `;function H(e,t){const n=document.querySelector(".tag-list");n.querySelector(`[data-type="${e}"][data-value="${t}"]`)||n.insertAdjacentHTML("beforeend",D(e,t))}function F(){const e=document.getElementById("result__section"),t=document.createElement("p");t.classList.add("error"),t.innerHTML="Aucune recette ne correspond \xE0 votre crit\xE8re... vous pouvez chercher \xAB tarte aux pommes \xBB, \xAB poisson \xBB, etc.",e.insertAdjacentElement("beforeend",t)}function j(){y(b,_,document.getElementsByTagName("body")),y(S,w,document.getElementsByTagName("main")),B(v),I(),M(),C(E)}const x="../../data/Recipes.json";async function R(){let e=new Request(x,{method:"GET",mode:"cors"});try{return(await(await fetch(e)).json()).recipes}catch(t){console.error(t.status)}}const m=await R();function N(e,t){for(let n=0;n<t.length;n++)if(t[n].ingredient.toLowerCase().match(e))return!0;return!1}function O(e){const t=Array.from(o.ingredients),n=e.map(i=>i.ingredient.toLowerCase());for(let i=0;i<t.length;i++){const s=t[i].toLowerCase();if(!n.includes(s))return!1}return!0}function k(e){const t=Array.from(o.ustensils);for(let n=0;n<t.length;n++){const i=t[n];if(!e.includes(i))return!1}return!0}function z(e){let t=document.querySelectorAll(`#${e.dataset.type}List li`);P(t,e.value.toLowerCase())}function P(e,t){for(let n=0;n<e.length;n++){const i=e[n];i.textContent.toLowerCase().match(t)?i.style.display="block":i.style.display="none"}}function V(e){let t=document.querySelectorAll(`#${e}List li`);for(let n=0;n<t.length;n++){const i=t[n];i.style.display="block"}}function g(e){let t=[...m];const n=e.value.length>2;for(let i=0;i<t.length;i++){const s=t[i];(n&&!s.name.toLowerCase().match(e.value)&&!s.description.toLowerCase().match(e.value)&&!N(e.value,s.ingredients)||o.ingredients.size>0&&!O(s.ingredients)||o.appliance&&s.appliance!=o.appliance||o.ustensils.size>0&&!k(s.ustensils))&&(t.splice(i,1),i--)}return t}const W=({id:e,name:t,photo:n,time:i,description:s})=>`
  <div class="card__container" data-id="${e}">
    <img src="https://via.placeholder.com/350x150" alt="${n}" class="card__thumb">
    <div class="card__content">
      <div class="card__head">
        <h2 class="recipe__name">${t}</h2>
        <div class="time">          
          <p class="duration"> ${i} min</p>
        </div>
      </div>
      <div class="card__info">
        <div class="card__details">       
          <ul class="ingredients__details" id="ingredientList${e}"></ul>
        </div>
        <div class="card__desc">
          <p class="description">${s}</p>
        </div>
      </div>
    </div>
  </div>
  `;function G({id:e,ingredients:t}){const n=document.getElementById(`ingredientList${e}`);for(let i=0;i<t.length;i++){const s=t[i];n.insertAdjacentHTML("beforeend",K(s)),s.quantity==null?s.quantity="":s.quantity,s.unit==null?s.unit="":s.unit,s.unit=="grammes"?s.unit="g":s.unit,s.unit=="cuill\xE8res \xE0 soupe"?s.unit="cs":s.unit,s.unit=="Cuill\xE8res \xE0 soupe"?s.unit="cs":s.unit,s.unit=="cuill\xE8res \xE0 caf\xE9"?s.unit="cc":s.unit}}const K=e=>`
    <li>${e.ingredient}  <span>${e.quantity} ${e.unit}</span></li>
  `;function U(e){const t=document.getElementById("result__section");t.innerHTML="";for(let n=0;n<e.length;n++){const i=e[n];t.insertAdjacentHTML("beforeend",W(i)),G(i)}}function c(e){U(e)}let a=[],o={ingredients:new Set,appliance:"",ustensils:new Set};function Z(){const e=document.getElementById("mainField"),t=[...document.querySelectorAll(".dropdown-item")];for(const n of t)n.addEventListener("click",()=>{const i=n.dataset.type,s=n.dataset.value;i!="appliance"?o[i].add(s):o[i]=s,H(i,s),a=g(e),c(a),p(a),te(i,s)})}function J(){const e=document.getElementById("mainField"),t=document.querySelectorAll(".tag-list__item span");for(const n of t)n.addEventListener("click",()=>{const i=n.parentNode,s=n.parentNode.dataset.type,r=n.parentNode.dataset.value;i.remove(),s!="appliance"?o[s].delete(r):o.appliance="",a=g(e),c(a),p(a)})}function Q(e){c(e)}let l=[],d=[],u=[];function X(e){l=[],d=[],u=[];for(let t in e){const n=e[t];n.ingredients.forEach(i=>{l.includes(i.ingredient)||l.push(i.ingredient)}),n.ustensils.forEach(i=>{u.includes(i)||u.push(i)}),d.includes(n.appliance)||d.push(n.appliance)}return{ingredientList:l,applianceList:d,ustensilList:u}}function Y(e){const{ingredientList:t,applianceList:n,ustensilList:i}=X(e);h(t,"ingredients"),h(n,"appliance"),h(i,"ustensils"),Z(),J()}function h(e,t){const n=document.getElementById(`${t}List`);n.innerHTML="";for(let i=0;i<e.length;i++){const s=e[i],r=document.createElement("li");r.setAttribute("class","dropdown-item"),r.setAttribute("data-value",`${s}`),r.setAttribute("data-type",`${t}`),r.textContent=s,n.appendChild(r)}}function ee(){const e=Array.from(document.querySelectorAll(".dropdown__container")),t=document.getElementById("ingredientsList"),n=document.getElementById("applianceList"),i=document.getElementById("ustensilsList");for(const s of e)s.addEventListener("mouseover",()=>{s.contains(document.querySelector(".ingredients"))&&t.classList.add("show"),s.contains(document.querySelector(".appliance"))&&n.classList.add("show"),s.contains(document.querySelector(".ustensils"))&&i.classList.add("show")}),s.addEventListener("mouseout",()=>{s.contains(document.querySelector(".ingredients"))&&t.classList.remove("show"),s.contains(document.querySelector(".appliance"))&&n.classList.remove("show"),s.contains(document.querySelector(".ustensils"))&&i.classList.remove("show")})}function te(e,t){const n=document.querySelector(`#${e}List > li[data-value="${t}"]`);n.style.display="none"}function p(e){Y(e)}function ne(){ee()}function se(){const e=document.getElementById("mainField"),t=[...document.querySelectorAll(".search__field")];let n=[];e.addEventListener("input",()=>{n=g(e),c(n),p(n),n.length===0&&F()});for(const i of t)i.addEventListener("input",()=>{i.value.length>2?z(i):i.value.length<3&&V(i.dataset.type)})}function ie(){document.querySelector(".searchBar").addEventListener("submit",t=>{t.preventDefault()})}function re(e){se(),ie()}const oe=e=>{console.log(e),j(),p(e),ne(),c(e)};document.addEventListener("DOMContentLoaded",oe(m));re();Q(m);
