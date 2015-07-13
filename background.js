chrome.webRequest.onBeforeRequest.addListener(
    getGoogleCount,
    {
        urls: ["*://www.google.co.in/*", "*://www.google.com/*"]
    }
);

function getGoogleCount(request) {
    var parts, currentDate, expirationDate, tdate, counter;
    if( /oq=/.test(request.url) && /q=/.test(request.url) ) {
        parts = request.url.split(/&oq=/)
    }
    else if(/#q=/.test(request.url) ) {
        parts = request.url.split(/#q=/);
    }

    if(parts && parts.length == 2) {
        if(parts[1].charAt(0) != '&') {
            currentDate = new Date();
            expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);
            if(localStorage['gcounter'] && localStorage['gcounterDate']) {
                tdate = new Date(localStorage['gcounterDate']);
                if(currentDate > tdate) { //next day
                    counter = 0;
                } else { // current day
                    counter = localStorage['gcounter'];
                }
            } else { // using for the first time
                counter = 0;
            }


            localStorage['gcounter'] = ++counter;
            localStorage['gcounterDate'] = expirationDate;
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {gcount: localStorage['gcounter']}, function(response) {});
            });

        }
    }

}

chrome.webNavigation.onCompleted.addListener(function callback(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {gcount: localStorage['gcounter']}, function(response) {});
    });
})

