var query = localStorage.getItem("query");
if (!query) query = "";

var input = $("#search-tags");
input.val(query);


input[0].selectionStart = input[0].selectionEnd = input.val().length;

$('form#option').on('submit',function(e){
    e.preventDefault();
    localStorage.setItem("query",input.val());
    chrome.runtime.sendMessage({reload: 1});
});