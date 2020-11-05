import { RegisterPage } from './register.po';

describe('RegisterPage page', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
  });


  it('should get username input box', () => {
    page.navigateToRegister();
    expect(page.isUserNameInputBoxPresent())
    .toBeTruthy(`<input class="username" matInput [formControl]='username'> should exist in register.component.html`);
  });

  it('should get passsword input box', () => {
    page.navigateToRegister();
    expect(page.isPasswordInputBoxPresent())
    .toBeTruthy(`<input class="password" matInput type = 'password' [formControl]='password'>
      should exist in register.component.html`);
  });

  it('should get submit button', () => {
    page.navigateToRegister();
    expect(page.isSubmitButtonPresent()).toBeTruthy(`<button type="submit" mat-button>Submit</button> should
      exist in register.component.html`);
  });

  it('default values of username and password should be empty', () => {
    const emptyRegisterValues = ['', ''];
    page.navigateToRegister();
    expect(page.getRegisterInputBoxesDefaultValues()).toEqual(emptyRegisterValues, 'Default values for username and password should be empty');
  });

  it('should redirect to Login Page', () => {
    page.navigateToRegister();
    let newValues = page.addRegisterValues();
    expect(page.getRegisterInputBoxesDefaultValues()).toEqual(newValues, 'Should be able to set values for username and password');
    page.clickSubmitButton();
    page.navigateToLogin();
    
  });
});
