import { Component, OnInit } from '@angular/core';

import { GeneratorRequestService } from '../services/generator-request.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-test-page-1',
  templateUrl: './test-page-1.component.html',
  styleUrls: ['./test-page-1.component.css']
})
export class TestPage1Component implements OnInit {
  generationSuccess: boolean = false;
  displayText: string = '';
  textColor: string = '';
  backgroundColor: string = '';

  apiUrl: string = '/api/';

  constructor(private generatorRequestService: GeneratorRequestService) {
    if (!environment.production) {
      this.apiUrl = 'http://localhost:3000/api/';
    }
  }

  ngOnInit() {
  }

  generate() {
    this.generationSuccess = false;
    let url = this.apiUrl + 'test-page-1';

    let params = {
      displayText: this.displayText,
      textColor: this.textColor,
      backgroundColor: this.backgroundColor
    };

    this.generatorRequestService.generate(url, params).then(x => {
      this.generationSuccess = true;
    })
  }

}
