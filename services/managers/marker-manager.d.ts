import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdmMarker } from './../../directives/marker';
import { DaumMapsAPIWrapper } from '../daum-maps-api-wrapper';
import { Marker } from '../daum-maps-types';
export declare class MarkerManager {
    private _mapsWrapper;
    private _zone;
    private _markers;
    constructor(_mapsWrapper: DaumMapsAPIWrapper, _zone: NgZone);
    deleteMarker(marker: AdmMarker): Promise<void>;
    updateMarkerPosition(marker: AdmMarker): Promise<void>;
    updateTitle(marker: AdmMarker): Promise<void>;
    updateLabel(marker: AdmMarker): Promise<void>;
    updateDraggable(marker: AdmMarker): Promise<void>;
    updateIcon(marker: AdmMarker): Promise<void>;
    updateOpacity(marker: AdmMarker): Promise<void>;
    updateVisible(marker: AdmMarker): Promise<void>;
    updateZIndex(marker: AdmMarker): Promise<void>;
    addMarker(marker: AdmMarker): void;
    getNativeMarker(marker: AdmMarker): Promise<Marker>;
    createEventObservable<T>(eventName: string, marker: AdmMarker): Observable<void>;
}
