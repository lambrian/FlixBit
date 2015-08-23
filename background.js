chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (details.url.match(/http:\/\/www.netflix.com\/watch\/.*/)) { 
        // entering theater - execute tracker
        chrome.tabs.executeScript(null,{file:"tracker.js"});
    } else if (details.url) { 
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
