function OpenRec(root, prefix){
  var self = this;
  var stack = [];
  var flgDontOpen = false;

  function hasClass(){
    if(this.className==""){
      return false;
    }
    var kl = this.className.split(/[\t\s]+/);
    var reg = new RegExp("(^|\s)"+prefix+"[\w]*");
    for(var i=0,l=kl.length;i<l;i++){
      if(reg.test(kl[i])){
        return true;
      }
    }
    return false;
  }

  function initialClose(target){
    var ch = target.children;
    for(var i=0,l=ch.length; i<l; i++){
      if(!prefix || hasClass.call(ch[i])){
        ch[i].style.display = "none";
      }
      arguments.callee(ch[i]);
    }
  }

  function close(target){
    var ch=target.children;
    for(var i=0,l=ch.length; i<l; i++){
      if(!prefix || hasClass.call(ch[i])){
        ch[i].style.display = "none";
      }
    }
  }

  /*
   * 閉じる処理関数
   * 閉じられる限界(targetと同じ階層)まで閉じる
   */
  function closeRec(target){
    if(stack.length < 1){
      return;
    }else if(target.parentElement == stack[stack.length-1]){
      return;
    }else if(target == stack[stack.length-1]){
      flgDontOpen = true;
    }
    close(stack.pop());
    arguments.callee(target);
  }

  /*
   * 開ける処理関数
   * targetを開く
   * targetがul要素の場合は直下のliまで開く
   */
  function openRec(target){
    if(flgDontOpen){
      flgDontOpen=false;
      return;
    }

    stack.push(target);
    var ch = target.children;

    for(var i=0,l=ch.length; i<l; i++){
      ch[i].style.display = "";
      if(ch[i].tagName == "UL"){
        stack.push(ch[i]);
        var lis = ch[i].children;
        for(var _i=0,_l=lis.length; _i<_l; _i++){
          lis[_i].style.display = "";
        }
      }
    }

  }

  /*
   * clickイベントのハンドラ関数
   * click発生元(=開閉の対象)を開閉処理させる
   * click発生元がprefixの無いものだった場合は
   * prefixがある直近親要素を探索する
   *
   */
  function recManager(e){
    var target = e.target || e.srcElement;
    if(target == root){
      return;
    }
    if(prefix && !hasClass.call(target)){
      var par = target.parentElement;
      while(!hasClass.call(par)){
        par = par.parentElement;
        if(par == root){
          return;
        }
      }
      target = par;
    }
    closeRec(target);
    openRec(target);
  }

  root.addEventListener("click", recManager, false);

  root.style.display="none";
  for(var i=0,l=root.children.length;i<l;i++){
    initialClose(root.children[i]);
  }
  root.style.display="";
}
