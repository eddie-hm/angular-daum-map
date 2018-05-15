var WindowRef = (function () {
    function WindowRef() {
    }
    WindowRef.prototype.getNativeWindow = function () { return window; };
    return WindowRef;
}());
export { WindowRef };
var DocumentRef = (function () {
    function DocumentRef() {
    }
    DocumentRef.prototype.getNativeDocument = function () { return document; };
    return DocumentRef;
}());
export { DocumentRef };
var Platform = (function () {
    function Platform() {
    }
    Platform.isMobile = function () {
        try {
            var userAgent = navigator.userAgent;
            if (userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null
                || userAgent.match(/LG|SAMSUNG|Samsung/) != null) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.error(err);
            return false;
        }
    };
    return Platform;
}());
export { Platform };
export var BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];
//# sourceMappingURL=browser-globals.js.map