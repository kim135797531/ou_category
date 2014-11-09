function initDialog(){  
  $("#addByWord").bind('click', addByWord);
  $("#addByNickName").bind('click', addByNickName);
}

function addByWord(){
  $("#dropdownCategory").html("단어<span class="caret"></span>");
}

function addByNickName(){
  $("#dropdownCategory").html("사용자 닉네임<span class="caret"></span>);
}

document.addEventListener('DOMContentLoaded', initDialog, false);