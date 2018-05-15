import { Observable } from 'rxjs/Observable';
import { NgZone } from '@angular/core';
import { AdmInfoWindow } from '../../directives/info-window';
import { DaumMapsAPIWrapper } from '../daum-maps-api-wrapper';
import { InfoWindowOptions } from '../daum-maps-types';
import { MarkerManager } from './marker-manager';
export declare class InfoWindowManager {
    private _mapsWrapper;
    private _zone;
    private _markerManager;
    private _infoWindows;
    constructor(_mapsWrapper: DaumMapsAPIWrapper, _zone: NgZone, _markerManager: MarkerManager);
    deleteInfoWindow(infoWindow: AdmInfoWindow): Promise<void>;
    setPosition(infoWindow: AdmInfoWindow): Promise<void>;
    setZIndex(infoWindow: AdmInfoWindow): Promise<void>;
    setRemovable(infoWindow: AdmInfoWindow): Promise<void>;
    open(infoWindow: AdmInfoWindow): Promise<void>;
    close(infoWindow: AdmInfoWindow): Promise<void>;
    setOptions(infoWindow: AdmInfoWindow, options: InfoWindowOptions): Promise<void>;
    addInfoWindow(infoWindow: AdmInfoWindow): void;
    /**
     * Creates a Daum Maps event listener for the given InfoWindow as an Observable
     */
    createEventObservable<T>(eventName: string, infoWindow: AdmInfoWindow): Observable<T>;
}
