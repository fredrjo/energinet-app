import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() {}

  makeReport (content) {
      return new Promise((resolve, reject) => {
         const chart = content[0].report.chart;
          resolve([chart]);
          reject(['']);
      });
  }
}
