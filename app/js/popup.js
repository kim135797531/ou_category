var categoryJSONArray;

function initPopup(){
  $("#navbarTitle").html("오유 카테고리 v"+chrome.runtime.getManifest().version);
  $("#creditButton").bind('click', showCredit);
  $("#saveButton").bind('click', saveOptions);
  
  var categoryLoadListJSONArray = localStorage["category_list"];
  
  //첫 실행이면 data.js에서 기본값을 가져온다.
  if(categoryLoadListJSONArray == undefined){
    categoryJSONArray = categoryInitListJSONArray;
  }else{
    categoryJSONArray = JSON.parse(categoryLoadListJSONArray);
  }
  dynamicAddCheckBox();
  setCategoryBox();
}

function dynamicAddCheckBox(){
  for(var i=0; i < categoryJSONArray.length; i++){
    var buttonHTML = '<button id='+categoryJSONArray[i].en+' type="button" class="btn btn-primary" data-toggle="button">'+categoryJSONArray[i].kr+'</button>';
    $("#categoryBox").append(buttonHTML);
    
    $('#'+categoryJSONArray[i].en).click(function() {
      if($(this).attr('class') == "btn btn-danger active"){
        $(this).toggleClass("btn-danger btn-primary");
      }else{
        $(this).toggleClass("btn-primary btn-danger");
      }
    });
  }
}

function setCategoryBox(){
  for(var i=0; i < categoryJSONArray.length; i++){
    if(categoryJSONArray[i].value == "1"){
      $('#'+categoryJSONArray[i].en).toggleClass("btn-primary btn-danger active");
    }
  }
}

function getCategoryBox(){
  for(var i=0; i < categoryJSONArray.length; i++){
    if($("#categoryBox").children().eq(i).attr('class') == "btn btn-danger active"){
      categoryJSONArray[i].value = "1";
    }else{
      categoryJSONArray[i].value = "0";
    }
  }
}

function showCredit(){
  layerCredit = document.getElementById("layer_credit");
  layerCredit.style.display = "inline";
}

function saveOptions(){
  getCategoryBox();
  localStorage["category_list"] = JSON.stringify(categoryJSONArray);
  layerSaveMessage = document.getElementById("layer_save_message");
  layerSaveMessage.style.display = "inline";
  setTimeout(function(){
    layerSaveMessage.style.display = "none";
  }, 1500);
}

function tweakWidthForScrollbar() {
  var db = document.body;
  var scrollBarWidth = db.scrollHeight > db.clientHeight ?
      db.clientWidth - db.offsetWidth : 0;
  db.style.paddingRight = scrollBarWidth + "px";
}

document.addEventListener('DOMContentLoaded', initPopup, false);
//document.addEventListener('onresize', tweakWidthForScrollbar, false);