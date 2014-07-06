var animal;
var baby;
var mid;

function initPopup(){
  console.log("init");
  var saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', saveOptions, false);
  loadOptions();
  setCategoryBox();
}

function loadOptions(){
  var categoryLoadListJSON = localStorage["category_list"];
  var categoryLoadList = JSON.parse(categoryLoadListJSON);
  animal = categoryLoadList.animal;
  baby = categoryLoadList.baby;
  mid = categoryLoadList.mid;
}
function setCategoryBox(){
  categoryBox = document.getElementById("categoryBox");
  if(animal == 1){
    categoryBox.animal.checked = true;
  }
  if(baby == 1){
    categoryBox.baby.checked = true;
  }
  if(mid == 1){
    categoryBox.mid.checked = true;
  }
}

function getCategoryBox(){
  categoryBox = document.getElementById("categoryBox");
  if(categoryBox.animal.checked == true){
    animal = 1;
  }else{
    animal = 0;
  }
  if(categoryBox.baby.checked == true){
    baby = 1;
  }else{
    baby = 0;
  }
  if(categoryBox.mid.checked == true){
    mid = 1;
  }else{
    mid = 0;
  }
}

function saveOptions(){
  console.log("save");
  getCategoryBox();
  var categorySaveListJSON = {};
  categorySaveListJSON['animal']=animal;
  categorySaveListJSON['baby']=baby;
  categorySaveListJSON['mid']=mid;
  localStorage["category_list"] = JSON.stringify(categorySaveListJSON);
}

document.addEventListener('DOMContentLoaded', initPopup, false);