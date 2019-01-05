var func={
    node:{
        conContent: '[node-type="con-content"]',
        idcard:'.idcard',
        name:'.name',
        iconCheck:'.icon-check',
        relation:'.relation',
        selRelationBox:'.selRelationBox',
        clickType:'.clickType',
        selRelationBox:'.selRelationBox',
        addinfo:'.addinfo',
        addIcon:'.addIcon',
        familyInfoList:'.familyInfoList',
        delBtn:'.delBtn',
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

            $('.addinfo[data-index="'+idx+'"]').find('.relation').html(relationTxt).data('relationNum',relationType);
            func.equitiescheck($('.addinfo[data-index="'+idx+'"]').find('.relation'));
            
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
        .delegate(func.node.addIcon,'click',function(){
            var idx=$(func.node.addinfo).last().data('index')+1;
            var htm='<div class="addinfo" data-index="'+idx+'"><div class="addinfoBox"><div class="inputBox"><div class="inpBox">'+
                '<label for="">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</label><input type="text" class="inp name" id="name"><a href="javascript:;" class="relation">请选择</a></div>'+
            '<div class="errorBox"></div></div>'+
            '<div class="inputBox"><div class="inpBox">'+
                '<label for="">身份证号：</label><input type="text" class="inp idcard" id="idcard"></div>'+
            '<div class="errorBox"></div></div>'+

            '<div class="equities">'+
                    '<h1>可获得的权益</h1>'+
                    '<ul class="equitiesList">'+
                    '<li class="fangai" data-sicktype="fangai"><span></span>老年防癌互助权益</li>'+
                        '<li class="dabing" data-minage="0" data-maxage="60" data-sicktype="dabing"><span></span>大病互助最高40万互助金</li>'+
                        '<li data-minage="18" data-maxage="65" data-sicktype="yiwai"><span></span>意外身故最高20万互助金</li>'+
                        '<li data-minage="18" data-maxage="65" data-sicktype="yiwai"><span></span>意外医疗最高5万互助金</li>'+
                    '</ul>'+
                    '<div class="clears"></div>'+
                    '<div class="nottip"></div>'+
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
        .delegate(func.node.idcard,'blur',function(){
            var reg = /^\d{15}(\d{2}[\d|X|x])?$/;
            var idcardVal=$(this).val();
            if(!reg.test(idcardVal)){
                $(this).parent().siblings('.errorBox').html('请输入正确的身份证号码');
            }else{
                func.equitiescheck($(this));
            }
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
    },
    equitiescheck:function(userBox){
        console.log(userBox);
        var ele=userBox.parents('.addinfo');
        var idcar=ele.find('.idcard').val();
        var userAge=GetAge(ele.find('.idcard').val());
        var relationType=ele.find('.relation').data('relationNum')
        var elemUl=userBox.parents('.addinfo').find('.equitiesList');
        var minage='',
            maxage='',
            sicktype='';
        var elemlI=elemUl.find('li');

        //初始化
        elemUl.find('.fangai').hide().siblings().show();
        ele.find('.nottip').html('');
        elemUl.find('li').removeClass('greyTxt');

        for(var i=0;i<elemlI.length;i++){
            minage=parseInt(elemlI.eq(i).data('minage'));
            maxage=parseInt(elemlI.eq(i).data('maxage'));
            sicktype=elemlI.eq(i).data('sicktype');
            console.log(minage+'_'+maxage+'_'+userAge);

            if(relationType!=4){
                if(idcar!=''){
                    if(userAge>=minage && userAge<=maxage){
                        elemlI.eq(i).removeClass('greyTxt');
                    }else{
                        elemlI.eq(i).addClass('greyTxt');
                    }
                }
                
                
            }else{
                if(sicktype=='yiwai'){
                    elemlI.eq(i).addClass('greyTxt');
                }else{
                    elemlI.eq(i).removeClass('greyTxt');
                }
            }
            
        }
        if(relationType==4){
            ele.find('.nottip').html('（抱歉，您不能为其他亲友代管意外互助计划）');
        }else{
            if(idcar!=''){
                if(userAge<=60){
                    $('.fangai').hide().siblings('.dabing').show();
                    if(elemUl.find('li[data-sicktype="yiwai"]').hasClass('greyTxt')){
                        ele.find('.nottip').html('（抱歉，您家人年龄超出范围不能获得意外互助权益）');
                    }
                    
                }else{
                    elemUl.find('.fangai').show().removeClass('greyTxt').siblings('.dabing').hide();
                    ele.find('.nottip').html('（60岁以上的会员可参与老年防癌互助计划）');
                }
            }
        }
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