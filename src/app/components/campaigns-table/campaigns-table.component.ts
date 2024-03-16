import { Component } from '@angular/core';

@Component({
  selector: 'app-campaigns-table',
  standalone: true,
  imports: [],
  templateUrl: './campaigns-table.component.html',
  styleUrl: './campaigns-table.component.scss',
})
export class CampaignsTableComponent {
  onClick(param: string) {
    console.log(param);
  }
}
