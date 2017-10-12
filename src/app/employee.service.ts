import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';

import { data } from './data';

export class ImResultNonRetractable
{   
    /*
    Constructor
    */
    constructor()
    {
        this.observable = new Subject< string >();
    }

    /*
    Members.
    */
    public observable: Subject< string >;
}

export class TestClass
{
    public testVariable: string = "";
    constructor()
    {
        this.testVariable = "Sathish";
    }
}

@Injectable()
export class EmployeeService 
{
    private _url:string ="database/data.json";
    private sub:Subject<any>;
    private testResult:ImResultNonRetractable=new ImResultNonRetractable();
    private counter: number;
    constructor(private _http:Http)
    {

    }

    getEmployees():Observable<data[]>
    {
        return this._http.get("src/database/data.json")
            .map(
                (response:Response) => <data[]> response.json()
                );
    }

    addData(id,name):Observable<data>
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post("src/database/data.json", { id,name }, options)
                    .map((response:Response) => <data> response.json());
    }

    testing( funcNo:number, count:number ):ImResultNonRetractable
    {
        // let result: ImResultNonRetractable = new ImResultNonRetractable();
        this.testResult.observable.next( "funcNo is " + funcNo.toString() + "Value " + count.toString() );
        return this.testResult;
    }

    // getSubject():Observable<any>
    // {
    //     return this.sub.asObservable();
    // }

    // sendMessage(message:any)
    // {
    //     this.sub.next(message);
    // }

    Temp(count:number)
    {
        this.counter = count;
        this.testResult.observable.next( "funcNo is " + "Value " + count.toString() );
        // this.testResult.observable.next( "Value" + count.toString() );
    }
}
