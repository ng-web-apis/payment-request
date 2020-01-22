import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PaymentRequestService} from '@ng-web-apis/payment-request';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(private readonly paymentRequest: PaymentRequestService) {}

    pay() {
        this.paymentRequest
            .request({
                total: {
                    label: 'Matreshka',
                    amount: {
                        currency: 'RUB',
                        value: '140',
                    },
                },
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
}
