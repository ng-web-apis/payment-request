import {Directive, ElementRef, Inject, Output} from '@angular/core';
import {from, fromEvent, Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';
import {PaymentRequestService} from '../../services/payment-request.service';
import {PAYMENT_METHODS} from '../../tokens/payment-methods';
import {PAYMENT_OPTIONS} from '../../tokens/payment-options';
import {isPaymentResponse} from '../../utils/isPaymentResponse';
import {PaymentDirective} from '../payment/payment.directive';

@Directive({
    selector: '[waPaymentSubmit]',
})
export class PaymentSubmitDirective {
    @Output()
    waPaymentSubmit: Observable<PaymentResponse>;

    @Output()
    waPaymentError: Observable<string>;

    constructor(
        @Inject(PaymentDirective) paymentHost: PaymentDetailsInit,
        @Inject(PaymentRequestService) paymentRequest: PaymentRequestService,
        @Inject(ElementRef) elementRef: ElementRef,
        @Inject(PAYMENT_METHODS) methods: PaymentMethodData[],
        @Inject(PAYMENT_OPTIONS) options: PaymentOptions,
    ) {
        const requests$ = fromEvent(elementRef.nativeElement, 'click').pipe(
            switchMap(() =>
                from(paymentRequest.request({...paymentHost}, methods, options)).pipe(
                    catchError(error => of(error)),
                ),
            ),
        );

        this.waPaymentSubmit = requests$.pipe(
            filter(response => isPaymentResponse(response)),
        );

        this.waPaymentError = requests$.pipe(
            filter(response => !isPaymentResponse(response)),
        );
    }
}
