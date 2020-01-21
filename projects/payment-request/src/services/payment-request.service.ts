import {Inject, Injectable} from '@angular/core';
import {PAYMENT_METHODS} from '../tokens/payment-methods';
import {PAYMENT_OPTIONS} from '../tokens/payment-options';

@Injectable({
    providedIn: 'root',
})
export class PaymentRequestService {
    constructor(
        @Inject(PAYMENT_METHODS)
        private readonly paymentMethods: PaymentMethodData[],
        @Inject(PAYMENT_OPTIONS)
        private readonly paymentOptions: PaymentOptions,
    ) {}

    request(
        details: PaymentDetailsInit,
        methods: PaymentMethodData[] = this.paymentMethods,
        options: PaymentOptions = this.paymentOptions,
    ): Promise<PaymentResponse | null> {
        const gateway = new PaymentRequest(methods, details, options);

        return gateway.canMakePayment().then(canPay => {
            if (!canPay) {
                return Promise.resolve(null);
            }

            return gateway.show();
        });
    }
}
