# NgxNotifier

<p align="center">
  <a href="https://github.com/sibiraj-s/ngx-notifier">
   <img src="./assets/angular.png" alt="angular" width="350">
  </a>
</p>
<p align="center">A Simple Notification Service for Angular Applications</p>
<p align="center">
  <a href="https://github.com/sibiraj-s/ngx-notifier/actions">
    <img alt="Tests Status" src="https://github.com/sibiraj-s/ngx-notifier/workflows/Tests/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/ngx-notifier">
    <img alt="npm version" src="https://img.shields.io/npm/v/ngx-notifier.svg">
  </a>
  <a href="https://www.npmjs.com/package/ngx-notifier">
    <img alt="npm downloads" src="https://img.shields.io/npm/dm/ngx-notifier.svg">
  </a>
  <a href="https://github.com/sibiraj-s/ngx-notifier/blob/master/LICENSE">
    <img alt="license" src="https://img.shields.io/npm/l/ngx-notifier.svg">
  </a>
</p>

## Getting Started

ngx-notifier is a simple notification service for Angular applications and is meant to be simple with limited features. Applications using bootstrap4 can make use of it to make simple toast notifications.

If you are looking for angularjs(1.x) version, Try [angularjs-toast][angularjs-toast]

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ngx-notifier --save
# or
yarn add ngx-notifier
```

### Usage

Import `NgxNotifierModule` and `BrowserAnimationsModule`

```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNotifierModule } from 'ngx-notifier';

@NgModule({
  imports: [ BrowserAnimationsModule, NgxNotifierModule ]
})
```

Import [bootstrap-4][Bootstrap4] into your application, which is a must

Then in HTML

```html
<ngx-notifier></ngx-notifier>
```

Then in TS

```typescript
import { NgxNotifierService } from './ngx-notifier/services/ngx-notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})

export class AppComponent {
  constructor(private ngxNotifierService: NgxNotifierService) { }

  createNotification(){
      this.ngxNotifierService.createToast(message:string, style:string, duration: number);
  }
}
```

#### Create a toast

```ts
this.ngxNotifierService.createToast(message:string, style:string, duration: number);
```

* **message** message to be sent as notification
* **style** notification style, which can be the following `primary|secondary|success|danger|warning|info|light|dark`. Default is `info`
* **duration** in milliseconds, timeout for the notification

#### Clear all toasts

```ts
this.ngxNotifierService.clear();
```

#### Clear the last toast

```ts
this.ngxNotifierService.clearLast();
```

### Notifier Component

Notifier component accepts

```html
<ngx-notifier [allowDuplicates]="true"
              [allowHTML]="false"
              [className]="myCustomClassName"
              [duration]="5000"
              [disableAnimations]="false"
              [dismissOnClick]="false"
              [insertOnTop]="true"
              [max]="5">
</ngx-notifier>
```

* **allowDuplicates:** whether to allow duplicate messages in notifications
* **allowHTML** whether to allow or display HTML as it is, HTML will be sanitized and any JS will be maked as unsafe.
* **className** custom class for notifications
* **disableAnimations** whether to enable or disable animations for the toast.
* **dismissOnClick:** dismiss notification on click
* **duration** time in milliseconds for dismissing notifications, default is 60s
* **insertOnTop** whether to insert notification on top or bottom
* **max:** maximum number of notifications to be displayed

### Demo

Demo at stackblitz [ngx-notifier](https://ngx-notifier.stackblitz.io)

### Documentation

Documentation is auto-generated using [compodoc][compodoc], and can be viewed here: [https://sibiraj-s.github.io/ngx-notifier/](https://sibiraj-s.github.io/ngx-notifier/)

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[angularjs-toast]: https://github.com/sibiraj-s/angularjs-toast
[wiki]: https://github.com/sibiraj-s/ngx-notifier/wiki/ngx-notifier
[Bootstrap4]: https://github.com/twbs/bootstrap
[compodoc]: https://compodoc.github.io/website/
