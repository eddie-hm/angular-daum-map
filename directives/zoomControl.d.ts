import { OnChanges, OnDestroy, OnInit, SimpleChange } from "@angular/core";
import { DaumMapsAPIWrapper } from "../services/daum-maps-api-wrapper";
import { ControlPosition } from "../services/daum-maps-types";
export declare class AdmZoomControl implements OnInit, OnDestroy, OnChanges {
    private _mapWrapper;
    position: ControlPosition;
    private zoomControl;
    constructor(_mapWrapper: DaumMapsAPIWrapper);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
