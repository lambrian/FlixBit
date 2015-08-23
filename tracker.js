var listenerSet; 
if (!listenerSet) {
    listenerSet = true;
    var appendTime = function(latestStatus) {
        chrome.storage.sync.get('flixBitTimes', function (data) {
            var times = JSON.parse(data['flixBitTimes']);
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
