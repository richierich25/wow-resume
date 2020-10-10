import { Injectable } from '@angular/core';
import { Resume, Education, Experience } from '../resume/models/resume.model';

declare let pdfMake: any; // making angular aware of the existence of pdfMake

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {

  constructor() { }

  generatePdf(action = 'open', resume: Resume): void {
    const documentDefinition = this.getDocumentDefinition(Object.assign({}, resume)); // create a new object for resume

    switch (action) {
      case 'print':
        pdfMake.createPdf(documentDefinition).print();
        break;
      case 'download':
        pdfMake.createPdf(documentDefinition).download();
        break;
      case 'open':
      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getDocumentDefinition(resume: Resume): any {
    sessionStorage.setItem('resume', JSON.stringify(resume));
    return {
      content: [
        {
          text: 'RESUME',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            [
              {
                text: resume.name,
                style: 'name',
              },
              {
                text: resume.address,
              },
              {
                text: 'Email : ' + resume.email,
              },
              {
                text: 'Contant No : ' + resume.contactNo,
              },
              {
                text: 'GitHub: ' + resume.socialProfile,
                link: resume.socialProfile,
                color: 'blue',
              },
            ],
            [this.getProfilePicObject(resume)],
          ],
        },
        {
          text: 'Skills',
          style: 'header',
        },
        {
          columns: [
            {
              ul: [
                ...resume.skills
                  .filter((value, index) => index % 3 === 0)
                  .map((s) => s.value),
              ],
            },
            {
              ul: [
                ...resume.skills
                  .filter((value, index) => index % 3 === 1)
                  .map((s) => s.value),
              ],
            },
            {
              ul: [
                ...resume.skills
                  .filter((value, index) => index % 3 === 2)
                  .map((s) => s.value),
              ],
            },
          ],
        },
        {
          text: 'Experience',
          style: 'header',
        },
        this.getExperienceObject(resume.experiences),

        {
          text: 'Education',
          style: 'header',
        },
        this.getEducationObject(resume.educations),
        {
          text: 'Other Details',
          style: 'header',
        },
        {
          text: resume.otherDetails,
        },
        {
          text: 'Signature',
          style: 'sign',
        },
        {
          columns: [
            {
              qr: resume.name + ', Contact No : ' + resume.contactNo,
              fit: 100,
            },
            {
              text: `(${resume.name})`,
              alignment: 'right',
            },
          ],
        },
      ],
      info: {
        title: resume.name + '_RESUME',
        author: resume.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline',
        },
        name: {
          fontSize: 16,
          bold: true,
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true,
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true,
        },
        tableHeader: {
          bold: true,
        },
      },
    };
  }

  getExperienceObject(experiences: Experience[]): any {
    const exs = [];

    experiences.forEach((experience) => {
      exs.push([
        {
          columns: [
            [
              {
                text: experience.jobTitle,
                style: 'jobTitle',
              },
              {
                text: experience.employer,
              },
              {
                text: experience.jobDescription,
              },
            ],
            {
              text: 'Experience : ' + experience.experience + ' Months',
              alignment: 'right',
            },
          ],
        },
      ]);
    });

    return {
      table: {
        widths: ['*'],
        body: [...exs],
      },
    };
  }

  getEducationObject(educations: Education[]): any {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [
            {
              text: 'Degree',
              style: 'tableHeader',
            },
            {
              text: 'College',
              style: 'tableHeader',
            },
            {
              text: 'Passing Year',
              style: 'tableHeader',
            },
            {
              text: 'Result',
              style: 'tableHeader',
            },
          ],
          ...educations.map((ed) => {
            return [ed.degree, ed.college, ed.passingYear, ed.percentage];
          }),
        ],
      },
    };
  }

  getProfilePicObject(resume: Resume): any {
    if (resume.profilePic) {
      return {
        image: resume.profilePic,
        width: 75,
        alignment: 'right',
      };
    }
    return null;
  }
}
