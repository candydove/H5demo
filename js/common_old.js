
    var initialS = 1 / window.devicePixelRatio;
    document.write('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=' + initialS + ', maximum-scale=' + initialS + ', minimum-scale=' + initialS + '">');
    
    function setFontSize() {
        var html = document.getElementsByTagName("html")[0];
        var screenW = html.getBoundingClientRect().width;
        html.style.fontSize = screenW / 16 + "px";
    }
    setFontSize();
    window.addEventListener("resize", function () {
        setFontSize();
    }); 
    
    
    function setUnderlineRed(){
        var muiInputRow=document.getElementsByClassName("mui-content")[0];
        var ipts=muiInputRow.getElementsByTagName("input");
        for(var i=0,l=ipts.length;i<l;i++){
            ipts[i].onfocus=function(){
                var len=this.parentElement.children.length;
                this.parentElement.children[len-1].style.backgroundColor="#FF6868";
            }
            ipts[i].onblur=function(){
                var len=this.parentElement.children.length;
                this.parentElement.children[len-1].style.backgroundColor="#c8c7cc";
            }            
        }         
    }

    function setPasswordIpt(){
        var dataArr=[];
        var bottomNumberBox=document.getElementsByClassName("bottomNumberBox")[0];
        bottomNumberBox.addEventListener("click",function(e){
            var thisclass=e.target.getAttribute("class");
            if(thisclass.indexOf("n")>-1 && dataArr.length<6){
                var n=Number(thisclass.charAt(1));
                dataArr.push(n);

                for(var i=0,l=dataArr.length;i<l;i++){
                    document.getElementsByClassName("passwordIpt")[i].childNodes[0].style.display="block";
                }

            }else if(thisclass.indexOf("clear")>-1){
                for(var i=0,l=dataArr.length;i<l;i++){
                    document.getElementsByClassName("passwordIpt")[i].childNodes[0].style.display="none";
                }
                dataArr.splice(0);

            }else if(thisclass.indexOf("del")>-1){
                for(var i=0,l=dataArr.length;i<l;i++){
                    document.getElementsByClassName("passwordIpt")[i].childNodes[0].style.display="none";
                }                
                dataArr.pop();
                for(var i=0,l=dataArr.length;i<l;i++){
                    document.getElementsByClassName("passwordIpt")[i].childNodes[0].style.display="block";
                }                
            }
            console.log(dataArr);
        })
    }