/* **************************************************** 
 * Algiers Developer Meetup — Website
 * Built On: October 9th 2015, 9:16:45
 ****************************************************** */ 

 !function(){var e=function(){var e,n=[],t=function(e,n){var t=document.getElementById(e),r=t.getElementsByTagName("script")[0].innerHTML,i=Handlebars.compile(r);t.innerHTML=i(n)},r=function(e){t("current-meetup-container",e)},i=function(e){t("prev-meetups-container",{meetups:e})},s=function(){document.getElementById("nav-show-trigger").addEventListener("click",function(e){var n=document.querySelectorAll(".nav-links")[0].style;"block"===n.display?n.display="none":n.display="block",e.preventDefault()},!1)},u=function(t){Qajax("/meetups.yml").then(Qajax.filterSuccess).get("responseText").then(function(t){for(var s=yaml.load(t).meetups,u=0;u<s.length;u++)s[u].current===!0?e=s[u]:n.push(s[u]);r(e),i(n)})};return{initEventsListeners:s,renderMeetups:u}}();e.initEventsListeners(),e.renderMeetups()}();