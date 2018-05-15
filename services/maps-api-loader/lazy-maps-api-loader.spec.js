import { TestBed, inject } from '@angular/core/testing';
import { DocumentRef, WindowRef } from '../../utils/browser-globals';
import { DaumMapsScriptProtocol, LAZY_MAPS_API_CONFIG, LazyMapsAPILoader } from './lazy-maps-api-loader';
import { MapsAPILoader } from './maps-api-loader';
describe('Service: LazyMapsAPILoader', function () {
    var documentRef;
    var doc;
    var windowRef;
    beforeEach(function () {
        doc = jasmine.createSpyObj('Document', ['createElement']);
        documentRef = jasmine.createSpyObj('Document', ['getNativeDocument']);
        documentRef.getNativeDocument.and.returnValue(doc);
        windowRef = {};
    });
    it('should create the default script URL', function () {
        TestBed.configureTestingModule({
            providers: [
                { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: WindowRef, useValue: windowRef }, { provide: DocumentRef, useValue: documentRef }
            ]
        });
        inject([MapsAPILoader], function (loader) {
            var scriptElem = {};
            doc.createElement.and.returnValue(scriptElem);
            doc.body = jasmine.createSpyObj('body', ['appendChild']);
            loader.load();
            expect(doc.createElement).toHaveBeenCalled();
            expect(scriptElem.type).toEqual('text/javascript');
            expect(scriptElem.async).toEqual(true);
            expect(scriptElem.defer).toEqual(true);
            expect(scriptElem.src).toBeDefined();
            expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
        });
    });
    it('should load the script via http when provided', function () {
        var lazyLoadingConf = { protocol: DaumMapsScriptProtocol.HTTP };
        TestBed.configureTestingModule({
            providers: [
                { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: WindowRef, useValue: windowRef }, { provide: DocumentRef, useValue: documentRef },
                { provide: LAZY_MAPS_API_CONFIG, useValue: lazyLoadingConf }
            ]
        });
        inject([MapsAPILoader], function (loader) {
            var scriptElem = {};
            doc.createElement.and.returnValue(scriptElem);
            doc.body = jasmine.createSpyObj('body', ['appendChild']);
            loader.load();
            expect(doc.createElement).toHaveBeenCalled();
            expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
        });
    });
});
//# sourceMappingURL=lazy-maps-api-loader.spec.js.map