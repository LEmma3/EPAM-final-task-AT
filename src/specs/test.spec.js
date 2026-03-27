describe("UC-1 Sorting Validation - Login Page and sorting", () => {
  it("should let you log in and sort the price (low to high)", async () => {
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

describe("UC-2 Cart State Logic - Add items to cart", () => {
  it("should add two different items to the cart and then remove one item", async () => {
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

    await expect($('//div[@class="inventory_list"]')).toBeDisplayed();

    const addToCartButtons = await $$('//button[text()="Add to cart"]');
    await expect(addToCartButtons.length).toBeGreaterThanOrEqual(2);
  
    await addToCartButtons[0].click();
    await addToCartButtons[1].click();

    const cartBadge = await $('//span[@class="shopping_cart_badge"]');
    await expect(cartBadge).toBeDisplayed();
    await expect(cartBadge).toHaveText('2');

    await $('//div[@class="shopping_cart_container"]').click();

    const cartItems = await $$('//div[@class="cart_item"]');
    await expect(cartItems.length).toBe(2);

    const removeButtons = await $$('//button[text()="Remove"]');
    await expect(removeButtons.length).toBeGreaterThanOrEqual(2);

    await removeButtons[0].click();

    await expect(cartBadge).toBeDisplayed();
    await expect(cartBadge).toHaveText('1');
  });
});