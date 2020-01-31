import {Directive, ElementRef, Inject, Output} from '@angular/core';
import {from, fromEvent, Observable, of} from 'rxjs';
import {catchError, filter, share, switchMap} from 'rxjs/operators';
import {PaymentRequestService} from '../../services/payment-request.service';
import {PAYMENT_METHODS} from '../../tokens/payment-methods';
import {PAYMENT_OPTIONS} from '../../tokens/payment-options';
import {isError} from '../../utils/isError';
import {PaymentDirective} from '../payment/payment.directive';

// @dynamic
@Directive({
    selector: '[waPaymentSubmit]',
})
export class PaymentSubmitDirective {
    @Output()
    waPaymentSubmit: Observable<PaymentResponse>;

    @Output()
    waPaymentError: Observable<Error | DOMException>;

    constructor(
        @Inject(PaymentDirective) paymentHost: PaymentDetailsInit,
        @Inject(PaymentRequestService) paymentRequest: PaymentRequestService,
        @Inject(ElementRef) {nativeElement}: ElementRef,
        @Inject(PAYMENT_METHODS) methods: PaymentMethodData[],
        @Inject(PAYMENT_OPTIONS) options: PaymentOptions,
    ) {
        const requests$ = fromEvent(nativeElement, 'click').pipe(
            switchMap(() =>
                from(paymentRequest.request({...paymentHost}, methods, options)).pipe(
                    catchError(error => of(error)),
                ),
            ),
            share(),
        );

        this.waPaymentSubmit = requests$.pipe(filter(response => !isError(response)));

        this.waPaymentError = requests$.pipe(filter(isError));
    }
}
