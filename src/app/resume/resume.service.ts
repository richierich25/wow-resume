import { Injectable } from '@angular/core';
import { Resume, Education, Skill, Experience } from './models/resume.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ResumeService {
  private _degrees: string[] = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];
  // tslint:disable-next-line: max-line-length
  private _resume = new Resume(
        null, 'Richard', 'St.Antonio Place, Delhi', 8877665544, 'richtest@gmail.com', 'NA', 'No Other details',
        [new Experience('Cognizant', 'Developer', 'Solutions Architect', 'july', 10),
        new Experience('MPhasis', 'Developer', 'Architect', 'march', 5)],
        [new Education('M.E.', 'St.Thomas', '2004', 98),
        new Education('B.E.', 'St.Judas', '2002', 78)],
        [new Skill('Communication'),
        new Skill('Team Player'),
        new Skill('Fast-Learner'),
        new Skill('Motivated')]
  );

  resumeSub = new BehaviorSubject<Resume>(new Resume());

  constructor() { }

  get degrees(): string[] {
    return this._degrees.slice();
  }
  get resume(): Resume {
    const resume: Resume = this._resume;
    return resume;
  }
  getBase64(file, resume: Resume): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const updatedResume: Resume = {...resume};
      updatedResume.profilePic = (reader.result as string);
      this.resumeSub.next(updatedResume);
    };
    reader.onerror = (error) => {
      console.log('File could not be read! Code: ', error);
    };
  }
}
