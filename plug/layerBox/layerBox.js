/**
 * [layer description]
 * @param  {object} options [description]
    {
        // 内容
        content: '<div>html</div>',
        // 窗口ready回调
        readyCallback: function() {}
        // 窗口close回调
        closeCallback: function() {}
    }
 */
var layer = function (options) {
    this.conf = options;
    this.init();
};

layer.prototype = {
    init: function () {
        this.layerBox = $('#j_layerMain');
        if (!this.layerBox.length) {
            this.renderDom();
        } else {
            this.renderContent();
            this.triggerReady();
            this.show();
        }
    },
    renderDom: function () {
        var bodyBox='';
        if(!this.conf.bodyBox){
            bodyBox=$('body');
        }else{
            bodyBox=this.conf.bodyBox;
        }
        bodyBox.append(this.tmpl);
        this.bindClose();
        this.renderContent();
        this.triggerReady();
        this.show();
    },
    renderContent: function () {
        this.conf.content &&
            $('#j_layerContent').html(this.conf.content);
    },
    bindClose: function () {
        var self = this;
        $('#j_layerClose, #j_layerBg').click(function (event) {
            self.close();
            typeof self.conf.closeCallback === 'function' &&
                self.conf.closeCallback($('#j_layerContent'));
        });
    },
    triggerReady: function () {
        typeof this.conf.readyCallback === 'function' &&
            this.conf.readyCallback($('#j_layerContent'));
    },
    show: function () {
        $('#j_layerBg').fadeIn();
        $('#j_layerMain').slideUp();
    },
    close: function () {
        $('#j_layerBg').fadeOut();
        $('#j_layerMain').slideDown();
    },
    tmpl: [
        '<div class="layer-bg " id="j_layerBg"></div>',
        '<div class="layer-box " id="j_layerMain">',
        '<a href="javascript:;" class="layer-close" id="j_layerClose"></a>',
        '<div class="layer-bd" id="j_layerContent"></div>',
        '</div>'
    ].join('')
};

