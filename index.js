import { faker } from "@faker-js/faker";
//customer Class
class Customer {
    constructor(fName, lName, age, gender, mob, acc) {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.gender = gender;
        this.mobile = mob;
        this.accNumber = acc;
    }
}
// class Bank
class Bank {
    constructor() {
        this.customer = [];
        this.account = [];
    }
    addCustomer(obj) {
        this.customer.push(obj);
    }
    addAccountNumber(obj) {
        this.account.push(obj);
    }
}
let myBank = new Bank();
//create customer
for (let i = 1; i <= 3; i++) {
    let fName = faker.person.firstName("male");
    let lName = faker.person.lastName();
    let num = parseInt(faker.phone.number("9#########"));
    const customer = new Customer(fName, lName, 25 * i, "male", num, 1000 + i);
    myBank.addCustomer(customer);
    myBank.addAccountNumber({ accNumber: customer.accNumber, balance: 1000 * i });
}
