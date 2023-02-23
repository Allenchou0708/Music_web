var left_value=0;
var page=1;
var max_page=3;
var system_article=[];


window.onload=function(){
    var oul=document.getElementById("my_ul");
    var oli=oul.getElementsByTagName("li");

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

    var obutton=document.getElementById("publish");
    obutton.onclick=function(){
        location.assign("/publish")
    }

    var oforms=document.forms;
    oforms[0].sorting_way.onchange=function(){
        var option_index=oforms[0].sorting_way.selectedIndex
        location.assign("/music_page?page=1&type="+oforms[0].sorting_way.options[option_index].value)
    }

    var okiller_queen_li=document.getElementsByClassName("killer_queen_li")
    for(var i=0;i<okiller_queen_li.length;i++){
        okiller_queen_li[i].onclick=function(){
            location.assign("http://127.0.0.1:5000/music_page?page=1&type=%E6%9C%80%E6%96%B0&class="+this.innerHTML)
        }
    }

}

