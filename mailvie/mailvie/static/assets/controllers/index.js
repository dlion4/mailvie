import{application}from "controllers/application"
import "@hotwired/stimulus"
const controllerAttribute="data-controller"
const registeredControllers={}
const controllersFolder={}
function parseImportmapJson(){return JSON.parse(document.querySelector("script[type=importmap]").text).imports}
function lazyLoadControllersFrom(application,element=document){lazyLoadExistingControllers(application,element)
lazyLoadNewControllers(application,element)}
function lazyLoadExistingControllers(application,element){queryControllerNamesWithin(element).forEach(controllerName=>loadController(controllerName,controllersFolder[controllerName],application))}
function lazyLoadNewControllers(application,element){new MutationObserver((mutationsList)=>{for(const{attributeName,target,type}of mutationsList){switch(type){case "attributes":{if(attributeName==controllerAttribute&&target.getAttribute(controllerAttribute)){extractControllerNamesFrom(target).forEach(controllerName=>loadController(controllerName,controllersFolder[controllerName],application))}}
case "childList":{lazyLoadExistingControllers(application,target)}}}}).observe(element,{attributeFilter:[controllerAttribute],subtree:true,childList:true})}
function queryControllerNamesWithin(element){return Array.from(element.querySelectorAll(`[${controllerAttribute}]`)).map(extractControllerNamesFrom).flat()}
function extractControllerNamesFrom(element){return element.getAttribute(controllerAttribute).split(/\s+/).filter(content=>content.length)}
function loadController(name,under,application){if(!(name in registeredControllers)){import(controllerFilename(name,under)).then(module=>registerController(name,module,application)).catch(error=>console.error(`Failed to autoload controller: ${name}`,error))}}
function controllerFilename(name,under){return `${under}/${name.replace(/--/g,"/")}_controller`}
function registerController(name,module,application){if(!(name in registeredControllers)){application.register(name,module.default)
registeredControllers[name]=true}}
Object.keys(parseImportmapJson()).forEach(function(key){if(key.includes("_controller")){let[folder,...rest]=key.split('/')
let name=rest.join('/').replace(/\//g,"--").replace("_controller","")
controllersFolder[name]=folder}})
let whenAppAvailable=function(callback){const interval=30;window.setTimeout((function(){if(window.App){callback()}else{window.setTimeout(whenAppAvailable(callback),interval)}}),interval)}
whenAppAvailable(function(){lazyLoadControllersFrom(application)});