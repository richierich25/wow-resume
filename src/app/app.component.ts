import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WOW-RESUME';
  faGithub = faGithub;
  faSpinner = faSpinner;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { // Adding the code to provide SVG icon to the HTML View
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/thumb_up-24px.svg'));
  }
}
