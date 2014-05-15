function setBadge(list){
    var count = 0;
    for (var i in list){
        if (!list[i].seen) count++;
    }
    if (count >0 )
        chrome.browserAction.setBadgeText({text:count.toString()});
    else
        chrome.browserAction.setBadgeText({text:""});
}