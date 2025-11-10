import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private accessCount: number = 0;

  increment(): void {
    this.accessCount++;
  }

  getCount(): number {
    return this.accessCount;
  }

  canAccess(): boolean {
    return this.accessCount < 20;
  }
}

