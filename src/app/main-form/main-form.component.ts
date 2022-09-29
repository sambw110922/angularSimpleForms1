import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { TaxCalculatorServiceService } from '../tax-calculator-service.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
  providers: [
    TaxCalculatorServiceService
  ]
})


export class MainFormComponent implements OnInit {

  taxFormCalculator: FormGroup;

  //  Before deductions and after deductions
  grossAnnual = 0;
  netAnnual = 0;

  grossMonthly = 0;
  netMonthly = 0;

  //  The tax rate 
  taxRate = 0;

  constructor() { }

  ngOnInit(): void {

    this.taxFormCalculator = new FormGroup({
      txtGrossAnnual: new FormControl()
    });

  }

  onSubmit(form:FormGroup){

    var tcs = new TaxCalculatorServiceService();

    /*
    var calculationResults = {
      "grossAnnual":grossAnnual,
      "netAnnual": netAnnual,
      "grossMonthly": grossMonthly,
      "netMonthly": netMonthly,
      "taxRate": taxRate
    };
    */
    
    var rawData = form.value.txtGrossAnnual;

    if(rawData != null){
      this.grossAnnual = Number.parseInt(rawData);
    }

    var resultsData = tcs.DeductTax(this.grossAnnual);

    this.grossAnnual = resultsData.grossAnnual;
    this.netAnnual = resultsData.netAnnual;
    this.grossMonthly = resultsData.grossMonthly;
    this.netMonthly = resultsData.netMonthly;
    this.taxRate = resultsData.taxRate;



  }

}
