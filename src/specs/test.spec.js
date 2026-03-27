describe("UC-1 Sorting Validation - Login Page and sorting", () => {
  it("should let you log in and sorts the price (low to high)", async () => {
    await browser.url('/');

    const usernameInput = $('//input[@placeholder="Username"]');
    const passwordInput = $('//input[@placeholder="Password"]');
    const loginButton = $('//input[@value="Login"]');
    
    await expect(usernameInput).toBeDisplayed();
    await expect(passwordInput).toBeDisplayed();
    await expect(loginButton).toBeDisplayed();

    await usernameInput.setValue('standard_user');
    await passwordInput.setValue('secret_sauce');
    await loginButton.click();

    const sortDropdown = $('//select[@class="product_sort_container"]');
    await expect(sortDropdown).toBeDisplayed();
    await sortDropdown.selectByVisibleText('Price (low to high)');

    const priceElements = await $$('//div[@data-test="inventory-item-price"]');
    await expect(priceElements.length).toBeGreaterThan(0);

    const prices = [];
    for (const element of priceElements) {
      const text = await element.getText();
      prices.push(parseFloat(text.replace('$', '')));
    }

    for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
    
  })
});