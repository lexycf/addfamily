var func={
    node:{
        conContent: '[node-type="con-content"]',
        name:'.name',
        idcard:'.idcard',
        phone:'.phone',
        paybtn:'.paybtn',
        subbtn:'.subbtn',
        payplanList:'.payplanList',
        nocheck:'.nocheck',
        checkon:'.checkon',
        checkBox:'.checkBox',
        namestatus:false,
        idcardstatus:false,
        phonestatus:false,
        iconCheck:'.icon-check',
    },
   bindEvent:function(){
        $(func.node.conContent)
        .delegate(func.node.iconCheck,'click',function(){
            func.checkAgree($(this));
        })
        .delegate(func.node.name,'blur',function(){
            var nameval=$(this).val();
            console.log(nameval);
            if(nameval==''){
                toast('请输入姓名');
                func.node.namestatus=false;
            }else{
                func.node.namestatus=true;
            }
            func.checkInfo();
        })
        .delegate(func.node.checkBox,'click',function(){
            if($(this).data('status')){
                if($(this).hasClass('checkon')){
                    $(this).removeClass('checkon');
                }else{
                    $(this).addClass('checkon');
                }
            }else{
                toast('您的年龄不符合该保障');
            }
            

            console.log(111);
        })
       

        .delegate(func.node.idcard,'blur',function(){
            var idcardval=$(this).val();
            var reg = /^\d{15}(\d{2}[\d|X|x])?$/;
            if(idcardval==''){
                toast('请输入身份证号');
                func.node.idcardstatus=false;
                
            }else if(!reg.test(idcardval)){
                toast('请输入正确的身份证号');
                func.node.idcardstatus=false;
            }else{
                func.node.idcardstatus=true;
                var userAge=func.GetAge(idcardval);
                func.selsecurity(userAge);
            }
            
            func.checkInfo();
            
            
        })
        .delegate(func.node.phone,'blur',function(){
            var phoneval=$(this).val();
            var reg = /^1[3-9][0-9]\d{8}$/;
            if(phoneval==''){
                toast('请输入手机号');
                func.node.phonestatus=false;
            }else if(!reg.test(phoneval)){
                toast('请输入正确的手机号');
                func.node.phonestatus=false;
            }else{
                func.node.phonestatus=true;
            }
            
            func.checkInfo();
        })
        .delegate(func.node.subbtn,'click',function(){
            if(!$(func.node.iconCheck).hasClass('icon-check-on')){
                toast('请同意健康告知和互助共约');
                return false;
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
   selsecurity:function(userAge){

        console.log(userAge);
        if(userAge>=0 && userAge<18){
            $(func.node.payplanList).find('.selbox').eq(0).find('.checkBox').addClass('checkon').data('status',true).parent().siblings().find('.checkBox').removeClass('checkon nocheck').data('status',false).siblings().addClass('greyTxt');
        }
        if(userAge>=18 && userAge<=60){
            $(func.node.payplanList).find('.checkBox').addClass('checkon').data('status',true);
        }else if(userAge>60 && userAge<=65){
            $(func.node.payplanList).find('.selbox').eq(0).find('.checkBox').addClass('checkon').data('status',true).parent().siblings().find('.checkBox').removeClass('checkon nocheck').data('status',false).siblings().addClass('greyTxt');
        }else{
            toast('该用户不符合加入条件');
        }
   },
   checkInfo:function(){
       var names=func.node.namestatus;
       var idcards=func.node.idcardstatus;
       var phones=func.node.phonestatus;
    if(names && idcards && phones){
        $(func.node.paybtn).addClass('subbtn');
    }else{
        $(func.node.paybtn).removeClass('subbtn');
    }
   },
   GetAge:function (identityCard) {
        var len = (identityCard + "").length;
        if (len == 0) {
            return 0;
        } else {
            if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
            {
                return 0;
            }
        }
        var strBirthday = "";
        if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
        {
            strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
        }
        if (len == 15) {
            strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
        }
        //时间字符串里，必须是“/”
        var birthDate = new Date(strBirthday);
        var nowDateTime = new Date();
        var age = nowDateTime.getFullYear() - birthDate.getFullYear();
        //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },
   init:function(){
        func.bindEvent();
   },
}
func.init();