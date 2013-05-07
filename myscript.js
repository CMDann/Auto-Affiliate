// The websites and the affiliate tags

var sites = {
        amazonca:     { url: "amazon.ca", tag:"tag=cmdca05-20"}; 
    };
    
	// add your tag to the url
    function addTag(info) {
        var tUrl = info.url;
        var r = { cancel: false };
        
        console.log("Inside addTag() "); 
        
        for (x in sites) { 
          if (tUrl.indexOf(sites[x].url) >= 0) { 
            if (tUrl.indexOf(sites[x].tag) == -1 ) {    
              r = { redirectUrl: tUrl+(tUrl.indexOf("?") == -1 ? "?" : "&")+sites[x].tag };
              chrome.windows.getCurrent(function (currentWindow) {
				chrome.tabs.query({active: true, windowId: currentWindow.id}, function(tabs) {
					chrome.pageAction.show(tabs[0].id);
				 });
			  });
              break;
            } 
          }
        }
        return r;
    }

	// Evaluate the different urls
  
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