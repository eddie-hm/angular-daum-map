import { Component, ElementRef, EventEmitter } from '@angular/core';
import { DaumMapsAPIWrapper } from '../services/daum-maps-api-wrapper';
import { ControlPosition, MapTypeId } from '../services/daum-maps-types';
import { InfoWindowManager } from '../services/managers/info-window-manager';
import { MarkerManager } from '../services/managers/marker-manager';
import { WindowRef } from "../utils/browser-globals";
/**
 * admMap renders a Daum Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the
 * element `adm-map`.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    adm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <adm-map [latitude]="lat" [longitude]="lng" [level]="level">
 *    </adm-map>
 *  `
 * })
 * ```
 */
var AdmMap = (function () {
    function AdmMap(_elem, w, _mapsWrapper) {
        this._elem = _elem;
        this.w = w;
        this._mapsWrapper = _mapsWrapper;
        this.longitude = 0;
        this.latitude = 0;
        this.level = 8;
        this.draggable = true;
        this.disableDoubleClickZoom = false;
        this.disableDoubleClick = false;
        this.scrollwheel = true;
        this.keyboardShortcuts = true;
        this.projectionId = 'WCONG';
        this.tileAnimation = true;
        this.mapTypeId = MapTypeId.ROADMAP;
        this.usePanning = true;
        this.useZoomControl = false;
        this.zoomControlPosition = ControlPosition.TOP_RIGHT;
        this._observableSubscriptions = [];
        /**
         * Events
         *     'center_changed', 'zoom_start', 'zoom_changed', 'bounds_changed',
         *     'click', 'dblclick', 'rightclick', 'mousemove', 'dragstart', 'dragend',
         *     'idle', 'tilesloaded', 'maptypeid_changed'
         */
        this.click = new EventEmitter();
        this.rightclick = new EventEmitter();
        this.dblclick = new EventEmitter();
        this.mousemove = new EventEmitter();
        this.center_changed = new EventEmitter();
        this.bounds_changed = new EventEmitter();
        this.idle = new EventEmitter();
        this.zoom_change = new EventEmitter();
        this.mapReady = new EventEmitter();
        this.dragend = new EventEmitter();
    }
    /** @internal */
    AdmMap.prototype.ngOnInit = function () {
        // todo: this should be solved with a new component and a viewChild decorator
        var container = this._elem.nativeElement.querySelector('.adm-map-container-inner');
        this._initMapInstance(container);
    };
    AdmMap.prototype._initMapInstance = function (el) {
        var _this = this;
        this._mapsWrapper.createMap(el, {
            center: { lat: this.latitude || 0, lng: this.longitude || 0 },
            level: this.level,
            draggable: this.draggable,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            disableDoubleClick: this.disableDoubleClick,
            scrollwheel: this.scrollwheel,
            keyboardShortcuts: this.keyboardShortcuts,
            projectionId: this.projectionId,
            tileAnimation: this.tileAnimation,
            mapTypeId: MapTypeId.ROADMAP
            /**
             * 'longitude', 'latitude', 'level', 'draggable',
             * 'disableDoubleClickZoom', 'disableCoudbleClick', 'scrollwheel',
             * 'keyboardShortcuts', 'projectionId', 'tileAnimation'
             */
        })
            .then(function () { return _this._mapsWrapper.getNativeMap(); })
            .then(function (map) {
            _this.w.getNativeWindow().onresize = function (event) {
                _this.relayout();
            };
            return _this.mapReady.emit(map);
        });
        // register event listeners
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleIdleEvent();
    };
    /** @internal */
    AdmMap.prototype.ngOnDestroy = function () {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /* @internal */
    AdmMap.prototype.ngOnChanges = function (changes) {
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    };
    AdmMap.prototype._updateMapOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AdmMap._mapOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._mapsWrapper.setMapOptions(options);
    };
    // /**
    //  * Triggers a resize event on the daum map instance.
    //  * When recenter is true, the of the daum map gets called with the current lat/lng values or fitBounds value to recenter the map.
    //  * Returns a promise that gets resolved after the event was triggered.
    //  */
    // triggerResize(recenter: boolean = true): Promise<void> {
    //   // Note: When we would trigger the resize event and show the map in the same turn (which is a
    //   // common case for triggering a resize event), then the resize event would not
    //   // work (to show the map), so we trigger the event in a timeout.
    //   return new Promise<void>((resolve) => {
    //     setTimeout(() => {
    //       return this._mapsWrapper.triggerMapEvent('resize').then(() => {
    //         if (recenter) {
    //           this.fitBounds != null ? ()=>{} : this._setCenter();
    //         }
    //         resolve();
    //       });
    //     });
    //   });
    // }
    AdmMap.prototype._updatePosition = function (changes) {
        if (changes['latitude'] == null && changes['longitude'] == null &&
            changes['fitBounds'] == null) {
            // no position update needed
            return;
        }
        // // we prefer fitBounds in changes
        // if (changes['fitBounds'] && this.fitBounds != null) {
        //   this._fitBounds();
        //   return;
        // }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        this._setCenter();
    };
    AdmMap.prototype._setCenter = function () {
        var newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        this._mapsWrapper.setCenter(newCenter);
        // this._mapsWrapper.panTo(newCenter);
    };
    AdmMap.prototype._panTo = function (lat, lng) {
        this.latitude = lat;
        this.longitude = lng;
        var newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        this._mapsWrapper.panTo(newCenter);
    };
    AdmMap.prototype.relayout = function () {
        this._mapsWrapper.relayout();
    };
    AdmMap.prototype._handleMapCenterChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
            _this._mapsWrapper.getCenter().then(function (center) {
                _this.latitude = center.getLat();
                _this.longitude = center.getLng();
                _this.center_changed.emit({ lat: _this.latitude, lng: _this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    };
    AdmMap.prototype._handleBoundsChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(function () {
            _this._mapsWrapper.getBounds().then(function (bounds) { _this.bounds_changed.emit(bounds); });
        });
        this._observableSubscriptions.push(s);
    };
    AdmMap.prototype._handleMapZoomChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
            _this._mapsWrapper.getZoom().then(function (z) {
                _this.level = z;
                _this.zoom_change.emit(z);
            });
        });
        this._observableSubscriptions.push(s);
    };
    AdmMap.prototype._handleDragEnd = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('dragend').subscribe(function () {
            _this._mapsWrapper.getCenter().then(function (center) {
                _this.latitude = center.getLat();
                _this.longitude = center.getLng();
                _this.dragend.emit({ lat: _this.latitude, lng: _this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    };
    AdmMap.prototype._handleIdleEvent = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(function () {
            _this._setCenter();
            return _this.idle.emit(void 0);
        });
        this._observableSubscriptions.push(s);
    };
    AdmMap.prototype._handleMapMouseEvents = function () {
        var _this = this;
        var events = [
            { name: 'click', emitter: this.click },
            { name: 'rightclick', emitter: this.rightclick },
            { name: 'dblclick', emitter: this.dblclick },
        ];
        events.forEach(function (e) {
            var s = _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function (event) {
                var value = { coords: { lat: event.latLng.getLat(), lng: event.latLng.getLng() } };
                e.emitter.emit(value);
            });
            _this._observableSubscriptions.push(s);
        });
    };
    return AdmMap;
}());
export { AdmMap };
AdmMap._mapOptionsAttributes = [
    'longitude', 'latitude', 'level', 'draggable',
    'disableDoubleClickZoom', 'disableCoudbleClick', 'scrollwheel',
    'keyboardShortcuts', 'projectionId', 'tileAnimation'
];
AdmMap.decorators = [
    { type: Component, args: [{
                selector: 'adm-map',
                providers: [
                    DaumMapsAPIWrapper, MarkerManager, InfoWindowManager
                ],
                inputs: [
                    'longitude', 'latitude', 'level', 'draggable',
                    'disableDoubleClickZoom', 'disableCoudbleClick', 'scrollwheel',
                    'keyboardShortcuts', 'projectionId', 'tileAnimation', 'useZoomControl', 'zoomControlPosition'
                ],
                outputs: [
                    'center_changed', 'zoom_start', 'zoom_changed', 'bounds_changed',
                    'click', 'dblclick', 'rightclick', 'mousemove', 'dragstart', 'dragend',
                    'idle', 'tilesloaded', 'maptypeid_changed', 'mapReady'
                ],
                host: {
                    // todo: deprecated - we will remove it with the next version
                    '[class.sebm-google-map-container]': 'true'
                },
                styles: ["\n    .adm-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .adm-map-content {\n      display:none;\n    }\n  "],
                template: "\n    <div class='adm-map-container-inner sebm-google-map-container-inner'></div>\n    <div class='adm-map-content'>\n      <ng-content></ng-content>\n    </div>\n  "
            },] },
];
/** @nocollapse */
AdmMap.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: WindowRef, },
    { type: DaumMapsAPIWrapper, },
]; };
//# sourceMappingURL=map.js.map
