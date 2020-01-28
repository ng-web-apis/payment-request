import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DIRECTIVES_SAMPLE} from './samples/directives.sample';
import {SERVICE_SAMPLE} from './samples/service.sample';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    readonly samples = {
        service: SERVICE_SAMPLE,
        directives: DIRECTIVES_SAMPLE,
    };
}
