var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { DocumentRef, WindowRef } from '../../utils/browser-globals';
import { MapsAPILoader } from './maps-api-loader';
export var DaumMapsScriptProtocol;
(function (DaumMapsScriptProtocol) {
    DaumMapsScriptProtocol[DaumMapsScriptProtocol["HTTP"] = 1] = "HTTP";
    DaumMapsScriptProtocol[DaumMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
    DaumMapsScriptProtocol[DaumMapsScriptProtocol["AUTO"] = 3] = "AUTO";
})(DaumMapsScriptProtocol || (DaumMapsScriptProtocol = {}));
/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type
 * {@link LazyMapsAPILoaderConfig}.
 */
export var LAZY_MAPS_API_CONFIG = new InjectionToken('LazyMapsApiConfig');
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
        var protocolType = (this._config && this._config.protocol) || DaumMapsScriptProtocol.HTTPS;
        var protocol;
        switch (protocolType) {
            case DaumMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case DaumMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case DaumMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        var hostAndPath = 'dapi.kakao.com/v2/maps/sdk.js';
        var queryParams = {
            // apikey: this._config.apiKey,
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
export { LazyMapsAPILoader };
LazyMapsAPILoader.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LazyMapsAPILoader.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [LAZY_MAPS_API_CONFIG,] },] },
    { type: WindowRef, },
    { type: DocumentRef, },
]; };
//# sourceMappingURL=lazy-maps-api-loader.js.map
