(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Observable')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Observable'], factory) :
	(factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.core = global.ngmaps.core || {}),global.ng.core,global.Rx));
}(this, (function (exports,_angular_core,rxjs_Observable) { 'use strict';

var MapsAPILoader = (function () {
    function MapsAPILoader() {
    }
    return MapsAPILoader;
}());
MapsAPILoader.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
MapsAPILoader.ctorParameters = function () { return []; };

var WindowRef = (function () {
    function WindowRef() {
    }
    WindowRef.prototype.getNativeWindow = function () { return window; };
    return WindowRef;
}());
var DocumentRef = (function () {
    function DocumentRef() {
    }
    DocumentRef.prototype.getNativeDocument = function () { return document; };
    return DocumentRef;
}());
var Platform = (function () {
    function Platform() {
    }
    Platform.isMobile = function () {
        try {
            var userAgent = navigator.userAgent;
            if (userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null
                || userAgent.match(/LG|SAMSUNG|Samsung/) != null) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.error(err);
            return false;
        }
    };
    return Platform;
}());
var BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];

/**
 * Wrapper class that handles the communication with the Daum Maps Javascript
 * API v3
 */
var DaumMapsAPIWrapper = (function () {
    function DaumMapsAPIWrapper(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise(function (resolve) { _this._mapResolver = resolve; });
    }
    DaumMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
        var _this = this;
        return this._loader.load().then(function () {
            var literal = mapOptions.center;
            mapOptions.center = _this.createLatLng(literal.lat, literal.lng);
            if (Platform.isMobile()) {
                daum.maps.disableHD();
            }
            var map = new daum.maps.Map(el, mapOptions);
            _this._mapResolver(map);
            return;
        });
    };
    DaumMapsAPIWrapper.prototype.setMapOptions = function (options) {
        this._map.then(function (m) {
            // m.setOptions(options);
        });
    };
    /**
     * Creates a daum map marker with the map context
     */
    DaumMapsAPIWrapper.prototype.createMarker = function (options) {
        if (options === void 0) { options = {}; }
        return this._map.then(function (map) {
            options.map = map;
            var li = options.position;
            if (options.image != null) {
                var mImg = options.image;
                var image = new daum.maps.MarkerImage(mImg.src, new daum.maps.Size(mImg.size.width, mImg.size.height));
                options.image = image;
            }
            options.position = new daum.maps.LatLng(li.lat, li.lng);
            return new daum.maps.Marker(options);
        });
    };
    DaumMapsAPIWrapper.prototype.createZoomControl = function () {
        return this._map.then(function (map) {
            return new daum.maps.ZoomControl();
        });
    };
    DaumMapsAPIWrapper.prototype.addZommControl = function (zoomControl, position) {
        return this._map.then(function (map) {
            map.addControl(zoomControl, position);
        });
    };
    DaumMapsAPIWrapper.prototype.createInfoWindow = function (options) {
        return this._map.then(function () { return new daum.maps.InfoWindow(options); });
    };
    /**
     * Creates a daum.map.Circle for the current map.
     */
    DaumMapsAPIWrapper.prototype.createCircle = function (options) {
        return this._map.then(function (map) {
            options.map = map;
            return new daum.maps.Circle(options);
        });
    };
    DaumMapsAPIWrapper.prototype.createPolyline = function (options) {
        return this.getNativeMap().then(function (map) {
            var line = new daum.maps.Polyline(options);
            line.setMap(map);
            return line;
        });
    };
    DaumMapsAPIWrapper.prototype.createPolygon = function (options) {
        return this.getNativeMap().then(function (map) {
            var polygon = new daum.maps.Polygon(options);
            polygon.setMap(map);
            return polygon;
        });
    };
    /**
     * Determines if given coordinates are insite a Polygon path.
     */
    DaumMapsAPIWrapper.prototype.containsLocation = function (latLng, polygon) {
        return daum.maps.geometry.poly.containsLocation(latLng, polygon);
    };
    DaumMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
        var _this = this;
        return rxjs_Observable.Observable.create(function (observer) {
            _this._map.then(function (m) {
                daum.maps.event.addListener(m, eventName, function (arg) {
                    _this._zone.run(function () { return observer.next(arg); });
                });
            });
        });
    };
    DaumMapsAPIWrapper.prototype.createLatLng = function (lat, lng) {
        return new daum.maps.LatLng(lat, lng);
    };
    DaumMapsAPIWrapper.prototype.addControl = function (control, position) {
        return this._map.then(function (map) { return map.addControl(control, position); });
    };
    DaumMapsAPIWrapper.prototype.removeControl = function (control) {
        return this._map.then(function (map) { return map.removeControl(control); });
    };
    DaumMapsAPIWrapper.prototype.setCenter = function (latLng) {
        return this._map.then(function (map) { return map.setCenter(new daum.maps.LatLng(latLng.lat, latLng.lng)); });
    };
    DaumMapsAPIWrapper.prototype.getZoom = function () { return this._map.then(function (map) { return map.getLevel(); }); };
    DaumMapsAPIWrapper.prototype.getBounds = function () {
        return this._map.then(function (map) { return map.getBounds(); });
    };
    DaumMapsAPIWrapper.prototype.setZoom = function (zoom) {
        return this._map.then(function (map) { return map.setLevel(zoom); });
    };
    DaumMapsAPIWrapper.prototype.getCenter = function () {
        return this._map.then(function (map) { return map.getCenter(); });
    };
    DaumMapsAPIWrapper.prototype.panTo = function (latLng) {
        return this._map.then(function (map) { return map.panTo(new daum.maps.LatLng(latLng.lat, latLng.lng)); });
    };
    DaumMapsAPIWrapper.prototype.relayout = function () {
        this._map.then(function (map) { return map.relayout(); });
    };
    // fitBounds(latLng: mapTypes.LatLngBounds|mapTypes.LatLngBoundsLiteral): Promise<void> {
    //   return this._map.then((map) => map.fitBounds(latLng));
    // }
    // panToBounds(latLng: mapTypes.LatLngBounds|mapTypes.LatLngBoundsLiteral): Promise<void> {
    //   return this._map.then((map) => map.panToBounds(latLng));
    // }
    /**
     * Returns the native Daum Maps Map instance. Be careful when using this instance directly.
     */
    DaumMapsAPIWrapper.prototype.getNativeMap = function () { return this._map; };
    /**
     * Triggers the given event name on the map instance.
     */
    DaumMapsAPIWrapper.prototype.triggerMapEvent = function (eventName) {
        return this._map.then(function (m) { return daum.maps.event.trigger(m, eventName); });
    };
    return DaumMapsAPIWrapper;
}());
DaumMapsAPIWrapper.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
DaumMapsAPIWrapper.ctorParameters = function () { return [
    { type: MapsAPILoader, },
    { type: _angular_core.NgZone, },
]; };

/**
 * Identifiers used to specify the placement of controls on the map. Controls are
 * positioned relative to other controls in the same layout position. Controls that
 * are added first are positioned closer to the edge of the map.
 */
var ControlPosition;
(function (ControlPosition) {
    ControlPosition[ControlPosition["BOTTOM"] = 0] = "BOTTOM";
    ControlPosition[ControlPosition["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
    ControlPosition[ControlPosition["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
    ControlPosition[ControlPosition["LEFT"] = 3] = "LEFT";
    ControlPosition[ControlPosition["RIGHT"] = 4] = "RIGHT";
    ControlPosition[ControlPosition["TOP"] = 5] = "TOP";
    ControlPosition[ControlPosition["TOP_LEFT"] = 6] = "TOP_LEFT";
    ControlPosition[ControlPosition["TOP_RIGHT"] = 7] = "TOP_RIGHT";
})(ControlPosition || (ControlPosition = {}));
var MapTypeControlStyle;
(function (MapTypeControlStyle) {
    MapTypeControlStyle[MapTypeControlStyle["DEFAULT"] = 0] = "DEFAULT";
    MapTypeControlStyle[MapTypeControlStyle["DROPDOWN_MENU"] = 1] = "DROPDOWN_MENU";
    MapTypeControlStyle[MapTypeControlStyle["HORIZONTAL_BAR"] = 2] = "HORIZONTAL_BAR";
})(MapTypeControlStyle || (MapTypeControlStyle = {}));
var ScaleControlStyle;
(function (ScaleControlStyle) {
    ScaleControlStyle[ScaleControlStyle["DEFAULT"] = 0] = "DEFAULT";
})(ScaleControlStyle || (ScaleControlStyle = {}));
var ZoomControlStyle;
(function (ZoomControlStyle) {
    ZoomControlStyle[ZoomControlStyle["DEFAULT"] = 0] = "DEFAULT";
    ZoomControlStyle[ZoomControlStyle["LARGE"] = 1] = "LARGE";
    ZoomControlStyle[ZoomControlStyle["SMALL"] = 2] = "SMALL";
})(ZoomControlStyle || (ZoomControlStyle = {}));
var ProjectionId;
(function (ProjectionId) {
    /**
    * 투영 없는 API 내부의 좌표계 자체.
    * left-bottom을 (0,0)으로 하는 픽셀단위의 좌표계.
    */
    ProjectionId[ProjectionId["NONE"] = 0] = "NONE";
    /**
    * API 내부 좌표계를 WCongnamul좌표계로 투영.
    * 외부에서 WCongnamul 좌표를 받아 사용가능.
    */
    ProjectionId[ProjectionId["WCONG"] = 1] = "WCONG";
})(ProjectionId || (ProjectionId = {}));
//copyright의 위치가 상수값으로 정의되어 있다.
var CopyrightPosition;
(function (CopyrightPosition) {
    //왼쪽아래
    CopyrightPosition[CopyrightPosition["BOTTOMLEFT"] = 0] = "BOTTOMLEFT";
    //오른쪽아래
    CopyrightPosition[CopyrightPosition["BOTTOMRIGHT"] = 1] = "BOTTOMRIGHT";
})(CopyrightPosition || (CopyrightPosition = {}));
var MapTypeId;
(function (MapTypeId) {
    /** This map type displays a transparent layer of major streets on satellite images. */
    MapTypeId[MapTypeId["ROADMAP"] = 0] = "ROADMAP";
    /** This map type displays a normal street map. */
    MapTypeId[MapTypeId["SKYVIEW"] = 1] = "SKYVIEW";
    /** This map type displays satellite images. */
    MapTypeId[MapTypeId["HYBRID"] = 2] = "HYBRID";
    /** This map type displays maps with physical features such as terrain and vegetation. */
    MapTypeId[MapTypeId["ROADVIEW"] = 3] = "ROADVIEW";
    MapTypeId[MapTypeId["OVERLAY"] = 4] = "OVERLAY";
    MapTypeId[MapTypeId["TRAFFIC"] = 5] = "TRAFFIC";
    MapTypeId[MapTypeId["TERRAIN"] = 6] = "TERRAIN";
    MapTypeId[MapTypeId["BICYCLE"] = 7] = "BICYCLE";
    MapTypeId[MapTypeId["BICYCLE_HYBRID"] = 8] = "BICYCLE_HYBRID";
    MapTypeId[MapTypeId["USE_DISTRICT"] = 9] = "USE_DISTRICT";
})(MapTypeId || (MapTypeId = {}));

var MarkerManager = (function () {
    function MarkerManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markers = new Map();
    }
    MarkerManager.prototype.deleteMarker = function (marker) {
        var _this = this;
        var m = this._markers.get(marker);
        if (m == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return m.then(function (m) {
            return _this._zone.run(function () {
                m.setMap(null);
                _this._markers.delete(marker);
            });
        });
    };
    MarkerManager.prototype.updateMarkerPosition = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setPosition(new daum.maps.LatLng(marker.latitude, marker.longitude)); });
    };
    MarkerManager.prototype.updateTitle = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
    };
    MarkerManager.prototype.updateLabel = function (marker) {
        return this._markers.get(marker).then(function (m) { m.setTitle(marker.label); });
    };
    MarkerManager.prototype.updateDraggable = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
    };
    MarkerManager.prototype.updateIcon = function (marker) {
        return this._markers.get(marker).then(function (m) {
            var markerImage = new daum.maps.MarkerImage(marker.image.src, new daum.maps.Size(marker.image.size.width, marker.image.size.height));
            m.setImage(markerImage);
        });
    };
    MarkerManager.prototype.updateOpacity = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setOpacity(marker.opacity); });
    };
    MarkerManager.prototype.updateVisible = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setVisible(marker.visible); });
    };
    MarkerManager.prototype.updateZIndex = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setZIndex(marker.zIndex); });
    };
    MarkerManager.prototype.addMarker = function (marker) {
        var markerPromise = this._mapsWrapper.createMarker({
            position: { lat: marker.latitude, lng: marker.longitude },
            image: marker.image,
            title: marker.label,
            draggable: marker.draggable,
            clickable: true,
            opacity: marker.opacity,
            zIndex: marker.zIndex
        });
        this._markers.set(marker, markerPromise);
    };
    MarkerManager.prototype.getNativeMarker = function (marker) {
        return this._markers.get(marker);
    };
    MarkerManager.prototype.createEventObservable = function (eventName, marker) {
        var _this = this;
        return rxjs_Observable.Observable.create(function (observer) {
            _this._markers.get(marker).then(function (m) {
                daum.maps.event.addListener(m, eventName, function () { return _this._zone.run(function () { return observer.next(null); }); });
            });
        });
    };
    return MarkerManager;
}());
MarkerManager.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
MarkerManager.ctorParameters = function () { return [
    { type: DaumMapsAPIWrapper, },
    { type: _angular_core.NgZone, },
]; };

var InfoWindowManager = (function () {
    function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
        var _this = this;
        var iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then(function (i) {
            return _this._zone.run(function () {
                i.close();
                _this._infoWindows.delete(infoWindow);
            });
        });
    };
    InfoWindowManager.prototype.setPosition = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude
        }); });
    };
    InfoWindowManager.prototype.setZIndex = function (infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
    };
    InfoWindowManager.prototype.open = function (infoWindow) {
        var _this = this;
        return this._infoWindows.get(infoWindow).then(function (w) {
            if (infoWindow.hostMarker != null) {
                return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                    return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                });
            }
            return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
        });
    };
    InfoWindowManager.prototype.close = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
    };
    InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
    };
    InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
        var options = {
            content: infoWindow.content,
            zIndex: infoWindow.zIndex,
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    };
    /**
     * Creates a Daum Maps event listener for the given InfoWindow as an Observable
     */
    InfoWindowManager.prototype.createEventObservable = function (eventName, infoWindow) {
        var _this = this;
        return rxjs_Observable.Observable.create(function (observer) {
            _this._infoWindows.get(infoWindow).then(function (i) {
                i.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    return InfoWindowManager;
}());
InfoWindowManager.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
InfoWindowManager.ctorParameters = function () { return [
    { type: DaumMapsAPIWrapper, },
    { type: _angular_core.NgZone, },
    { type: MarkerManager, },
]; };

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
        this.click = new _angular_core.EventEmitter();
        this.rightclick = new _angular_core.EventEmitter();
        this.dblclick = new _angular_core.EventEmitter();
        this.mousemove = new _angular_core.EventEmitter();
        this.center_changed = new _angular_core.EventEmitter();
        this.bounds_changed = new _angular_core.EventEmitter();
        this.idle = new _angular_core.EventEmitter();
        this.zoom_change = new _angular_core.EventEmitter();
        this.mapReady = new _angular_core.EventEmitter();
        this.dragend = new _angular_core.EventEmitter();
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
AdmMap._mapOptionsAttributes = [
    'longitude', 'latitude', 'level', 'draggable',
    'disableDoubleClickZoom', 'disableCoudbleClick', 'scrollwheel',
    'keyboardShortcuts', 'projectionId', 'tileAnimation'
];
AdmMap.decorators = [
    { type: _angular_core.Component, args: [{
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
    { type: _angular_core.ElementRef, },
    { type: WindowRef, },
    { type: DaumMapsAPIWrapper, },
]; };

var infoWindowId = 0;
/**
 * admInfoWindow renders a info window inside a {@link admMarker} or standalone.
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
 *        <adm-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </adm-info-window>
 *      </adm-marker>
 *    </adm-map>
 *  `
 * })
 * ```
 */
var AdmInfoWindow = (function () {
    function AdmInfoWindow(_infoWindowManager, _el) {
        this._infoWindowManager = _infoWindowManager;
        this._el = _el;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new _angular_core.EventEmitter();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    AdmInfoWindow.prototype.ngOnInit = function () {
        this.content = this._el.nativeElement.querySelector('.adm-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
        this._registerEventListeners();
    };
    /** @internal */
    AdmInfoWindow.prototype.ngOnChanges = function (changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            console.log('changed postion');
            this._infoWindowManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoWindowManager.setZIndex(this);
        }
        if (changes['isOpen']) {
            this._updateOpenState();
        }
        this._setInfoWindowOptions(changes);
    };
    AdmInfoWindow.prototype._registerEventListeners = function () {
        var _this = this;
        this._infoWindowManager.createEventObservable('closeclick', this).subscribe(function () {
            _this.isOpen = false;
            _this.infoWindowClose.emit();
        });
    };
    AdmInfoWindow.prototype._updateOpenState = function () {
        this.isOpen ? this.open() : this.close();
    };
    AdmInfoWindow.prototype._setInfoWindowOptions = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AdmInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    };
    /**
     * Opens the info window.
     */
    AdmInfoWindow.prototype.open = function () { return this._infoWindowManager.open(this); };
    /**
     * Closes the info window.
     */
    AdmInfoWindow.prototype.close = function () {
        var _this = this;
        return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(); });
    };
    /** @internal */
    AdmInfoWindow.prototype.id = function () { return this._id; };
    /** @internal */
    AdmInfoWindow.prototype.toString = function () { return 'admInfoWindow-' + this._id.toString(); };
    /** @internal */
    AdmInfoWindow.prototype.ngOnDestroy = function () { this._infoWindowManager.deleteInfoWindow(this); };
    return AdmInfoWindow;
}());
AdmInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
AdmInfoWindow.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'adm-info-window',
                inputs: ['latitude', 'longitude', 'disableAutoPan', 'position', 'removable', 'zIndex', 'isOpen'],
                outputs: ['infoWindowClose'],
                template: "<div class='adm-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
            },] },
];
/** @nocollapse */
AdmInfoWindow.ctorParameters = function () { return [
    { type: InfoWindowManager, },
    { type: _angular_core.ElementRef, },
]; };

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
        this.markerClick = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user mouses over the marker.
         */
        this.mouseOver = new _angular_core.EventEmitter();
        /**
         * This event is fired when the user mouses outside the marker.
         */
        this.mouseOut = new _angular_core.EventEmitter();
        /**
         * @internal
         */
        this.infoWindow = new _angular_core.QueryList();
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
AdmMarker.decorators = [
    { type: _angular_core.Directive, args: [{
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
    'infoWindow': [{ type: _angular_core.ContentChildren, args: [AdmInfoWindow,] },],
};

var AdmZoomControl = (function () {
    function AdmZoomControl(_mapWrapper) {
        this._mapWrapper = _mapWrapper;
        this.position = ControlPosition.TOP_RIGHT;
    }
    AdmZoomControl.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.position);
        this._mapWrapper.createZoomControl()
            .then(function (zoomControl) {
            _this.zoomControl = zoomControl;
            return _this._mapWrapper.addControl(_this.zoomControl, _this.position);
        })
            .then();
    };
    AdmZoomControl.prototype.ngOnDestroy = function () {
        this._mapWrapper
            .removeControl(this.zoomControl)
            .then();
    };
    AdmZoomControl.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['position']) {
            this._mapWrapper
                .removeControl(this.zoomControl)
                .then(this._mapWrapper.createZoomControl)
                .then(function (zoomControl) {
                _this.zoomControl = zoomControl;
                return _this._mapWrapper.addControl(_this.zoomControl, _this.position);
            })
                .then();
        }
    };
    return AdmZoomControl;
}());
AdmZoomControl.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: 'adm-zoom-control'
            },] },
];
/** @nocollapse */
AdmZoomControl.ctorParameters = function () { return [
    { type: DaumMapsAPIWrapper, },
]; };
AdmZoomControl.propDecorators = {
    'position': [{ type: _angular_core.Input },],
};

var __extends = (window && window.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

(function (DaumMapsScriptProtocol) {
    DaumMapsScriptProtocol[DaumMapsScriptProtocol["HTTP"] = 1] = "HTTP";
    DaumMapsScriptProtocol[DaumMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
    DaumMapsScriptProtocol[DaumMapsScriptProtocol["AUTO"] = 3] = "AUTO";
})(exports.DaumMapsScriptProtocol || (exports.DaumMapsScriptProtocol = {}));
/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type
 * {@link LazyMapsAPILoaderConfig}.
 */
var LAZY_MAPS_API_CONFIG = new _angular_core.InjectionToken('LazyMapsApiConfig');
var LazyMapsAPILoader = (function (_super) {
    __extends(LazyMapsAPILoader, _super);
    function LazyMapsAPILoader(config, w, d) {
        var _this = _super.call(this) || this;
        _this._config = config || {};
        _this._windowRef = w;
        _this._documentRef = d;
        return _this;
    }
    LazyMapsAPILoader.prototype.load = function () {
        var _this = this;
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        var script = this._documentRef.getNativeDocument().createElement('script');
        script.type = 'text/javascript';
        // script.async = true;
        // script.defer = true;
        var callbackName = "ngxDaumMapsLazyMapsAPILoader";
        script.src = this._getScriptSrc(callbackName);
        this._documentRef.getNativeDocument().body.appendChild(script);
        this._scriptLoadingPromise = new Promise(function (resolve, reject) {
            script.onload = function () {
                _this._windowRef.getNativeWindow().daum.maps.load(function () { resolve(); });
            };
            script.onerror = function (error) { reject(error); };
        });
        return this._scriptLoadingPromise;
    };
    LazyMapsAPILoader.prototype._getScriptSrc = function (callbackName) {
        var protocolType = (this._config && this._config.protocol) || exports.DaumMapsScriptProtocol.HTTPS;
        var protocol;
        switch (protocolType) {
            case exports.DaumMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case exports.DaumMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case exports.DaumMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        var hostAndPath = this._config.hostAndPath || 'apis.daum.net/maps/maps3.js';
        var queryParams = {
            apikey: this._config.apiKey,
            appkey: this._config.apiKey,
            autoload: this._config.autoload ? 'true' : 'false'
        };
        var params = Object.keys(queryParams)
            .filter(function (k) { return queryParams[k] != null; })
            .filter(function (k) {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map(function (k) {
            // join arrays as comma seperated strings
            var i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map(function (entry) { return entry.key + "=" + entry.value; })
            .join('&');
        return protocol + "//" + hostAndPath + "?" + params;
    };
    return LazyMapsAPILoader;
}(MapsAPILoader));
LazyMapsAPILoader.decorators = [
    { type: _angular_core.Injectable },
];
/** @nocollapse */
LazyMapsAPILoader.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: _angular_core.Inject, args: [LAZY_MAPS_API_CONFIG,] },] },
    { type: WindowRef, },
    { type: DocumentRef, },
]; };

/**
 * When using the NoOpMapsAPILoader, the Daum Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Daum Maps API script gets loaded first on the page.
 */
var NoOpMapsAPILoader = (function () {
    function NoOpMapsAPILoader() {
    }
    NoOpMapsAPILoader.prototype.load = function () {
        if (!window.daum || !window.daum.maps) {
            throw new Error('Daum Maps API not loaded on page. Make sure window.daum.maps is available!');
        }
        return Promise.resolve();
    };

    return NoOpMapsAPILoader;
}());

/**
 * @internal
 */
function coreDirectives() {
    return [
        AdmMap, AdmMarker, AdmInfoWindow, AdmZoomControl
    ];
}

/**
 * The ngx-daum-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AdmCoreModule.forRoot()` in your app module.
 */
var AdmCoreModule = (function () {
    function AdmCoreModule() {
    }
    /**
     * Please use this method when you register the module at the root level.
     */
    AdmCoreModule.forRoot = function (lazyMapsAPILoaderConfig) {
        return {
            ngModule: AdmCoreModule,
            providers: BROWSER_GLOBALS_PROVIDERS.concat([
                { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig },
                DaumMapsAPIWrapper
            ]),
        };
    };
    return AdmCoreModule;
}());
AdmCoreModule.decorators = [
    { type: _angular_core.NgModule, args: [{ declarations: coreDirectives(), exports: coreDirectives() },] },
];
/** @nocollapse */
AdmCoreModule.ctorParameters = function () { return []; };

// main modules

exports.AdmCoreModule = AdmCoreModule;
exports.AdmMap = AdmMap;
exports.AdmInfoWindow = AdmInfoWindow;
exports.AdmMarker = AdmMarker;
exports.AdmZoomControl = AdmZoomControl;
exports.DaumMapsAPIWrapper = DaumMapsAPIWrapper;
exports.InfoWindowManager = InfoWindowManager;
exports.MarkerManager = MarkerManager;
exports.LAZY_MAPS_API_CONFIG = LAZY_MAPS_API_CONFIG;
exports.LazyMapsAPILoader = LazyMapsAPILoader;
exports.MapsAPILoader = MapsAPILoader;
exports.NoOpMapsAPILoader = NoOpMapsAPILoader;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core.umd.js.map
