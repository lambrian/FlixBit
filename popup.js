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
    console.log (totalDuration);
    var parsed = moment.duration(totalDuration);
    document.getElementById('duration').innerHTML = 
    parsed.months() + " months : " + parsed.days() + " days : " + parsed.hours() + " hours :" + parsed.minutes() + " minutes : " + parsed.seconds() + " seconds ";
});
