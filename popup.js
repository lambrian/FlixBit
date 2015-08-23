chrome.storage.sync.get(['flixBitTimes', 'flixBitStatus'], function (data) {
    var times = JSON.parse(data['flixBitTimes']);
    var latestStatus = data['flixBitStatus'];

    console.log (times);
    var totalDuration = 0;
    for (var i = 0; i < Math.floor(times.length/2); i++) {
        var start = new Date(times[2*i]);
        var end = new Date(times[2*i + 1]);
        var duration = end - start;
        console.log (duration);
        totalDuration += duration;
    }
    var parsed = moment.duration(totalDuration);
    var display = document.getElementById('duration');

    var createChild = function (text) {
        var elem = document.createElement('div');
        elem.appendChild(document.createTextNode(text));
        return elem;
    }

    display.appendChild(createChild(parsed.months() + " months"));
    display.appendChild(createChild(parsed.days() + " days"));
    display.appendChild(createChild(parsed.hours() + " hours"));
    display.appendChild(createChild(parsed.minutes() + " minutes"));
    display.appendChild(createChild(parsed.seconds() + " seconds"));
});
