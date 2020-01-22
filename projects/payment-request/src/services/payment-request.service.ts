import {Inject, Injectable} from '@angular/core';
import {WINDOW} from '@ng-web-apis/common';
import {PAYMENT_METHODS} from '../tokens/payment-methods';
import {PAYMENT_OPTIONS} from '../tokens/payment-options';

declare global {
    interface Window {
        PaymentRequest: PaymentRequest;
    }
}

@Injectable({
    providedIn: 'root',
})
export class PaymentRequestService {
    constructor(
        @Inject(WINDOW) private readonly windowRef: Window,
        @Inject(PAYMENT_METHODS)
        private readonly paymentMethods: PaymentMethodData[],
        @Inject(PAYMENT_OPTIONS)
        private readonly paymentOptions: PaymentOptions,
    ) {}

    request(
        details: PaymentDetailsInit,
        methods: PaymentMethodData[] = this.paymentMethods,
        options: PaymentOptions = this.paymentOptions,
    ): Promise<PaymentResponse> {
        if (!this.windowRef.PaymentRequest) {
            return Promise.reject('Payment Request is not supported in your browser');
        }

        const gateway = new PaymentRequest(methods, details, options);

        return gateway.canMakePayment().then(canPay => {
            if (canPay) {
                return Promise.reject('Payment Request cannot make the payment');
            }

            return gateway.show();
        });
    }
}
