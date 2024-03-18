import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsComponent } from './campaigns.component';
import { StoreModule } from '@ngrx/store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

describe('CampaignsComponent', () => {
  let component: CampaignsComponent;
  let fixture: ComponentFixture<CampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CampaignsComponent,
        RouterModule,
        ActivatedRoute,
        NgModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
