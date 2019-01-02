var func={
    node:{
        conContent: '[node-type="con-content"]',
        idcard:'.idcard',
        name:'#name',
        iconCheck:'.icon-check',
        relation:'.relation',
        selRelationBox:'.selRelationBox',
        clickType:'.clickType',
        selRelationBox:'.selRelationBox',
        addinfo:'.addinfo',
        addIcon:'.addIcon',
        addbox:'.addbox',
        familyInfoList:'.familyInfoList',
        delBtn:'.delBtn',
        hideBox:'.hideBox',
        showFamily:'.showFamily'
    },
    bindEvent:function(){
        $(func.node.conContent)
        .delegate(func.node.idcard,'blur',function(){
            var reg = /^\d{15}(\d{2}[\d|X|x])?$/;
            var idcardVal=$(this).val();
            if(!reg.test(idcardVal)){
                $(this).parent().siblings('.errorBox').html('请输入正确的身份证号码');
            }
        })
        .delegate(func.node.showFamily,'click',function(){
            $(func.node.familyInfoList).css({
                'height':'auto'
            });
        
            $(func.node.hideBox).hide();
            $(this).hide();
           
        })
        .delegate(func.node.idcard,'focus',function(){
            
            $(this).parent().siblings('.errorBox').html('');
         
        })
        .delegate(func.node.name,'focus',function(){
            $(this).parent().siblings('.errorBox').html('');
         
        })
        .delegate(func.node.name,'blur',function(){
            var name=$(this).val();
            if(name==""){
                $(this).parent().siblings('.errorBox').html('姓名不能为空');
            }
           
         
        })
        .delegate(func.node.iconCheck,'click',function(){
            func.checkAgree($(this));
        })
        .delegate(func.node.clickType,'click',function(){
            $(this).find('.nocheck').addClass('check').parent('li').siblings().find('.nocheck').removeClass('check');
            var relationTxt=$(this).find('.exp').text();
            var relationType=$(this).data('relat');
            var idx=$(func.node.selRelationBox).data('index');
            console.log(idx);
            console.log(relationTxt);
            $('.addinfo[data-index="'+idx+'"]').find('.relation').html(relationTxt);
            
           //关系1为字女 2为父母 3为爱人 4位其他亲友
           func.paramList[idx]={relationshipVal:relationType} ;
           console.log(func.paramList);
           
        })
        .delegate(func.node.relation,'click',function(){
            var idx=$(this).parents('.addinfo').data('index');
            $(func.node.selRelationBox).find('.nocheck').removeClass('check');
            $(func.node.selRelationBox).show().data('index',idx);

            
        })
        .delegate(func.node.selRelationBox,'click',function(){
            $(this).hide();
        })
        .delegate(func.node.addbox,'click',function(){
            var idx=$(func.node.addinfo).last().data('index')+1;
            var htm='<div class="addinfo" data-index="'+idx+'"><div class="addinfoBox"><div class="inputBox"><div class="inpBox">'+
                '<label for="">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</label><input type="text" class="inp name" id="name"><a href="javascript:;" class="relation">请选择</a></div>'+
            '<div class="errorBox"></div></div>'+
            '<div class="inputBox"><div class="inpBox">'+
                '<label for="">身份证号：</label><input type="text" class="inp idcard" id="idcard"></div>'+
            '<div class="errorBox"></div></div>'+

            '<div class="equities">'+
                    '<h1>可获得的权益</h1>'+
                    '<ul>'+
                        '<li><span></span>大病互助最高40万互助金</li>'+
                        '<li><span></span>意外身故最高20万互助金</li>'+
                        '<li><span></span>意外医疗最高5万互助金</li>'+
                    '</ul>'+
                    '<div class="clears"></div>'+
                '</div></div><div class="delBox"><div class="delBtn">删除</div></div>'+
        '</div>';
            $(func.node.familyInfoList).append(htm);
        })
        .delegate(func.node.delBtn,'click',function(){
            if($(func.node.addinfo).length<2){
                toast('请至少添加一位家人');
                return false;
            }else{
                $(this).parents('.addinfo').remove();
            }
           
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