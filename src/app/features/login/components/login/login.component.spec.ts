import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  const initialState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the fields after submit', () => {
    debugElement = fixture.debugElement;
    const loginInput: HTMLInputElement = debugElement.query(By.css('input[type="text"]')).nativeElement;
    const passwordInput: HTMLInputElement = debugElement.query(By.css('input[type="password"]')).nativeElement;
    loginInput.value = 'Adam';
    passwordInput.value = 'West';
    component.onSubmit(loginInput, passwordInput);
    expect(loginInput.value).toBe('');
  });

  it('should alert when fields are empty', () => {
    spyOn(window, 'alert');
    debugElement = fixture.debugElement;
    const loginInput: HTMLInputElement = debugElement.query(By.css('input[type="text"]')).nativeElement;
    const passwordInput: HTMLInputElement = debugElement.query(By.css('input[type="password"]')).nativeElement;
    loginInput.value = '';
    passwordInput.value = '';
    component.onSubmit(loginInput, passwordInput);
    expect(window.alert).toHaveBeenCalled();
  });
});
