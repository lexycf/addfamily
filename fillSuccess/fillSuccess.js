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
            }
        })
        .delegate(func.node.idcard,'focus',function(){
            
            $(this).siblings('.errorBox').html('');
         
        })
    },
    init:function(){
        func.bindEvent();
    }
}
func.init();