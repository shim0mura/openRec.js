function OpenRec(root, prefix){
  var self = this;
  var stack = [];
  var flgDontOpen = false;

  function init(par){
    var ch = par.children;
    for(var i=0,l=ch.length;i<l;i++){
      ch[i].style.display="none";
      if(hasClass.call(ch[i], prefix)){
        init(ch[i]);
      }
    }
  }

  function hasClass(klass){
    if(this.className==""){
      return false;
    }
    var kl = this.className.split(/[\t\s]+/);
    var reg = new RegExp("(^|\s)"+klass+"[\w]*");
    for(var i=0,l=kl.length;i<l;i++){
      if(reg.test(kl[i])){
        return true;
      }
    }
    return false;
  }

  function close(target){
    var ch=target.children;
    for(var i=0,l=ch.length;i<l;i++){
      ch[i].style.display="none";
    }
  }

  this.closeRec=function(target){
    if(stack.length < 1){
      console.log("stack empty");
      return;
    }else if(target.parentElement == stack[stack.length-1]){
      console.log("open element");
      return;
    }else if(target == stack[stack.length-1]){
      console.log("do not open");
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
    if(!hasClass.call(target, prefix)){
      console.log("class not found");
      return;
    }
    self.closeRec(target);
    self.openRec(target);
  };

  root.addEventListener("click", recManager, false);

  root.style.display="none";
  for(var i=0,l=root.children.length;i<l;i++){
    init(root.children[i]);
  }
  root.style.display="";
}

//new OpenRec(document.getElementById("root"), "divclass");
new OpenRec(document.getElementById("root"));
