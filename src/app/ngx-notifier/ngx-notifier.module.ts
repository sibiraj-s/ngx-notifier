import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxNotifierComponent } from './ngx-notifier.component';
import { NgxNotifierService } from './services/ngx-notifier.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxNotifierComponent],
  providers: [NgxNotifierService],
  exports: [NgxNotifierComponent]
})

export class NgxNotifierModule { }
