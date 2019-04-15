
/**
 * called each time a tab is changed!
 */
chrome.tabs.onActivated.addListener(function(active) {

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        let url = tabs[0].url;

        chrome.cookies.get({url: url, name: 'annyang'}, function (cookie) {
            if (cookie != null && cookie.value != null && cookie.value == 'true') {
                chrome.tabs.executeScript(active.tabId, {file: "vr.js"}, function (response) {
                    if (response) {
                    }
                });
            }
        });

    });

});