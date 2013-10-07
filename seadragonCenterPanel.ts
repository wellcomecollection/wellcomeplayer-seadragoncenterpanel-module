/// <reference path="../../js/jquery.d.ts" />
/// <reference path="../../js/extensions.d.ts" />

import coreApp = require("../../extensions/coreplayer-seadragon-extension/app");
import wellcomeApp = require("../../extensions/wellcomeplayer-seadragon-extension/app");
import baseApp = require("../coreplayer-shared-module/baseApp");
import baseCenter = require("../coreplayer-seadragoncenterpanel-module/seadragonCenterPanel");
import utils = require("../../utils");

export class SeadragonCenterPanel extends baseCenter.SeadragonCenterPanel {

	constructor($element: JQuery) {
        super($element);
    }

    create(): void {
        
        this.setConfig('seadragonCenterPanel');

        super.create();
    }

    viewerOpen(): void{
    	super.viewerOpen();

    	if ((<wellcomeApp.App>this.app).searchResults) {
            this.overlaySearchResults();
        }
    }

    overlaySearchResults(): void {

        // loop through entries to get those for the current index.
        var page = null;
        var searchResults = (<wellcomeApp.App>this.app).searchResults;

        for (var i = 0; i < searchResults.length; i++) {
            if (searchResults[i].index == this.app.currentAssetIndex) {
                page = searchResults[i];
                break;
            }
        }

        // if a page isn't found, return.
        if (!page) return;

        var sourceWidth = this.viewer.source.dimensions.x;
        var rects = this.getSearchOverlayRects(page.rects, sourceWidth);

        for (var i = 0; i < rects.length; i++) {
            var rect = rects[i];

            var div = document.createElement("div");
            div.className = "searchOverlay";

            this.viewer.drawer.addOverlay(div, rect);
        }
    }

    getSearchOverlayRects(rects, sourceWidth) {
        var newRects = [];

        for (var i = 0; i < rects.length; i++) {
            var rect = rects[i];

            var x = rect.x;
            var y = rect.y;
            var w = rect.w;
            var h = rect.h;

            // normalise into seadragon points.
            var factor = 1 / sourceWidth;
            var xp = factor * x;
            var yp = factor * y;
            var wp = factor * w;
            var hp = factor * h;

            var rect = new OpenSeadragon.Rect(xp, yp, wp, hp);

            newRects.push(rect);
        }

        return newRects;
    }
}