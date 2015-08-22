$('body').on('DOMNodeInserted', function (e) {
    if (e.target.tagName === 'VIDEO') {
        $('video').first().on('play', function (e) {
            console.log ('play.');
        });
        $('video').first().on('pause', function (e) {
            console.log ('pause.');
        });
    }
});
