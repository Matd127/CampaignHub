import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BalanceService } from '../../../services/balance.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  title = 'CampaignHub';

  balance$!: Observable<number>;

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.balance$ = this.balanceService.balance$;
  }
}
