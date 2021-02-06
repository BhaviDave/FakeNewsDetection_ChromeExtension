/*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.method == "getSelection") {
        sendResponse({data: window.getSelection().toString()});
    } else {
        sendResponse({});
    }
});
*/


function viewPopupWindow(info, tab) {
	chrome.tabs.create({
		url: chrome.extension.getURL('popupMenu.html'),
		active: false
	}, function (tab) {
		// After the tab has been created, open a window to inject the tab
		chrome.windows.create({
			tabId: tab.id,
			type: 'popup',
			focused: true,
			width: 550,
			height: 800
		});
	});
	chrome.storage.local.set({ 'selectedText': info.selectionText }, function () {
		console.log(info.selectionText);
	});
}

// The Right-clicky option!
chrome.contextMenus.create({
	title: "Show",
	contexts: ["selection"],
	onclick: viewPopupWindow
});


