var func={
    node:{
        conContent: '[node-type="con-content"]',
        name:'.name',
        idcard:'.idcard',
        phone:'.phone',
        paybtn:'.paybtn',
    },
   bindEvent:function(){
        $(func.node.conContent)
        .delegate(func.node.name,'blur',function(){
            var nameval=$(this).val();
            console.log(nameval);
            if(nameval==''){
                toast('请输入姓名');
            }
        })
        .delegate(func.node.idcard,'blur',function(){
            var idcardval=$(this).val();
            var reg = /^\d{15}(\d{2}[\d|X|x])?$/;
            if(idcardval==''){
                toast('请输入身份证号');
            }else if(!reg.test(idcardval)){
                toast('请输入正确的身份证号');
            }
        })
        .delegate(func.node.phone,'blur',function(){
            var phoneval=$(this).val();
            var reg = /^1[3-9][0-9]\d{8}$/;
            if(phoneval==''){
                toast('请输入手机号');
            }else if(!reg.test(phoneval)){
                toast('请输入正确的手机号');
            }
        })
        .delegate(func.node.paybtn,'click',function(){
            var nameval=$(func.node.name).val();
            var idcardval=$(func.node.idcardval).val();
            var phoneval=$(func.node.phoneval).val();
            var reg1 = /^\d{15}(\d{2}[\d|X|x])?$/;
            var reg2 = /^1[3-9][0-9]\d{8}$/;
            if(nameval==''){
                toast('请输入姓名');
            }
            if(idcardval==''){
                toast('请输入身份证号');
                return false;
            }else if(!reg1.test(idcardval)){
                toast('请输入正确的身份证号');
                return false;
            }
            if(phoneval==''){
                toast('请输入手机号');
                return false;
            }else if(!reg2.test(phoneval)){
                toast('请输入正确的手机号')
                return false;
            }
        })
   },
   init:function(){
        func.bindEvent();
   },
}
func.init();