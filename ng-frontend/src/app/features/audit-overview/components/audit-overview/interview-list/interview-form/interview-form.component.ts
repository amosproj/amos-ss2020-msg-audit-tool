import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Interview, InterviewStatus } from 'src/app/core/data/models/interview.model';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { Factor } from 'src/app/core/data/models/factor.model';
import { NbDialogService } from '@nebular/theme';
import { ConfirmDiscardDialogComponent } from 'src/app/shared/components/dialogs/confirm-discard-dialog/confirm-discard-dialog.component';

@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.scss'],
})
export class InterviewFormComponent implements OnInit {
  @Input() interview: Interview;
  @Input() scope: Factor[];
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancelled = new EventEmitter<any>();
  interviewForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogService: NbDialogService) {}

  get persons(): FormArray {
    return this.interviewForm.get('persons') as FormArray;
  }

  get start() {
    return this.interviewForm.get('start');
  }

  get end() {
    return this.interviewForm.get('end');
  }

  get factorTitle() {
    return this.interviewForm.get('factorTitle');
  }

  get criteria() {
    return this.interviewForm.get('criteria');
  }

  ngOnInit() {
    this.interviewForm = this.fb.group(
      {
        start: [this.interview?.start ?? new Date()],
        end: [this.interview?.end],
        persons: this.fb.array([
          this.fb.group({
            role: new FormControl(null),
            contactInformation: new FormControl(null),
          }),
        ]),
        criteria: [this.interview?.criteria, Validators.required],
        factorTitle: [null],
      },
      { validator: this.dateRangeValidator('start', 'end') },
    );
  }

  /**
   * Appends a new formgroup to the persons form array
   */
  onAddPerson() {
    this.persons.push(
      this.fb.group({
        role: new FormControl(null),
        contactInformation: new FormControl(null),
      }),
    );
  }

  /**
   * Removes the last formgroup from the persons form array
   */
  onRemovePerson() {
    this.persons.removeAt(this.persons.length - 1);
  }

  parseDate(s: string) {
    return s ? new Date(s).getTime() : undefined;
  }

  dateRangeValidator(startDate: string, endDate: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let start = group.get(startDate).value;
      let end = group.get(endDate).value;
      if (!start || !end) {
        return null;
      }
      if (start > end) {
        return {
          dateRangeValidator: true,
        };
      }
    };
  }

  onSubmit() {
    const interview: Interview = {
      start: this.parseDate(this.start.value),
      end: this.parseDate(this.end.value),
      persons: this.persons.controls.map((x: FormGroup) => {
        return { information: x.controls.contactInformation.value, role: x.controls.role.value };
      }),
      criteria: this.criteria.value,
      factorTitle: this.factorTitle.value,
      status: InterviewStatus.InAction,
    };

    this.formSubmitted.emit(interview);
  }

  onCancel() {
    if (this.interviewForm.dirty && this.interviewForm.touched) {
      const confirmDiscardComponentRef = this.dialogService.open(ConfirmDiscardDialogComponent, {
        autoFocus: false,
        closeOnBackdropClick: false,
      });

      confirmDiscardComponentRef.componentRef.instance.onDiscardConfirm.subscribe(
        (cancelConfirmed: boolean) => {
          if (cancelConfirmed) {
            this.formCancelled.emit();
          }
        },
      );
    } else {
      this.formCancelled.emit();
    }
  }
}
