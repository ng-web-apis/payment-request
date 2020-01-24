import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PAYMENT_METHODS} from '@ng-web-apis/payment-request';

const googlePaymentDataRequest = {
    environment: 'TEST',
    apiVersion: 2,
    apiVersionMinor: 0,
    merchantInfo: {
        // A merchant ID is available after approval by Google.
        // @see {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist}
        // merchantId: '0123456789',
        merchantName: 'Example Merchant',
    },
    allowedPaymentMethods: [
        {
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: [
                    'AMEX',
                    'DISCOVER',
                    'INTERAC',
                    'JCB',
                    'MASTERCARD',
                    'VISA',
                ],
            },
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                // Check with your payment gateway on the parameters to pass.
                // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
                parameters: {
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId',
                },
            },
        },
    ],
};

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: PAYMENT_METHODS,
            useValue: [
                {
                    supportedMethods: 'https://google.com/pay',
                    data: googlePaymentDataRequest,
                },
            ],
        },
    ],
})
export class AppComponent {
    readonly total: PaymentItem = {
        label: 'Total',
        amount: {
            currency: 'RUB',
            value: '140',
        },
    };

    readonly items: ReadonlyArray<PaymentItem> = [
        {
            label: 'Matreshka',
            amount: {
                currency: 'RUB',
                value: '40',
            },
        },
        {
            label: 'Balalaika',
            amount: {
                currency: 'RUB',
                value: '100',
            },
        },
    ];

    onPayment(response: PaymentResponse) {
        response.complete();
    }

    onPaymentError(error: string) {}
}
