const Page = require('./page');

class LoginPage extends Page {
  get usernameInput() { return $('//input[@placeholder="Username"]'); }
  get passwordInput() { return $('//input[@placeholder="Password"]'); }
  get loginButton() { return $('//input[@value="Login"]'); }

  async login(username, password) {
    await expect(this.usernameInput).toBeDisplayed();
    await expect(this.passwordInput).toBeDisplayed();
    await expect(this.loginButton).toBeDisplayed();

    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}

module.exports = new LoginPage();