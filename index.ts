import { faker } from "@faker-js/faker";

//customer Class
class Customer {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  mobile: number;
  accNumber: number;

  constructor(
    fName: string,
    lName: string,
    age: number,
    gender: string,
    mob: number,
    acc: number
  ) {
    this.firstName = fName;
    this.lastName = lName;
    this.age = age;
    this.gender = gender;
    this.mobile = mob;
    this.accNumber = acc;
  }
}

// interface BankAccount
interface BankAccount {
  accNumber: number;
  balance: number;
}

// class Bank
class Bank {
  customer: Customer[] = [];
  account: BankAccount[] = [];

  addCustomer(obj: Customer) {
    this.customer.push(obj);
  }

  addAccountNumber(obj: BankAccount) {
    this.account.push(obj);
  }
}

let myBank = new Bank();

//create customer
for (let i: number = 1; i <= 3; i++) {
  let fName = faker.person.firstName("male");
  let lName = faker.person.lastName();
  let num = parseInt(faker.phone.number("9#########"));
  const customer = new Customer(fName, lName, 25 * i, "male", num, 1000 + i);
  myBank.addCustomer(customer);
  myBank.addAccountNumber({ accNumber: customer.accNumber, balance: 1000* i });
}

