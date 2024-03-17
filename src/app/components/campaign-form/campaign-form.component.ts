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
  balance = localStorage?.getItem('balance') || 1000;

  towns = TOWNS;
  keywords: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredkeywords: Observable<string[]> = of([]);
  allkeywords: string[] = KEYWORDS;
  @ViewChild('keywordInput') keywordInput?: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);

  campaignForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    keywords: new FormControl(''),
    bidAmount: new FormControl('', [Validators.required, Validators.min(0.1)]),
    campaignFund: new FormControl('', [
      Validators.required,
      Validators.min(10),
    ]),
    town: new FormControl('', [Validators.required]),
    radius: new FormControl(0, [Validators.required, Validators.min(1)]),
    status: new FormControl('', [Validators.required]),
  });

  constructor() {
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

  onSubmit() {
    const data = this.campaignForm.value;
    const curBalance = Number(this.balance) - Number(data.campaignFund);
    localStorage.setItem('balance', JSON.stringify(curBalance));
    console.log({ ...data, keywords: this.keywords });
  }
}
