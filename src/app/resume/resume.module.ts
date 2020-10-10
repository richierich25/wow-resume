import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ResumeComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ResumeModule { }
