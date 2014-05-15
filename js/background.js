var query_list;
function checkQuery(query){
    query = query.trim();
    var list = JSON.parse(localStorage.getItem("list"));
    $.get('https://www.odesk.com/o/jobs/browse/?q='+query,function(data){
        $(data).find('li article').each(function(index,em){
            var $em=$(em);
            var link = $em.find('a[itemprop=url]');
            var id = link.attr('href').match(/_\~([0-9a-z]+)\//)[1];
            var found = false;
            for (var i in list){
                if (list[i].id == id){
                    found = true;
                    break;
                }
            }
            if (!found){
                list.unshift({id: id, query: query, href: link.attr('href'), title: link.html(), description: $em.find('.oJobDescription').html().trim()})
            }


        });
        list = list.slice(0,100);
        localStorage.setItem("list",JSON.stringify(list));
        setBadge(list);
        if (query_list.length > 0){
            checkQuery(query_list.shift());
        }
    });
}


function checkSites(){
    var query = localStorage.getItem("query");
    if (!query) query="";
    query_list=query.split(',');
    checkQuery(query_list.shift());
}

if (!localStorage.getItem("list")) localStorage.setItem("list",JSON.stringify([]));

checkSites();

setInterval(checkSites,300000);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.reload)
            checkSites();
    });