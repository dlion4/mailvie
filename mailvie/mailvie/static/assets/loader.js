import $ from "jquery"
window.$ = $
window.jQuery = $

// Customization for the application.
$.ajaxSetup({ cache: true })

import Backbone from "backbone"

import "@hotwired/turbo-rails"

// Backbone Rails Sync:
// The following code upates the sync function of Backbone to operate well with
// Ruby on Rails' CSRF protection.
//
(function($) {
  Backbone._sync = Backbone.sync;

  Backbone.sync = function(method, model, options) {
    if (!options.noCSRF) {
      var beforeSend = options.beforeSend;

      // Set X-CSRF-Token HTTP header
      options.beforeSend = function(xhr) {
        var token = $('meta[name="csrf-token"]').attr('content');
        if (token) xhr.setRequestHeader('X-CSRF-Token', token);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Serialize data, optionally using paramRoot
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      options.contentType = 'application/json';
      let data = JSON.stringify(options.attrs || model.toJSON(options));
      if (model.paramRoot) {
        data = {};
        data[model.paramRoot] = model.toJSON(options);
      } else {
        data = model.toJSON();
      }
      options.data = JSON.stringify(data);
    }

    return Backbone._sync(method, model, options);
  };

})(jQuery);

window.Backbone = Backbone

/**
*  Ajax Autocomplete for jQuery, version 1.4.2
*  (c) 2017 Tomas Kirda
*
*  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
*  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
*/
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports&&"function"==typeof require?require("jquery"):jQuery)}(function(a){"use strict";function b(c,d){const e=this;e.element=c,e.el=a(c),e.suggestions=[],e.badQueries=[],e.selectedIndex=-1,e.currentValue=e.element.value,e.timeoutId=null,e.cachedResponse={},e.onChangeTimeout=null,e.onChange=null,e.isLocal=!1,e.suggestionsContainer=null,e.noSuggestionsContainer=null,e.options=a.extend({},b.defaults,d),e.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"},e.hint=null,e.hintValue="",e.selection=null,e.initialize(),e.setOptions(d)}function c(a,b,c){return-1!==a.value.toLowerCase().indexOf(c)}function d(b){return"string"==typeof b?a.parseJSON(b):b}function e(a,b){if(!b)return a.value;const c="("+g.escapeRegExChars(b)+")";return a.value.replace(new RegExp(c,"gi"),"<strong>$1</strong>").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/&lt;(\/?strong)&gt;/g,"<$1>");}function f(a,b){return'<div class="autocomplete-group">'+b+"</div>"}var g=(() => ({
  escapeRegExChars(a) {return a.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&");},
  createNode(a) {const b=document.createElement("div");return b.className=a,b.style.position="absolute",b.style.display="none",b}
}))(),h={ESC:27,TAB:9,RETURN:13,LEFT:37,UP:38,RIGHT:39,DOWN:40},i=a.noop;b.utils=g,a.Autocomplete=b,b.defaults={ajaxSettings:{},autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:e,formatGroup:f,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:i,onSearchComplete:i,onSearchError:i,preserveInput:!1,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",currentRequest:null,triggerSelectOnValidInput:!0,preventBadQueries:!0,lookupFilter:c,paramName:"query",transformResult:d,showNoSuggestionNotice:!1,noSuggestionNotice:"No results",orientation:"bottom",forceFixPosition:!1},b.prototype={
  initialize() {let c, d=this, e="."+d.classes.suggestion, f=d.classes.selected, g=d.options;d.element.setAttribute("autocomplete","off"),d.noSuggestionsContainer=a('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0),d.suggestionsContainer=b.utils.createNode(g.containerClass),c=a(d.suggestionsContainer),c.appendTo(g.appendTo||"body"),"auto"!==g.width&&c.css("width",g.width),c.on("mouseover.autocomplete",e,function(){d.activate(a(this).data("index"))}),c.on("mouseout.autocomplete",function(){d.selectedIndex=-1,c.children("."+f).removeClass(f)}),c.on("click.autocomplete",e,function(){d.select(a(this).data("index"))}),c.on("click.autocomplete",function(){clearTimeout(d.blurTimeoutId)}),d.fixPositionCapture=function(){d.visible&&d.fixPosition()},a(window).on("resize.autocomplete",d.fixPositionCapture),d.el.on("keydown.autocomplete",function(a){d.onKeyPress(a)}),d.el.on("keyup.autocomplete",function(a){d.onKeyUp(a)}),d.el.on("blur.autocomplete",function(){d.onBlur()}),d.el.on("focus.autocomplete",function(){d.onFocus()}),d.el.on("change.autocomplete",function(a){d.onKeyUp(a)}),d.el.on("input.autocomplete",function(a){d.onKeyUp(a)})},
  onFocus() {const a=this;a.fixPosition(),a.el.val().length>=a.options.minChars&&a.onValueChange()},
  onBlur() {const a=this;a.blurTimeoutId=setTimeout(function(){a.hide()},200)},
  abortAjax() {const a=this;a.currentRequest&&(a.currentRequest.abort(),a.currentRequest=null)},
  setOptions(b) {const c=this, d=c.options;this.options=a.extend({},d,b),c.isLocal=Array.isArray(d.lookup),c.isLocal&&(d.lookup=c.verifySuggestionsFormat(d.lookup)),d.orientation=c.validateOrientation(d.orientation,"bottom"),a(c.suggestionsContainer).css({"max-height":d.maxHeight+"px",width:d.width+"px","z-index":d.zIndex})},
  clearCache() {this.cachedResponse={},this.badQueries=[]},
  clear() {this.clearCache(),this.currentValue="",this.suggestions=[]},
  disable() {const a=this;a.disabled=!0,clearTimeout(a.onChangeTimeout),a.abortAjax()},
  enable() {this.disabled=!1},
  fixPosition() {const b=this, c=a(b.suggestionsContainer), d=c.parent().get(0);if(d===document.body||b.options.forceFixPosition){let e=b.options.orientation, f=c.outerHeight(), g=b.el.outerHeight(), h=b.el.offset(), i={top:h.top,left:h.left};if("auto"===e){const j=a(window).height(), k=a(window).scrollTop(), l=-k+h.top-f, m=k+j-(h.top+g+f);e=Math.max(l,m)===l?"top":"bottom"}if("top"===e?i.top+=-f:i.top+=g,d!==document.body){let n, o=c.css("opacity");b.visible||c.css("opacity",0).show(),n=c.offsetParent().offset(),i.top-=n.top,i.left-=n.left,b.visible||c.css("opacity",o).hide()}"auto"===b.options.width&&(i.width=b.el.outerWidth()+"px"),c.css(i)}},
  isCursorAtEnd() {let a, b=this, c=b.el.val().length, d=b.element.selectionStart;return"number"==typeof d?d===c:document.selection?(a=document.selection.createRange(),a.moveStart("character",-c),c===a.text.length):!0},
  onKeyPress(a) {const b=this;if(!b.disabled&&!b.visible&&a.which===h.DOWN&&b.currentValue)return void b.suggest();if(!b.disabled&&b.visible){switch(a.which){case h.ESC:b.el.val(b.currentValue),b.hide();break;case h.RIGHT:if(b.hint&&b.options.onHint&&b.isCursorAtEnd()){b.selectHint();break}return;case h.TAB:if(b.hint&&b.options.onHint)return void b.selectHint();if(-1===b.selectedIndex)return void b.hide();if(b.select(b.selectedIndex),b.options.tabDisabled===!1)return;break;case h.RETURN:if(-1===b.selectedIndex)return void b.hide();b.select(b.selectedIndex);break;case h.UP:b.moveUp();break;case h.DOWN:b.moveDown();break;default:return}a.stopImmediatePropagation(),a.preventDefault()}},
  onKeyUp(a) {const b=this;if(!b.disabled){switch(a.which){case h.UP:case h.DOWN:return}clearTimeout(b.onChangeTimeout),b.currentValue!==b.el.val()&&(b.findBestHint(),b.options.deferRequestBy>0?b.onChangeTimeout=setTimeout(function(){b.onValueChange()},b.options.deferRequestBy):b.onValueChange())}},
  onValueChange() {const b=this, c=b.options, d=b.el.val(), e=b.getQuery(d);return b.selection&&b.currentValue!==e&&(b.selection=null,(c.onInvalidateSelection||a.noop).call(b.element)),clearTimeout(b.onChangeTimeout),b.currentValue=d,b.selectedIndex=-1,c.triggerSelectOnValidInput&&b.isExactMatch(e)?void b.select(0):void(e.length<c.minChars?b.hide():b.getSuggestions(e))},
  isExactMatch(a) {const b=this.suggestions;return 1===b.length&&b[0].value.toLowerCase()===a.toLowerCase()},
  getQuery(b) {let c, d=this.options.delimiter;return d?(c=b.split(d),a.trim(c[c.length-1])):b},
  getSuggestionsLocal(b) {let c, d=this, e=d.options, f=b.toLowerCase(), g=e.lookupFilter, h=parseInt(e.lookupLimit,10);return c={suggestions:a.grep(e.lookup,a => g(a,b,f))},h&&c.suggestions.length>h&&(c.suggestions=c.suggestions.slice(0,h)),c;},
  getSuggestions(b) {let c, d, e, f, g=this, h=g.options, i=h.serviceUrl;if(h.params[h.paramName]=b,h.onSearchStart.call(g.element,h.params)!==!1){if(d=h.ignoreParams?null:h.params,a.isFunction(h.lookup))return void h.lookup(b,function(a){g.suggestions=a.suggestions,g.suggest(),h.onSearchComplete.call(g.element,b,a.suggestions)});g.isLocal?c=g.getSuggestionsLocal(b):(a.isFunction(i)&&(i=i.call(g.element,b)),e=i+"?"+a.param(d||{}),c=g.cachedResponse[e]),c&&Array.isArray(c.suggestions)?(g.suggestions=c.suggestions,g.suggest(),h.onSearchComplete.call(g.element,b,c.suggestions)):g.isBadQuery(b)?h.onSearchComplete.call(g.element,b,[]):(g.abortAjax(),f={url:i,data:d,type:h.type,dataType:h.dataType},a.extend(f,h.ajaxSettings),g.currentRequest=a.ajax(f).done(function(a){let c;g.currentRequest=null,c=h.transformResult(a,b),g.processResponse(c,b,e),h.onSearchComplete.call(g.element,b,c.suggestions)}).fail(function(a,c,d){h.onSearchError.call(g.element,b,a,c,d)}))}},
  isBadQuery(a) {if(!this.options.preventBadQueries)return!1;for(let b=this.badQueries, c=b.length;c--;)if(0===a.indexOf(b[c]))return!0;return!1},
  hide() {const b=this, c=a(b.suggestionsContainer);a.isFunction(b.options.onHide)&&b.visible&&b.options.onHide.call(b.element,c),b.visible=!1,b.selectedIndex=-1,clearTimeout(b.onChangeTimeout),a(b.suggestionsContainer).hide(),b.signalHint(null)},
  suggest() {if(!this.suggestions.length)return void(this.options.showNoSuggestionNotice?this.noSuggestions():this.hide());let b, c=this, d=c.options, e=d.groupBy, f=d.formatResult, g=c.getQuery(c.currentValue), h=c.classes.suggestion, i=c.classes.selected, j=a(c.suggestionsContainer), k=a(c.noSuggestionsContainer), l=d.beforeRender, m="", n=function(a,c){const f=a.data[e];return b===f?"":(b=f,d.formatGroup(a,b))};return d.triggerSelectOnValidInput&&c.isExactMatch(g)?void c.select(0):(a.each(c.suggestions,function(a,b){e&&(m+=n(b,g,a)),m+='<div class="'+h+'" data-index="'+a+'">'+f(b,g,a)+"</div>"}),this.adjustContainerWidth(),k.detach(),j.html(m),a.isFunction(l)&&l.call(c.element,j,c.suggestions),c.fixPosition(),j.show(),d.autoSelectFirst&&(c.selectedIndex=0,j.scrollTop(0),j.children("."+h).first().addClass(i)),c.visible=!0,void c.findBestHint())},
  noSuggestions() {const b=this, c=b.options.beforeRender, d=a(b.suggestionsContainer), e=a(b.noSuggestionsContainer);this.adjustContainerWidth(),e.detach(),d.empty(),d.append(e),a.isFunction(c)&&c.call(b.element,d,b.suggestions),b.fixPosition(),d.show(),b.visible=!0},
  adjustContainerWidth() {let b, c=this, d=c.options, e=a(c.suggestionsContainer);"auto"===d.width?(b=c.el.outerWidth(),e.css("width",b>0?b:300)):"flex"===d.width&&e.css("width","")},
  findBestHint() {let b=this, c=b.el.val().toLowerCase(), d=null;c&&(a.each(b.suggestions,function(a,b){const e=0===b.value.toLowerCase().indexOf(c);return e&&(d=b),!e}),b.signalHint(d))},
  signalHint(b) {let c="", d=this;b&&(c=d.currentValue+b.value.substr(d.currentValue.length)),d.hintValue!==c&&(d.hintValue=c,d.hint=b,(this.options.onHint||a.noop)(c))},

  verifySuggestionsFormat(b) {return b.length&&"string"==typeof b[0]?a.map(b,a => ({
    value:a,
    data:null
  })):b;},

  validateOrientation(b, c) {return b=a.trim(b||"").toLowerCase(),-1===a.inArray(b,["auto","bottom","top"])&&(b=c),b},
  processResponse(a, b, c) {const d=this, e=d.options;a.suggestions=d.verifySuggestionsFormat(a.suggestions),e.noCache||(d.cachedResponse[c]=a,e.preventBadQueries&&!a.suggestions.length&&d.badQueries.push(b)),b===d.getQuery(d.currentValue)&&(d.suggestions=a.suggestions,d.suggest())},
  activate(b) {let c, d=this, e=d.classes.selected, f=a(d.suggestionsContainer), g=f.find("."+d.classes.suggestion);return f.find("."+e).removeClass(e),d.selectedIndex=b,-1!==d.selectedIndex&&g.length>d.selectedIndex?(c=g.get(d.selectedIndex),a(c).addClass(e),c):null},
  selectHint() {const b=this, c=a.inArray(b.hint,b.suggestions);b.select(c)},
  select(a) {const b=this;b.hide(),b.onSelect(a)},
  moveUp() {const b=this;if(-1!==b.selectedIndex)return 0===b.selectedIndex?(a(b.suggestionsContainer).children().first().removeClass(b.classes.selected),b.selectedIndex=-1,b.el.val(b.currentValue),void b.findBestHint()):void b.adjustScroll(b.selectedIndex-1)},
  moveDown() {const a=this;a.selectedIndex!==a.suggestions.length-1&&a.adjustScroll(a.selectedIndex+1)},
  adjustScroll(b) {const c=this, d=c.activate(b);if(d){let e, f, g, h=a(d).outerHeight();e=d.offsetTop,f=a(c.suggestionsContainer).scrollTop(),g=f+c.options.maxHeight-h,f>e?a(c.suggestionsContainer).scrollTop(e):e>g&&a(c.suggestionsContainer).scrollTop(e-c.options.maxHeight+h),c.options.preserveInput||c.el.val(c.getValue(c.suggestions[b].value)),c.signalHint(null)}},
  onSelect(b) {const c=this, d=c.options.onSelect, e=c.suggestions[b];c.currentValue=c.getValue(e.value),c.currentValue===c.el.val()||c.options.preserveInput||c.el.val(c.currentValue),c.signalHint(null),c.suggestions=[],c.selection=e,a.isFunction(d)&&d.call(c.element,e)},
  getValue(a) {let b, c, d=this, e=d.options.delimiter;return e?(b=d.currentValue,c=b.split(e),1===c.length?a:b.substr(0,b.length-c[c.length-1].length)+a):a},
  dispose() {const b=this;b.el.off(".autocomplete").removeData("autocomplete"),a(window).off("resize.autocomplete",b.fixPositionCapture),a(b.suggestionsContainer).remove()}
},a.fn.devbridgeAutocomplete=function(c,d){const e="autocomplete";return arguments.length?this.each(function(){let f=a(this), g=f.data(e);"string"==typeof c?g&&"function"==typeof g[c]&&g[c](d):(g&&g.dispose&&g.dispose(),g=new b(this,c),f.data(e,g))}):this.first().data(e);},a.fn.autocomplete||(a.fn.autocomplete=a.fn.devbridgeAutocomplete)});

// i18n configuration
import { I18n } from "i18n-js";

const i18n = new I18n();
i18n.enableFallback = true;

  i18n.store({
  "en": {
    "js": {
      "add": "Add",
      "and": "and",
      "back": {
        "bulks": {
          "bulk_email_finders": {
            "not_found": "Not found"
          }
        },
        "campaigns": {
          "audience": {
            "all_values": "Has any value",
            "already_contacted_html": "<td><strong>Already contacted</strong></td>",
            "canceling": "Canceling…",
            "confirm_remove_recipient": "Do you really want to remove %{email} from the audience?",
            "contains_value": "Contains %{value}",
            "email_not_verified": "Not verified",
            "error_loading_leads": "Error while loading the leads.",
            "filter_required": "Please select the value of the filter.",
            "is_empty": "Is empty",
            "lead_selection_count": {
              "one": "1 lead selected",
              "other": "%{count} leads selected"
            },
            "more_leads_hint": "And %{count} leads like this",
            "never_contacted_before": "Never contacted before",
            "never_contacted_html": "<td>Never contacted</td>",
            "no_leads_found": "No recipients to add",
            "no_leads_found_html": "The campaigns can be sent to your leads. Save more leads in Hunter or import external leads to send your campaign to.<br/><br/><a class='%{btn_class}' href='%{path}'><div class='%{class}'></div>Import leads</a>",
            "no_leads_found_with_filters": "Modify or remove some of the filters on the left to increase the size of the selection.",
            "no_recipients_to_cancel": "No recipients to cancel scheduled emails to.",
            "no_recipients_to_remove": "No recipients to remove.",
            "recipient_selection_count": {
              "one": "Add 1 recipient",
              "other": "Add %{count} recipients"
            },
            "removing": "Removing…"
          },
          "cancel": {
            "canceling": "Canceling"
          },
          "content": {
            "add_bcc_recipient": "Add BCC",
            "follow_up_placeholder": "Keep empty to send as a reply to your previous email",
            "invalid_bcc_email": "The format of the BCC recipient is invalid",
            "max_number_follow_ups_reached": "It's not possible to add more than %{count} follow-ups.",
            "pause_campaign_first": "You need to pause the campaign first.",
            "remove_bcc_recipient": "Remove BCC"
          },
          "follow_up": {
            "delete_first_follow_up_error": "The introduction message cannot be deleted.",
            "delete_success": "Follow-up successfully removed"
          },
          "reporting": {
            "graphs": {
              "export_date": "from %{start_date} to %{end_date}."
            }
          },
          "settings": {
            "additional_permissions_required": "Additional permissions are required for this account.",
            "ask_owner_to_reconnect": "Please ask %{email} to reconnect to continue using it.",
            "connected": "Connected",
            "connection_has_expired": "The connection to the account has expired.",
            "disconnected": "Disconnected",
            "permissions_required": "Permissions required",
            "please_reconnect": "Please reconnect to continue using it.",
            "please_reconnect_html": "Click <a href=\"%{href}\">here</a> to reconnect to continue using it.",
            "reconnect": "Reconnect"
          }
        },
        "checkout": {
          "errors": {
            "missing_billing_information": "Please complete your billing information.",
            "payment_process": "There was an error while processing your payment. Please try again with a new payment method or contact us, we'll be glad to help!",
            "saving_billing_infos": "We could not save your billing information, please try again or contact us, we'll be glad to help!",
            "saving_credit_card": "Error while saving your payment method, please try again or contact us, we'll be glad to help!"
          }
        },
        "company_actions": {
          "modal_delete": {
            "one": "Are you sure you want to delete the selected company from all lists?",
            "other": "Are you sure you want to delete %{number} companies from all lists?"
          }
        },
        "confirm_deletion_modal": {
          "button_label": "Delete",
          "cancel": "Cancel",
          "content_html": "This action cannot be undone.<br><strong>Do you really wish to proceed?</strong>",
          "deleting": "Deleting…",
          "title": "Confirm deletion"
        },
        "discover": {
          "export_button": "Export first %{count}"
        },
        "domain_search": {
          "download": "Download the file",
          "download_all_the_email_addresses": "all the %{count} email addresses",
          "download_the_first_email_addresses": "the first %{count} email addresses",
          "generate": "Generate the file",
          "lead_save": {
            "saved_tooltip": "Saved in %{name}"
          }
        },
        "engagement": {
          "select_messages_to_stop_sequence": "Select at least a recipient to stop follow-ups in the linked email campaign."
        },
        "filters": {
          "elements_count": {
            "one": "1 element",
            "other": "%{count} elements"
          },
          "search_results_count": {
            "one": "1 result",
            "other": "%{count} results",
            "zero": "No result"
          }
        },
        "lead_actions": {
          "adding": "Adding…",
          "adding_to_campaign": "Please wait as we're processing your request.",
          "connect_google_account_html": "Connect your email account to send campaigns with Hunter. <a target=\"_blank\" href=\"/cold-email-software\">Get started</a>",
          "count_selected_leads": {
            "one": "1 lead selected",
            "other": "%{leads_count} leads selected"
          },
          "creating_campaign": "Please wait as we're processing your request.",
          "delete_leads": {
            "one": "Do you really want to delete 1 lead? All associated scheduled emails will be canceled. This action cannot be undone.",
            "other": "Do you really want to delete %{leads} leads? All associated scheduled emails will be canceled. This action cannot be undone."
          },
          "deleting": "Deleting…",
          "filter_or_select_leads_to_a_campaign": "Apply a filter or select at least one lead you'd like to add to a campaign.",
          "filter_or_select_leads_to_new_campaign": "Apply a filter or select at least one lead you'd like to add to a new campaign.",
          "filter_or_select_recipients_to_a_campaign": "Apply a filter or select at least one recipient you'd like to add to a campaign.",
          "filter_or_select_recipients_to_new_campaign": "Apply a filter or select at least one recipient you'd like to add to a new campaign.",
          "find_emails": {
            "overage": {
              "confirm_button": "Accept and verify",
              "description": {
                "one": "Your request will consume up to 1 Search credit, exceeding your quota.",
                "other": "Your request will consume up to %{leads} Search credits, exceeding your quota."
              },
              "title": "Confirm overage credits usage"
            },
            "verify": {
              "confirm_button": {
                "one": "Find email address",
                "other": "Find email addresses"
              },
              "description": {
                "one": "Your request will consume up to 1 Search credit.",
                "other": "Your request will consume up to %{leads} Search credits."
              },
              "title": {
                "one": "Find lead email address",
                "other": "Find lead email addresses"
              }
            }
          },
          "overage_verify_usage": "Are you sure? This will use overage requests",
          "verify_leads": {
            "overage": {
              "confirm_button": "Accept and verify",
              "description": {
                "one": "Your request will consume up to 1 Verification credit, exceeding your quota.",
                "other": "Your request will consume up to %{leads} Verification credits, exceeding your quota."
              },
              "title": "Confirm overage credits usage"
            },
            "verify": {
              "confirm_button": "Verify my leads",
              "description": {
                "one": "Your request will consume up to 1 Verification credit.",
                "other": "Your request will consume up to %{leads} Verification credits."
              },
              "title": "Verify leads"
            }
          }
        },
        "lead_campaigns_manager": {
          "added": "%{lead} was successfully added to %{campaign}",
          "bounced": "%{lead} bounced before so it cannot be added to %{campaign}",
          "duplicate": "%{lead} is already a recipient of %{campaign}",
          "not_added": "%{lead} was not added to %{campaign}",
          "removed": "%{lead} was already removed from %{campaign}",
          "unsubscribed": "%{lead} is unsubscribed so it cannot be added to %{campaign}"
        },
        "lead_details": {
          "show_less": "Show less fields",
          "show_more": "Show more fields"
        },
        "lead_import_configuration": {
          "attribute_created": "%{label} has been created",
          "failed_to_create_attribute": "Failed to create a new attribute: %{error}"
        },
        "lead_save": {
          "already_saved": "You already saved this lead!",
          "error": "Something went wrong, please try again later.",
          "saved": "saved"
        },
        "lead_save_manager": {
          "saved": "%{lead} successfully saved"
        },
        "leads_list": {
          "favorite": {
            "add": "Add to favorites",
            "added": "Added to your favorites.",
            "error": "Something went wrong on our side. Please try again later.",
            "remove": "Remove from favorites",
            "removed": "Removed from your favorites."
          }
        },
        "leads_manager": {
          "name_already_exists": "A list with this name already exist. Use another name or select the current list.",
          "saved": "saved"
        },
        "navigation": {
          "click_here_to_unlock_account": "Click here to unlock your account"
        },
        "quantity_selector": {
          "error_message": "The value must be in the range %{min} to %{max}."
        },
        "sidepanel": {
          "bulk_search_form": {
            "description": {
              "one": "%{company_names}, and 1 other.",
              "other": "%{company_names}, and %{number} others.",
              "zero": "%{company_names}."
            },
            "title": {
              "one": "1 company selected",
              "other": "%{number} companies selected"
            }
          },
          "leads": {
            "description": {
              "one": "%{company_names}, and 1 other.",
              "other": "%{company_names}, and %{number} others.",
              "zero": "%{company_names}."
            },
            "name_list": {
              "one": "Name the list you want to add the company to",
              "other": "Name the list you want to add the %{count} companies to"
            },
            "select_list": {
              "one": "Select the list you want to add the company to",
              "other": "Select the list you want to add the %{count} companies to"
            },
            "title": {
              "one": "1 company selected",
              "other": "%{number} companies selected"
            }
          }
        },
        "signal_actions": {
          "select_at_least_one": "Please select at least one company."
        }
      },
      "company": "company",
      "copied": "Copied!",
      "copy": "Copy",
      "count_selected": "%{count} selected",
      "devise": {
        "registration": {
          "new": {
            "continue": "Continue",
            "continue_with_email_address": "Continue with this email address",
            "disposable_email_address_html": "<p>Unfortunately, it isn't possible to sign up using a disposable email address. Please use a professional email address instead (for example <strong>youraddress@yourcompany.com</strong>).</p>",
            "forbidden_webmail_html": "<p>Unfortunately, it isn't possible to sign up using a webmail address. Please use a professional email address instead (for example <strong>youraddress@yourcompany.com</strong>).</p>",
            "invalid_email_address_html": "<p>This email address looks invalid. Please enter an email address in format: <strong>youraddress@yourcompany.com</strong></p>",
            "loading": "Loading…",
            "meta_title_html": "Sign up • Hunter",
            "team_invite_domain_mismatch_html": "<p>Unfortunately, it isn't possible to sign up using this address. Please use a professional email address instead (for example <strong>youraddress@%{domain}</strong>).</p>",
            "warning_email_html": "<p>You can create an account with this email address, but we strongly encourage using a professional email address such as <strong>youraddress@yourcompany.com</strong> instead of a webmail.</p><p>Accounts created with webmail, such as %{example}, are more likely to be limited to avoid abuses on Hunter.</p><p><a class='go-to-step2' id='ignore-webmail-warning'>Ignore and continue</a></p>"
          }
        }
      },
      "domain": "domain",
      "download": "Download",
      "failed": "Failed",
      "find": "Find",
      "front": {
        "api_errors": {
          "daily_finder_limit_reached_html": "You have reached your free quota. Please <a href=\"/users/sign_up?from=email_finder\" data-turbo-frame=\"_top\">create a free account</a> to search more email addresses.",
          "daily_search_limit_reached_html": "You've reached your daily limitation. Please <a href=\"/users/sign_up?from=domain_search\" data-turbo-frame=\"_top\">create a free account</a> or <a href=\"/users/sign_in\" data-turbo-frame=\"_top\">sign in</a> to do more searches!",
          "daily_verifier_limit_reached_html": "You have reached your free quota. Please <a href=\"/users/sign_up?from=email_verifier\" data-turbo-frame=\"_top\">create a free account</a> to make more verifications.",
          "internal_server_error": "Something went wrong on our side, please try again later.",
          "search_rate_limit_reached": "Too many requests were made. Please spread your requests to avoid reaching our rate-limiting.",
          "verification_internal_server_error": "Something went wrong on our side with the verification. Please try again later."
        },
        "domain_autocomplete": {
          "results_count": {
            "one": "1 result",
            "other": "%{count} results",
            "zero": "No results"
          }
        },
        "domain_search": {
          "action": {
            "long": "Find email addresses",
            "short": "Search"
          },
          "and": "And",
          "click_to_launch_verification": "Click to launch a new verification",
          "click_to_see_check_result": "Click to see the complete check result",
          "disposable_domain_html": "The domain <strong>%{domain}</strong> is used to create disposable email addresses. These email addresses are not returned in Hunter.",
          "download_success": "Results successfully downloaded.",
          "file_generation": "The file is being generated.",
          "first_name": "First name",
          "first_name_initial": "First name initial",
          "hidden_email_hint": "Please log in to see the entire email addresses.",
          "last_name": "Last name",
          "last_name_initial": "Last name initial",
          "more_for_domain": "more for %{domain}",
          "more_results_for_domain_html": "And <strong>%{count}</strong> more for %{domain}",
          "most_common_pattern": "Most common pattern:",
          "no_results_for_domain": "%{domain} (no results)",
          "no_results_found_but_linked_domain_html": "No email addresses found. <a href='%{path}'>Try with %{linked_domain}</a>.",
          "no_results_found_but_try_without_filters_html": "No email addresses found. <a href='%{path}'>Try without filters</a>.",
          "no_results_found_html": "No email addresses found. <a href=\"https://help.hunter.io/en/articles/2452480-why-don-t-i-find-any-email-addresses-for-a-domain-name\" target=\"_blank\">Why?</a>",
          "not_a_domain_name_html": "<p>This doesn't look like a domain name!</p><p>For example, try <button class='btn-empty try-domain'>salesforce.com</button> or <button class='btn-empty try-domain'>techcrunch.com</button>.</p>",
          "not_correct_domain_name": "Please enter a domain name, for example \"google.com\".",
          "number_of_emails": {
            "one": "%{count} email address",
            "other": "%{count} email addresses"
          },
          "number_of_results": {
            "one": "%{results_count} result",
            "other": "%{results_count} results",
            "zero": "no results"
          },
          "one_more_result": {
            "with_cta_html": "<strong>One more result</strong> for %{domain}. <a href=\"/users/sign_up\">Sign up</a> or <a href=\"/users/sign_in\">log in</a> to access the full results.",
            "without_cta": "One more result for %{domain}"
          },
          "results_title_html": {
            "one": "<strong>1 result</strong> <span class='hidden-xs'>for your search</span>",
            "other": "<strong>%{results_count} results</strong> <span class='hidden-xs'>for your search</span>",
            "zero": "<strong>No results</strong> <span class='hidden-xs'>for your search</span>"
          },
          "save_the_lead": "Save the lead",
          "show_more_results": "Show more results",
          "sources_count": {
            "get_20": "20+ sources",
            "one": "1 source",
            "other": "%{count} sources"
          },
          "title_with_domain_and_results": {
            "one": "%{domain} (%{results_count} result)",
            "other": "%{domain} (%{results_count} results)"
          },
          "verification_too_long": "The email verification is taking longer than expected. Please try again later.",
          "verify_again": "Verify again",
          "verify_email_html": "Would you like to <a href='/verify/%{email}'>verify %{email}</a>? The Domain Search is used to find email addresses from a domain name (for example, \"%{domain}\"), but you entered an email address.",
          "verifying": "Verifying…",
          "webmail_domain_html": "The domain <strong>%{domain}</strong> is used to create personal email addresses. These email addresses are not returned in Hunter which is designed for professional use only."
        },
        "email_finder": {
          "cta": "Find",
          "error_try_later": "An error occured. Please try again later.",
          "flash_no_email_found": "We didn't find the email address of this person.",
          "no_email_found": {
            "description_html": "<p>We couldn't find the email address for this person. It can happen for three main reasons:</p> <ul><li>We don't have enough data related to this domain name.</li><li>We couldn't find a reliable match for this name.</li><li>The server of this email address takes too long to respond</li></ul>",
            "more_link_html": "<a href=\"https://help.hunter.io/en/articles/4123615-why-doesn-t-the-email-finder-return-any-results\" target=\"_blank\" lang=\"en\">Learn more</a>",
            "title": "No results."
          },
          "not_a_full_name": "Please enter the full name of the person you'd like to find the email address.",
          "not_correct_domain_name": "Please enter a domain name, for example \"google.com\".",
          "tooltip_enter_full_name": "Please enter the full name of the person to find the email address.",
          "tooltip_press_enter_to_find": "Press enter to find the email address."
        },
        "email_verifier": {
          "deliverable": {
            "message": "This email address can be used safely.",
            "risky": {
              "accept_all": {
                "message": "The domain %{domain} accepts all the email addresses."
              },
              "unknown": {
                "message": "This email address couldn't be verified."
              }
            }
          },
          "detailed_statuses": {
            "accept_all": "Accept all",
            "blocked": "Blocked",
            "disposable": "Disposable",
            "gibberish": "Gibberish",
            "professional": "Professional",
            "webmail": "Webmail"
          },
          "disposable_address": "This is a disposable email address. No verification was performed, as this domain name is used to hide real email addresses.",
          "email_count_results_link": "See all results",
          "email_count_results_title": {
            "one": "We found one email address for %{domain}",
            "other": "We found %{results_count} email addresses for %{domain}"
          },
          "email_format_description": {
            "gibberish": "This email address seems to be gibberish.",
            "invalid": "This email address has an invalid format.",
            "valid": "This email address has the correct format and is not gibberish."
          },
          "email_status_description": {
            "accept_all_html": "This email address is linked to an accept-all domain. There is no definitive way to determine whether this email is valid or invalid. <br><span class='black'><a href='https://help.hunter.io/en/articles/1935079-what-does-an-accept-all-email-status-mean' lang='en' target='_blank'>Find out more.</a></span>",
            "blocked_html": "This email address is blocked. <a href=\"https://help.hunter.io/en/articles/2614463-why-can-t-some-emails-be-verified\" target=\"_blank\" data-turbo-frame=\"_top\">Learn more.</a>",
            "invalid": "This email address can't receive emails.",
            "valid": "This email address exists and can receive emails."
          },
          "email_type_description": {
            "disposable": "This is a disposable email address. This domain name is used to hide real email addresses.",
            "professional": "The domain name isn't used for webmails or for creating temporary email addresses.",
            "webmail": "This is a webmail email address. This domain name is used to create personal email addresses."
          },
          "follow_company": {
            "cta": "Follow this company",
            "description": "Get notified when %{company} opens new jobs, raises funds, and more.",
            "title": "Stay informed about changes at %{company}."
          },
          "found_success_html": "We used data from <strong>%{sources_link}</strong> on the web.",
          "mail_server_too_long_for": "The mail server for %{email} took too long to respond. Please try again later.",
          "mail_server_too_slow_for": "The mail server for %{email} is slow to respond. The verification may take up to 2 minutes.",
          "not_deliverable": {
            "message": "This email address isn't used to receive emails."
          },
          "not_on_page": "The email address is no longer on the page",
          "not_public": "This email address has been verified by Hunter.",
          "removed": "Removed",
          "server_status_description": {
            "invalid": "MX records are not present for the domain, or we cannot connect to the SMTP server.",
            "valid": "MX records are present for the domain and we can connect to the SMTP server these MX records point to."
          },
          "sources_count": {
            "above_twenty": "20+ sources",
            "one": "1 source",
            "other": "%{count} sources"
          },
          "status": {
            "accept_all": "%{domain} accepts all emails",
            "invalid": "%{email} is invalid",
            "unknown": "The status of %{email} is unknown",
            "valid_html": "<span class='verify-result__email' data-action='click->copy#copy' data-controller='tooltip copy' data-copy-text-value='%{email}' title='Click to copy'>%{email}</span> is valid"
          },
          "timed_out": "The email verification has timed out, retrying (attempt %{tries})",
          "verification_too_long": "The email verification is taking longer than expected. Please try again later.",
          "verify": "Verify",
          "verifying": "Verifying the email address…"
        },
        "enterprise_plan": {
          "please_provide_professional_address": "Please use your professional email address to request a quote.",
          "please_provide_values": "Please indicate the number of searches, verifications, or email accounts you need."
        },
        "errors": {
          "not_team_owner": "Only the team Owner can manage this part of the service."
        },
        "navigation": {
          "locale": {
            "failed_to_switch": "We failed to switch to %{language}."
          }
        },
        "number_domain_email_found_html": {
          "one": "<strong>1 email address</strong> for %{domain} appear on the web",
          "other": "<strong>%{count} email addresses</strong> for %{domain} appear on the web"
        },
        "number_email_found_html": {
          "one": "We used data from <strong>one source</strong> on the web.",
          "other": "We used data from <strong>%{count} sources</strong> on the web.",
          "zero": "This email address has been verified by Hunter."
        },
        "pricing_calculator": {
          "custom": "Custom",
          "custom_pricing": "Custom pricing"
        },
        "timeframe": {
          "all_time": "All time",
          "current_billing_period": "Current billing period",
          "current_year": "Current year",
          "custom": "Custom",
          "last14d": "Last 14 days",
          "last30d": "Last 30 days",
          "last7d": "Last 7 days",
          "last_3months": "Last 3 months",
          "last_6months": "Last 6 months",
          "last_month": "Last month",
          "last_year": "Last year"
        },
        "validate_phone_number": {
          "step1": {
            "invalid_phone_number": "Your phone number is incorrect."
          },
          "step2": {
            "countdown": "You can request a new code or edit the phone number in %{seconds} seconds."
          }
        }
      },
      "less": "Less",
      "loading": "Loading…",
      "more": "More",
      "no": "No",
      "number": {
        "format": {
          "delimiter": ",",
          "separator": "."
        }
      },
      "over_quota": "over quota",
      "postmark": {
        "email_bounced_html": "An email we sent to %{email} could not be delivered for the following reason: %{reason}. Please resolve this issue and contact support or <a href=\"%{link}\" data-turbo=\"false\">change your email address</a>."
      },
      "save": "Save",
      "saved": "Saved",
      "search_request": {
        "one": "search",
        "other": "searches"
      },
      "select": "Select",
      "submit": "Submit",
      "trix_format": {
        "edit": "Edit",
        "image_sizes": {
          "original": "Original size",
          "right_fit": "Right fit",
          "small": "Small"
        },
        "insert_link": "Insert link",
        "link_not_allowed": "Links are not possible on images.",
        "max_file_size_exceeded": "Only attachments lower than %{max_value}MB are accepted.",
        "please_upload_instead": "Please use the Insert Image or Attach File functionality to add images or attachments.",
        "remove": "Remove"
      },
      "uptime_status": {
        "all_systems_operational": "All Systems Operational",
        "incident_in_progress": "Incident in progress"
      },
      "usage": {
        "api": "API",
        "bulk": "Bulk",
        "chrome_extension": "Chrome extension",
        "search": "Searches",
        "sheets_addon": "Google sheets add-on",
        "unknown": "Unknown",
        "verify": "Verifications",
        "website": "Website"
      },
      "verification_status": {
        "accept_all": "Accept all",
        "blocked": "Blocked",
        "confidence_score": "Confidence score: %{score}%",
        "disposable": "Disposable",
        "error": "Error",
        "gibberish": "Gibberish",
        "invalid": "Invalid",
        "pending": "Verifying the email address…",
        "professional": "Professional",
        "unknown": "Unknown",
        "valid": "Valid",
        "verified": "Verified",
        "webmail": "Webmail"
      },
      "verify_request": {
        "one": "verification",
        "other": "verifications"
      },
      "yes": "Yes"
    }
  }
})
  i18n.store({
  "fr": {
    "js": {
      "add": "Ajouter",
      "and": "et",
      "back": {
        "bulks": {
          "bulk_email_finders": {
            "not_found": "Non trouvé"
          }
        },
        "campaigns": {
          "audience": {
            "all_values": "A une valeur quelconque",
            "already_contacted_html": "<td><strong>Déjà contacté</strong></td>.",
            "canceling": "Annulation en cours…",
            "confirm_remove_recipient": "Voulez-vous vraiment supprimer %{email} de l'audience ?",
            "contains_value": "Contient %{value}.",
            "email_not_verified": "Non vérifié",
            "error_loading_leads": "Erreur lors du chargement des prospects.",
            "filter_required": "Veuillez sélectionner la valeur du filtre.",
            "is_empty": "Est vide",
            "lead_selection_count": {
              "one": "1 prospect sélectionné",
              "other": "%{count} prospects sélectionnés",
              "zero": "%{count} prospects sélectionnés"
            },
            "more_leads_hint": "Et %{count} prospects comme ceci",
            "never_contacted_before": "Jamais contacté",
            "never_contacted_html": "<td>N'a jamais été contacté</td>.",
            "no_leads_found": "Aucun destinataire à ajouter",
            "no_leads_found_html": "Les campagnes peuvent être envoyées à vos prospects. Enregistrez plus de prospects dans Hunter ou importez des prospects externes pour leur envoyer votre campagne.<br/><br/><a class='%{btn_class}' href='%{path}'><div class='%{class}'></div>Importer des prospects</a>",
            "no_leads_found_with_filters": "Modifiez ou supprimez certains des filtres à gauche pour augmenter la taille de la sélection.",
            "no_recipients_to_cancel": "Aucun destinataire pour lequel annuler les emails programmés.",
            "no_recipients_to_remove": "Aucun destinataire à supprimer.",
            "recipient_selection_count": {
              "one": "Ajouter 1 destinataire",
              "other": "Ajouter %{count} destinataires",
              "zero": "Ajouter %{count} destinataires"
            },
            "removing": "Suppression en cours…"
          },
          "cancel": {
            "canceling": "Annulation en cours"
          },
          "content": {
            "add_bcc_recipient": "Ajouter BCC",
            "follow_up_placeholder": "Laissez vide pour envoyer comme réponse à votre email précédent.",
            "invalid_bcc_email": "Le format du destinataire BCC n'est pas valide.",
            "max_number_follow_ups_reached": "Il n'est pas possible d'ajouter plus de %{count} follow-ups.",
            "pause_campaign_first": "Vous devez d'abord mettre la campagne en pause.",
            "remove_bcc_recipient": "Supprimer BCC"
          },
          "follow_up": {
            "delete_first_follow_up_error": "Le message d'introduction ne peut pas être supprimé.",
            "delete_success": "Suivi supprimé"
          },
          "reporting": {
            "graphs": {
              "export_date": "du %{start_date} au %{end_date}."
            }
          },
          "settings": {
            "additional_permissions_required": "Des autorisations supplémentaires sont requises pour ce compte.",
            "ask_owner_to_reconnect": "Merci de demander à %{email} de se reconnecter afin de continuer à l'utiliser.",
            "connected": "Connecté",
            "connection_has_expired": "La connexion à votre compte a expiré.",
            "disconnected": "Déconnecté",
            "permissions_required": "Autorisations requises",
            "please_reconnect": "Veuillez vous reconnecter pour continuer à l'utiliser.",
            "please_reconnect_html": "Cliquez <a href=\"%{href}\">ici</a> pour vous vous reconnecter et continuer à l'utiliser.",
            "reconnect": "Reconnecter"
          }
        },
        "checkout": {
          "errors": {
            "missing_billing_information": "Veuillez compléter vos informations de facturation.",
            "payment_process": "Une erreur s'est produite lors du traitement de votre paiement. Veuillez réessayer avec un nouveau mode de paiement ou contactez-nous, nous serons heureux de vous aider !",
            "saving_billing_infos": "Nous n'avons pas pu enregistrer vos informations de facturation, veuillez réessayer ou nous contacter, nous serons heureux de vous aider !",
            "saving_credit_card": "Erreur lors de l'enregistrement de votre mode de paiement, veuillez réessayer ou nous contacter, nous serons heureux de vous aider !"
          }
        },
        "confirm_deletion_modal": {
          "button_label": "Supprimer",
          "cancel": "Annuler",
          "content_html": "Cette action ne peut être annulée. <br><strong>Voulez-vous vraiment continuer ?</strong>",
          "deleting": "Suppression…",
          "title": "Confirmer la suppression"
        },
        "domain_search": {
          "download": "Télécharger le fichier",
          "download_all_the_email_addresses": "toutes les %{count} adresses email",
          "download_the_first_email_addresses": "les premières %{count} adresses email",
          "generate": "Générer le fichier",
          "lead_save": {
            "saved_tooltip": "Enregistré dans %{name}"
          }
        },
        "engagement": {
          "select_messages_to_stop_sequence": "Sélectionnez au moins un destinataire pour lequel vous souhaitez arrêter l'envoi des emails de relance."
        },
        "filters": {
          "search_results_count": {
            "one": "1 résultat",
            "other": "%{count} résultats",
            "zero": "Pas de résultat"
          }
        },
        "lead_actions": {
          "adding": "Ajout en cours…",
          "connect_google_account_html": "Connectez votre compte email pour envoyer des campagnes avec Hunter. <a target=\"_blank\" href=\"/cold-email-software\">Commencer</a>",
          "count_selected_leads": {
            "one": "1 prospect sélectionné",
            "other": "%{count} prospects sélectionnés",
            "zero": "%{count} prospects sélectionnés"
          },
          "delete_leads": {
            "one": "Voulez-vous vraiment supprimer ce prospect ? En le supprimant, tous les emails programmés qui lui sont destinés seront annulés. Il n'est pas possible d'annuler cette action.",
            "other": "Voulez-vous vraiment supprimer ces %{count} prospects ? En les supprimant, tous les emails programmés qui leur sont destinés seront annulés. Il n'est pas possible d'annuler cette action."
          },
          "deleting": "Suppression…",
          "filter_or_select_leads_to_a_campaign": "Sélectionnez au moins un destinataire que vous souhaitez ajouter à une campagne.",
          "filter_or_select_leads_to_new_campaign": "Sélectionnez au moins un destinataire que vous souhaitez ajouter à la nouvelle campagne.",
          "of_leads": "parmi %{count}",
          "overage_verify_usage": "Êtes-vous certain ? Cela utilisera des crédits hors quota",
          "verification_in_progress": "La vérification va démarrer prochainement"
        },
        "lead_campaigns_manager": {
          "added": "%{lead} a été ajouté à %{campaign} avec succès !"
        },
        "lead_details": {
          "show_less": "Afficher moins de champs",
          "show_more": "Afficher plus de champs"
        },
        "lead_import_configuration": {
          "attribute_created": "%{label} a été créé",
          "failed_to_create_attribute": "Échec de la création d'un nouvel attribut : %{error}"
        },
        "lead_save": {
          "already_saved": "Vous avez déjà sauvegardé ce prospect !",
          "error": "Une erreur s'est produite, veuillez réessayer plus tard.",
          "saved": "sauvegardé"
        },
        "lead_save_manager": {
          "saved": "%{lead} enregistré avec succès !"
        },
        "leads_list": {
          "favorite": {
            "add": "Ajouter aux favoris",
            "added": "Ajouté à vos favoris.",
            "error": "Une erreur s'est produite de notre côté. Veuillez réessayer plus tard.",
            "remove": "Retirer des favoris",
            "removed": "Retiré de vos favoris."
          }
        },
        "leads_manager": {
          "name_already_exists": "Une liste portant ce nom existe déjà. Utilisez un autre nom ou sélectionnez la liste actuelle.",
          "saved": "sauvegardé"
        },
        "navigation": {
          "click_here_to_unlock_account": "Déverrouillez votre compte"
        },
        "overdue_recovery": {
          "flash_error": "Une erreur s'est produite lors du traitement de votre paiement. Veuillez réessayer avec un nouveau mode de paiement ou contactez-nous, nous serons heureux de vous aider !"
        },
        "quantity_selector": {
          "error_message": "La valeur doit se situer dans l'intervalle %{min} à %{max}."
        },
        "signal_actions": {
          "select_at_least_one": "Veuillez sélectionner au moins une entreprise"
        }
      },
      "company": "entreprise",
      "copied": "Copié !",
      "copy": "Copier",
      "devise": {
        "registration": {
          "new": {
            "continue": "Continuer",
            "continue_with_email_address": "Continuer avec cette adresse email",
            "disposable_email_address_html": "<p>Malheureusement, il n'est pas possible de s'inscrire en utilisant une adresse email temporaire. Veuillez plutôt utiliser une adresse email professionnelle (par exemple <strong>youraddress@yourcompany.com</strong>).</p>",
            "forbidden_webmail_html": "<p>Malheureusement, il n'est pas possible de s'inscrire en utilisant une adresse webmail. Veuillez plutôt utiliser une adresse email professionnelle (par exemple <strong>youraddress@yourcompany.com</strong>).</p>",
            "invalid_email_address_html": "<p>Cette adresse email semble invalide. Veuillez saisir une adresse email au format : <strong>youraddress@yourcompany.com</strong></p>.",
            "loading": "Chargement en cours…",
            "meta_title_html": "S'inscrire • Hunter",
            "team_invite_domain_mismatch_html": "<p>Malheureusement, il ne vous est pas possible de vous inscrire en utilisant cette adresse. Veuillez utiliser une adresse professionnelle à la place (par exemple <strong>adresse@%{domain}</strong>).</p>",
            "warning_email_html": "<p>Vous pouvez créer un compte avec cette adresse email, mais nous vous encourageons vivement à utiliser une adresse email professionnelle telle que <strong>youraddress@yourcompany.com</strong> plutôt qu'un webmail.</p><p>Pour éviter les abus sur Hunter, les comptes créés avec des webmails tels que %{example} ont plus de chances d'être limités.</p><p><a class='go-to-step2' id='ignore-webmail-warning'>Ignorer et continuer</a></p><p>."
          }
        }
      },
      "domain": "domaine",
      "download": "Télécharger",
      "failed": "Échec",
      "find": "Chercher",
      "front": {
        "api_errors": {
          "daily_finder_limit_reached_html": "Vous avez atteint votre quota gratuit. Veuillez <a href=\"/users/sign_up?from=email_finder\" data-turbo-frame=\"_top\">créer un compte gratuit</a> pour rechercher plus d'adresses email.",
          "daily_search_limit_reached_html": "Vous avez atteint votre limitation quotidienne. Veuillez  <a href=\"/users/sign_up?from=domain_search\" data-turbo-frame=\"_top\">créer un compte gratuit</a> ou <a href=\"/users/sign_in?from=domain_search\" data-turbo-frame=\"_top\">vous connecter</a> pour effectuer plus de recherches !",
          "daily_verifier_limit_reached_html": "Vous avez atteint votre quota gratuit. Veuillez <a href=\"/users/sign_up?from=email_finder\" data-turbo-frame=\"_top\">créer un compte gratuit</a> pour effectuer plus de vérifications.",
          "internal_server_error": "Quelque chose ne s'est pas passé comme prévu de notre côté, nous vous invitons à réessayer ultérieurement.",
          "search_rate_limit_reached": "Trop de requêtes ont été réalisées. Veuillez répartir vos requêtes pour éviter d'atteindre notre limitation.",
          "verification_internal_server_error": "Nous avons rencontré une erreur lors de la vérification. Veuillez réessayer."
        },
        "domain_autocomplete": {
          "results_count": {
            "one": "1 résultat",
            "other": "%{results_count} résultats",
            "zero": "Pas de résultats"
          }
        },
        "domain_search": {
          "action": {
            "long": "Trouver des adresses email",
            "short": "Chercher"
          },
          "and": "Et",
          "click_to_launch_verification": "Cliquez pour lancer une nouvelle vérification",
          "click_to_see_check_result": "Cliquez pour voir le résultat complet de la vérification",
          "disposable_domain_html": "Le nom de domain <strong>%{domain}</strong> est utilisé pour créer des adresses email jetables. Ces adresses email ne sont pas retournées par Hunter.",
          "download_success": "Résultats téléchargés.",
          "file_generation": "Le fichier est en cours de génération.",
          "first_name": "Prénom",
          "first_name_initial": "Initiale du prénom",
          "hidden_email_hint": "Merci de vous connecter pour voir toutes les adresses email.",
          "last_name": "Nom",
          "last_name_initial": "Initiale du nom",
          "more_for_domain": "plus pour %{domain}",
          "more_results_for_domain_html": "Et <strong>%{count}</strong> résultats en plus pour %{domain}",
          "most_common_pattern": "Format le plus courant :",
          "multiple_more_results_html": {
            "one": "<strong>1 résultat de plus</strong> pour %{domain}. <a href=\"/users/sign_up\">Inscrivez-vous</a> ou <a href=\"/users/sign_in\">connectez-vous</a> pour accéder aux résultats complets.",
            "other": "<strong>%{count} plus de résultats</strong> pour %{domain}. <a href=\"/users/sign_up\">Inscrivez-vous</a> ou <a href=\"/users/sign_in\">connectez-vous</a> pour accéder aux résultats complets.",
            "zero": "<strong>%{count} plus de résultats</strong> pour %{domain}. <a href=\"/users/sign_up\">Inscrivez-vous</a> ou <a href=\"/users/sign_in\">connectez-vous</a> pour accéder aux résultats complets."
          },
          "no_results_for_domain": "%{domain} (aucun résultat)",
          "no_results_found_but_linked_domain_html": "Aucune adresse email trouvée. <a href=\"/try/search/%{linked_domain}\">Essayez avec %{linked_domain}</a>.",
          "no_results_found_but_try_without_filters_html": "Aucune adresse email trouvée. <a href='%{path}'>Essayer sans filtres</a>.",
          "no_results_found_html": "Aucune adresse email n'a été trouvée. <a href=\"https://help.hunter.io/en/articles/2452480-why-don-t-i-find-any-email-addresses-for-a-domain-name\" target=\"_blank\">Pourquoi ?</a>",
          "not_a_domain_name_html": "<p>Ce ne semble pas être un nom de domaine !</p><p>Par exemple, essayez <button class='btn-empty try-domain'>salesforce.com</button> ou < button class='btn-empty try-domain'>techcrunch.com</button>.</p>",
          "not_correct_domain_name": "Saisissez un nom de domaine, par exemple \"google.com\".",
          "number_of_emails": {
            "one": "%{count} adresse email",
            "other": "%{count} adresses email",
            "zero": "%{count} adresses email"
          },
          "number_of_results": {
            "one": "%{results_count} adresse email",
            "other": "%{results_count} adresses email",
            "zero": "Pas d'adresses email"
          },
          "one_more_result": {
            "with_cta_html": "<strong>Un résultat de plus</strong> pour %{domain}. <a href=\"/users/sign_up\">Inscrivez-vous</a> ou <a href=\"/users/sign_in\">connectez-vous</a> pour accéder aux résultats complets.",
            "without_cta": "Un résultat additionnel pour %{domain}"
          },
          "one_more_result_html": "<strong>Un résultat additionnel</strong> pour %{domain}.",
          "results_title_html": {
            "one": "<strong>1 résultat</strong> <span class='hidden-xs'>pour votre recherche</span>",
            "other": "<strong>%{results_count} résultats</strong> <span class='hidden-xs'>pour votre recherche</span>",
            "zero": "<strong>Pas de résultats</strong> <span class='hidden-xs'>pour votre recherche</span>"
          },
          "save_the_lead": "Enregistrer le prospect",
          "show_more_results": "Voir plus de résultats",
          "sources_count": {
            "get_20": "20+ sources",
            "one": "1 source",
            "other": "%{count} sources"
          },
          "title_with_domain_and_results": {
            "one": "%{domain} (%{results_count} résultat)",
            "other": "%{domain} (%{results_count} résultats)",
            "zero": "%{domain} (%{results_count} résultats)"
          },
          "verification_too_long": "La vérification de l'email prend plus de temps que prévu. Veuillez réessayer plus tard.",
          "verify_again": "Vérifier à nouveau",
          "verify_email_html": "Voulez-vous <a href='/verify/%{email}'>vérifier %{email}</a> ? Domain Search est utilisé pour trouver des adresses email à partir d'un nom de domaine (par exemple, \"%{domain}\"), mais vous avez saisi une adresse email.",
          "verifying": "Vérification…",
          "webmail_domain_html": "Le domaine <strong>%{domain}</strong> est utilisé pour créer des adresses email personnelles. Ces adresses ne sont pas renvoyées par Hunter qui n'est destiné qu'à un usage professionnel."
        },
        "email_finder": {
          "cta": "Chercher",
          "error_try_later": "Une erreur s'est produite. Veuillez réessayer plus tard.",
          "flash_no_email_found": "Nous n'avons pas trouvé l'adresse email de cette personne.",
          "no_email_found": {
            "description_html": "<p>Nous n'avons pas pu trouver l'adresse email de cette personne. Cela peut arriver pour trois raisons principales :</p><ul><li>Nous n'avons pas assez de données pour le nom de domain recherché.</li><li>Nous n'avons pas pu trouver un profil correspondant à ce nom.</li><li>Le serveur de l'adresse email est trop lent à répondre.</li></ul>",
            "more_link_html": "<a href=\"https://help.hunter.io/en/articles/4123615-why-doesn-t-the-email-finder-return-any-results\" target=\"_blank\" lang=\"en\">En savoir plus</a>",
            "title": "Nous n'avons pas trouvé l'adresse email de cette personne."
          },
          "no_email_found_html": "Nous n'avons pas trouvé l'adresse email de cette personne.  <a href='https://help.hunter.io/en/articles/4123615-why-doesn-t-the-email-finder-return-any-results' target='_blank'>Pourquoi ?</a>",
          "not_a_full_name": "Veuillez saisir le nom complet de la personne dont vous souhaitez trouver l'adresse email.",
          "not_correct_domain_name": "Veuillez saisir un nom de domaine, par exemple \"google.com\".",
          "tooltip_enter_full_name": "Entrez le nom complet de la personne pour trouver l'adresse email.",
          "tooltip_press_enter_to_find": "Appuyez sur Entrée pour trouver l'adresse email."
        },
        "email_verifier": {
          "deliverable": {
            "message": "Cette adresse email peut être utilisée sereinement.",
            "risky": {
              "accept_all": {
                "message": "Le domaine %{domain} accepte toutes les adresses email."
              },
              "unknown": {
                "message": "Cette adresse email n'a pu être vérifiée."
              }
            }
          },
          "detailed_statuses": {
            "accept_all": "Accept all",
            "blocked": "Bloqué",
            "disposable": "Jetable",
            "gibberish": "Générée aléatoirement",
            "invalid": "Invalide",
            "professional": "Professionnel",
            "valid": "Valide",
            "webmail": "Webmail"
          },
          "disposable_address": "Ceci est une adresse email jetable. Ce nom de domaine est utilisé pour cacher de vraies adresses email, donc nous ne vérifions pas la validité des adresses sur ce domain.",
          "email_count_results_link": "Voir tous les résultats",
          "email_count_results_title": {
            "one": "Nous avons trouvés une adresse email pour %{domain}",
            "other": "Nous avons trouvé %{results_count} adresses email pour %{domain}"
          },
          "email_format_description": {
            "gibberish": "Cette adresse email semble avoir été générée aléatoirement.",
            "invalid": "Le format de cette adresse email est invalide.",
            "valid": "Cette adresse électronique a le format correct et n'est pas générée aléatoirement."
          },
          "email_status_description": {
            "accept_all_html": "Cette adresse e-mail est liée à un domaine \"accept-all\". Il n'est pas possible de déterminer si cette adresse e-mail est valide ou non.<br><span class='black'><a href='https://help.hunter.io/en/articles/1935079-what-does-an-accept-all-email-status-mean' lang='en' target='_blank'>En savoir plus.</a></span>",
            "blocked": "Cette adresse email est bloquée.",
            "invalid": "Cette adresse email ne peut pas recevoir d'emails.",
            "valid": "Cette adresse email existe et peut recevoir des emails."
          },
          "email_type_description": {
            "disposable": "Il s'agit d'une adresse email temporaire. Ce nom de domaine est utilisé pour masquer les adresses email réelles.",
            "professional": "Le nom de domaine n'est pas utilisé pour les webmails ou pour créer des adresses email temporaires.",
            "webmail": "C'est une adresse email webmail. Ce nom de domaine est utilisé pour créer des adresses électroniques personnelles."
          },
          "found_success_html": "Nous avons utilisés les données de <strong>%{sources_link}</strong> sur le web.",
          "mail_server_too_long_for": "Le serveur de mail pour %{email} a mis trop de temps à répondre. Veuillez réessayer plus tard.",
          "mail_server_too_slow_for": "Le serveur de mail pour %{email} est lent à répondre. La vérification peut prendre jusqu'à 2 minutes.",
          "not_deliverable": {
            "message": "Cette adresse email n'est pas utilisée pour recevoir des emails.",
            "status": "Invalide"
          },
          "not_on_page": "Cette adresse email n'est plus visible sur la page",
          "not_public": "Nous n'avons pas trouvé cette adresse email publiquement sur le web.",
          "removed": "Supprimé",
          "server_status_description": {
            "invalid": "Les enregistrements MX ne sont pas présents pour le domaine, ou nous ne pouvons pas nous connecter au serveur SMTP.",
            "valid": "Les enregistrements MX sont présents pour le domaine et nous pouvons nous connecter au serveur SMTP vers lequel ces enregistrements MX pointent."
          },
          "sources_count": {
            "above_twenty": "Plus de 20 sources",
            "one": "1 source",
            "other": "%{count} sources"
          },
          "status": {
            "accept_all": "%{domain} accepte tous les emails",
            "invalid": "%{email} est invalide",
            "unknow": "Le status de %{email} est inconnu",
            "unknown": "Le status de %{email} est inconnu",
            "valid": "%{email} est valide",
            "valid_html": "<span class='verify-result__email' data-action='click->copy#copy' data-controller='tooltip copy' data-copy-text-value='%{email}' title='Copier'>%{email}</span> est valide"
          },
          "timed_out": "La vérification d'adresse email a expiré, nouvel essai (essai %{tries})",
          "verification_too_long": "La vérification d'email prend plus longtemps que prévu. Veuillez réessayer un peu plus tard.",
          "verify": "Vérifier",
          "verifying": "Vérification en cours…",
          "webmail_address": "Ceci est une adresse email sur un webmail. Ce nom de domaine est utilisé pour créer des adresses email personnelles, dont nous ne vérifions pas la validité."
        },
        "enterprise_plan": {
          "please_provide_professional_address": "Veuillez utiliser votre adresse email professionnelle pour obtenir un devis.",
          "please_provide_values": "Veuillez indiquer le nombre de recherches, vérifications ou comptes email dont vous avez besoin."
        },
        "navigation": {
          "locale": {
            "failed_to_switch": "Impossible de changer la langue en %{language}."
          }
        },
        "number_domain_email_found_html": {
          "one": "<strong>1 adresse email</strong> pour %{domain} apparaît sur le web",
          "other": "<strong>%{count} adresses email</strong> pour %{domain} apparaissent sur le web"
        },
        "number_email_found_html": {
          "one": "Nous avons utilisé les données d'<strong>une source</strong> sur le web.",
          "other": "Nous avons utilisé les données de <strong>%{count} sources</strong> sur le web.",
          "zero": "Nous n'avons pas trouvé cette adresse email sur le web."
        },
        "pricing_calculator": {
          "custom": "Sur mesure",
          "custom_pricing": "Prix sur mesure"
        },
        "validate_phone_number": {
          "step1": {
            "invalid_phone_number": "Votre numéro de téléphone est incorrect."
          },
          "step2": {
            "countdown": "Vous pouvez demander un nouveau code ou modifier le numéro de téléphone dans %{seconds} secondes."
          }
        }
      },
      "less": "Moins",
      "loading": "Chargement en cours…",
      "more": "Plus",
      "no": "Non",
      "number": {
        "format": {
          "delimiter": " ",
          "separator": ","
        }
      },
      "over_quota": "au-delà du quota",
      "postmark": {
        "email_bounced_html": "Un email que nous avons envoyé à %{email} n'a pas pu être remis pour la raison suivante : %{reason}. Veuillez résoudre ce problème et contacter le support ou <a href=\"%{link}\" data-turbo=\"false\">modifier votre adresse email</a>."
      },
      "save": "Sauvegarder",
      "saved": "Sauvegardé",
      "search_request": {
        "one": "recherche",
        "other": "recherches",
        "zero": "recherches"
      },
      "select": "Sélectionnez",
      "submit": "Soumettre",
      "trix_format": {
        "change": "Changer",
        "edit": "Modifier",
        "image_sizes": {
          "original": "Taille originale",
          "right_fit": "Ajusté",
          "small": "Petit"
        },
        "insert_link": "Insérer un lien",
        "link_not_allowed": "Les liens sur les images ne sont pas possibles.",
        "max_file_size_exceeded": "Seules les pièces jointes inférieures à %{max_value}MB sont acceptées.",
        "please_upload_instead": "Veuillez utiliser la fonctionnalité d'insertion d'images ou de fichiers pour ajouter des images ou des pièces jointes.",
        "remove": "Supprimer",
        "view_video": "Voir la vidéo"
      },
      "uptime_status": {
        "all_systems_operational": "Systèmes opérationnels",
        "incident_in_progress": "Incident en cours"
      },
      "verification_status": {
        "accept_all": "Accept all",
        "blocked": "Bloqué",
        "confidence_score": "Score de confiance : %{score}%",
        "disposable": "Jetable",
        "error": "Erreur",
        "gibberish": "Générée aléatoirement",
        "invalid": "Invalide",
        "pending": "Adresse email en cours de vérification…",
        "professional": "Professionnel",
        "risky": "Risqué",
        "unknown": "Inconnu",
        "valid": "Valide",
        "verified": "Vérifié",
        "webmail": "Webmail"
      },
      "verify_request": {
        "one": "vérification",
        "other": "vérifications"
      },
      "yes": "Oui"
    }
  }
})

window.i18n = i18n;
