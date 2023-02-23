var left_value=0;
var page=1;
var max_page=3;
var system_article=[];
var left_right_button_enable=0;

function go_left(){
    var orun_line=document.getElementById("run_line");
    left_value-=1;
    orun_line.style.left=left_value+"px";
    if(orun_line.style.left==-1800+"px"){
        left_value=1500;
        orun_line.style.left=left_value+"px";
    }
    window.setTimeout(go_left,10);
}

var left_value_system=0;
var bar_count=1;
function system_go_left(){  //click right
    if(bar_count==1){
        var oleft_button=document.getElementById("left_button");
        var oright_button=document.getElementById("right_button");
        oleft_button.style.color="#808080";
        oright_button.style.color="#808080";
        left_right_button_enable=1;
    }
    if(bar_count<6){
        var osystem_articlee=document.getElementById("system_article_"+bar_count);
        left_value_system-=30;
        osystem_articlee.style.left=left_value_system+"px";
        if(left_value_system>=-720){
            window.setTimeout(system_go_left,1);
        }else{
            osystem_articlee.innerHTML=system_article[5*(page-1)+bar_count-1];
            bar_count++;
            left_value_system=0;
            window.setTimeout(system_go_left,1);
        }
    }else{
        bar_count=1;
        left_value_system=720;
        system_left_go_back()
    }
}
function system_left_go_back(){
    // alert("basic parameter: bar_count="+bar_count+" left_value_system="+left_value_system);
    if(bar_count<6){
        var osystem_articlee=document.getElementById("system_article_"+bar_count);
        left_value_system-=30;
        osystem_articlee.style.left=left_value_system+"px";
        if(left_value_system>0){
            window.setTimeout(system_left_go_back,1);
        }else{
            bar_count++;
            left_value_system=720;
            window.setTimeout(system_left_go_back,1);
        }
    }else{
        bar_count=1;
        left_value_system=0;
        var oleft_button=document.getElementById("left_button");
        var oright_button=document.getElementById("right_button");
        if(page==3){
            oright_button.style.color="#808080";
        }else oright_button.style.color="#000000";
        oleft_button.style.color="#000000";
        left_right_button_enable=0;
    }
}

function system_go_right(){ //click left
    if(bar_count==1){
        var oleft_button=document.getElementById("left_button");
        var oright_button=document.getElementById("right_button");
        oleft_button.style.color="#808080";
        oright_button.style.color="#808080";
        left_right_button_enable=1;
    }
    if(bar_count<6){
        var osystem_articlee=document.getElementById("system_article_"+bar_count);
        left_value_system+=30;
        osystem_articlee.style.left=left_value_system+"px";
        if(left_value_system<780){
            window.setTimeout(system_go_right,1);
        }else{
            osystem_articlee.innerHTML=system_article[5*(page-1)+bar_count-1];
            bar_count++;
            left_value_system=0;
            window.setTimeout(system_go_right,1);
        }
    }else{
        bar_count=1;
        left_value_system=-720;
        system_right_go_back()
    }
}
function system_right_go_back(){
    // alert("basic parameter: bar_count="+bar_count+" left_value_system="+left_value_system);
    if(bar_count<6){
        var osystem_articlee=document.getElementById("system_article_"+bar_count);
        left_value_system+=30;
        osystem_articlee.style.left=left_value_system+"px";
        if(left_value_system<0){
            window.setTimeout(system_right_go_back,1);
        }else{
            bar_count++;
            left_value_system=-720;
            window.setTimeout(system_right_go_back,1);
        }
    }else{
        bar_count=1;
        left_value_system=0;
        var oleft_button=document.getElementById("left_button");
        var oright_button=document.getElementById("right_button");
        if(page==1){
            oleft_button.style.color="#808080";
        }else oleft_button.style.color="#000000";
        oright_button.style.color="#000000";
        left_right_button_enable=0;
    }
}


window.onload=function(){

    var request_system_article=new XMLHttpRequest();
    request_system_article.open("GET","http://127.0.0.1:5000/system_article",true)
    request_system_article.onreadystatechange=function(){
        if(request_system_article.readyState=="4"&&request_system_article.status=="200"){
            // alert(request_system_article.responseText);
            system_article=request_system_article.responseText.split("\n");
            // alert(system_article)
            max_page=system_article.length/5;
            var osystem_article=document.getElementsByClassName("system_article");
            for(var i=0;i<5;i++){
                // alert(osystem_article[i].style.left);
                osystem_article[i].innerHTML=system_article[i];
            }
        }
    }
    request_system_article.send()

    var opage_number=document.getElementById("page_number");
    opage_number.innerHTML="  "+1+" / "+max_page;

    var oleft_button=document.getElementById("left_button");
    var oright_button=document.getElementById("right_button");
    if(page==1){
        oleft_button.style.color="#808080";
    }else oleft_button.style.color="#000000";

    oleft_button.onclick=function(){
        if(left_right_button_enable==0){
            if(page-1>0){
                page--;
                window.setTimeout(system_go_right,1);
                opage_number.innerHTML="  "+page+" / "+max_page;
            }else alert("沒有更新的系統訊息了 > <")
            if(page==1){
                this.style.color="#808080";
            }
            if(page!=1){
                oright_button.style.color="#000000";
            }
        } 
    }
    
    oright_button.onclick=function(){
        if(left_right_button_enable==0){
            if(page+1<=max_page){
                var oleft_button=document.getElementById("left_button");
                oleft_button.style.color="#808080";
                this.style.color="#808080";
                page++;
                window.setTimeout(system_go_left,1);
                opage_number.innerHTML="  "+page+" / "+max_page;
            }else alert("系統訊息已經到底了 > <")
            if(page==max_page){
                this.style.color="#808080";
            }
            if(page!=1){
                oleft_button.style.color="#000000";
            }
        }  
    }

    var ologout=document.getElementById("logout");
    ologout.onclick=function(){
         location.assign("/logout");
    }
}

