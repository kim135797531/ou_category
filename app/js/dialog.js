function initDialog(){  
  $("#addByWord").bind('click', addByWord);
  $("#addByNickName").bind('click', addByNickName);
}

function addByWord(){
  $("#dropdownCategory").html("�ܾ�<span class="caret"></span>");
}

function addByNickName(){
  $("#dropdownCategory").html("����� �г���<span class="caret"></span>);
}

document.addEventListener('DOMContentLoaded', initDialog, false);