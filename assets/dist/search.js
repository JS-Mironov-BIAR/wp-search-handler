!function(){"use strict";function e(e){const t=document.getElementById("cas-search-submit"),n=document.getElementById("cas-search-close"),c=0===document.getElementById("cas-search").value.trim().length;e&&!c?(t.style.display="none",n.style.display="inline-block"):(t.style.display="inline-block",n.style.display="none")}function t(e){e.innerHTML=""}function n(e){""!==e.innerHTML.trim()&&(e.style.display="block")}function c(e){setTimeout((()=>{e.style.display="none"}),300)}const s=document.getElementById("cas-search-close");function l(){s.style.display="none"}const a=document.querySelector(".cas-search-form"),i=document.getElementById("cas-search-loader"),o=document.getElementById("cas-search-submit"),r=document.getElementById("cas-search-close");let d="search";function u(){i.style.display="none","close"===d?r.style.display="inline-block":o.style.display="inline-block",m(!1)}function m(e){e?a.classList.add("loading"):a.classList.remove("loading")}function y(e,t){!e.trim()||e.length<=3?t.innerHTML="":M(!0)||(console.log("start search"),M(!0),d="inline-block"===r.style.display?"close":"search",i.style.display="inline-block",o.style.display="none",r.style.display="none",m(!0),fetch(cas_ajax.ajaxurl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},body:new URLSearchParams({action:"cas_ajax_search",search:e,nonce:cas_ajax.nonce})}).then((e=>e.json())).then((e=>{M(!1),u(),t.innerHTML="",e.success&&e.data.length>0?(t.innerHTML=e.data.map((e=>`<li><a href="${e.link}">${e.title}</a><p>${e.excerpt}</p></li>`)).join(""),n(t)):(t.innerHTML="<li>Нет результатов</li>",n(t))})).catch((e=>{M(!1),u(),console.error("Search error:",e)})))}const h=document.getElementById("cas-search-submit");function f(){h.style.display="inline-block"}const p=document.getElementById("cas-search"),g=document.getElementById("cas-search-results");let v,E=!1,L="",k="",T=!1;function b(e){return e.replace(/\s+/g,"").toLowerCase()}function B(){E||(p.value="",k="",L="",T=!0,l(),f(),t(g),c(g),clearTimeout(v))}function I(){p.blur()}function M(e){E=e}function j(){const a=document.querySelector(".cas-search-form"),i=document.getElementById("cas-search-results");(function(e){p.addEventListener("input",(()=>{if(E)return event.preventDefault(),void(p.value=L);clearTimeout(v);const n=p.value.trim();if(""===n)return L="",T=!0,t(e),c(e),l(),void f();n.length<=3&&(k="",L="",T=!0),T&&(k=n,T=!1),b(n)!==b(L)&&(n.length>0?(s.style.display="inline-block",h.style.display="none"):(l(),f()),n.length<=3&&0!==e.querySelectorAll("li").length&&(M(!1),t(e),c(e)),n.length<3||E||(v=setTimeout((()=>{if(!E){if(b(n)===b(L))return;y(n,e),L=n}}),1500)))})),p.addEventListener("cut",(n=>{E?n.preventDefault():setTimeout((()=>{""===p.value.trim()&&(t(e),c(e),l(),f())}),10)})),p.addEventListener("click",(()=>{n(e)}))})(i),function(t,n){h.addEventListener("click",(c=>{c.preventDefault(),function(e){e.classList.add("active")}(t),e(!0),document.getElementById("cas-search").focus(),""!==document.getElementById("cas-search").value.trim()&&y(document.getElementById("cas-search").value,n)}))}(a,i),function(n,l){function a(s){s&&s.preventDefault(),clearTimeout(void 0),M(!1),I(),function(e){e.classList.remove("active")}(n),B(),k="",t(l),c(l),e(!1)}s.addEventListener("click",a),document.addEventListener("keydown",(e=>{"Escape"===e.key&&a()}))}(a,i),document.addEventListener("click",(e=>{a.contains(e.target)||i.contains(e.target)||(I(),c(i))}))}document.addEventListener("DOMContentLoaded",(()=>{j()}))}();