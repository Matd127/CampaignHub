import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BalanceService } from '../../../services/balance.service';
import { Store } from '@ngrx/store';
import {
  CreateCampaign,
  EditCampaign,
  ReadCampaigns,
} from '../../../store/campaign.action';
import { TOWNS } from '../../../consts/towns';
import { KEYWORDS } from '../../../consts/keywords';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ButtonComponent } from '../../shared/button/button.component';
import { Campaign } from '../../../models/Campaign';
import { CampaignForm } from '../../../models/campaignForm';
@Component({
  selector: 'app-campaign-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatSliderModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './campaign-form.component.html',
  styleUrl: './campaign-form.component.scss',
})
export class CampaignFormComponent {
  towns: string[] = TOWNS;
  allkeywords: string[] = KEYWORDS;
  campaignForm: FormGroup = CampaignForm;
  campaignId: number | undefined;
  campaign!: Observable<Campaign>;
  keywords: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredkeywords: Observable<string[]> = of([]);
  announcer = inject(LiveAnnouncer);
  @ViewChild('keywordInput') keywordInput?: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private balanceService: BalanceService,
    private _snackBar: MatSnackBar
  ) {
    const keywordsControl = this.campaignForm.get('keywords');

    if (keywordsControl) {
      this.filteredkeywords = keywordsControl.valueChanges.pipe(
        startWith(null),
        map((keyword: string | null) =>
          keyword ? this.filter(keyword) : this.allkeywords.slice()
        )
      );
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.campaignId = +params['id'];
      this.store.dispatch(new ReadCampaigns());
      this.campaign = this.store
        .select('campaigns')
        .pipe(
          map((campaigns) =>
            campaigns.find(
              (campaign: Campaign) => campaign.id === this.campaignId
            )
          )
        );
    });

    this.campaign.subscribe((campaign: Campaign | undefined) => {
      if (campaign) {
        this.campaignForm.patchValue({
          name: campaign.name,
          keywords: '',
          bidAmount: String(campaign.bidAmount),
          campaignFund: String(campaign.campaignFund),
          town: campaign.town,
          radius: campaign.radius,
          status: campaign.status,
        });
        this.keywords = [...campaign.keywords];
      } else {
        this.campaignForm.reset();
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    value && !this.keywords.includes(value) && this.keywords.push(value);
    event.chipInput!.clear();
    this.campaignForm.get('keywords')?.setValue(null);
  }

  remove(keyword: string): void {
    this.keywords = this.keywords.filter((kw) => kw !== keyword);
    this.announcer.announce(`Removed ${keyword}`);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.keywordInput) {
      const value = event.option.viewValue;
      value && !this.keywords.includes(value) && this.keywords.push(value);
      this.keywordInput.nativeElement.value = '';
      this.campaignForm.get('keywords')?.setValue(null);
    }
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allkeywords.filter((keyword) =>
      keyword.toLowerCase().includes(filterValue)
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  goBack(e: Event) {
    e.preventDefault();
    this.router.navigateByUrl('/');
  }

  onSubmit() {
    const data = this.campaignForm.value;
    const balance = localStorage?.getItem('balance') || 1000;

    const campaignDetails = {
      id: this.campaignId ? this.campaignId : Date.now(),
      name: data.name || '',
      keywords: this.keywords,
      bidAmount: Number(data.bidAmount),
      campaignFund: Number(data.campaignFund),
      status: Boolean(data.status),
      town: data.town || '',
      radius: Number(data.radius),
    };

    if (campaignDetails.campaignFund > +balance) {
      this.openSnackBar('You do not have enough balance.');
      return;
    }

    if (this.campaignId) {
      this.updateCampaign(campaignDetails);
    } else {
      this.createCampaign(campaignDetails);
    }
  }

  updateCampaign(campaignDetails: Campaign) {
    this.store.dispatch(new EditCampaign(campaignDetails));
    this.openSnackBar('Successfully updated campaign.');
  }

  createCampaign(campaignDetails: Campaign) {
    this.store.dispatch(new CreateCampaign(campaignDetails));
    this.campaignForm.reset();
    this.keywords = [];
    this.balanceService.updateBalance(campaignDetails.campaignFund);
    this.openSnackBar('Successfully created new campaign.');
  }
}
