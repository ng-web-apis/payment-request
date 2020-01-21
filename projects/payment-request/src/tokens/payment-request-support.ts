import {DOCUMENT} from '@angular/common';
import {inject, InjectionToken} from '@angular/core';

declare global {
    interface Window {
        PaymentRequest: PaymentRequest;
    }
}

export const PAYMENT_REQUEST_SUPPORT = new InjectionToken<boolean>(
    'Is Payment Request Api supported?',
    {
        factory: () => {
            const {defaultView} = inject(DOCUMENT);

            return defaultView !== null && !!defaultView.PaymentRequest;
        },
    },
);
