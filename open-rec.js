function OpenRec(root){
  var self = this;
  var stack = [];
  var flgDontOpen = false;

  function initialClose(target){
    var ch = target.children;
    for(var i=0,l=ch.length;i<l;i++){
      ch[i].style.display="none";
      arguments.callee(ch[i]);
    }
  }

  function close(target){
    var ch=target.children;
    for(var i=0,l=ch.length;i<l;i++){
      ch[i].style.display="none";
    }
  }

  function closeRec(target){
    if(stack.length < 1){
      return;
    }else if(target.parentElement == stack[stack.length-1]){
      //reach closing limit
      return;
    }else if(target == stack[stack.length-1]){
      flgDontOpen = true;
    }
    close(stack.pop());
    arguments.callee(target);
  }

  function openRec(target){
    if(flgDontOpen){
      flgDontOpen=false;
      return;
    }
    var ch=target.children;
    for(var i=0,l=ch.length;i<l;i++){
      ch[i].style.display="";
    }
    stack.push(target);
  }

  function recManager(e){
    var target = e.target || e.srcElement;
    closeRec(target);
    openRec(target);
  }

  //initialize
  root.addEventListener("click", recManager, false);

  root.style.display="none";
  for(var i=0,l=root.children.length;i<l;i++){
    initialClose(root.children[i]);
  }
  root.style.display="";
}
