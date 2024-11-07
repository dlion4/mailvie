App.components.confidenceScore=function(score,tag=false){let scoreClass="average-score"
if(score<30){scoreClass="low-score"}else if(score>=70){scoreClass="high-score"}
if(tag){return `<span class="tag" data-bs-toggle="tooltip" data-bs-container="body" title="${i18n.t("js.verification_status.confidence_score",{score:score})}">
            <span class="tag__label"><span class="score ${scoreClass} mr-1" aria-hidden="true"></span> ${score}%</span></span>`}else{return `<div class="score ${scoreClass}" data-bs-toggle="tooltip" data-bs-container="body"
            title="${i18n.t("js.verification_status.confidence_score",{score:score})}"></div>`}};