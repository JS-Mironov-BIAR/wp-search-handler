!function(){"use strict";const e=document.querySelector(".cas-search-form"),t={search:document.getElementById("cas-search-submit"),clear:document.getElementById("cas-search-close"),loading:document.getElementById("cas-search-loader")};function n(e){Object.values(t).forEach((e=>{e&&(e.style.display="none")})),t[e]?t[e].style.display="inline-block":console.warn(`Неизвестное состояние кнопки: ${e}`)}const c=document.getElementById("cas-search-close");let a="search";function s(){n(a)}let r="",o="",i=!1,l=!1;function u(){let{resetLastStable:e=!0,resetInitial:t=!0,resetCleared:n=!0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e&&(r=""),t&&(o=""),n&&(i=!0)}function d(e){l=e}function m(){return l}function h(){return r}function f(e){e.innerHTML=""}function y(e){""!==e.innerHTML.trim()&&(e.style.display="block")}function v(e){setTimeout((()=>{e.style.display="none"}),300)}function g(e,t){!e.trim()||e.length<=3?f(t):m()||(d(!0),a="inline-block"===c.style.display?"clear":"search",n("loading"),fetch(cas_ajax.ajaxurl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},body:new URLSearchParams({action:"cas_ajax_search",search:e,nonce:cas_ajax.nonce})}).then((e=>e.json())).then((e=>{d(!1),s(),f(t),e.success&&e.data.length>0?(t.innerHTML=e.data.map((e=>`<li><a href="${e.link}">${e.title}</a><p>${e.excerpt}</p></li>`)).join(""),y(t)):(t.innerHTML="<li>Нет результатов</li>",y(t))})).catch((e=>{d(!1),s(),console.error("Search error:",e)})))}const E=document.getElementById("cas-search");function p(e){return e.replace(/\s+/g,"").toLowerCase()}function L(){E.blur()}let I;function T(e,t){e.addEventListener("input",(c=>function(e,t,c){if(m())return e.preventDefault(),void(t.value=h());clearTimeout(I);const a=t.value.trim();if(""===a)return u({resetInitial:!1}),f(c),v(c),void n("search");a.length<=3&&u(),a.length<=3&&0!==c.querySelectorAll("li").length&&(d(!1),f(c),v(c)),i&&(o=a,i=!1),p(a)!==p(h())&&(n(a.length>0?"clear":"search"),a.length<3||(I=setTimeout((()=>{if(!m()){if(p(a)===p(h()))return;g(a,c),r=a}}),1500)))}(c,e,t))),e.addEventListener("cut",(c=>function(e,t,c){m()?e.preventDefault():setTimeout((()=>{""===t.value.trim()&&(f(c),v(c),n("search"))}),10)}(c,e,t))),e.addEventListener("click",(()=>function(e){y(e)}(t)))}const B=document.getElementById("cas-search"),k=document.getElementById("cas-search-close");const b=document.getElementById("cas-search-submit");function j(){const t=document.querySelector(".cas-search-form"),c=document.getElementById("cas-search-results");!function(e){T(B,e)}(c),function(t){b.addEventListener("click",(c=>{c.preventDefault(),e.classList.add("active"),n("clear"),document.getElementById("cas-search").focus(),""!==document.getElementById("cas-search").value.trim()&&g(document.getElementById("cas-search").value,t)}))}(c),function(t){function c(c){c&&c.preventDefault(),clearTimeout(void 0),d(!1),L(),e.classList.remove("active"),m()||(u(),function(e){e.value=""}(B),clearTimeout(void 0)),o="",f(t),v(t),n("search")}k.addEventListener("click",c),document.addEventListener("keydown",(e=>{"Escape"!==e.key||m()||c()}))}(c),document.addEventListener("click",(e=>{t.contains(e.target)||c.contains(e.target)||(L(),v(c))}))}document.addEventListener("DOMContentLoaded",(()=>{j()}))}();