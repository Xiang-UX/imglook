    function fuckyou(){
      window.close(); //关闭当前窗口(防抽)
      swindow.location="about:blank"; //将当前窗口跳转置空白页
    }
 
    function click(e) {
      if (document.all) {
        if (event.button==2||event.button==3) {
          alert("欢迎光临寒舍?，有什么需要帮忙?的话，请小生联系！?");
          oncontextmenu='return false';
        }
 
       }
      if (document.layers) {
         if (e.which == 3) {
           oncontextmenu='return false';
         }
      }
    }
   if (document.layers) {
       fuckyou();
       document.captureEvents(Event.MOUSEDOWN);
   }
   document.onmousedown=click;
   document.oncontextmenu = new Function("return false;")
   document.onkeydown =document.onkeyup = document.onkeypress=function(){
      if(window.event.keyCode == 123) {
          fuckyou();
          window.event.returnValue=false;
          return(false);
      }
  }