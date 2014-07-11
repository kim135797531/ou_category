var categoryJSONArray;

function initPopup(){
  var saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', saveOptions, false);
  
  var translateHashMap = new HashMap();
  var valueHashMap = new HashMap();
  var categoryLoadListJSONArray = localStorage["category_list"];
  
  //첫 실행이면 data.js에서 기본값을 가져온다.
  if(categoryLoadListJSONArray == undefined){
    categoryJSONArray = categoryInitListJSONArray;
  }else{
    categoryJSONArray = JSON.parse(categoryLoadListJSONArray);
  }
  initDataArray(translateHashMap, valueHashMap);
  setCategoryBox();
}

function initDataArray(translateHashMap, valueHashMap){
  for(var i=0; i < categoryJSONArray.length; i++){
    translateHashMap.put(categoryJSONArray[i].en, categoryJSONArray[i].kr);
    valueHashMap.put(categoryJSONArray[i].en,  categoryJSONArray[i].value);
  }
}

function setCategoryBox(){
  categoryBox = document.getElementById("categoryBox");
  
  for(var i=0; i < categoryJSONArray.length; i++){
    if(categoryJSONArray[i].value == "1"){
      categoryBox[categoryJSONArray[i].en].checked=true;
    }
  }
}

function getCategoryBox(){
  categoryBox = document.getElementById("categoryBox");
  
  for(var i=0; i < categoryJSONArray.length; i++){
    if(categoryBox[categoryJSONArray[i].en].checked == true){
      categoryJSONArray[i].value = "1";
    }else{
      categoryJSONArray[i].value = "0";
    }
  }
}

function saveOptions(){
  getCategoryBox();
  localStorage["category_list"] = JSON.stringify(categoryJSONArray);
}

document.addEventListener('DOMContentLoaded', initPopup, false);