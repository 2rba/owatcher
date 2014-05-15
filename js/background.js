function checkSites(){
    var list = JSON.parse(localStorage.getItem("list"));
    var query = localStorage.getItem("query");
    if (!query) query="";
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
                list.unshift({id: id, href: link.attr('href'), title: link.html(), description: $em.find('.oJobDescription').html().trim()})
            }


        });
        list = list.slice(0,100);
        localStorage.setItem("list",JSON.stringify(list));
        setBadge(list);
    });
}

if (!localStorage.getItem("list")) localStorage.setItem("list",JSON.stringify([]));

checkSites();

setInterval(checkSites,300000);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.reload)
            checkSites();
    });