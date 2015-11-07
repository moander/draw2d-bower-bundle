(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        root.draw2d = factory(root.jQuery);
    }
}(this, function (jQuery) {
    var $ = jQuery;
    return (function(draw2d){%=body%;return draw2d;})();
}));

