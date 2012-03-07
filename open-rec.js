function OpenRec(root){
  var self = this;
  var stack = [];
  var flgDontOpen = false;

  function closeRec(target){
    var ch = target.children;
    for(var i=0,l=ch.length;i<l;i++){
      ch[i].style.display="none";
      closeRec(ch[i]);
    }
  }

  function close(target){
    var ch=target.children;
    for(var i=0,l=ch.length;i<l;i++){
      ch[i].style.display="none";
    }
  }

  this.closeRec=function(target){
    if(stack.length < 1){
      return;
    }else if(target.parentElement == stack[stack.length-1]){
      return;
    }else if(target == stack[stack.length-1]){
      flgDontOpen = true;
    }
    close(stack.pop());
    self.closeRec(target);
  };
  this.openRec=function(target){
    if(flgDontOpen){
      flgDontOpen=false;
      return;
    }
    var ch=target.children;
    for(var i=0,l=ch.length;i<l;i++){
      ch[i].style.display="";
    }
    stack.push(target);
    console.dir(stack);
  };

  function recManager(e){
    var target = e.target || e.srcElement;
    self.closeRec(target);
    self.openRec(target);
  };

  root.addEventListener("click", recManager, false);

  root.style.display="none";
  for(var i=0,l=root.children.length;i<l;i++){
    closeRec(root.children[i]);
  }
  root.style.display="";
}

new OpenRec(document.getElementById("root"));
