import {NgModule} from '@angular/core';

declare global {
    interface Window {
        PaymentRequest: PaymentRequest;
    }
}

@NgModule({
    declarations: [],
    exports: [],
})
export class PaymentRequestModule {}
