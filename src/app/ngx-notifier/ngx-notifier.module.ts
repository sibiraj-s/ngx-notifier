import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxNotifierComponent } from './ngx-notifier.component';
import { NgxNotifierService } from './services/ngx-notifier.service';
import { NgxNotifierSubscriberService } from './services/subscriber/ngx-notifier-subscriber.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxNotifierComponent],
  providers: [NgxNotifierService, NgxNotifierSubscriberService],
  exports: [NgxNotifierComponent]
})

export class NgxNotifierModule { }
