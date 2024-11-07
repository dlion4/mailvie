document.addEventListener("turbo:load",function(){if(!App.currentPageIs("messages","index")){return;}
return $("#send").on("click",()=>$("#sending").submit());});