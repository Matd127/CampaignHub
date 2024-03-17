import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Campaign } from '../../../models/Campaign';
import { ReadCampaigns } from '../../../store/campaign.action';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-details-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.scss',
})
export class DetailsCardComponent {
  campaign!: Observable<Campaign>;

  constructor(private store: Store<any>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(new ReadCampaigns());
    this.campaign = this.store
      .select('campaigns')
      .pipe(
        map((campaigns) =>
          campaigns.find((campaign: Campaign) => campaign.id === 1)
        )
      );
  }
}
