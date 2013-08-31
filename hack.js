importJS(['lib/MOON.js', 'lib/enchant.js', 'lib/nineleap.enchant.js'], function() {
    var sticker = Sticker.create();
    sticker.ontap = function() {
        var script=document.createElement('script');
        script.src="main.js";
        script.type='text/javascript';
        script.language='javascript';
        document.body.appendChild(script);
    };
    sticker.register();
});
