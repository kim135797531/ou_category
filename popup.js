var animal;
var baby;
var mid;
var lol;
var ani;

function initPopup(){
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
  lol = categoryLoadList.lol;
  ani = categoryLoadList.ani;
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
  if(lol == 1){
    categoryBox.lol.checked = true;
  }
  if(ani == 1){
    categoryBox.ani.checked = true;
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
  if(categoryBox.lol.checked == true){
    lol = 1;
  }else{
    lol = 0;
  }
  if(categoryBox.ani.checked == true){
    ani = 1;
  }else{
    ani = 0;
  }
}

function saveOptions(){
  getCategoryBox();
  var categorySaveListJSON = {};
  categorySaveListJSON['animal']=animal;
  categorySaveListJSON['baby']=baby;
  categorySaveListJSON['mid']=mid;
  categorySaveListJSON['lol']=lol;
  categorySaveListJSON['ani']=ani;
  localStorage["category_list"] = JSON.stringify(categorySaveListJSON);
}

document.addEventListener('DOMContentLoaded', initPopup, false);