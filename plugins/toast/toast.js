function toast(txt){
    var htm='<div class="tips">'+txt+'</div>';
    $("body").append(htm);
    setTimeout(function(){
        $(".tips").remove();
    },1500)
}
