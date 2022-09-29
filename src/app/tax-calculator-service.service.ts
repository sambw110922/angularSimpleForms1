import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TaxCalculatorServiceService {

  constructor() { }

  //  Finds the tax band
  FindTaxBand(grossAnnual){

    //  The tax rate to deduct
    var taxRate = 0;

    //  0 is the maximum, 1 is the rate
    var personalAllowance = [12570, 0];
    var basicRate = [50270, 20];
    var higherRate = [150000, 40];

    //  Since there is no maximum for this rate, 0 is the minimum
    var additionalRate = [15000, 45];

    //  Check for personal allowance
    if(grossAnnual < personalAllowance[0]){

      taxRate = personalAllowance[1];

    } else {

      //  Check for basic rate
      if(grossAnnual > personalAllowance[0] && grossAnnual < basicRate[0]){
        
        taxRate = basicRate[1];
      
      } else {

        //  Check for higher rate
        if(grossAnnual > basicRate[0] && grossAnnual < higherRate[0]){
          
          taxRate = higherRate[1];
        
        } else {

          //  Chck for additional rate
          if(grossAnnual > additionalRate[0]){
            
            taxRate = additionalRate[1];
          
          }

        }

      }

    }

    return taxRate;

  }

  //  Do the math
  CalculatePercentage(grossAnnual, taxRate) {

    var theMath = (taxRate / grossAnnual) * 100;

    return theMath;

  }


  //  This makes the dax deductions from the annual gross.
  DeductTax(grossAnnual) {

    var taxRate = this.FindTaxBand(grossAnnual);

    var annualDeduction = this.CalculatePercentage(grossAnnual, taxRate);
    var netAnnual = grossAnnual - annualDeduction;

    var grossMonthly = grossAnnual / 12;
    var monthlyDeduction = this.CalculatePercentage(grossMonthly, taxRate);
    var netMonthly = grossMonthly - monthlyDeduction;

    //  Return the results
    var calculationResults = {
      "grossAnnual":grossAnnual,
      "netAnnual": netAnnual,
      "grossMonthly": grossMonthly,
      "netMonthly": netMonthly,
      "taxRate": taxRate
    };

    return calculationResults;

  }

}
