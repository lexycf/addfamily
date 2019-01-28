var func={
    node:{
        conContent: '[node-type="con-content"]',
        name:'#name',
        idcard:'#idcard',
        phone:'#phone',
        equitiesList:'.equitiesList',
        icon:'.icon'
    },
    bindEvent:function(){
        $(func.node.conContent)
            .delegate(func.node.name,'focus',function(){
                $(this).parent().siblings('.errBox').html('');
            
            })
            .delegate(func.node.name,'blur',function(){
                var name=$(this).val();
                if(name==""){
                    $(this).parent().siblings('.errBox').html('姓名不能为空');
                    func.node.nameStatus=false;
                }else{
                    func.node.nameStatus=true;
                }
            
            })
            .delegate(func.node.phone,'focus',function(){
                $(this).parent().siblings('.errBox').html('');
            })
            .delegate(func.node.idcard,'blur',function(){
                var reg = /^\d{15}(\d{2}[\d|X|x])?$/;
                var idcardVal=$(this).val();
                if(!reg.test(idcardVal)){
                    $(this).parent('.inpBox').siblings('.errBox').html('请输入正确的身份证号码');
                }else{
                    func.equitiescheck($(this));
                }
            })
            .delegate(func.node.idcard,'focus',function(){
                
                $(this).parent('.inpBox').siblings('.errBox').html('');
             
            })
            .delegate(func.node.icon,'click',function(){
                $(this).toggleClass('active');
            })
    },
    equitiescheck:function(){
        var idcarVal=$(func.node.idcard).val();
        console.log(idcarVal);
        
        var userAge=GetAge(idcarVal);
        //console.log(userAge);
        var elemUl=$(func.node.equitiesList);
        var minage='',
            maxage='';
        var elemlI=elemUl.find('li');

        //初始化
        elemUl.find('.fangai').hide().siblings().show();
        elemUl.find('li').removeClass('greyTxt');

        for(var i=0;i<elemlI.length;i++){
            minage=parseInt(elemlI.eq(i).data('minage'));
            maxage=parseInt(elemlI.eq(i).data('maxage'));
            sicktype=elemlI.eq(i).data('sicktype');
            //console.log(minage+'_'+maxage+'_'+userAge);

            if(userAge>=minage && userAge<=maxage){
                elemlI.eq(i).removeClass('greyTxt');
            }else{
                elemlI.eq(i).addClass('greyTxt');
            }
            
        }
        if(userAge<=60){
            $('.fangai').hide().siblings('.dabing').show();
            if(elemUl.find('li[data-sicktype="yiwai"]').hasClass('greyTxt')){
            }
            
        }else{
            elemUl.find('.fangai').show().removeClass('greyTxt').siblings('.dabing').hide();
        }
    },
    init:function(){
        func.bindEvent();
    }
}
func.init();