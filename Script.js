const __Domain__ = { MainElement: document.head }
  
__Domain__.Define = function(start) {
   try { __BasePage__ = false } catch {}
   var scripts = document.getElementsByTagName("script")
   for(var i = 0; i < scripts.length; i++) { 
    var attributes = scripts[i].attributes
     for(var e = 0; e < attributes.length; e++) {
      var item = attributes[e]
         if(item.name == 'database' && item.value == 'use') { 
         __Domain__.script=scripts[i]; __Domain__.base=true; __Domain__.menu=true; break;
        }
      }
   }; 
   if(start) {
   if(__Domain__.menu) { __Domain__.GetKeyCodes() }
   __Domain__.ConnectData(function () {
       if(__Domain__.base && !__BasePage__) { 
        if(__Domain__.code == undefined && __BasePage__) { RunInstall() }
         else if(!__BasePage__ && __Domain__.code) {
           var isname = __Domain__.IsContainsFileName()
           var isurl = __Domain__.IsContainsFileSource()
           if(isname && !isurl) { __Domain__.createFrame("move") }
           else if(!isname) { __Domain__.createFrame("save") }
           else { console.warn('>> server is connected.') }
            }
          } else if(__BasePage__) { InitializeLoad() }
        }, function() { 
           if(__BasePage__) { RunInstall() }
           console.error(">> Server isn't connected.") 
        })
      }
   };

__Domain__.PreventLoad = function() {
    if(localStorage.getItem(":openChanel") == "a") {
     __Domain__.Define()
     localStorage.setItem(":openChanel",document.URL)
     var a = document.createElement("a")
     a.href=__Domain__.GetMainURL(__Domain__.script.src) + "form.html"; a.click()
     } else { return true }
  }
   
__Domain__.GetRandomNumber = function(l) {
   var Number = ""
   for(var i = 0; i < l; i++) {
     Number += Math.round(Math.random()*l)
    }; return Number
  }
   
__Domain__.IsContainsFileSource = function() {
   var url = document.URL
   for(var i = 0; i < __Domain__.links.length; i++) { 
    if(__Domain__.links[i].src == url) { return true }
    }
  }

__Domain__.IsContainsFileName = function() {
  var name = __Domain__.GetFileName()
    for(var i = 0; i < __Domain__.links.length; i++) { 
     if(__Domain__.links[i].name == name) { return true }
    }
  }

__Domain__.VisitURL = function(url) {
 var a = document.createElement("a")
 a.href = url; a.click()
  }
  
__Domain__.GetFileName = function() {
  var f = document.URL
  var p = 0;
  for(var i = 0; i < f.length; i++) { if(f[i] == '/') { p = i } }
    var name=""
    for(var e = p+1; e < f.length; e++) { name=name+f[e] }
   return name
 };
  
__Domain__.GetMainURL = function(source) {
  var res = ""
  var result = ""
  var tab = false
  var res = ""
  var result = ""
  for(var i = 0; i < source.length; i++) {
   res += source[i]
   if(source[i] == "/") { result += res; res = "" }
    }; return result
  }
  
__Domain__.RewriteData = function(code, links) {
  var DriveBody = "__Domain__.code = " + code + "; __Domain__.links = new Array()"
  for(var i = 0; i < links.length; i++) {
   DriveBody += "; __Domain__.links.push(" + JSON.stringify(links[i]) + ")"
    }; return DriveBody
  }
  
__Domain__.ConnectData = function(onload, onerror) {
   var source = __Domain__.GetMainURL(__Domain__.script.src) + "Drive.js"
   var script = document.createElement("script")
   script.src = source
   script.onload = function() { onload() }
   script.onerror = function() { onerror() }
   __Domain__.MainElement.append(script)
 }

__Domain__.GetKeyCodes = function() {
  /*
   if(__Domain__.menu) { getKeyCodes() }
   if(__Domain__.base) { sendSignal() }
  */
  }
  
__Domain__.Download = function (data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
     }
 }; 
  
   if(document.body) {
       if( __Domain__.PreventLoad() ) {
           __Domain__.Define(true)
         }
     } 
    else if( __Domain__.PreventLoad() ) {
       window.addEventListener("DOMContentLoaded",(event) => {
         __Domain__.Define(true)
      })
  };
  
__Domain__.stopAllTimers = function() {
    keydowns = document.onkeydown
    document.onkeydown=function(e) {
    console.log(e.key)
    if(e.key == 'Escape') { document.body.removeChild(window.f) }
    }
 };
  
__Domain__.wait_answer = function(res, p) {
       var a = localStorage.getItem(':openChanel')
        if(a == "true") { res() }
        else if(a == 'close' && !p) {
        document.body.removeChild(__Domain__.frame);
     } else { setTimeout(function() { __Domain__.wait_answer(res, p) },150) }
 };
  
__Domain__.createFrame = function(comand) {
    var MainSource = __Domain__.GetMainURL(__Domain__.script.src)
    if( __Domain__.GetMainURL(document.URL) !=  MainSource) {
     __Domain__.stopAllTimers()     
      localStorage.setItem(':openChanel', "")
      localStorage.setItem(':openChanel.comand', comand)
      localStorage.setItem(':openChanel.name', __Domain__.GetFileName())
      localStorage.setItem(':openChanel.link', document.URL)
     __Domain__.frame = document.createElement('iframe')
     __Domain__.frame.src = MainSource + 'frame.html'
     __Domain__.frame.style = `position: fixed; z-index: 100002; top: 0; left: 0;` + 
                             `border: 0px solid; width: 100%; height: 100%; padding: 0;`

      document.body.append(__Domain__.frame)
      __Domain__.wait_answer(function() {
         var a = document.createElement("a"); a.href = document.URL; a.click()
       })
    }
 };
  