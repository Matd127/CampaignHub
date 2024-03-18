import { FormControl, FormGroup, Validators } from '@angular/forms';

export const CampaignForm = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  keywords: new FormControl(''),
  bidAmount: new FormControl('', [Validators.required, Validators.min(0.1)]),
  campaignFund: new FormControl('', [Validators.required, Validators.min(10)]),
  town: new FormControl('', [Validators.required]),
  radius: new FormControl(0, [Validators.required, Validators.min(1)]),
  status: new FormControl(false),
});
