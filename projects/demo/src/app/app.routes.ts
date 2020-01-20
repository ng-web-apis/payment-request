import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '**',
                component: AppComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
