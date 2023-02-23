var left_value=0;
var page=1;
var max_page=3;
var system_article=[];
var left_right_button_enable=0;
var music_list=[]
var ochange_can_click=0;

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
        if(left_value_system<720){
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

function li_shift_left(){

}
function li_shift_right(){

}

function first_request(){
    var has_chosen=new Set();
    var time=0;

    var request_new_music=new XMLHttpRequest();
    request_new_music.open("GET","http://127.0.0.1:5000/test_test",true);
    request_new_music.onreadystatechange=function(){
        if(request_new_music.readyState=="4"&&request_new_music.status=="200"){
            music_list=request_new_music.responseText.split("\n")
            var odetail_box=document.getElementsByClassName("details_box")
            while(time<4){
                index=Math.floor((Math.random())*(music_list.length-1.01));
                if(index<music_list.length&&has_chosen.has(index)==false){
                    has_chosen.add(index);
                    var json_music_list=JSON.parse(music_list[index])
                    var odetails=odetail_box[time].getElementsByClassName("details_text")
                    odetails[0].innerHTML=json_music_list.music_name;
                    odetails[1].innerHTML=json_music_list.author_name;
                    odetails[2].innerHTML=json_music_list.sharing_people;
                    var osee_button=document.getElementsByClassName("see_more")
                    osee_button[time].href=json_music_list.super_link;
                    var ophoto=document.getElementsByClassName("music_photo_box")
                    ophoto[time].href=json_music_list.super_link;
                    time+=1;
                } // this way can be syncronous
            }
            // ochange.style.backgroundColor="white";
            ochange_can_click=1;
        }
    }
    request_new_music.send()

}

window.onload=function(){
    window.setTimeout(go_left,20);

    var oheader=document.getElementById("run_line_box");
    oheader.onclick=function(){
        this.style.display="none";
    }

    

    var request_runline=new XMLHttpRequest();
    request_runline.open("GET","http://127.0.0.1:5000/headline",true);
    request_runline.onreadystatechange=function(){
        if(request_runline.readyState=="4"&&request_runline.status=="200"){
            var orun_line=document.getElementById("run_line");
            orun_line.innerHTML=request_runline.responseText;
        }
    }
    request_runline.send();

    
    var request_system_article=new XMLHttpRequest();
    request_system_article.open("GET","http://127.0.0.1:5000/system_article",true)
    request_system_article.onreadystatechange=function(){
        if(request_system_article.readyState=="4"&&request_system_article.status=="200"){
            system_article=request_system_article.responseText.split("\n");
            max_page=system_article.length/5;
            var osystem_article=document.getElementsByClassName("system_article");
            for(var i=0;i<5;i++){
                osystem_article[i].innerHTML=system_article[i];
            }
        }
    }
    request_system_article.send()

    // var request_system_link.open("GET","",true);

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

    var oli=document.getElementsByTagName("li");
    for(var i=0;i<oli.length;i++){
        word=["向大眾分享您喜愛的音樂","讓大眾得知最近樂壇的大小事","如: 樂譜、樂器、周邊、唱片","和大家分享您的看法"];
        original_word=["分享音樂","分享新聞","買/賣商品","發起討論"];
        oli[i].onmouseover=function(){       
            all_li=this.parentNode.firstChild;
            li_probe=0;
            for(var i=0;i<this.parentNode.childNodes.length;i++){
                if(all_li==this){
                    li_probe=i;
                }
                all_li=all_li.nextSibling
            }
            this.style.backgroundColor="white";
            this.innerHTML=word[(li_probe-1)/2];
        }
        oli[i].onmouseout=function(){       
            all_li=this.parentNode.firstChild;
            li_probe=0;
            for(var i=0;i<this.parentNode.childNodes.length;i++){
                if(all_li==this){
                    li_probe=i;
                }
                all_li=all_li.nextSibling;
            }
            this.innerHTML=original_word[(li_probe-1)/2];
            this.style.backgroundColor="lightblue";
        }
    }
    var oenroll=document.getElementById("enroll_in");
    oenroll.onclick=function(){
        location.assign("/enroll")
    }

    var oforget=document.getElementById("forget");
    oforget.onclick=function(){
        location.assign("/forget")
    }

    var opublish=document.getElementById("publish");
    opublish.onclick=function(){
        location.assign("/publish")
    }


    first_request();
    
    var ochange=document.getElementById("change");
    // ochange.style.backgroundColor=rgb(90, 87, 87);
  
    ochange.onclick=function(){
        // alert(ochange_can_click)
        if(ochange_can_click!=0){
            var has_chosen=new Set();
            var time=0;
            // alert(music_list)
            var odetail_box=document.getElementsByClassName("details_box")
            while(time<4){
                index=Math.floor((Math.random())*(music_list.length-1.01));
                if(index<music_list.length&&has_chosen.has(index)==false){
                    has_chosen.add(index);
                    json_music_list=JSON.parse(music_list[index])
                    var odetails=odetail_box[time].getElementsByClassName("details_text")
                    odetails[0].innerHTML=json_music_list.music_name;
                    odetails[1].innerHTML=json_music_list.author_name;
                    odetails[2].innerHTML=json_music_list.sharing_people;
                    var osee_button=document.getElementsByClassName("see_more")
                    osee_button[time].href=json_music_list.super_link;
                    var ophoto=document.getElementsByClassName("music_photo_box")
                    ophoto[time].href=json_music_list.super_link;
                    time+=1;
                }
            }
        }else alert("Please Wait for the first run recommanded song")
        // if(ochange_can_click==0){
        //     return 0
        // }var osee_button=document.getElementsByClassName("see_more")
  
    }    
    
}

