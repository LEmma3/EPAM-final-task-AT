const LoginPage = require('../po/pages/login.page');
const InventoryPage = require('../po/pages/inventory.page');
const CartPage = require('../po/pages/cart.page');

describe("UC-1 Sorting Validation", () => {
  it("should login to the page and sort prices low to high", async () => {
    await LoginPage.open('/');
    await LoginPage.login('standard_user', 'secret_sauce');

    await InventoryPage.sortByPriceLowToHigh();

    const prices = await InventoryPage.getPrices();

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

});

  describe("UC-2 Cart State Logic", () => {
  it("should add and remove items from cart", async () => {
    await LoginPage.open('/');
    await LoginPage.login('standard_user', 'secret_sauce');

    await InventoryPage.addFirstNItems(2);

    await expect(InventoryPage.cartBadge).toHaveText('2');

    await InventoryPage.openCart();

    const items = await CartPage.cartItems;
    await expect(items.length).toBe(2);

    await CartPage.removeItem(0);

    await expect(CartPage.cartBadge).toHaveText('1');
  });


});