import './polyfills';

import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppBrowserModule} from './app/app.browser.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(AppBrowserModule)
    .then(ref => {
        const windowRef: any = window;

        // Ensure Angular destroys itself on hot reloads for Stackblitz
        if (windowRef['ngRef']) {
            windowRef['ngRef'].destroy();
        }

        windowRef['ngRef'] = ref;
    })
    .catch(err => console.error(err));
