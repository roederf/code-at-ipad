(()=>{"use strict";function e(e){return 20*e}function t(t){return{x:e(t.x),y:560-e(t.y)}}var n=new Image;function i(e,i){var a=t(i);e.drawImage(n,a.x-31,a.y-46)}n.src="donkey-kong.png";var a,l,c,r=null,o=null,g=!1,u=null;async function d(){a=parseInt(document.getElementById("EingabeWinkel").value),l=parseInt(document.getElementById("EingabeGeschwindigkeit").value),c={x:0,y:0},u=new Date,g=!0,console.log("Es wurde abgworfen")}function y(){if(r.clearRect(0,0,o.width,o.height),g){var n=((new Date).getTime()-u.getTime())/1e3;(c=function(e,t,n){var i=t*Math.PI/180;return{x:n*Math.cos(i)*e,y:n*Math.sin(i)*e-4.905*e*e}}(n,a,l)).y<0&&(g=!1),function(e,n){var i=t(n);e.beginPath(),e.arc(i.x,i.y,10,0,2*Math.PI),e.fillStyle="red",e.fill()}(r,c)}var d,h,m,f;i(r,{x:50,y:0}),i(r,{x:17,y:13}),m=r,f=t({x:15,y:0}),m.fillStyle="#000",m.fillRect(f.x,f.y,e(5),-e(13)),m.fillStyle="green",m.fillRect(f.x+1,f.y+1,e(5)-2,1-e(13)),i(r,{x:0,y:0}),(h=(d=document.getElementById("Spielflaeche")).getContext("2d")).clearRect(0,0,d.width,d.height),h.drawImage(o,0,0),requestAnimationFrame(y)}window.onload=function(){var e=document.getElementById("Spielflaeche");(o=document.createElement("canvas")).width=e.width,o.height=e.height,r=o.getContext("2d"),document.getElementById("EingabeButon").onclick=d,y()}})();