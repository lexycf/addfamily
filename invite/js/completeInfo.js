var func={
    node:{
        conContent: '[node-type="con-content"]',
        name:'#name',
        age:'#age',
        phone:'#phone',
        ageList:'.ageList',
        ageData:ageData,
        j_ageBox:'#j_ageBox',
        userAgeParam:'',
        equitiesList:'.equitiesList',
        nameStatus:false,
        ageStatus:false,
        phoneStatus:false,
        subBtn:'#subBtn'

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
            .delegate(func.node.age,'focus',function(){
                func.triggerage($(this),$(func.node.j_ageBox));
            })
            .delegate(func.node.subBtn,'click',function(){
                var age=$(func.node.age).val();
                var phone=$(func.node.phone).val();
                if(!func.node.nameStatus){
                    $(func.node.name).parent().siblings('.errBox').html('请输入姓名');
                    return false;
                }else if(phone!=""){
                    var reg = /^1[3-9][0-9]\d{8}$/;
                    if(!reg.test(phone)){
                        $(func.node.phone).parent().siblings('.errBox').html('请输入正确的手机号码');
                        return false;
                    }
                }
                //console.log('提交成功');
                
            })
    },
    getAgeList:function(){
        var ageData=func.node.ageData
        //console.log(ageData);
        var htm='';
        var listI='';
        for(var i=0;i<ageData.length;i++){
            listI=ageData[i];
            htm+='<li class="j_ageli" data-showTxt="'+listI.showTxt+'" data-birthYear="'+listI.birthYear+'">'+listI.val+'</li>'
        }
        
        $(func.node.ageList).html(htm);
        //console.log($(func.node.ageList));

    },
    // 年龄选择
    triggerage: function (clickBox,box) {
        var cont=box.html();
        //console.log(cont);
        var layers=new layer({
            content: cont,
            readyCallback: function (layerContent) {
                layerContent.find('.j_ageli').click(function () {
                    var ageTxt=$(this).attr('data-showTxt');
                    var ageYear=$(this).attr('data-birthYear');
                    //console.log(ageTxt+"_"+ageYear);
                    clickBox.val(ageTxt);
                    func.node.userAgeParam=ageYear;
                    func.equitiescheck();
                    layers.close();
                });
            }
        });
    },
    equitiescheck:function(){
        var date=new Date();
        var nowYear=date.getFullYear();
        var userAge=nowYear-parseInt(func.node.userAgeParam);
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
        func.paramList=[];
        func.getAgeList();
    }
}
func.init();
