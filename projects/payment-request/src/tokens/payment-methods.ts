import {InjectionToken} from '@angular/core';

export const PAYMENT_METHODS = new InjectionToken<ReadonlyArray<PaymentMethodData>>(
    'The methods are used by Request Payment API',
    {
        factory: () => [],
    },
);
