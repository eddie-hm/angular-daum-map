/**
 * When using the NoOpMapsAPILoader, the Daum Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Daum Maps API script gets loaded first on the page.
 */
var NoOpMapsAPILoader = (function () {
    function NoOpMapsAPILoader() {
    }
    NoOpMapsAPILoader.prototype.load = function () {
        if (!window.daum || !window.daum.maps) {
            throw new Error('Daum Maps API not loaded on page. Make sure window.daum.maps is available!');
        }
        return Promise.resolve();
    };
    ;
    return NoOpMapsAPILoader;
}());
export { NoOpMapsAPILoader };
//# sourceMappingURL=noop-maps-api-loader.js.map