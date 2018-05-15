import { LatLngLiteral, LatLng } from './../services/daum-maps-types';
import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { InfoWindowManager } from '../services/managers/info-window-manager';
import { AdmMarker } from './marker';
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
export declare class AdmInfoWindow implements OnDestroy, OnChanges, OnInit {
    private _infoWindowManager;
    private _el;
    disableAutoPan: boolean;
    position: LatLngLiteral | LatLng;
    removable: boolean;
    zIndex: number;
    latitude: number;
    longitude: number;
    /**
     * Holds the marker that is the host of the info window (if available)
     */
    hostMarker: AdmMarker;
    /**
     * Holds the native element that is used for the info window content.
     */
    content: Node;
    isOpen: boolean;
    /**
     * Emits an event when the info window is closed.
     */
    infoWindowClose: EventEmitter<void>;
    private static _infoWindowOptionsInputs;
    private _infoWindowAddedToManager;
    private _id;
    constructor(_infoWindowManager: InfoWindowManager, _el: ElementRef);
    ngOnInit(): void;
    /** @internal */
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    private _registerEventListeners();
    private _updateOpenState();
    private _setInfoWindowOptions(changes);
    /**
     * Opens the info window.
     */
    open(): Promise<void>;
    /**
     * Closes the info window.
     */
    close(): Promise<void>;
    /** @internal */
    id(): string;
    /** @internal */
    toString(): string;
    /** @internal */
    ngOnDestroy(): void;
}
