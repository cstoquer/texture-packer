var Algo = require("./BinPackingAlgorithm");


var RP = function RP(elements, confobj) {
    var RP = function RP(els, conf) {

        var elements = els.length > 0 && els instanceof Array ? els : console.error("No Elements my friend");
        var conf = conf || {};
        var config = {
            "padding": conf.padding || 2
        };

        //"atlasPadding": conf.atlaspadding || 1
        //"cutfiles": conf.cutfiles || false,
        //"forceRect":conf.forceRect || false
        var cleanElements = function cleanElements(els) {
            var clean = function clean(s) {
                if (typeof s == 'string' || s instanceof String) {
                    var c = parseFloat(s.replace("px", ""));
                    return c;
                }
                return s;
            };
            els.forEach(function (el) {
                el.height = clean(el.height);
                el.width = clean(el.width);
            });
            return els;
        };

        var sortedByHeightElements = function sortedByHeightElements(elements) {
            return elements.slice(0).sort(function (a, b) {
                if (a.height > b.height) return -1;
                return 1;
            });
        };

        var init = function init(elements, config) {
            var sortedElements = sortedByHeightElements(cleanElements(elements));
            if (config.padding) {
                sortedElements.forEach(function (el) {
                    el.width += 2 * config.padding;
                    el.height += 2 * config.padding;
                });
            }
            var area = 0;

            var maxW = sortedElements.reduce(function(prev,curr){
                return ( (curr.width > prev.width )? curr : prev );
            },{width:0}).width;

            var maxH = sortedElements.reduce(function(prev,curr){
                return ( (curr.height > prev.height) ? curr : prev );
            },{height:0}).height;

            sortedElements.forEach(function (el, idx) {
                var elarea = el.width * el.height;
                area += elarea;
            });
            area *= 1.3;
            var sidelength1 = Math.sqrt(area);
            var sidelength2 = Math.max(maxH,maxW);



            var sidelength = Math.max(sidelength1,sidelength2);

            var theData = new Algo(sortedElements, sidelength, sidelength);

            var els = theData.elements;
            els.forEach(function (el) {

                delete el.fit;
                if (config.padding) {
                    el.x += config.padding;
                    el.y += config.padding;
                    el.width -= config.padding;
                    el.height -= config.padding;
                }
            });
            return {
                elements: els,
                atlasSize: {
                    width: theData.size.width,
                    height: theData.size.height
                }
            };
        };

        return init(elements, confobj);
    };
    return new RP(elements, confobj);
};

module.exports = RP;