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

var colors=['red','blue','green','pink','yellow'];

function getColor(key){
    var query = localStorage.getItem("query");
    if (!query) query="";
    var query_list=query.split(',');
    for (var i in query_list){
        if (query_list[i].trim() == key && colors[i] ) return colors[i];
    }
    return '#878787';
}