
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('here');
  chrome.tabs.create({url:chrome.extension.getURL("dash.html")});
});