// This will check for Amazon.ca Links and adds the affiliate code. You can add any other affilaite program by adding more enteries.

var configurations = {
      amazonca : { 
        rx: /^http.*?\.amazon.ca.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
        params: [
          { param: "tag", paramValue: "cmdca05-20" }
        ]
      },
    };
    
    function addTag(info) {
        var tUrl = info.url;
        var r = { cancel: false };
        
        console.log("Inside addTag() "); 
        
        for ( var config in configurations) { 
          if( configurations.hasOwnProperty(config) ) {
            if (tUrl.match(configurations[config].rx) ) { 
              if (tUrl.indexOf(configurations[config].params[0].param) == -1 ) {    
                r = { redirectUrl: tUrl+(tUrl.indexOf("?") == -1 ? "?" : "&") + createTag(configurations[config].params) };
                chrome.windows.getCurrent(function (currentWindow) {
                  chrome.tabs.query({active: true, windowId: currentWindow.id}, function(tabs) {
                    chrome.pageAction.show(tabs[0].id);
                  });
                });
                break;
              }
            } 
          }
        }
        return r;
    }

    function createTag(params) {
      var result = "";
      for( var i = 0; i < params.length; i++ ) {
        result = result + params[i].param + "=" + params[i].paramValue;
        if( i >= 0 && i < params.length - 1 ) {
            result = result + "&";
        }
      }
      return result;
    }

  
  if (!chrome.webRequest.onBeforeRequest.hasListener(addTag)) {      
   var site_urls = [ 
            "http://*.amazon.ca/*/dp/*",
            "http://*.amazon.ca/dp/*",
            "http://*.amazon.ca/exec/obidos/tg/detail/*",
            "http://*.amazon.ca/gp/product/*",
            "http://*.amazon.ca/o/*",
    ];
  
    chrome.webRequest.onBeforeRequest.addListener(addTag, { urls: site_urls }, [ "blocking" ]); 
  }