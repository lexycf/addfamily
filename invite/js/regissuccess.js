var func = {
    node: {
        invitebtn: '.inviteBtn',
        hidebox: '.hideBox',
        close: '.close'
    },
    bindEvent: function () {
        $(func.node.invitebtn).click(function () {
            $(func.node.hidebox).show();
        })
        $(func.node.close).click(function () {
            $(func.node.hidebox).hide();
        })
    }
}
func.bindEvent();