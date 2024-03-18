import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TOWNS } from '../../../consts/towns';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { KEYWORDS } from '../../../consts/keywords';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { BalanceService } from '../../../services/balance.service';
import { Store } from '@ngrx/store';
import { CreateCampaign } from '../../../store/campaign.action';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  towns = TOWNS;
  keywords: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredkeywords: Observable<string[]> = of([]);
  allkeywords: string[] = KEYWORDS;
  announcer = inject(LiveAnnouncer);
  @ViewChild('keywordInput') keywordInput?: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private balanceService: BalanceService,
    private store: Store<any>,
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

  campaignForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    keywords: new FormControl(''),
    bidAmount: new FormControl('', [Validators.required, Validators.min(0.1)]),
    campaignFund: new FormControl('', [
      Validators.required,
      Validators.min(10),
    ]),
    town: new FormControl('', [Validators.required]),
    radius: new FormControl(0, [Validators.required, Validators.min(1)]),
    status: new FormControl(''),
  });

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
    e.stopPropagation();
    this.router.navigateByUrl('/');
  }

  onSubmit() {
    const data = this.campaignForm.value;
    const balance = localStorage?.getItem('balance') || 1000;

    if (Number(data.campaignFund) > +balance) {
      this.openSnackBar('You do not have enough balance.');
      return;
    } else {
      this.store.dispatch(
        new CreateCampaign({
          id: Date.now(),
          name: data.name || '',
          keywords: this.keywords,
          bidAmount: Number(data.bidAmount),
          campaignFund: Number(data.campaignFund),
          status: Boolean(data.status),
          town: data.town || '',
          radius: Number(data.radius),
        })
      );
      this.campaignForm.reset();
      this.keywords = [];
      this.balanceService.updateBalance(Number(data.campaignFund));
      this.openSnackBar('Successfully created new campaign.');
    }
  }
}
