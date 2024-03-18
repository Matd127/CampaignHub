import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CampaignsTableComponent } from './campaigns-table.component';

describe('CampaignsTableComponent', () => {
  let component: CampaignsTableComponent;
  let fixture: ComponentFixture<CampaignsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
