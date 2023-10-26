// Filename: complex_code.js
// Description: Complex code demonstrating a shopping cart system

// Class representing a shopping cart
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Add an item to the cart
  addItem(item) {
    this.items.push(item);
  }

  // Remove an item from the cart
  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  // Clear all items from the cart
  clearCart() {
    this.items = [];
  }

  // Calculate and return the total price of all items in the cart
  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }
    return totalPrice;
  }
}

// Class representing an item
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// Create shopping cart instance
const cart = new ShoppingCart();

// Create item instances
const item1 = new Item("Shirt", 20);
const item2 = new Item("Shoes", 50);
const item3 = new Item("Bag", 30);

// Add items to the cart
cart.addItem(item1);
cart.addItem(item2);
cart.addItem(item3);

// Remove an item from the cart
cart.removeItem(item2);

// Print the total price of the items in the cart
console.log("Total Price:", cart.getTotalPrice());

// Clear the cart
cart.clearCart();

// Print the total price again (should be 0)
console.log("Total Price:", cart.getTotalPrice());

// Output:
// Total Price: 50
// Total Price: 0