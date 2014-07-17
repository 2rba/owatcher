var query_list;
function checkQuery(query){
    console.log('checking');
    query = query.trim();
    var list = JSON.parse(localStorage.getItem("list"));
    //'https://www.odesk.com/jobs/browse/?q='+query+'&sortBy=s_ctime+desc'
    var url='https://www.odesk.com/jobs/?q='+query+'&sortBy=s_ctime+desc';
    var toadd=[];
    $.get(url,function(data){
        console.log('query:'+query);
        console.log(data);
        rr=data;
        $(rr).find('article.oMed').each(function(index,em){
            var $em=$(em);
            var id = $em.attr('data-id');
            var link;
            var description;
            if(id){
                link = $em.find('.oVisitedLink');
                description = $em.find('.oDescription').text().trim();
            } else {
                link = $em.find('a[itemprop=url]');
                id = link.attr('href').match(/_\~([0-9a-z]+)\//)[1];
                description = $em.find('.oJobDescription').text().trim();
            }
            console.log(id);
            console.log(link.text());
//            console.log(link.attr('href'));
//            console.log(description);
            var found = false;
            for (var i in list){
                if (list[i].id == id){
                    console.log('found');
                    console.log(id);
                    console.log(list[i].id);
                    found = true;
                    break;
                }
            }
            if (!found){
                toadd.push({id: id, query: query, href: link.attr('href'), title: link.text(), description: description});
            }


        });
        list = toadd.concat(list).slice(0,100);
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
        console.log('message');
        if (request.reload)
        console.log('reload');
            checkSites();
    });