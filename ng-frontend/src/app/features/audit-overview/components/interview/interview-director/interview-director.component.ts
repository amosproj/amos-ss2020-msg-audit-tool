import { Component, OnInit } from '@angular/core';
import { Subject, Observable, combineLatest, forkJoin } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { AppRouterState } from 'src/app/core/ngxs/app-router.state';
import { FacCrit } from 'src/app/core/data/models/faccrit.model';
import { Interview } from 'src/app/core/data/models/interview.model';
import { AuditState } from 'src/app/core/ngxs/audit.state';
import { InterviewState } from 'src/app/core/ngxs/interview.state';
import { CoreService } from 'src/app/core/http/core.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/core/data/models/answer.model';
import { Question } from 'src/app/core/data/models/question.model';
import { InterviewService } from 'src/app/core/http/interview.service';
import { UpdateInterview } from 'src/app/core/ngxs/actions/inteview.actions';

@Component({
  selector: 'app-interview-director',
  templateUrl: './interview-director.component.html',
  styleUrls: ['./interview-director.component.scss'],
})
export class InterviewDirectorComponent implements OnInit {
  @Select(AppRouterState.interviewId) interviewId$: Observable<number>;
  @Select(AppRouterState.facCritId) facCritId$: Observable<number>;

  facCrit$: Observable<FacCrit>;
  interview$: Observable<Interview>;

  goal$ = new Subject<string>();

  answers: Answer[];
  questions: Question[];
  interviewId: number;
  facCritIds: number[];

  constructor(
    private store: Store,
    private interviewService: InterviewService,
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private router: Router,
  ) {}

  ngOnInit() {
    combineLatest([this.interviewId$, this.facCritId$]).subscribe(ids => {
      this.interviewId = ids[0];
      this.interview$ = this.store.select(InterviewState.interview(ids[0])).pipe(
        tap(interview => {
          const questions$: Observable<Question>[] = [];
          this.answers = interview.answers.filter(a => a.faccritId === ids[1]);
          for (const answer of interview.answers) {
            questions$.push(this.interviewService.getQuestion(answer.questionId));
          }

          forkJoin(questions$).subscribe(questions => (this.questions = questions));
        }),
      );

      this.facCrit$ = this.store.select(AuditState.facCrit(ids[1]));

      this.coreService.getFacCritsByInterviewId(ids[0]).subscribe((facCrits: FacCrit[]) => {
        const result = (this.facCritIds = facCrits.map(f => f.id));
        this.facCritIds = this.getDistinctIds(result);
      });
    });

    // Dispatch UpdateInterview after 1000ms of last input event
    this.goal$.pipe(debounceTime(1000)).subscribe(goal => {
      this.store.dispatch(new UpdateInterview(this.interviewId, { goal }));
    });
  }

  onGoalInput(value: string) {
    this.goal$.next(value);
  }

  onNavigateForward(facCritId: number) {
    const indexOfFacCrit = this.facCritIds.indexOf(facCritId);

    if (indexOfFacCrit + 1 !== this.facCritIds.length) {
      this.router.navigate([String(this.facCritIds[indexOfFacCrit + 1])], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  onNaviagteBack(facCritId: number) {
    const indexOfFacCrit = this.facCritIds.indexOf(facCritId);

    if (indexOfFacCrit > 0) {
      this.router.navigate([String(this.facCritIds[indexOfFacCrit - 1])], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  getDistinctIds(ids: number[]) {
    const distinctIds: number[] = [];

    for (const id of ids) {
      if (!distinctIds.includes(id)) {
        distinctIds.push(id);
      }
    }

    return distinctIds;
  }

  getFacCritPosition(id: number) {
    const indexOfFacCrit = this.facCritIds.indexOf(id) + 1;
    return indexOfFacCrit + '/' + this.facCritIds.length;
  }
}