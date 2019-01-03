var func={
    node:{
        conContent:'[node-type="con-content"]',
        idcard:'.idcard'
    },
    bindEvent:function(){
        $(func.node.conContent)
        .delegate(func.node.idcard,'blur',function(){
            var reg = /^\d{15}(\d{2}[\d|X|x])?$/;
            var idcardVal=$(this).val();
            if(!reg.test(idcardVal)){
                $(this).siblings('.errorBox').html('请输入正确的身份证号码');
            }else{
                func.equitiescheck($(this));
            }
        })
        .delegate(func.node.idcard,'focus',function(){
            
            $(this).siblings('.errorBox').html('');
         
        })
    },
    equitiescheck:function(userBox){
        
        var ele=userBox.parents('.addinfo');
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
        for(var i=0;i<elemlI.length;i++){
            console.log(i);
            minage=parseInt(elemlI.eq(i).data('minage'));
            maxage=parseInt(elemlI.eq(i).data('maxage'));
            sicktype=elemlI.eq(i).data('sicktype');
            console.log(minage+'_'+maxage+'_'+userAge);

            if(relationType!=4){
                if(userAge<=60){
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
            if(userAge<=60){
                if(elemUl.find('li[data-sicktype="yiwai"]').hasClass('greyTxt')){
                    ele.find('.nottip').html('（抱歉，您家人年龄超出范围不能获得意外互助权益）');
                }
                
            }else{
                elemUl.find('.fangai').show().siblings().hide();
                ele.find('.nottip').html('（60岁以上的会员可参与老年防癌互助计划）');
            }
        }
    },
    init:function(){
        func.bindEvent();
    }
}
func.init();