import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { HttpClientModule } from  '@angular/common/http';
import { NgbAccordionModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { FormsModule } from '@angular/forms'
import { CharacterItemComponent } from './components/character-item/character-item.component';
import { SleepComponent } from './components/svg/sleep/sleep.component';
import { TableComponent } from './components/svg/table/table.component';
import { RunningComponent } from './components/svg/running/running.component';
import { CamerounDatePipe } from './pipes/cameroun-date.pipe';



@NgModule({
  declarations: [
    CharacterItemComponent,
    BannerComponent,
    TruncateTextPipe,
    SleepComponent,
    TableComponent,
    RunningComponent,
    CamerounDatePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    BannerComponent,
    NgbPaginationModule,
    TruncateTextPipe,
    NgbTooltipModule,
    NgbAccordionModule,
    FormsModule,
    CharacterItemComponent,
    TableComponent,
    SleepComponent,
    RunningComponent,
    CamerounDatePipe
  ]
})
export class SharedModule { }
