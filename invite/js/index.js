var func={
    node:{
        conContent: '[node-type="con-content"]',
        name:'#name',
        idcard:'#idcard',
        phone:'#phone',
        equitiesList:'.equitiesList',
        icon:'.icon',
        helpDetail:'.helpDetail',
        pagenate:".pagenate",
        uls:'.uls',
        pageN:'.pageN',
        lingBtn:".lingBtn"
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
            .delegate(func.node.phone,'blur',function(){
                var reg = /^1[3-9][0-9]\d{8}$/;
                var phoneVal=$(func.node.phone).val();
                if(phoneVal==''){
                    $(this).parent().siblings('.errBox').html('请输入手机号');
                }else if(!reg.test(phoneVal)){
                    $(this).parent().siblings('.errBox').html('手机号码不正确');
                }
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
            .delegate(func.node.pageN,'click',function(){
                var idx=$(this).index();
                func.helpDetailFun(idx);
            })
            .delegate(func.node.lingBtn,'click',function(){
                var name=$(func.node.name).val();
                var reg = /^\d{15}(\d{2}[\d|X|x])?$/;
                var idcardVal=$(func.node.idcard).val();
                var reg2 = /^1[3-9][0-9]\d{8}$/;
                var phoneVal=$(func.node.phone).val();
                if(name==""){
                    $(func.node.name).parent().siblings('.errBox').html('姓名不能为空');
                    return false;
                }else if(!reg.test(idcardVal)){
                    $(func.node.idcard).parent('.inpBox').siblings('.errBox').html('请输入正确的身份证号码');
                    return false;
                }else if(phoneVal==''){
                    $(func.node.phone).parent().siblings('.errBox').html('请输入手机号');
                    return false;
                }else if(!reg2.test(phoneVal)){
                    $(func.node.phone).parent().siblings('.errBox').html('手机号码不正确');
                    return false;
                }else{
                    alert('提交成功');
                }
            })
    },
    helpDetailFun:function(idx){
        $(func.node.pageN).eq(idx).addClass('active').siblings().removeClass('active');
        $(func.node.helpDetail).eq(idx).show().siblings().hide();
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
        func.helpDetailFun(0);
    }
}
func.init();