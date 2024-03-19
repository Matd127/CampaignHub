import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private balance: number = localStorage?.getItem('balance') !== null ? Number(localStorage.getItem('balance')) : 1000;

  
  private balanceSubject = new BehaviorSubject<number>(this.balance);
  balance$ = this.balanceSubject.asObservable();

  getBalance(): number {
    return this.balanceSubject.value;
  }

  updateBalance(amount: number): void {
    const currentBalance = this.balanceSubject.value;
    const newBalance = currentBalance - amount;
    localStorage.setItem('balance', newBalance.toString());
    this.balanceSubject.next(newBalance);
  }
}
