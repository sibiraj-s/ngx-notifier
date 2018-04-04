# NgxNotifier

<p align="center">
  <a href="https://github.com/Sibiraj-S/ngx-notifier">
   <img src="https://raw.githubusercontent.com/Sibiraj-S/ngx-notifier/master/src/assets/angular.png" alt="angular" width="350">
  </a>
</p>
<p align="center">A Simple Notification Service for Angular 5+ Application</p>
<p align="center">
  <a href="https://travis-ci.org/Sibiraj-S/ngx-notifier">
    <img alt="Build Status" src="https://travis-ci.org/Sibiraj-S/ngx-notifier.svg?branch=master">
  </a>
  <a href="https://www.npmjs.com/package/ngx-notifier">
    <img alt="npm version" src="https://img.shields.io/npm/v/ngx-notifier.svg">
  </a>
  <a href="https://www.npmjs.com/package/ngx-notifier">
    <img alt="npm downloads" src="https://img.shields.io/npm/dm/ngx-notifier.svg">
  </a>
  <a href="https://github.com/Sibiraj-S/ngx-notifier/blob/master/LICENSE">
    <img alt="licence" src="https://img.shields.io/npm/l/ngx-notifier.svg">
  </a>
  <a href="https://github.com/Sibiraj-S/ngx-notifier/">
    <img alt="maintenance" src="https://img.shields.io/badge/maintained%20%3F-no-red.svg">
  </a>
</p>

## Getting Started

ngx-notifier is a simple notification service for Angular 5+ applications and is meant to be simple with limited features. Applications using bootstrap4 can make use of it to make simple toast notifications.

If you are looking for angularjs(1.x) version, Try [angularjs-toast][angularjs-toast]

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ngx-notifier --save
# or
yarn add ngx-notifier
```

### Usage

Import `ngx-notifier` module

```typescript
import { NgxNotifierModule } from 'ngx-notifier';

@NgModule({
  imports: [ NgxNotifierModule ]
})
```

Import [bootstrap-4][Bootstrap4] into your application, which is a must

Then in HTML

```html
<app-ngx-notifier></app-ngx-notifier>
```

To create notification

```ts
import { NgxNotifierService } from './ngx-notifier/services/ngx-notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})

export class AppComponent {
  constructor(private _ngxNotifierService: NgxNotifierService) { }

  createNotification(){
      this._ngxNotifierService.toast(message:string, style:string, duration: number)
  }

}
```

* **message** message to be sent as notification
* **style** notification style, which can be the following `primary|secondary|success|danger|warning|info|light|dark`. Default is `info`
* **duration** in milliseconds, timeout for the notification

### Notifier Component

Notifier component accepts

```html
<app-ngx-notifier [allowDuplicates]="true"
                  [className]="myCustomClassName"
                  [duration]="5000"
                  [dismissOnClick]="false"
                  [max]="5">
</app-ngx-notifier>
```

* **max:** maximum number of notifications to be displayed
* **allowDuplicates:** whether to allow duplicate messages in notifications
* **dismissOnClick:** dismiss notification on click
* **className** custom class for notifications
* **duration** time in milliseconds for dismissing notifications, default is 60s

### Demo

Demo at stackblitz [ngx-notifier](https://ngx-notifier.stackblitz.io)

### Documentation

Documentation is auto-generated using [compodoc][compodoc], and can be viewed here: [https://sibiraj-s.github.io/ngx-notifier/](https://sibiraj-s.github.io/ngx-notifier/)

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[github]: https://sibiraj-s.github.io/
[angularjs-toast]: https://github.com/Sibiraj-S/angularjs-toast
[wiki]: https://github.com/Sibiraj-S/ngx-notifier/wiki/ngx-notifier
[Bootstrap4]: https://github.com/twbs/bootstrap
[compodoc]: https://compodoc.github.io/website/
