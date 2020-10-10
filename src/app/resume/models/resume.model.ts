export class Experience {
  employer: string;
  jobTitle: string;
  jobDescription: string;
  startDate: string;
  experience: number;

  constructor(
    employer?: string,
    jobTitle?: string,
    jobDescription?: string,
    startDate?: string,
    experience?: number
  ) {
    this.employer = employer || null;
    this.jobTitle = jobTitle || null;
    this.jobDescription = jobDescription || null;
    this.startDate = startDate || null;
    this.experience = experience || null;
  }
}

export class Education {
  degree: string;
  college: string;
  passingYear: string;
  percentage: number;

  constructor(
    degree?: string,
    college?: string,
    passingYear?: string,
    percentage?: number
  ) {
    this.degree = degree || null;
    this.college = college || null;
    this.passingYear = passingYear || null;
    this.percentage = percentage || null;
  }
}

export class Skill {
  value: string;

  constructor(value?: string) {
    this.value = value || null;
  }
}

export class Resume {
  profilePic: string;
  name: string;
  address: string;
  contactNo: number;
  email: string;
  socialProfile: string;
  otherDetails: string;
  experiences: Experience[] = [];
  educations: Education[] = [];
  skills: Skill[] = [];

  constructor(
    profilePic?: string,
    name?: string,
    address?: string,
    contactNo?: number,
    email?: string,
    socialProfile?: string,
    otherDetails?: string,
    experiences?: Experience[],
    educations?: Education[],
    skills?: Skill[]
  ) {
    this.profilePic = profilePic || null;
    this.name = name || null;
    this.address = address || null;
    this.contactNo = contactNo || null;
    this.email = email || null;
    this.socialProfile = socialProfile || null;
    this.otherDetails = otherDetails || null;
    experiences && experiences.length > 0 ? this.experiences.push(...experiences) : this.experiences.push(new Experience());
    educations && educations.length > 0 ? this.educations.push(...educations) : this.educations.push(new Education());
    skills && skills.length > 0 ? this.skills.push(...skills) : this.skills.push(new Skill());
  }
}


// this.experiences.push(new Experience());
// this.educations.push(new Education());
// this.skills.push(new Skill());

// export class Experience {
//   employer: string;
//   jobTitle: string;
//   jobDescription: string;
//   startDate: string;
//   experience: number;
// }

// export class Education {
//   degree: string;
//   college: string;
//   passingYear: string;
//   percentage: number;
// }

// export class Skill {
//   value: string;
// }

// export class Resume {
//   profilePic: string;
//   name: string;
//   address: string;
//   contactNo: number;
//   email: string;
//   socialProfile: string;
//   experiences: Experience[] = [];
//   educations: Education[] = [];
//   otherDetails: string;
//   skills: Skill[] = [];

//   constructor() {
//     this.experiences.push(new Experience());
//     this.educations.push(new Education());
//     this.skills.push(new Skill());
//   }
// }


