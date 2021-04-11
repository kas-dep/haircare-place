import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { DictData, DictResponse } from '../../model/common.model';
import { BehaviorSubject  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private coaDictSubject: BehaviorSubject<DictData[]>;
  private pcDictSubject: BehaviorSubject<DictData[]>;

  constructor(private http : HttpClient) {
    this.coaDictSubject = new BehaviorSubject<DictData[]>(JSON.parse(localStorage.getItem('coaDict')));
    this.pcDictSubject = new BehaviorSubject<DictData[]>(JSON.parse(localStorage.getItem('pcDict')));
  }

  private apiUrl = `${environment.apiUrl}`;


  fetchCoaDict() {
    return this.http.get(`${this.apiUrl}/coaDict`).pipe(
      map((resp: DictResponse) => {
        if(resp.result && resp.result.length){
          localStorage.setItem('coaDict', JSON.stringify(resp.result));
          this.coaDictSubject.next(resp.result);
        }
        return resp.result;
    })).toPromise();
  }

  public get coaDictData(): DictData[] {
    return this.coaDictSubject.value;
  }

  public async getCoaDict(): Promise<DictData[]> {
    if (this.coaDictData) {
      return this.coaDictData;
    }
    const coaDict$ = await this.fetchCoaDict();
    return coaDict$;
  }

  fetchPcDict(){
    return this.http.get(`${this.apiUrl}/pcDict`).pipe(
      map((resp: DictResponse) => {
        if(resp.result && resp.result.length){
          localStorage.setItem('pcDict', JSON.stringify(resp.result));
          this.pcDictSubject.next(resp.result);
        }
        return resp.result
      })).toPromise();
  }

  public get pcDictData(): DictData[] {
    return this.pcDictSubject.value;
  }

  public async getPcDict(): Promise<DictData[]> {
    if(this.pcDictData) {
      return this.pcDictData
    }
    const pcDict$ = await this.fetchPcDict();
    return pcDict$;
  }

}
