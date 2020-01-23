import {Directive, Input} from '@angular/core';

@Directive({
    selector: '[waPaymentItem]',
})
export class PaymentItemDirective implements PaymentItem {
    @Input('paymentAmount')
    amount!: PaymentCurrencyAmount;

    @Input('paymentLabel')
    label!: string;

    @Input('paymentPending')
    pending?: boolean;
}
