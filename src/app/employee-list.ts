import { Component,OnInit,OnChanges } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ImResultNonRetractable, TestClass } from './employee.service';
import 'rxjs/add/operator/publish';
// import 'rxjs/add/operator/connect';

import { data } from './data';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.html'
})
export class EmployeeListComponent implements OnInit  
{
  private test:string="Nil";
  private test2:string="Nil";
  private test3:string="Nil";
  employees:data[];
  private tempSub:any;
  public counter: number = 0;
  public testclas: TestClass = new TestClass();
  constructor(private _employeeservice:EmployeeService)
  {
    console.log(this.testclas.testVariable);
  }

  ngOnInit()
  {
      let obs = this._employeeservice.getEmployees();
      let hot = obs.publish();
      obs.subscribe(resEmployeeData => this.employees=resEmployeeData);
      hot.connect();

      this._employeeservice.testing(1, this.counter).observable.subscribe(
        ( result: string ) =>
      {
        this.test=result;
      }
      );

      this._employeeservice.testing(2, this.counter).observable.subscribe(
            ( result: string ) =>
          {
            if( this.counter>5 )
              this.test2=result;
          }
          );

      //this._employeeservice.getSubject().subscribe(resSubject => this.tempSub=resSubject);
  }


  // sendmessage()
  // {
  //   this._employeeservice.sendMessage("Sathish Triad");
  //   console.log(this.tempSub);
  // }

  delete()
  {
    this.func03();
  }

  addData()
  {
    this._employeeservice.addData(101,"Microsoft").subscribe(hero  => this.employees.push(hero));
  }

  testing()
  {
    this.counter++;
    // this._employeeservice.Temp(this.counter);
  }

  func03()
  {
          this._employeeservice.testing(3, this.counter).observable.subscribe(
            ( result: string ) =>
          {
            if( this.counter>8 )
              this.test3=result;
          }
          );
  }  

}
