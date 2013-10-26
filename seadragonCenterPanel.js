var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../coreplayer-seadragoncenterpanel-module/seadragonCenterPanel"], function(require, exports, __baseCenter__) {
    
    
    
    var baseCenter = __baseCenter__;
    

    var SeadragonCenterPanel = (function (_super) {
        __extends(SeadragonCenterPanel, _super);
        function SeadragonCenterPanel($element) {
            _super.call(this, $element);
        }
        SeadragonCenterPanel.prototype.create = function () {
            this.setConfig('seadragonCenterPanel');

            _super.prototype.create.call(this);
        };

        SeadragonCenterPanel.prototype.viewerOpen = function () {
            _super.prototype.viewerOpen.call(this);

            if ((this.extension).searchResults) {
                this.overlaySearchResults();
            }
        };

        SeadragonCenterPanel.prototype.overlaySearchResults = function () {
            var page = null;
            var searchResults = (this.extension).searchResults;

            for (var i = 0; i < searchResults.length; i++) {
                if (searchResults[i].index == this.extension.currentAssetIndex) {
                    page = searchResults[i];
                    break;
                }
            }

            if (!page)
                return;

            var sourceWidth = this.viewer.source.dimensions.x;
            var rects = this.getSearchOverlayRects(page.rects, sourceWidth);

            for (var i = 0; i < rects.length; i++) {
                var rect = rects[i];

                var div = document.createElement("div");
                div.className = "searchOverlay";

                this.viewer.drawer.addOverlay(div, rect);
            }
        };

        SeadragonCenterPanel.prototype.getSearchOverlayRects = function (rects, sourceWidth) {
            var newRects = [];

            for (var i = 0; i < rects.length; i++) {
                var rect = rects[i];

                var x = rect.x;
                var y = rect.y;
                var w = rect.w;
                var h = rect.h;

                var factor = 1 / sourceWidth;
                var xp = factor * x;
                var yp = factor * y;
                var wp = factor * w;
                var hp = factor * h;

                var rect = new OpenSeadragon.Rect(xp, yp, wp, hp);

                newRects.push(rect);
            }

            return newRects;
        };
        return SeadragonCenterPanel;
    })(baseCenter.SeadragonCenterPanel);
    exports.SeadragonCenterPanel = SeadragonCenterPanel;
});
