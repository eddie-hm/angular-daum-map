import { InjectionToken } from '@angular/core';
import { DocumentRef, WindowRef } from '../../utils/browser-globals';
import { MapsAPILoader } from './maps-api-loader';
export declare enum DaumMapsScriptProtocol {
    HTTP = 1,
    HTTPS = 2,
    AUTO = 3,
}
/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type
 * {@link LazyMapsAPILoaderConfig}.
 */
export declare const LAZY_MAPS_API_CONFIG: InjectionToken<{}>;
/**
 * Configuration for the {@link LazyMapsAPILoader}.
 */
export interface LazyMapsAPILoaderConfigLiteral {
    /**
     * 발급받은 DaumMap Api Key
     */
    apiKey?: string;
    /**
     * v3 스크립트를 동적으로 로드하기위해 사용한다.
     * 스크립트의 로딩이 끝나기 전에 v3의 객체에 접근하려고 하면 에러가 발생하기 때문에
     * 로딩이 끝나는 시점에 콜백을 통해 객체에 접근할 수 있도록 해 준다.
     * 비동기 통신으로 페이지에 v3를 동적으로 삽입할 경우에 주로 사용된다.
     * v3 로딩 스크립트 주소에 파라메터로 autoload=false 를 지정해 주어야 한다.
     */
    autoload?: boolean;
    /**
     * The Daum Maps client ID (for premium plans).
     * When you have a Daum Maps APIs Premium Plan license, you must authenticate
     * your application with either an API key or a client ID.
     * The Daum Maps API will fail to load if both a client ID and an API key are included.
     */
    clientId?: string;
    /**
     * The Daum Maps channel name (for premium plans).
     * A channel parameter is an optional parameter that allows you to track usage under your client
     * ID by assigning a distinct channel to each of your applications.
     */
    channel?: string;
    /**
     * Daum Maps API version.
     */
    apiVersion?: string;
    /**
     * Host and Path used for the `<script>` tag.
     */
    hostAndPath?: string;
    /**
     * Protocol used for the `<script>` tag.
     */
    protocol?: DaumMapsScriptProtocol;
    /**
     * Defines which Daum Maps libraries should get loaded.
     */
    libraries?: string[];
    /**
     * The default bias for the map behavior is US.
     * If you wish to alter your application to serve different map tiles or bias the
     * application, you can overwrite the default behavior (US) by defining a `region`.
     * See https://developers.Daum.com/maps/documentation/javascript/basics#Region
     */
    region?: string;
    /**
     * The Daum Maps API uses the browser's preferred language when displaying
     * textual information. If you wish to overwrite this behavior and force the API
     * to use a given language, you can use this setting.
     * See https://developers.Daum.com/maps/documentation/javascript/basics#Language
     */
    language?: string;
}
export declare class LazyMapsAPILoader extends MapsAPILoader {
    private _scriptLoadingPromise;
    private _config;
    private _windowRef;
    private _documentRef;
    constructor(config: LazyMapsAPILoaderConfigLiteral, w: WindowRef, d: DocumentRef);
    load(): Promise<void>;
    private _getScriptSrc(callbackName);
}
