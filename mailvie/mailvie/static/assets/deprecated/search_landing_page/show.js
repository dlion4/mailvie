const hideLoader=()=>$(".search-loader").hide();const loadResults=function(token){const domain=$("#domain-name").text()
let trialResultsFrame=document.getElementById("trial-domain-search-results")
trialResultsFrame.src=`/trial/v2/domain-search.html?domain=${domain}&token=${token}&locale=${i18n.locale}`
trialResultsFrame.reload()
trialResultsFrame.loaded.then(function(){hideLoader();$(".sources-link").on("click",function(){if($(this).parents(".ds-result").find(".ds-sources-list").is(":visible")){$(this).parents(".ds-result").find(".ds-sources-list").slideUp(300);return $(this).find(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");}else{$(this).parents(".ds-result").find(".ds-sources-list").slideDown(300);return $(this).find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");}});App.tooltip(".ds-results [data-bs-toggle='tooltip']");$(".search-cta").removeClass("d-none");})};document.addEventListener("turbo:load",function(){let grecaptchaInterval;if(!App.currentPageIs("search_landing_page","show")){return;}
return grecaptchaInterval=setInterval((function(){if(window.grecaptcha){grecaptcha.ready(()=>grecaptcha.execute(gon.recaptcha_site_key,{action:"domain_search"}).then(token=>loadResults(token)));clearInterval(grecaptchaInterval);}}),100);});