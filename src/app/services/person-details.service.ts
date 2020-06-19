import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonDetailsService {
  isIdValid: boolean = false;

  constructor(private http: HttpClient) { }

  submitPersonDetails(personData): Observable<any> {
    return this.http.post(`${environment.serverAddress}/api/v1/register_user`, personData).pipe(
      tap((_) => {})
    );
  }

  retrieveAllRecords(): Observable<any> {
    return this.http.get(`${environment.serverAddress}/api/v1/get_all_users`).pipe(
      tap((_) => {})
    );
  }

  validateId(idNumber: string) {
    let newNumber = 0;
    let storeMultiplied;
    let addOdd: number = 0;
    let results: number;
    const storeId = [];
    const storeEven = [];
    let storeEvenLongNum = '';

    for (let t = 0; t < 13; t++) {
      storeId.push(idNumber.charAt(t));
      if (t % 2 !== 0) {
        storeEven.push(idNumber.charAt(t));
      }
    }
    // a) Add all the digits of the ID number in the odd positions (except for the last number, which is the control digit):
    // b) Take all the even digits as one number and multiply that by 2:
    // c) Add the digits of this number together (in b)
    // d) Add the answer of C to the answer of A
    // e) Subtract the second character from D from 10, this number should now equal the control character
    for (let i = 0; i < idNumber.length - 2; i++) {
      if ((i + 1) % 2 !== 0) {
        addOdd = (+storeId[i]) + addOdd;
      }
    }

    for (let i = storeEven.toString().split(',').length - 1; i >= 0; i--) {
      storeEvenLongNum = storeEven.toString().split(',')[i] + storeEvenLongNum;
    }
    storeMultiplied = +storeEvenLongNum * 2;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < storeMultiplied.toString().length; i++) {
      newNumber = +storeMultiplied.toString()[i] + newNumber;
    }
    newNumber = newNumber + addOdd;
    results = 10 - +newNumber.toString().substring(1);
    if (results.toString().length === 2) {
      console.log(results);
      this.isIdValid = +results.toString().substring(1) === +idNumber.substring(12);
      return;
    } else {
      console.log(results);
      this.isIdValid = results === +idNumber.substring(12);
    }
  }
}
