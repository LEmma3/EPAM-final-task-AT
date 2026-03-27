const Page = require('./page');

class InventoryPage extends Page {
  get sortDropdown() { return $('//select[@class="product_sort_container"]'); }
  get prices() { return $$('//div[@data-test="inventory-item-price"]'); }
  get addToCartButtons() { return $$('//button[text()="Add to cart"]'); }
  get cartBadge() { return $('//span[@class="shopping_cart_badge"]'); }
  get cartIcon() { return $('//div[@class="shopping_cart_container"]'); }

  async sortByPriceLowToHigh() {
    await expect(this.sortDropdown).toBeDisplayed();
    await this.sortDropdown.selectByVisibleText('Price (low to high)');
  }

  async getPrices() {
    const elements = await this.prices;
    const prices = [];

    for (const el of elements) {
      const text = await el.getText();
      prices.push(parseFloat(text.replace('$', '')));
    }

    return prices;
  }

  async addFirstNItems(n) {
    const buttons = await this.addToCartButtons;
    for (let i = 0; i < n; i++) {
      await buttons[i].click();
    }
  }

  async openCart() {
    await this.cartIcon.click();
  }
}

module.exports = new InventoryPage();