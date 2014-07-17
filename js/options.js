var query = localStorage.getItem("query");
if (!query) query = "";

var input = $("#search-tags");
input.val(query);


input[0].selectionStart = input[0].selectionEnd = input.val().length;

$('form#option').on('submit',function(e){
    e.preventDefault();
    localStorage.setItem("query",input.val());
    $('form#option [type=submit]').attr('disabled','1');
    chrome.runtime.sendMessage({reload: 1});
});

input.on('keyup',function(e){
    console.log("event");
    $('form#option [type=submit]').removeAttr('disabled');
});