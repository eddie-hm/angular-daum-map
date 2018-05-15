import { Directive, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { MarkerManager } from '../services/managers/marker-manager';
import { AdmInfoWindow } from './info-window';
var markerId = 0;
/**
 * admMarker renders a map marker inside a {@link admMap}.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .adm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <adm-map [latitude]="lat" [longitude]="lng" [level]="level">
 *      <adm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </adm-marker>
 *    </adm-map>
 *  `
 * })
 * ```
 */
var AdmMarker = (function () {
    function AdmMarker(_markerManager) {
        this._markerManager = _markerManager;
        /**
         * If true, the marker can be dragged. Default value is false.
         */
        this.draggable = false;
        /**
         * If true, the marker is visible
         */
        this.visible = true;
        /**
         * Whether to automatically open the child info window when the marker is clicked.
         */
        this.openInfoWindow = true;
        /**
         * The marker's opacity between 0.0 and 1.0.
         */
        this.opacity = 1;
        /**
         * All markers are displayed on the map in order of their zIndex, with higher values displaying in
         * front of markers with lower values. By default, markers are displayed according to their
         * vertical position on screen, with lower markers appearing in front of markers further up the
         * screen.
         */
        this.zIndex = 1;
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         */
        this.markerClick = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user mouses over the marker.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the user mouses outside the marker.
         */
        this.mouseOut = new EventEmitter();
        /**
         * @internal
         */
        this.infoWindow = new QueryList();
        this._markerAddedToManger = false;
        this._observableSubscriptions = [];
        this._id = (markerId++).toString();
    }
    /* @internal */
    AdmMarker.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.handleInfoWindowUpdate();
        this.infoWindow.changes.subscribe(function () { return _this.handleInfoWindowUpdate(); });
    };
    AdmMarker.prototype.handleInfoWindowUpdate = function () {
        var _this = this;
        if (this.infoWindow.length > 1) {
            throw new Error('Expected no more than one info window.');
        }
        this.infoWindow.forEach(function (marker) {
            marker.hostMarker = _this;
        });
    };
    /** @internal */
    AdmMarker.prototype.ngOnChanges = function (changes) {
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            this._markerManager.addMarker(this);
            this._markerAddedToManger = true;
            this._addEventListeners();
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._markerManager.updateMarkerPosition(this);
        }
        if (changes['title']) {
            this._markerManager.updateTitle(this);
        }
        if (changes['label']) {
            this._markerManager.updateLabel(this);
        }
        if (changes['draggable']) {
            this._markerManager.updateDraggable(this);
        }
        if (changes['image']) {
            this._markerManager.updateIcon(this);
        }
        if (changes['opacity']) {
            this._markerManager.updateOpacity(this);
        }
        if (changes['visible']) {
            this._markerManager.updateVisible(this);
        }
        if (changes['zIndex']) {
            this._markerManager.updateZIndex(this);
        }
        if (changes['width']) {
          this._markerManager.updateZIndex(this);
        }
        if (changes['height']) {
          this._markerManager.updateZIndex(this);
        }

    };
    AdmMarker.prototype._addEventListeners = function () {
        var _this = this;
        var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
            if (_this.openInfoWindow) {
                _this.infoWindow.forEach(function (infoWindow) { return infoWindow.open(); });
            }
            _this.markerClick.emit(null);
        });
        this._observableSubscriptions.push(cs);
        var ds = this._markerManager.createEventObservable('dragend', this)
            .subscribe(function () {
            _this.dragEnd.emit(null);
        });
        this._observableSubscriptions.push(ds);
        var mover = this._markerManager.createEventObservable('mouseover', this)
            .subscribe(function () {
            _this.mouseOver.emit(null);
        });
        this._observableSubscriptions.push(mover);
        var mout = this._markerManager.createEventObservable('mouseout', this)
            .subscribe(function () {
            _this.mouseOut.emit(null);
        });
        this._observableSubscriptions.push(mout);
        var de = this._markerManager.createEventObservable('dragstart', this)
            .subscribe(function () {
            _this.mouseOver.emit(null);
        });
        this._observableSubscriptions.push(de);
        var rc = this._markerManager.createEventObservable('rightclick', this)
            .subscribe(function () {
            _this.mouseOver.emit(null);
        });
        this._observableSubscriptions.push(rc);
    };
    /** @internal */
    AdmMarker.prototype.id = function () { return this._id; };
    /** @internal */
    AdmMarker.prototype.toString = function () { return 'admMarker-' + this._id.toString(); };
    /** @internal */
    AdmMarker.prototype.ngOnDestroy = function () {
        this._markerManager.deleteMarker(this);
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    return AdmMarker;
}());
export { AdmMarker };
AdmMarker.decorators = [
    { type: Directive, args: [{
                selector: 'adm-marker',
                inputs: [
                    'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'image',
                    'openInfoWindow', 'opacity', 'visible', 'zIndex'
                ],
                outputs: ['markerClick', 'dragEnd', 'mouseOver', 'mouseOut']
            },] },
];
/** @nocollapse */
AdmMarker.ctorParameters = function () { return [
    { type: MarkerManager, },
]; };
AdmMarker.propDecorators = {
    'infoWindow': [{ type: ContentChildren, args: [AdmInfoWindow,] },],
};
//# sourceMappingURL=marker.js.map
