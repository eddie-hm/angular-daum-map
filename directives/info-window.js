import { Component, ElementRef, EventEmitter } from '@angular/core';
import { InfoWindowManager } from '../services/managers/info-window-manager';
var infoWindowId = 0;
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
var AdmInfoWindow = (function () {
    function AdmInfoWindow(_infoWindowManager, _el) {
        this._infoWindowManager = _infoWindowManager;
        this._el = _el;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new EventEmitter();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    AdmInfoWindow.prototype.ngOnInit = function () {
        this.content = this._el.nativeElement.querySelector('.adm-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
        this._registerEventListeners();
    };
    /** @internal */
    AdmInfoWindow.prototype.ngOnChanges = function (changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoWindowManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoWindowManager.setZIndex(this);
        }
        if (changes['isOpen']) {
            this._updateOpenState();
        }
        if (changes['removable']) {
            this._infoWindowManager.setRemovable(this);
        }
        this._setInfoWindowOptions(changes);
    };
    AdmInfoWindow.prototype._registerEventListeners = function () {
        var _this = this;
        this._infoWindowManager.createEventObservable('closeclick', this).subscribe(function () {
            _this.isOpen = false;
            _this.infoWindowClose.emit();
        });
    };
    AdmInfoWindow.prototype._updateOpenState = function () {
        this.isOpen ? this.open() : this.close();
    };
    AdmInfoWindow.prototype._setInfoWindowOptions = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AdmInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    };
    /**
     * Opens the info window.
     */
    AdmInfoWindow.prototype.open = function () { return this._infoWindowManager.open(this); };
    /**
     * Closes the info window.
     */
    AdmInfoWindow.prototype.close = function () {
        var _this = this;
        return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(); });
    };
    /** @internal */
    AdmInfoWindow.prototype.id = function () { return this._id; };
    /** @internal */
    AdmInfoWindow.prototype.toString = function () { return 'admInfoWindow-' + this._id.toString(); };
    /** @internal */
    AdmInfoWindow.prototype.ngOnDestroy = function () { this._infoWindowManager.deleteInfoWindow(this); };
    return AdmInfoWindow;
}());
export { AdmInfoWindow };
AdmInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
AdmInfoWindow.decorators = [
    { type: Component, args: [{
                selector: 'adm-info-window',
                inputs: ['latitude', 'longitude', 'disableAutoPan', 'position', 'removable', 'zIndex', 'isOpen'],
                outputs: ['infoWindowClose'],
                template: "<div class='adm-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
            },] },
];
/** @nocollapse */
AdmInfoWindow.ctorParameters = function () { return [
    { type: InfoWindowManager, },
    { type: ElementRef, },
]; };
//# sourceMappingURL=info-window.js.map
