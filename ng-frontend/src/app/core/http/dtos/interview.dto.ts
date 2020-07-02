import { InterviewStatus } from '../../data/models/interview.model';
import { Answer } from '../../data/models/answer.model';
import { ContactPerson } from '../../data/models/contact-person.model';

export interface InterviewDto {
  interviewId?: number;
  auditId: number;
  startDate: string;
  endDate: string;
  goal: string;
  status: InterviewStatus;
  answers: Answer[];
  interviewedContactPersons: ContactPerson[];
}
