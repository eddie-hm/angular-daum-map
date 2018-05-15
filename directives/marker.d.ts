import { EventEmitter, OnChanges, OnDestroy, SimpleChange, AfterContentInit, QueryList } from '@angular/core';
import { MouseEvent } from '../map-types';
import { MarkerManager } from '../services/managers/marker-manager';
import { AdmInfoWindow } from './info-window';
import { MarkerImageLiteral } from '../services/daum-maps-types';
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
export declare class AdmMarker implements OnDestroy, OnChanges, AfterContentInit {
    private _markerManager;
    /**
     * The latitude position of the marker.
     */
    latitude: number;
    /**
     * The longitude position of the marker.
     */
    longitude: number;
    /**
     * The title of the marker.
     */
    title: string;
    /**
     * The label (a single uppercase character) for the marker.
     */
    label: string;
    /**
     * If true, the marker can be dragged. Default value is false.
     */
    draggable: boolean;
    /**
     * Icon (the URL of the image) for the foreground.
     */
    image: MarkerImageLiteral;
    /**
     * If true, the marker is visible
     */
    visible: boolean;
    /**
     * Whether to automatically open the child info window when the marker is clicked.
     */
    openInfoWindow: boolean;
    /**
     * The marker's opacity between 0.0 and 1.0.
     */
    opacity: number;
    /**
     * All markers are displayed on the map in order of their zIndex, with higher values displaying in
     * front of markers with lower values. By default, markers are displayed according to their
     * vertical position on screen, with lower markers appearing in front of markers further up the
     * screen.
     */
    zIndex: number;
    /**
     * This event emitter gets emitted when the user clicks on the marker.
     */
    markerClick: EventEmitter<void>;
    /**
     * This event is fired when the user stops dragging the marker.
     */
    dragEnd: EventEmitter<MouseEvent>;
    /**
     * This event is fired when the user mouses over the marker.
     */
    mouseOver: EventEmitter<MouseEvent>;
    /**
     * This event is fired when the user mouses outside the marker.
     */
    mouseOut: EventEmitter<MouseEvent>;
    /**
     * @internal
     */
    infoWindow: QueryList<AdmInfoWindow>;
    private _markerAddedToManger;
    private _id;
    private _observableSubscriptions;
    constructor(_markerManager: MarkerManager);
    ngAfterContentInit(): void;
    private handleInfoWindowUpdate();
    /** @internal */
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    private _addEventListeners();
    /** @internal */
    id(): string;
    /** @internal */
    toString(): string;
    /** @internal */
    ngOnDestroy(): void;
}
