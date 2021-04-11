import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared-module/shared.module';
import { CoreModule } from './core-module/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginRegisterModule } from './login-register/login-register.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { HeadersInterceptor } from './auth/headers.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './common/CustomPaginatorConfig';
import { SpinnerComponent } from './shared-module/spinner/spinner.component';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [AppComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    FullCalendarModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    LoginRegisterModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
