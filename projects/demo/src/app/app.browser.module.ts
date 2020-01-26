import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {PaymentRequestModule} from '@ng-web-apis/payment-request';
import {HighlightLanguage, HighlightModule} from 'ngx-highlightjs';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes';
import {HeaderComponent} from './header/header.component';

import * as less from 'highlight.js/lib/languages/less';
import * as typescript from 'highlight.js/lib/languages/typescript';
import * as xml from 'highlight.js/lib/languages/xml';
import {ShopComponent} from './shop/shop.component';

export function hljsLanguages(): ReadonlyArray<HighlightLanguage> {
    return [
        {name: 'typescript', func: typescript},
        {name: 'less', func: less},
        {name: 'xml', func: xml},
    ];
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule.withServerTransition({appId: 'demo'}),
        AppRoutingModule,
        PaymentRequestModule,
        HighlightModule.forRoot({
            languages: hljsLanguages,
        }),
    ],
    declarations: [AppComponent, HeaderComponent, ShopComponent],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
})
export class AppBrowserModule {}
