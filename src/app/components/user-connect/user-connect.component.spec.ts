import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConnectComponent } from './user-connect.component';

describe('UserConnectComponent', () => {
  let component: UserConnectComponent;
  let fixture: ComponentFixture<UserConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserConnectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
