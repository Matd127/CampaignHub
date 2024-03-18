import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeleteCampaign, ReadCampaigns } from '../../../store/campaign.action';
import { Observable } from 'rxjs';
import { Campaign } from '../../../models/Campaign';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-campaigns-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campaigns-table.component.html',
  styleUrl: './campaigns-table.component.scss',
})
export class CampaignsTableComponent {
  campaigns!: Observable<Campaign[]>;
  deleteId!: number;
  confirmDelete = false;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(new ReadCampaigns());
    this.campaigns = this.store.select('campaigns');
  }

  deleteCampaign(id: number) {
    if (this.confirmDelete) {
      this.store.dispatch(new DeleteCampaign({ id }));
      this.confirmDelete = false;
    } else {
      this.confirmDelete = true;
      this.deleteId = id;
    }
  }
}
