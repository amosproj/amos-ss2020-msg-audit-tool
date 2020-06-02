import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditOverviewRoutingModule } from './audit-overview-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuditOverviewComponent } from './components/audit-overview/audit-overview.component';
import { InterviewCardComponent } from './components/audit-overview/interview-list/interview-card/interview-card.component';
import { NewInterviewDialogComponent } from './components/audit-overview/interview-list/new-interview-dialog/new-interview-dialog.component';
import { InterviewFormComponent } from './components/audit-overview/interview-list/interview-form/interview-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InterviewListComponent } from './components/audit-overview/interview-list/interview-list.component';
import { FilterInterviewsPipe } from './components/audit-overview/interview-list/filter-interviews.pipe';
import { AuditInfoComponent } from './components/audit-overview/audit-info/audit-info.component';

@NgModule({
  declarations: [
    AuditOverviewComponent,
    InterviewCardComponent,
    AuditInfoComponent,
    NewInterviewDialogComponent,
    InterviewFormComponent,
    InterviewListComponent,
    FilterInterviewsPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, AuditOverviewRoutingModule, SharedModule],
})
export class AuditOverviewModule {}