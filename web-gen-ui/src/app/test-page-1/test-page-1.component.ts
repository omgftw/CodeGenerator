import { Component, OnInit } from '@angular/core';

import { GeneratorRequestService } from '../services/generator-request.service';

import { environment } from '../../environments/environment';

import { settings } from '../../../../generator';

@Component({
  selector: 'app-test-page-1',
  templateUrl: './test-page-1.component.html',
  styleUrls: ['./test-page-1.component.css']
})
export class TestPage1Component implements OnInit {
  generationSuccess = false;
  displayText = '';
  textColor = '';
  backgroundColor = '';
  settings: any;

  apiUrl = settings.apiUrl;

  constructor(private generatorRequestService: GeneratorRequestService) {
    if (!environment.production) {
      this.apiUrl = settings.devApiUrl;
    }
    this.settings = settings;
  }

  ngOnInit() {
  }

  generate() {
    this.generationSuccess = false;
    const url = this.apiUrl + 'test-page-1';

    const params = {
      displayText: this.displayText,
      textColor: this.textColor,
      backgroundColor: this.backgroundColor
    };

    this.generatorRequestService.generate(url, params).then(x => {
      this.generationSuccess = true;
    })
  }

}
