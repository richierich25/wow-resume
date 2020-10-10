import { Component, OnInit, OnDestroy } from '@angular/core';
import { Resume, Experience, Education, Skill } from './models/resume.model';
import { ResumeService } from './resume.service';
import { Subscription } from 'rxjs';
import { GeneratePdfService } from '../shared/generate-pdf.service';
import { ScriptService } from '../shared/script.service';

declare let pdfMake: any;

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent implements OnInit, OnDestroy {
  resume: Resume;
  degrees: string[];
  resumeChangeSub: Subscription;

  constructor(
    private scriptService: ScriptService,
    private resumeService: ResumeService,
    private generatePdfService: GeneratePdfService
  ) {}

  ngOnInit(): void {
    this.degrees = this.resumeService.degrees;
    this.resumeChangeSub = this.resumeService.resumeSub.subscribe((resume) => {
      this.resume = resume;
    });
    // loading scripts for PDF report generation support
    this.scriptService.load('pdfMake', 'vfsFonts');
  }
  setDummyValues(): void {
    sessionStorage.setItem('resume', JSON.stringify(this.resumeService.resume));
    this.resume = this.resumeService.resume;
  }
  addExperience(): void {
    this.resume.experiences.push(new Experience());
  }
  addEducation(): void {
    this.resume.educations.push(new Education());
  }
  addSkill(): void {
    this.resume.skills.push(new Skill());
  }
  resetForm(): void {
    this.resume = new Resume();
    sessionStorage.removeItem('resume');
  }
  // for handling the pic uploaded
  fileChanged(event): void {
    const file = event.target.files[0];
    this.resumeService.getBase64(file, this.resume);
  }

  // default argument for action parameter
  generatePdf(action = 'open'): void {
    this.generatePdfService.generatePdf(action, this.resume);
  }

  ngOnDestroy(): void {
    if (this.resumeChangeSub) {
      this.resumeChangeSub.unsubscribe();
    }
  }
}
