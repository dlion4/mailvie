const UserModel=Backbone.Model.extend({urlRoot:"/v2/account",url(){let url;return url="/v2/account"+`?api_key=${gon.api_key}`;}});document.addEventListener("turbo:load",()=>App.user=new UserModel(gon.user));