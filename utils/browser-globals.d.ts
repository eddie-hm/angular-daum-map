import { Provider } from '@angular/core';
export declare class WindowRef {
    getNativeWindow(): any;
}
export declare class DocumentRef {
    getNativeDocument(): any;
}
export declare class Platform {
    static isMobile(): boolean;
}
export declare const BROWSER_GLOBALS_PROVIDERS: Provider[];
