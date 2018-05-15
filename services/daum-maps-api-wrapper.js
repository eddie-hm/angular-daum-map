import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
import { Platform } from '../utils/browser-globals';
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
        return Observable.create(function (observer) {
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
export { DaumMapsAPIWrapper };
DaumMapsAPIWrapper.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DaumMapsAPIWrapper.ctorParameters = function () { return [
    { type: MapsAPILoader, },
    { type: NgZone, },
]; };
//# sourceMappingURL=daum-maps-api-wrapper.js.map
