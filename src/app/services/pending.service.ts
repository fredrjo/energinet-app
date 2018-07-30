import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  scanned: any = [];
  failed: any = [];
  simpleObservable;

  constructor(public http: HttpClient) {
    this.scanned = 0;
    this.failed = 0;
  }
  addPending(amount) {
    this.scanned = + amount;
  }
  addFailed(amount) {
    this.failed = + amount;
  }
  setPending(amount) {
    this.scanned = amount;
  }
  setFailed(amount) {
    this.failed = amount;
  }
  getPendning() {
    this.simpleObservable = new Observable((observer) => {
    setInterval(() => {
      observer.next({'scanned' : this.scanned, 'failed' : this.failed});
    }, 10000); });
    return this.simpleObservable;
  }
  clearPending() {
    this.scanned = 0;
  }
  clearFailed() {
    this.failed = 0;
  }
}
