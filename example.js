/* 
Filename: ComplexJavaScriptCode

This code is a complex JavaScript program that simulates a banking application. It includes various classes and functions to handle account creation, transactions, and balance management. It also demonstrates the use of object-oriented programming concepts and error handling. Please note that this is a simplified version for illustrative purposes only.

How to use:
1. Create a new bank instance.
2. Create customer accounts.
3. Perform transactions using the available methods.
4. View account balances.

*/

class Bank {
  constructor() {
    this.customers = [];
  }

  addCustomer(name) {
    const customer = new Customer(name);
    this.customers.push(customer);
    return customer;
  }

  getCustomer(name) {
    return this.customers.find(customer => customer.name === name);
  }
}

class Customer {
  constructor(name) {
    this.name = name;
    this.accounts = [];
  }

  createAccount(initialDeposit) {
    const account = new Account(initialDeposit);
    this.accounts.push(account);
    return account;
  }

  getAccount(accountId) {
    return this.accounts.find(account => account.id === accountId);
  }

  getBalance(accountId) {
    const account = this.getAccount(accountId);
    return account ? account.balance : null;
  }
}

class Account {
  constructor(initialDeposit = 0) {
    this.id = Math.random()
      .toString(36)
      .substr(2, 9);
    this.balance = initialDeposit;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Invalid deposit amount");
    }

    this.balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0 || amount > this.balance) {
      throw new Error("Invalid withdrawal amount");
    }

    this.balance -= amount;
  }

  transfer(amount, targetAccount) {
    if (amount <= 0 || !targetAccount || targetAccount === this) {
      throw new Error("Invalid transfer");
    }

    this.withdraw(amount);
    targetAccount.deposit(amount);
  }
}

// Example Usage

// Create a new bank
const bank = new Bank();

// Create customer accounts
const customer1 = bank.addCustomer("John Doe");
const customer2 = bank.addCustomer("Jane Smith");

// Perform transactions
const account1 = customer1.createAccount(5000);
const account2 = customer2.createAccount(2000);

account1.deposit(1000);
account1.withdraw(500);

account2.deposit(300);
account2.transfer(100, account1);

// View account balances
console.log(customer1.getBalance(account1.id)); // Expected: 6500
console.log(customer2.getBalance(account2.id)); // Expected: 1800