const Page = require('./page');

class CartPage extends Page {
  get cartItems() { return $$('//div[@class="cart_item"]'); }
  get removeButtons() { return $$('//button[text()="Remove"]'); }
  get cartBadge() { return $('//span[@class="shopping_cart_badge"]'); }

  async removeItem(index = 0) {
    const buttons = await this.removeButtons;
    await buttons[index].click();
  }
}

module.exports = new CartPage();