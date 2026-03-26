
describe("UC-1 Sorting Validation - Login Page and sorting", () => {
  it("should let you log in and sorts the price (low to high)", async () => {
    await browser.url('/');

    const usernameInput = $('//input[@placeholder="Username"]');
    await usernameInput.setValue('standard_user');

    const passwordInput = $('//input[@placeholder="Password"]');
    await passwordInput.setValue('secret_sauce');

    const loginButton = $('//input[@value="Login"]');
    await loginButton.click();

    const sortDropdown = $('//select[@class="product_sort_container"]');
    await sortDropdown.selectByVisibleText('Price (low to high)');

    const priceElements = await $$('//div[@data-test="inventory-item-price"]');

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