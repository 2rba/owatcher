var list = JSON.parse(localStorage.getItem("list"));
var html = '';
for (var i in list){
    var entry = list[i];
    if (!entry.seen) {
        var link = entry.href;
        if (link.match(/^\/o\//)){
            link = link.slice(2);
        }
        html += '<li class="entry"><a title="' + entry.description.replace('"', '') + '" data-id="' + entry.id + '" href="https://www.odesk.com' + link + '" class="cell-wrap entry-link"><div class="img-wrap"></div><div class="info-wrap"><h3>' + entry.title + '</h3><p style="color: ' + getColor(entry.query) + '">' + entry.query + '</p></div></a></li>';
    }
}
$('#entry_wrapper').html(html);
$('#entry_wrapper').on('click','a',function(e){
    window.open($(e.currentTarget).attr('href'));
    var id = $(e.currentTarget).attr('data-id');
    for (var i in list){
        if (list[i].id == id){
            list[i].seen=true;
            break;
        }
    }
    localStorage.setItem("list",JSON.stringify(list));
    setBadge(list);
});

$('#clear-btn').on('click',function(){
    for (var i in list){
        list[i].seen=true;
    }
    localStorage.setItem("list",JSON.stringify(list));
    chrome.browserAction.setBadgeText({text:""});
    $('#entry_wrapper').html('');
});