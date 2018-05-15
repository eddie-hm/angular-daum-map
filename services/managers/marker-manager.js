import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DaumMapsAPIWrapper } from '../daum-maps-api-wrapper';
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
        return Observable.create(function (observer) {
            _this._markers.get(marker).then(function (m) {
                daum.maps.event.addListener(m, eventName, function () { return _this._zone.run(function () { return observer.next(null); }); });
            });
        });
    };
    return MarkerManager;
}());
export { MarkerManager };
MarkerManager.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MarkerManager.ctorParameters = function () { return [
    { type: DaumMapsAPIWrapper, },
    { type: NgZone, },
]; };
//# sourceMappingURL=marker-manager.js.map
