import { browser, by, element, ElementFinder, promise } from 'protractor';

export class RegisterPage {
   // navigate to register page
   navigateToRegister() {
    return browser.get('/register');
  }
  // get current URL
  getCurrentURL() {
    return browser.getCurrentUrl();
  }
 // navigate to dashboard view
  navigateToDashboard() {
    return browser.get('/home/dashboard');
  }
  // get register component
  getRegisterComponent(): ElementFinder {
    return element(by.tagName('app-register'));
  }
  // get username input box
  getUserNameInputBox(): ElementFinder {
    return element(by.className('username'));
  }
  // check username input box is exist or not
  isUserNameInputBoxPresent(): promise.Promise<boolean> {
    return this.getUserNameInputBox().isPresent();
  }
  // get password input box
  getPasswordInputBox(): ElementFinder {
    return element(by.className('password'));
  }
  // check password input box is exist or not
  isPasswordInputBoxPresent(): promise.Promise<boolean> {
    return this.getPasswordInputBox().isPresent();
  }
  // get submit button
  getSubmitButton(): ElementFinder {
    return this.getRegisterComponent().element(by.buttonText('Submit'));
  }
  // check submit button is present or not
  isSubmitButtonPresent(): promise.Promise<boolean> {
    return this.getSubmitButton().isPresent();
  }
  // click submit button
  clickSubmitButton(): promise.Promise<void> {
    return this.getSubmitButton().click();
  }
  // default values of input boxes
  getRegisterInputBoxesDefaultValues(): any {
    let inputUsername;
    let inputPassword;
    inputUsername = this.getUserNameInputBox().getAttribute('value');
    inputPassword = this.getPasswordInputBox().getAttribute('value');
    return Promise.all([inputUsername, inputPassword]).then( (values) => {
      return values;
    });
  }
  // get username and password details
  getMockRegisterDetail(): any {
    const registerDetail: any = { username: 'stranger', password : 'password'};
    return registerDetail;
  }
  // set username and password input box values
  addRegisterValues(): any {
    const register: any = this.getMockRegisterDetail();
    this.getUserNameInputBox().sendKeys(register.username);
    this.getPasswordInputBox().sendKeys(register.password);
    return Object.keys(register).map(key => register[key]);
  }

  navigateToLogin() {
    return browser.get('/login?registered=true');
  }
 
}
