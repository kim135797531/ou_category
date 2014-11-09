var categoryJSONArray;

function initPopup(){
  $("#navbarTitle").html("오유 카테고리 v"+chrome.runtime.getManifest().version);
  $("#creditButton").bind('click', showCredit);
  $("#addWordButton").bind('click', addWord);
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
  $("#categoryBox").html('');
  for(var i=0; i < categoryJSONArray.length; i++){
    if(categoryJSONArray[i].blockMethod == "word"){
      var buttonHTML = '<button id='+categoryJSONArray[i].en+' type="button" class="btn btn-primary" data-toggle="button">'+categoryJSONArray[i].kr+'</button>';
      $("#categoryBox").append(buttonHTML);
      
      $('#'+categoryJSONArray[i].en).click(function() {
        if($(this).attr('class') == "btn btn-danger active"){
          $(this).toggleClass("btn-danger btn-primary");
        }else{
          $(this).toggleClass("btn-primary btn-danger");
        }
      });
    }else{
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

function addWord(){
  BootstrapDialog.show({
    title: '추가하기',
    message: jQuery('<div></div>').load('dialog.html'),
    onshown: function(dialogRef){
       bindCategoryButton(dialogRef);
    },
    buttons: [{
      label: '추가',
      cssClass: 'btn-danger',
      hotkey: 13, //Enter
      data: {
        'choose': "0",
      },
      action: function(dialogRef){
        var finalChoose = dialogRef.getData('choose');
        var finalData = $("#receivedData").val();
        if(finalChoose == 0){
          dynamicAddJSONArray(finalData, null);
        }else if(finalChoose == 1){
          dynamicAddJSONArray(null, finalData);
        }
        dialogRef.close();
      }
    }]
  });
}

function bindCategoryButton(dialogRef){
        $("#addByWord").bind('click', {msg:dialogRef}, function(event){
            event.data.msg.setData('choose', 0);
            $("#dropdownCategory").html('단어 <span class="caret"></span>');
        });
        $("#addByNickName").bind('click', {msg:dialogRef}, function(event){
            event.data.msg.setData('choose', 1);
            $("#dropdownCategory").html('사용자 닉네임 <span class="caret"></span>');
        });
        dialogRef.setData('choose', 0);
}


function dynamicAddJSONArray(word, nickname){
  var newData = '{"blockMethod" : "word", "en" : "'+word+'", "kr" : "'+word+'", "value" : "1"}';
  categoryJSONArray.push(JSON.parse(newData));
  dynamicAddCheckBox();
  setCategoryBox();
  saveOptions();
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