import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

import { GeneratorRequestService, GENERATOR_TYPES } from './services/generator-request.service';
import { GeneratorType } from './models/generator-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  generatorTypes: GeneratorType[];
  generateFiles = true;
  generatorType: string;
  generationSuccess = false;

  apiUrl = '/api/';

  constructor(private http: Http, private generatorRequestService: GeneratorRequestService) {
    this.generatorTypes = GENERATOR_TYPES;

    if (!environment.production) {
      this.apiUrl = 'http://localhost:3000/api/';
    }
  }

  generate() {
    this.generationSuccess = false;
    const url = this.apiUrl + 'test';

    const params = {
        generatorType: this.generatorType,
        generateFiles: this.generateFiles
      };

    this.generatorRequestService.generate(url, params).then(x => {
      this.generationSuccess = true;
    })
  }
}
