import { Observable, Subject } from 'rxjs';

export class StorageService {

  private storageSub= new Subject<any>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key, data) {
    localStorage.setItem(key, data);
    const value = localStorage.getItem(key);
    this.storageSub.next(value);
  }

   updateItem(key, property, value) {
    var obj = JSON.parse(localStorage.getItem(key));
    obj[property] = value;
    localStorage.setItem(key, JSON.stringify(obj));
    const data = localStorage.getItem(key);
    this.storageSub.next(data);
  }
}
