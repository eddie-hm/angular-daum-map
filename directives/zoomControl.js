import { Directive, Input } from "@angular/core";
import { DaumMapsAPIWrapper } from "../services/daum-maps-api-wrapper";
import { ControlPosition } from "../services/daum-maps-types";
var AdmZoomControl = (function () {
    function AdmZoomControl(_mapWrapper) {
        this._mapWrapper = _mapWrapper;
        this.position = ControlPosition.TOP_RIGHT;
    }
    AdmZoomControl.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.position);
        this._mapWrapper.createZoomControl()
            .then(function (zoomControl) {
            _this.zoomControl = zoomControl;
            return _this._mapWrapper.addControl(_this.zoomControl, _this.position);
        })
            .then();
    };
    AdmZoomControl.prototype.ngOnDestroy = function () {
        this._mapWrapper
            .removeControl(this.zoomControl)
            .then();
    };
    AdmZoomControl.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['position']) {
            this._mapWrapper
                .removeControl(this.zoomControl)
                .then(this._mapWrapper.createZoomControl)
                .then(function (zoomControl) {
                _this.zoomControl = zoomControl;
                return _this._mapWrapper.addControl(_this.zoomControl, _this.position);
            })
                .then();
        }
    };
    return AdmZoomControl;
}());
export { AdmZoomControl };
AdmZoomControl.decorators = [
    { type: Directive, args: [{
                selector: 'adm-zoom-control'
            },] },
];
/** @nocollapse */
AdmZoomControl.ctorParameters = function () { return [
    { type: DaumMapsAPIWrapper, },
]; };
AdmZoomControl.propDecorators = {
    'position': [{ type: Input },],
};
//# sourceMappingURL=zoomControl.js.map