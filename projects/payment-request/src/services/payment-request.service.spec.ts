import {TestBed} from '@angular/core/testing';
import {PaymentRequestService} from './payment-request.service';

describe('Payment Request Service', () => {
    let service: PaymentRequestService;

    let canPay = false;
    let response = {} as PaymentResponse;

    class FakePaymentRequest {
        constructor(
            _methods?: PaymentMethodData[],
            _details?: PaymentDetailsInit,
            _options?: PaymentOptions,
        ) {}

        canMakePayment(): Promise<boolean> {
            return Promise.resolve(canPay);
        }

        show(): Promise<PaymentResponse> {
            return Promise.resolve(response);
        }
    }

    const paymentDetails = {
        total: {
            label: 'Matreshka',
            amount: {
                currency: 'RUB',
                value: '140',
            },
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PaymentRequestService],
        });

        canPay = false;
        response = {
            details: '',
            methodName: '',
            payerEmail: '',
            payerName: '',
            payerPhone: '',
            requestId: '',
            shippingAddress: null,
            shippingOption: '',
            complete: (_?: PaymentComplete) => Promise.resolve(),
            toJSON: () => '',
        };

        service = TestBed.get(PaymentRequestService);
    });

    it('cannot request and returns null if Payment Request is not supported', done => {
        (global as any).PaymentRequest = undefined;

        const promise = service.request(paymentDetails);

        promise.then(
            () => {},
            error => {
                expect(error).toBe('Payment Request is not supported in your browser');
                done();
            },
        );
    });

    it('returns null if Payment Request in cannot pay status', done => {
        (global as any).PaymentRequest = FakePaymentRequest;

        const promise = service.request(paymentDetails);

        promise.then(
            () => {},
            error => {
                expect(error).toBe('Payment Request cannot make the payment');
                done();
            },
        );
    });

    it('returns response if Payment Request in can pay status', done => {
        canPay = true;

        (global as any).PaymentRequest = FakePaymentRequest;

        const promise = service.request(paymentDetails);

        promise.then(result => {
            expect(result).toBe(response);
            done();
        });
    });
});
