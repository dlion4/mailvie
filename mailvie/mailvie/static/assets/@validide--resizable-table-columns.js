var e=function(){function ResizableConstants(){}ResizableConstants.dataPropertyName="validide_rtc_data_object";ResizableConstants.classes={table:"rtc-table",wrapper:"rtc-wrapper",handleContainer:"rtc-handle-container",handle:"rtc-handle",tableResizing:"rtc-table-resizing",columnResizing:"rtc-column-resizing"};ResizableConstants.attributes={dataResizable:"data-rtc-resizable",dataResizableTable:"data-rtc-resizable-table"};ResizableConstants.data={resizable:"rtcResizable",resizableTable:"rtcResizableTable"};ResizableConstants.events={pointerDown:["mousedown","touchstart"],pointerMove:["mousemove","touchmove"],pointerUp:["mouseup","touchend"],windowResize:["resize"],eventResizeStart:"eventResizeStart.rtc",eventResize:"eventResize.rtc",eventResizeStop:"eventResizeStop.rtc"};return ResizableConstants}();var t=function(){function WidthsData(){this.column=0;this.table=0}return WidthsData}();var a=function(){function PointerData(){this.x=null;this.isDoubleClick=false}return PointerData}();var i=function(){function ResizableEventData(e,i){this.pointer=new a;this.originalWidths=new t;this.newWidths=new t;this.column=e;this.dragHandler=i}return ResizableEventData}();var n=function(){function Utilities(){}Utilities.kebabCaseToCamelCase=function(e){return e.replace(Utilities.kebabCaseRegex,(function(e){return e[1].toUpperCase()}))};Utilities.parseStringToType=function(e){if(0==e.length||Utilities.onlyWhiteSpace.test(e))return e;if(Utilities.trueRegex.test(e))return true;if(Utilities.falseRegex.test(e))return false;if(Utilities.notEmptyOrWhiteSpace.test(e)){var t=+e;if(!isNaN(t))return t}return e};Utilities.regexEscapeRegex=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;Utilities.kebabCaseRegex=/(\-\w)/g;Utilities.trueRegex=/^true$/i;Utilities.falseRegex=/^false$/i;Utilities.onlyWhiteSpace=/^\s$/;Utilities.notEmptyOrWhiteSpace=/\S/;return Utilities}();var s=function(){function UtilitiesDOM(){}UtilitiesDOM.getDataAttributesValues=function(e){if(!e)return null;var t={};if(e.dataset)for(var a in e.dataset)e.dataset.hasOwnProperty(a)&&(t[a]=n.parseStringToType(e.dataset[a]||""));else for(var i=0;i<e.attributes.length;i++)if(/^data\-/.test(e.attributes[i].name)){var s=n.kebabCaseToCamelCase(e.attributes[i].name.replace("data-",""));t[s]=n.parseStringToType(e.attributes[i].value)}return t};return UtilitiesDOM}();var l=function(){function ResizableOptions(e,t){void 0===e&&(e=null);void 0===t&&(t=null);this.resizeFromBody=true;this.minWidth=40;this.maxWidth=null;this.doubleClickDelay=500;this.maxInitialWidthHint=null;this.store=null;this.overrideValues(e);this.overrideValuesFromElement(t)}ResizableOptions.prototype.overrideValues=function(e){void 0===e&&(e=null);if(e)for(var t in e)this.hasOwnProperty(t)&&(this[t]=e[t])};ResizableOptions.prototype.overrideValuesFromElement=function(e){void 0===e&&(e=null);if(e){var t=s.getDataAttributesValues(e);this.overrideValues(t)}};return ResizableOptions}();var o=function(){function ResizableTableColumns(t,a){if("object"!==typeof t||null===t||"[object HTMLTableElement]"!==t.toString())throw'Invalid argument: "table".\nResizableTableColumns requires that the table element is a not null HTMLTableElement object!';if("undefined"!==typeof t[e.dataPropertyName])throw'Existing "'.concat(e.dataPropertyName,"\" property.\nTable element already has a '").concat(e.dataPropertyName,"' attached object!");this.id=ResizableTableColumns.getInstanceId();this.table=t;this.options=new l(a,t);this.wrapper=null;this.ownerDocument=t.ownerDocument;this.tableHeaders=[];this.dragHandlesContainer=null;this.originalWidths=[];this.eventData=null;this.lastPointerDown=0;this.init();this.table[e.dataPropertyName]=this}ResizableTableColumns.prototype.init=function(){this.validateMarkup();this.createHandlerReferences();this.wrapTable();this.assignTableHeaders();this.storeOriginalWidths();this.setHeaderWidths();this.createDragHandles();this.restoreColumnWidths();this.checkTableWidth();this.syncHandleWidths();this.registerWindowResizeHandler()};ResizableTableColumns.prototype.dispose=function(){this.destroyDragHandles();this.restoreOriginalWidths();this.unwrapTable();this.onPointerDownRef=null;this.onPointerMoveRef=null;this.onPointerUpRef=null;this.table[e.dataPropertyName]=void 0};ResizableTableColumns.prototype.validateMarkup=function(){var e=0;var t=0;var a=null;for(var i=0;i<this.table.childNodes.length;i++){var n=this.table.childNodes[i];if("THEAD"===n.nodeName){e++;a=n}else"TBODY"===n.nodeName&&t++}if(null===a||1!==e)throw"Markup validation: thead count.\nResizableTableColumns requires that the table element has one(1) table head element. Current count: ".concat(e);if(1!==t)throw"Markup validation: tbody count.\nResizableTableColumns requires that the table element has one(1) table body element. Current count: ".concat(t);var s=0;var l=null;for(i=0;i<a.childNodes.length;i++){n=a.childNodes[i];if("TR"===n.nodeName){s++;null===l&&(l=n)}}if(null===l||s<1)throw"Markup validation: thead row count.\nResizableTableColumns requires that the table head element has at least one(1) table row element. Current count: ".concat(s);var o=0;var r=0;for(i=0;i<l.childNodes.length;i++){n=l.childNodes[i];"TH"===n.nodeName?o++:"TD"===n.nodeName&&r++}if(o<1)throw"Markup validation: thead first row cells count.\nResizableTableColumns requires that the table head's first row element has at least one(1) table header cell element. Current count: ".concat(o);if(0!==r)throw"Markup validation: thead first row invalid.\nResizableTableColumns requires that the table head's first row element has no(0) table cell(TD) elements. Current count: ".concat(r)};ResizableTableColumns.prototype.wrapTable=function(){if(!this.wrapper){this.wrapper=this.ownerDocument.createElement("div");this.wrapper.classList.add(e.classes.wrapper);var t=this.table.parentNode;t.insertBefore(this.wrapper,this.table);t.removeChild(this.table);this.wrapper.appendChild(this.table);this.table.classList.add(e.classes.table)}};ResizableTableColumns.prototype.unwrapTable=function(){this.table.classList.remove(e.classes.table);if(this.wrapper){var t=this.wrapper.parentNode;t.insertBefore(this.table,this.wrapper);t.removeChild(this.wrapper);this.wrapper=null}};ResizableTableColumns.prototype.assignTableHeaders=function(){var e;var t;for(var a=0;a<this.table.childNodes.length;a++){var i=this.table.childNodes[a];if("THEAD"===i.nodeName){e=i;break}}if(e){for(a=0;a<e.childNodes.length;a++){i=e.childNodes[a];if("TR"===i.nodeName){t=i;break}}if(t)for(a=0;a<t.childNodes.length;a++){i=t.childNodes[a];"TH"===i.nodeName&&this.tableHeaders.push(i)}}};ResizableTableColumns.prototype.storeOriginalWidths=function(){var e=this;this.tableHeaders.forEach((function(t){e.originalWidths.push({el:t,detail:t.style.width})}));this.originalWidths.push({el:this.table,detail:this.table.style.width})};ResizableTableColumns.prototype.restoreOriginalWidths=function(){this.originalWidths.forEach((function(e){e.el.style.width=e.detail}))};ResizableTableColumns.prototype.setHeaderWidths=function(){var e=this;this.tableHeaders.forEach((function(t){var a=t.offsetWidth;var i=e.constrainWidth(t,a);"number"===typeof e.options.maxInitialWidthHint&&(i=Math.min(i,e.options.maxInitialWidthHint));e.updateWidth(t,i,true,false)}))};ResizableTableColumns.prototype.constrainWidth=function(e,t){var a=t;a=Math.max(a,this.options.minWidth||-Infinity);a=Math.min(a,this.options.maxWidth||Infinity);return a};ResizableTableColumns.prototype.createDragHandles=function(){var t=this;var a;if(null!=this.dragHandlesContainer)throw"Drag handlers already created. Call <destroyDragHandles> if you wish to recreate them";this.dragHandlesContainer=this.ownerDocument.createElement("div");null===(a=this.wrapper)||void 0===a?void 0:a.insertBefore(this.dragHandlesContainer,this.table);this.dragHandlesContainer.classList.add(e.classes.handleContainer);this.getResizableHeaders().forEach((function(){var a;var i=t.ownerDocument.createElement("div");i.classList.add(e.classes.handle);null===(a=t.dragHandlesContainer)||void 0===a?void 0:a.appendChild(i)}));e.events.pointerDown.forEach((function(e,a){var i;null===(i=t.dragHandlesContainer)||void 0===i?void 0:i.addEventListener(e,t.onPointerDownRef,false)}))};ResizableTableColumns.prototype.destroyDragHandles=function(){var t=this;var a,i;if(null!==this.dragHandlesContainer){e.events.pointerDown.forEach((function(e,a){var i;null===(i=t.dragHandlesContainer)||void 0===i?void 0:i.removeEventListener(e,t.onPointerDownRef,false)}));null===(i=null===(a=this.dragHandlesContainer)||void 0===a?void 0:a.parentElement)||void 0===i?void 0:i.removeChild(this.dragHandlesContainer)}};ResizableTableColumns.prototype.getDragHandlers=function(){var t=null==this.dragHandlesContainer?null:this.dragHandlesContainer.querySelectorAll(".".concat(e.classes.handle));return t?Array.prototype.slice.call(t).filter((function(e){return"DIV"===e.nodeName})):new Array};ResizableTableColumns.prototype.restoreColumnWidths=function(){if(this.options.store){var e=ResizableTableColumns.generateTableId(this.table);if(0!==e.length){var t=this.options.store.get(e);if(t){this.getResizableHeaders().forEach((function(e){var a=t.columns[ResizableTableColumns.generateColumnId(e)];"undefined"!==typeof a&&ResizableTableColumns.setWidth(e,a)}));"undefined"!==typeof t.table&&ResizableTableColumns.setWidth(this.table,t.table)}}}};ResizableTableColumns.prototype.checkTableWidth=function(){var t;var a=this.wrapper.clientWidth;var i=this.table.offsetWidth;var n=a-i;if(!(n<=0)){var s=0;var l=0;var o=[];this.tableHeaders.forEach((function(t,a){if(t.hasAttribute(e.attributes.dataResizable)){var i={el:t,detail:t.offsetWidth};o.push(i);s+=i.detail}}));var r=0;var h=null;var d;while(d=o.shift()){r=n-l;h=d.el;var u=Math.floor(d.detail/s*n);u=Math.min(u,r);var b=this.updateWidth(d.el,d.detail+u,false,true);l+=b-d.detail;if(l>=n)break}r=n-l;if(r>0){var c=(null===(t=o[0])||void 0===t?void 0:t.el)||h||this.tableHeaders[this.tableHeaders.length-1];var f=c.offsetWidth;this.updateWidth(c,f,true,true)}ResizableTableColumns.setWidth(this.table,a)}};ResizableTableColumns.prototype.syncHandleWidths=function(){var e=this;var t=this.table.clientWidth;ResizableTableColumns.setWidth(this.dragHandlesContainer,t);this.dragHandlesContainer.style.minWidth="".concat(t,"px");var a=this.getResizableHeaders();this.getDragHandlers().forEach((function(t,i){var n=(e.options.resizeFromBody?e.table:e.table.tHead).clientHeight;if(i<a.length){var s=a[i];var l=s.offsetWidth;l+=ResizableTableColumns.getOffset(s).left;l-=ResizableTableColumns.getOffset(e.dragHandlesContainer).left;t.style.left="".concat(l,"px");t.style.height="".concat(n,"px")}}))};ResizableTableColumns.prototype.getResizableHeaders=function(){return this.tableHeaders.filter((function(t,a){return t.hasAttribute(e.attributes.dataResizable)}))};ResizableTableColumns.prototype.handlePointerDown=function(t){this.handlePointerUp();var a=t?t.target:null;if(null!=a&&"DIV"===a.nodeName&&a.classList.contains(e.classes.handle)&&("number"!==typeof t.button||0===t.button)){var n=a;var s=this.getDragHandlers().indexOf(n);var l=this.getResizableHeaders();if(!(s>=l.length)){var o=(new Date).getTime();var r=o-this.lastPointerDown<this.options.doubleClickDelay;var h=l[s];var d=h.offsetWidth;var u={column:d,table:this.table.offsetWidth};var b=new i(h,n);b.pointer={x:ResizableTableColumns.getPointerX(t),isDoubleClick:r};b.originalWidths=u;b.newWidths=u;this.detachHandlers();this.attachHandlers();this.table.classList.add(e.classes.tableResizing);this.wrapper.classList.add(e.classes.tableResizing);n.classList.add(e.classes.columnResizing);h.classList.add(e.classes.columnResizing);this.lastPointerDown=o;this.eventData=b;var c=new CustomEvent(e.events.eventResizeStart,{detail:{column:h,columnWidth:d,table:this.table,tableWidth:this.table.clientWidth}});this.table.dispatchEvent(c);t.preventDefault()}}};ResizableTableColumns.prototype.handlePointerMove=function(t){if(this.eventData&&t){var a=(ResizableTableColumns.getPointerX(t)||0)-(this.eventData.pointer.x||0);if(0!==a){var i=this.eventData.originalWidths.table+a;var n=this.constrainWidth(this.eventData.column,this.eventData.originalWidths.column+a);ResizableTableColumns.setWidth(this.table,i);ResizableTableColumns.setWidth(this.eventData.column,n);this.eventData.newWidths={column:n,table:i};var s=new CustomEvent(e.events.eventResize,{detail:{column:this.eventData.column,columnWidth:n,table:this.table,tableWidth:i}});this.table.dispatchEvent(s)}}};ResizableTableColumns.prototype.handlePointerUp=function(){this.detachHandlers();if(this.eventData){this.eventData.pointer.isDoubleClick&&this.handleDoubleClick();this.table.classList.remove(e.classes.tableResizing);this.wrapper.classList.remove(e.classes.tableResizing);this.eventData.dragHandler.classList.remove(e.classes.columnResizing);this.eventData.column.classList.remove(e.classes.columnResizing);this.checkTableWidth();this.syncHandleWidths();this.refreshWrapperStyle();this.saveColumnWidths();var t=this.eventData.newWidths||this.eventData.originalWidths;var a=new CustomEvent(e.events.eventResizeStop,{detail:{column:this.eventData.column,columnWidth:t.column,table:this.table,tableWidth:t.table}});this.table.dispatchEvent(a);this.eventData=null}};ResizableTableColumns.prototype.handleDoubleClick=function(){if(this.eventData&&this.eventData.column){var t=this.eventData.column;var a=this.tableHeaders.indexOf(t);var i=0;var n=[];this.tableHeaders.forEach((function(t,a){t.hasAttribute(e.attributes.dataResizable)||n.push(a)}));var s=this.ownerDocument.createElement("span");s.style.position="absolute";s.style.left="-99999px";s.style.top="-99999px";s.style.visibility="hidden";this.ownerDocument.body.appendChild(s);var l=this.table.querySelectorAll("tr");for(var o=0;o<l.length;o++){var r=l[o];var h=r.querySelectorAll("td, th");var d=0;for(var u=0;u<h.length;u++){var b=h[u];var c=1;if(b.hasAttribute("colspan")){var f=b.getAttribute("colspan")||"1";var v=parseInt(f);c=isNaN(v)?1:v}if(-1===n.indexOf(u)&&1===c&&d===a){i=Math.max(i,ResizableTableColumns.getTextWidth(b,s));break}d+=c}}this.ownerDocument.body.removeChild(s);var p=i-t.offsetWidth;if(0!==p){var m=this.eventData.originalWidths.table+p;var R=this.constrainWidth(this.eventData.column,this.eventData.originalWidths.column+p);ResizableTableColumns.setWidth(this.table,m);ResizableTableColumns.setWidth(this.eventData.column,R);this.eventData.newWidths={column:R,table:m};var C=new CustomEvent(e.events.eventResize,{detail:{column:this.eventData.column,columnWidth:R,table:this.table,tableWidth:m}});this.table.dispatchEvent(C);this.checkTableWidth();this.syncHandleWidths();this.saveColumnWidths()}}};ResizableTableColumns.prototype.attachHandlers=function(){var t=this;e.events.pointerMove.forEach((function(e,a){t.ownerDocument.addEventListener(e,t.onPointerMoveRef,false)}));e.events.pointerUp.forEach((function(e,a){t.ownerDocument.addEventListener(e,t.onPointerUpRef,false)}))};ResizableTableColumns.prototype.detachHandlers=function(){var t=this;e.events.pointerMove.forEach((function(e,a){t.ownerDocument.removeEventListener(e,t.onPointerMoveRef,false)}));e.events.pointerUp.forEach((function(e,a){t.ownerDocument.removeEventListener(e,t.onPointerUpRef,false)}))};ResizableTableColumns.prototype.refreshWrapperStyle=function(){if(null!=this.wrapper){var e=this.wrapper.style.overflowX;this.wrapper.style.overflowX="hidden";this.wrapper.style.overflowX=e}};ResizableTableColumns.prototype.saveColumnWidths=function(){if(this.options.store){var e=ResizableTableColumns.generateTableId(this.table);if(0!==e.length){var t={table:this.table.offsetWidth,columns:{}};this.getResizableHeaders().forEach((function(e){t.columns[ResizableTableColumns.generateColumnId(e)]=e.offsetWidth}));this.options.store.set(e,t)}}};ResizableTableColumns.prototype.createHandlerReferences=function(){var e=this;this.onPointerDownRef||(this.onPointerDownRef=ResizableTableColumns.debounce((function(t){e.handlePointerDown(t)}),100,true));this.onPointerMoveRef||(this.onPointerMoveRef=ResizableTableColumns.debounce((function(t){e.handlePointerMove(t)}),5,false));this.onPointerUpRef||(this.onPointerUpRef=ResizableTableColumns.debounce((function(t){e.handlePointerUp()}),100,true))};ResizableTableColumns.prototype.registerWindowResizeHandler=function(){var t=this.ownerDocument.defaultView;if(!ResizableTableColumns.windowResizeHandlerRef){ResizableTableColumns.windowResizeHandlerRef=ResizableTableColumns.debounce(ResizableTableColumns.onWindowResize,50,false);e.events.windowResize.forEach((function(e,a){null===t||void 0===t?void 0:t.addEventListener(e,ResizableTableColumns.windowResizeHandlerRef,false)}))}};ResizableTableColumns.prototype.handleWindowResize=function(){this.checkTableWidth();this.syncHandleWidths();this.saveColumnWidths()};ResizableTableColumns.prototype.updateWidth=function(e,t,a,i){var n=e.offsetWidth;var s=a?t:this.constrainWidth(e,t);ResizableTableColumns.setWidth(e,s);if(!i){var l=s-n;var o=this.table.offsetWidth+l;ResizableTableColumns.setWidth(this.table,o)}return s};ResizableTableColumns.onWindowResize=function(t){var a=t?t.target:null;if(null!=a){var i=a.document.querySelectorAll(".".concat(e.classes.table));for(var n=0;n<i.length;n++){var s=i[n];"object"===typeof s[e.dataPropertyName]&&s[e.dataPropertyName].handleWindowResize()}}};ResizableTableColumns.generateColumnId=function(t){var a=(t.getAttribute(e.attributes.dataResizable)||"").trim().replace(/\./g,"_");return a};ResizableTableColumns.generateTableId=function(t){var a=(t.getAttribute(e.attributes.dataResizableTable)||"").trim().replace(/\./g,"_");return a.length?"rtc/".concat(a):a};ResizableTableColumns.setWidth=function(e,t){var a=t.toFixed(2);a=t>0?a:"0";e.style.width="".concat(a,"px")};ResizableTableColumns.getInstanceId=function(){return ResizableTableColumns.instancesCount++};ResizableTableColumns.getPointerX=function(e){if(0===e.type.indexOf("touch")){var t=e;if(t.touches&&t.touches.length)return t.touches[0].pageX;if(t.changedTouches&&t.changedTouches.length)return t.changedTouches[0].pageX}return e.pageX};ResizableTableColumns.getTextWidth=function(e,t){var a,i;if(!e||!t)return 0;var n=(null===(a=e.textContent)||void 0===a?void 0:a.trim().replace(/\s/g,"&nbsp;"))+"&nbsp;";var s=null===(i=e.ownerDocument.defaultView)||void 0===i?void 0:i.getComputedStyle(e);["fontFamily","fontSize","fontWeight","padding","border","boxSizing"].forEach((function(e){t.style[e]=s[e]}));t.innerHTML=n;return t.offsetWidth};ResizableTableColumns.getOffset=function(e){if(!e)return{top:0,left:0};var t=e.getBoundingClientRect();return{top:t.top+e.ownerDocument.body.scrollTop,left:t.left+e.ownerDocument.body.scrollLeft}};ResizableTableColumns.instancesCount=0;ResizableTableColumns.windowResizeHandlerRef=null;ResizableTableColumns.debounce=function(e,t,a){var i=null;var debounced=function(){var n=[];for(var s=0;s<arguments.length;s++)n[s]=arguments[s];var later=function(){i=null;a||e.apply(void 0,n)};var l=a&&!i;i&&clearTimeout(i);i=setTimeout(later,t);l&&e.apply(void 0,n)};return debounced};return ResizableTableColumns}();export{a as PointerData,e as ResizableConstants,i as ResizableEventData,l as ResizableOptions,o as ResizableTableColumns,n as Utilities,s as UtilitiesDOM,t as WidthsData};

