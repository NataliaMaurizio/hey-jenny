$(function() {
    $("#switch-sm").click(function() {

        if ($('#switch-sm').is(':checked')) {
            enable();
        } else {
            disable();
        }

    });
});

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    let url = tabs[0].url;

    chrome.cookies.get({url: url, name: 'annyang'}, function (cookie) {
        if (cookie != null && cookie.value != null && cookie.value == 'true') {
            $('#switch-sm').attr('checked', 'checked');
            enable();
        }
    });

});

function enable() {
    // get the url for the current tab
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        let url = tabs[0].url;
        let id = tabs[0].id;

        chrome.cookies.set({
            url: url,
            name: 'annyang',
            value: "true"
        });

        chrome.tabs.executeScript(id, {file: "vr.js"}, function (response) {
            if (response) {

                document.getElementById('info').classList.remove('hidden');
                document.getElementById('unlock').classList.remove('hidden');

            }
        });

    });

}

function disable() {

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        let url = tabs[0].url;
        let id = tabs[0].id;

        chrome.cookies.remove({
            url: url,
            name: 'annyang'
        });

        document.getElementById('info').classList.add('hidden');
        document.getElementById('unlock').classList.add('hidden');

        chrome.tabs.executeScript(id, {code: "abort();"}, function (response) {
        });

    });

}