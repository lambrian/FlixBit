var listenerSet; 
if (!listenerSet) {
    listenerSet = true;
    var appendTime = function(latestStatus) {
        chrome.storage.sync.get(['flixBitTimes', 'flixBitStatus'], function (data) {
            var times = JSON.parse(data['flixBitTimes']);

            // basic error checking
            // if previous status and current status are both starts, some stop was
            // missed. trash that previous start
            if (latestStatus === data['flixBitStatus']) {
                times.pop();
            }
            times.push(new Date());
            chrome.storage.sync.set(
                {'flixBitTimes': JSON.stringify(times), 
                    'flixBitStatus': latestStatus}, 
                    function () {});
        });
    };

    $('body').on('DOMNodeInserted', function (e) {
        if (e.target.tagName === 'VIDEO') {
            $('video').first().on('play', function (e) {
                appendTime('start');
            });
            $('video').first().on('pause', function (e) {
                appendTime('stop');
            });
        }
    });
}

