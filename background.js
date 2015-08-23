chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (details.url.match(/http:\/\/www.netflix.com\/watch\/.*/)) { 
        // entering theater - execute tracker
        chrome.tabs.executeScript(null,{file:"tracker.js"});
        console.log ('executing tracker');
    } else if (details.url) { 
        console.log ('turning off tracker');
        chrome.storage.sync.get(['flixBitStatus', 'flixBitTimes'], 
            function (data) {
                var latestStatus = data['flixBitStatus'];
                var times = data['flixBitTimes'];
                if (latestStatus === 'start') {
                    times.push(new Date());
                    chrome.storage.sync.set({
                        flixBitStatus: 'stop',
                        flixBitTimes: times
                    }, function () {});
                }
            });
    }
});

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
        chrome.storage.sync.set(
            {'flixBitTimes': JSON.stringify([]),
                'flixBitStatus': ''}, function () {});
    } else if (details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});
