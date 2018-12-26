var func={
    node:{
        conContent: '[node-type="con-content"]',
        clickType:'.clickType',
        ulList:'.ulList',
        familyNumBox:'.familyNum'
    },
    bindEvent:function(){
         // 绑定事件
         $(func.node.conContent)
         .delegate(func.node.clickType,'click',function(){
             $(this).find('.nocheck').toggleClass('check');
             var familyNum=$(func.node.ulList).find('li').length;
         })
    },
    init:function(){
        func.bindEvent();
        func.paramList=[];
    }
}
func.init();