import { ModuleWithProviders } from '@angular/core';
import { AdmMap } from './directives/map';
import { AdmInfoWindow } from './directives/info-window';
import { AdmMarker } from './directives/marker';
import { LazyMapsAPILoaderConfigLiteral } from './services/maps-api-loader/lazy-maps-api-loader';
import { AdmZoomControl } from "./directives/zoomControl";
/**
 * @internal
 */
export declare function coreDirectives(): (typeof AdmMarker | typeof AdmInfoWindow | typeof AdmMap | typeof AdmZoomControl)[];
/**
 * The ngx-daum-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AdmCoreModule.forRoot()` in your app module.
 */
export declare class AdmCoreModule {
    /**
     * Please use this method when you register the module at the root level.
     */
    static forRoot(lazyMapsAPILoaderConfig?: LazyMapsAPILoaderConfigLiteral): ModuleWithProviders;
}
