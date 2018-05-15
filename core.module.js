import { NgModule } from '@angular/core';
import { AdmMap } from './directives/map';
import { AdmInfoWindow } from './directives/info-window';
import { AdmMarker } from './directives/marker';
import { LazyMapsAPILoader } from './services/maps-api-loader/lazy-maps-api-loader';
import { LAZY_MAPS_API_CONFIG } from './services/maps-api-loader/lazy-maps-api-loader';
import { MapsAPILoader } from './services/maps-api-loader/maps-api-loader';
import { BROWSER_GLOBALS_PROVIDERS } from './utils/browser-globals';
import { DaumMapsAPIWrapper } from "./services/daum-maps-api-wrapper";
import { AdmZoomControl } from "./directives/zoomControl";
/**
 * @internal
 */
export function coreDirectives() {
    return [
        AdmMap, AdmMarker, AdmInfoWindow, AdmZoomControl
    ];
}
;
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
export { AdmCoreModule };
AdmCoreModule.decorators = [
    { type: NgModule, args: [{ declarations: coreDirectives(), exports: coreDirectives() },] },
];
/** @nocollapse */
AdmCoreModule.ctorParameters = function () { return []; };
//# sourceMappingURL=core.module.js.map