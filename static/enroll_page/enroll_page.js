var table="abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var alpha=new Set();
for (var i =0;i< table.length;i++){
    alpha.add(table[i])
}

window.onload=function(){
    var oform=document.forms["enroll_form"];
    oform.elements.passwd.onchange=function(){
        var content=this.value;
        counter=0;
        for(var i=0;i<content.length;i++){
            if(alpha.has(content[i])){
                counter++;
            }
        }
        if(counter<2){
            this.style.backgroundColor="red";
            alert("Please at least 2 english for your passwd")
        }else {
            this.style.backgroundColor="white";
        }
        
    }
    
    oform.elements.password.onchange=function(){
        var oform=document.forms["enroll_form"];
        if(this.value!=oform.elements.passwd.value){
            this.style.backgroundColor="red";
            alert("Please insert the correct password");
        }else{
            this.style.backgroundColor="white";
        }
    }

}
