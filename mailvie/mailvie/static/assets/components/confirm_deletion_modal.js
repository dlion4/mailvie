App.components.confirmDeletionModal=function(deleteLink,title=null,content=null,buttonLabel=null,cancelBtnLabel=null){title=title===""?i18n.t("js.back.confirm_deletion_modal.title"):title
content=content===""?i18n.t("js.back.confirm_deletion_modal.content_html"):content
buttonLabel=buttonLabel===""?i18n.t("js.back.confirm_deletion_modal.button_label"):buttonLabel
cancelBtnLabel=cancelBtnLabel===""?i18n.t("js.back.confirm_deletion_modal.cancel"):cancelBtnLabel
const modal=document.createElement("div")
modal.id="confirm-deletion-modal"
modal.classList.add("modal","fade")
modal.innerHTML=`<div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h2 class="modal-title">${title}</h2>
                            <button type="button" class="modal-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          </div>
                          <div class="modal-body">
                            ${content}
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="h-button" data-bs-dismiss="modal">${cancelBtnLabel}</button>
                            <a href="${deleteLink}" data-turbo-method="delete" data-turbo-frame="_top" data-loading="${i18n.t("js.back.confirm_deletion_modal.deleting")}" class="h-button h-button--danger">${buttonLabel}</a>
                          </div>
                        </div>
                      </div>`
return modal};