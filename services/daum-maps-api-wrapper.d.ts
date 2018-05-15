import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as mapTypes from './daum-maps-types';
import { Polyline, ControlPosition, ZoomControl } from './daum-maps-types';
import { PolylineOptions } from './daum-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * Wrapper class that handles the communication with the Daum Maps Javascript
 * API v3
 */
export declare class DaumMapsAPIWrapper {
    private _loader;
    private _zone;
    private _map;
    private _mapResolver;
    constructor(_loader: MapsAPILoader, _zone: NgZone);
    createMap(el: HTMLElement, mapOptions: mapTypes.MapOptions): Promise<void>;
    setMapOptions(options: mapTypes.MapOptions): void;
    /**
     * Creates a daum map marker with the map context
     */
    createMarker(options?: mapTypes.MarkerOptions): Promise<mapTypes.Marker>;
    createZoomControl(): Promise<mapTypes.ZoomControl>;
    addZommControl(zoomControl: ZoomControl, position: ControlPosition): Promise<void>;
    createInfoWindow(options?: mapTypes.InfoWindowOptions): Promise<mapTypes.InfoWindow>;
    /**
     * Creates a daum.map.Circle for the current map.
     */
    createCircle(options: mapTypes.CircleOptions): Promise<mapTypes.Circle>;
    createPolyline(options: PolylineOptions): Promise<Polyline>;
    createPolygon(options: mapTypes.PolygonOptions): Promise<mapTypes.Polyline>;
    /**
     * Determines if given coordinates are insite a Polygon path.
     */
    containsLocation(latLng: mapTypes.LatLngLiteral, polygon: mapTypes.Polygon): Promise<boolean>;
    subscribeToMapEvent<E>(eventName: string): Observable<E>;
    createLatLng(lat: number | (() => number), lng: number | (() => number)): any;
    addControl(control: any, position: any): Promise<void>;
    removeControl(control: any): Promise<void>;
    setCenter(latLng: mapTypes.LatLngLiteral): Promise<void>;
    getZoom(): Promise<number>;
    getBounds(): Promise<mapTypes.LatLngBounds>;
    setZoom(zoom: number): Promise<void>;
    getCenter(): Promise<mapTypes.LatLng>;
    panTo(latLng: mapTypes.LatLngLiteral): Promise<void>;
    relayout(): void;
    /**
     * Returns the native Daum Maps Map instance. Be careful when using this instance directly.
     */
    getNativeMap(): Promise<mapTypes.DaumMap>;
    /**
     * Triggers the given event name on the map instance.
     */
    triggerMapEvent(eventName: string): Promise<void>;
}
