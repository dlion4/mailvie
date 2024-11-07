document.addEventListener("turbo:load",function(){if(!App.currentPageIs("sessions","new")){return;}
return App.oauthConnect(".btn-google","/auth/google");});