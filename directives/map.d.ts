import { DaumMap } from './../services/daum-maps-types';
import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MouseEvent } from '../map-types';
import { DaumMapsAPIWrapper } from '../services/daum-maps-api-wrapper';
import { ControlPosition, LatLngLiteral, MapTypeId } from '../services/daum-maps-types';
import { LatLngBounds } from '../services/daum-maps-types';
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
export declare class AdmMap implements OnChanges, OnInit, OnDestroy {
    private _elem;
    private w;
    private _mapsWrapper;
    longitude: number;
    latitude: number;
    level: number;
    draggable: boolean;
    disableDoubleClickZoom: boolean;
    disableDoubleClick: boolean;
    scrollwheel: boolean;
    keyboardShortcuts: boolean;
    projectionId: string;
    tileAnimation: boolean;
    mapTypeId: MapTypeId;
    usePanning: boolean;
    useZoomControl: boolean;
    zoomControlPosition: ControlPosition;
    private static _mapOptionsAttributes;
    private _observableSubscriptions;
    /**
     * Events
     *     'center_changed', 'zoom_start', 'zoom_changed', 'bounds_changed',
     *     'click', 'dblclick', 'rightclick', 'mousemove', 'dragstart', 'dragend',
     *     'idle', 'tilesloaded', 'maptypeid_changed'
     */
    click: EventEmitter<MouseEvent>;
    rightclick: EventEmitter<MouseEvent>;
    dblclick: EventEmitter<MouseEvent>;
    mousemove: EventEmitter<MouseEvent>;
    center_changed: EventEmitter<LatLngLiteral>;
    bounds_changed: EventEmitter<LatLngBounds>;
    idle: EventEmitter<void>;
    zoom_change: EventEmitter<number>;
    mapReady: EventEmitter<DaumMap>;
    dragend: EventEmitter<LatLngLiteral>;
    constructor(_elem: ElementRef, w: WindowRef, _mapsWrapper: DaumMapsAPIWrapper);
    /** @internal */
    ngOnInit(): void;
    private _initMapInstance(el);
    /** @internal */
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _updateMapOptionsChanges(changes);
    private _updatePosition(changes);
    private _setCenter();
    _panTo(lat: number, lng: number): void;
    private relayout();
    private _handleMapCenterChange();
    private _handleBoundsChange();
    private _handleMapZoomChange();
    private _handleDragEnd();
    private _handleIdleEvent();
    private _handleMapMouseEvents();
}
