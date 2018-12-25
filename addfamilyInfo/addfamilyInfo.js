var func={
    node:{
        conContent: '[node-type="con-content"]',
        idcard:'#idcard',
        name:'#name',
        iconCheck:'.icon-check',
        relation:'.relation',
        selRelationBox:'.selRelationBox',
        clickType:'.clickType',
        selRelationBox:'.selRelationBox',
        addinfo:'.addinfo'
    },
    bindEvent:function(){
        $(func.node.conContent)
        .delegate(func.node.iconCheck,'click',function(){
            func.checkAgree($(this));
        })
        .delegate(func.node.clickType,'click',function(){
            $(this).find('.nocheck').addClass('check').parent('li').siblings().find('.nocheck').removeClass('check');
            var relationTxt=$(this).find('.exp').text();
            var relationType=$(this).data('relat');
            var idx=$(func.node.selRelationBox).data('index');
            $(func.node.addinfo).eq(idx).find('.relation').html(relationTxt);
            console.log(idx);
           //关系1为字女 2为父母 3为爱人 4位其他亲友
           func.paramList[idx]={relationshipVal:relationType} ;
           
        })
        .delegate(func.node.relation,'click',function(){
            var idx=$(this).parents('.addinfo').data('index');
            $(func.node.selRelationBox).show().data('index',idx);

            
        })
        .delegate(func.node.selRelationBox,'click',function(){
            $(this).hide();
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
        func.paramList=[];
    }
}
func.init();