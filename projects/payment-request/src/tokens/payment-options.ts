import {InjectionToken} from '@angular/core';

export const PAYMENT_OPTIONS = new InjectionToken<PaymentOptions>(
    'Allow request additional data from payer',
    {
        factory: () => ({}),
    },
);
