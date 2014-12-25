Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function filterCat() {
  chrome.extension.sendRequest({method: "getLocalStorage", key: "category_list"}, function(response) {
    var category_listJSON = response.data;
    var category_list = JSON.parse(category_listJSON);
    var tableList = document.getElementsByClassName("table_list");
    var table_tbody = tableList[0].getElementsByTagName("tbody");
    var table_trList = table_tbody[0].getElementsByTagName("tr");
    traverseTrList(table_trList, category_list);
  });
}

function traverseTrList(table_trList, category_list){
  if(table_trList.length > 0){
    for(i=0; i<table_trList.length; i++){
      var table_tdList = table_trList[i].getElementsByTagName("td");
      traverseTdList(table_trList, i, table_tdList, category_list);
    }
  }   
}

function traverseTdList(table_trList, i, table_tdList, category_list){
  if(table_tdList.length > 0){
     for(j=0; j<table_tdList.length; j++){
        var category_link = table_tdList[j].getElementsByTagName("a");
        if(checkTd(table_trList, category_link, category_list)){
          table_trList[i].style.display = "none";
          //table_trList[i+1].style.display = "none";
        }
    }
  }
}

function checkTd(table_trList, category_link, category_list){
  if(category_link.length > 0){
    var attr = category_link[0].getAttribute('href');
    if(attr.length > 0){
      for(var i=0; i < category_list.length; i++){
        if(category_list[i].value == "0")
          continue;
        if(category_list[i].blockMethod == "word"){
          if(category_link[0].innerHTML.indexOf(category_list[i].en) >= 0){
            return true;
          }
        }else{
          if(attr.indexOf(category_list[i].en) >= 0)
            return true;
        }
      }
      return false;
    }
    return false
  }
}

filterCat();