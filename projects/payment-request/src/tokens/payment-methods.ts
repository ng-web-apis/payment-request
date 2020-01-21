import {InjectionToken} from '@angular/core';

export const PAYMENT_METHODS = new InjectionToken<PaymentMethodData[]>(
    'The methods are used by Request Payment API',
    {
        factory: () => [{supportedMethods: 'basic-card'}],
    },
);
