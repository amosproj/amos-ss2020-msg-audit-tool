import { NgModule } from '@angular/core';
import {
  NbThemeModule,
  NbLayoutModule,
  NbButtonModule,
  NbSelectModule,
  NbRadioModule,
  NbIconModule,
  NbSidebarModule,
  NbCardModule,
  NbInputModule,
  NbCheckboxModule,
  NbMenuModule,
  NbToastrModule,
  NbSpinnerModule,
  NbContextMenuModule,
  NbDialogModule,
  NbDatepickerModule,
  NbStepperModule,
  NbAccordionModule,
  NbTabsetModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [],
  imports: [
    NbThemeModule,
    NbLayoutModule,
    NbButtonModule,
    NbSelectModule,
    NbRadioModule,
    NbAccordionModule,
    NbCheckboxModule,
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSpinnerModule,
    NbStepperModule,
    NbInputModule,
    NbContextMenuModule,
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot(),
    NbDatepickerModule.forRoot(),
  ],
  exports: [
    NbThemeModule,
    NbLayoutModule,
    NbButtonModule,
    NbSelectModule,
    NbLayoutModule,
    NbStepperModule,
    NbRadioModule,
    NbAccordionModule,
    NbMenuModule,
    NbThemeModule,
    NbCardModule,
    NbIconModule,
    NbEvaIconsModule,
    NbDatepickerModule,
    NbContextMenuModule,
    NbSidebarModule,
    NbInputModule,
    NbCheckboxModule,
    NbDialogModule,
    NbAccordionModule,
    NbTabsetModule,
  ],
})
export class AppNebularModule {}
