var categoryJSONArray;

function initPopup(){
  var saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', saveOptions, false);
  
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
  categoryBox = document.getElementById("categoryBox");
  for(var i=0; i < categoryJSONArray.length; i++)
    categoryBox.innerHTML += '[<input type="checkbox" name='+categoryJSONArray[i].en+'>'+categoryJSONArray[i].kr+'</option>]  ';
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