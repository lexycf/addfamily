var func={
    node:{
        conContent: '[node-type="con-content"]',
        idcard:'#idcard',
        name:'#name',
        iconCheck:'.icon-check'
    },
    bindEvent:function(){
        $(func.node.conContent)
        .delegate(func.node.idcard,'blur',function(){
            func.checkIdcard($(func.node.idcard));
        })
        .delegate(func.node.name,'blur',function(){
            func.checkName($(func.node.name));
        })
        .delegate(func.node.iconCheck,'click',function(){
            func.checkAgree($(this));
        })
    },
    checkAgree:function(clickObj){
        if(clickObj.hasClass('icon-check-on')){
            clickObj.removeClass('icon-check-on');
        }else{
            clickObj.addClass('icon-check-on');
        }
    },
    checkName:function(name){
        if(name==""){
            alert('姓名不能为空');
            return false;
        }
    },
    checkIdcard:function(cardNum){
        var reg = /^\d{15}(\d{2}[\d|X|x])?$/;
        if(cardNum==""){
            alert('身份证号码不能为空');
            return false;
        }else if(!reg.test(cardNum)){
            alert('身份证号码不正确');
            return false;
        }
    },
    init:function(){
        func.bindEvent();
    }
}
func.init();