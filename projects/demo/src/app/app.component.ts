import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PAYMENT_METHODS} from '@ng-web-apis/payment-request';
import {DIRECTIVES_SAMPLE} from './samples/directives.sample';
import {SERVICE_SAMPLE} from './samples/service.sample';

@Component({
    selector: 'main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: PAYMENT_METHODS,
            useValue: [
                {
                    // Apple Pay sample will start in Safari
                    supportedMethods: 'https://apple.com/apple-pay',
                    data: {
                        version: 3,
                        merchantIdentifier: 'merchant.com.example',
                        merchantCapabilities: [
                            'supports3DS',
                            'supportsCredit',
                            'supportsDebit',
                        ],
                        supportedNetworks: ['amex', 'discover', 'masterCard', 'visa'],
                        countryCode: 'US',
                    },
                },
                {supportedMethods: 'basic-card'},
            ],
        },
    ],
})
export class AppComponent {
    readonly samples = {
        service: SERVICE_SAMPLE,
        directives: DIRECTIVES_SAMPLE,
    };
}
