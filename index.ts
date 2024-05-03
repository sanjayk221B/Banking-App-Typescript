import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";

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

  transaction(accObj: BankAccount) {
    let newAccounts = this.account.filter(
      (acc) => acc.accNumber !== accObj.accNumber
    );
    this.account = [...newAccounts, accObj];
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
  myBank.addAccountNumber({ accNumber: customer.accNumber, balance: 1000 * i });
}

//Bank Functionality
async function bankService(bank: Bank) {
  do {
    let service = await inquirer.prompt({
      type: "list",
      name: "select",
      message: "Please select the service",
      choices: ["View Balance", "Cash Withdraw", "Cash Deposit"],
    });

    //View Balance
    if (service.select == "View Balance") {
      let res = await inquirer.prompt({
        type: "input",
        name: "number",
        message: "Please enter your Account Number : ",
      });
      let account = myBank.account.find((acc) => acc.accNumber == res.number);
      if (!account) {
        console.log(chalk.red.bold.italic("Invalid Account Number"));
      }
      if (account) {
        let name = myBank.customer.find(
          (item) => item.accNumber == account.accNumber
        );
        console.log(
          `Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(
            name?.lastName
          )} your Account Balance is : ${chalk.bold.blueBright(
            "₹",
            account.balance
          )}`
        );
      }
    }

    //Cash Withdrawal
    if (service.select == "Cash Withdraw") {
      let res = await inquirer.prompt({
        type: "input",
        name: "number",
        message: "Please enter your Account Number : ",
      });
      let account = myBank.account.find((acc) => acc.accNumber == res.number);
      if (!account) {
        console.log(chalk.red.bold.italic("Invalid Account Number"));
      }
      if (account) {
        let ans = await inquirer.prompt({
          type: "number",
          message: "Please enter the amount : ",
          name: "rupee",
        });
        if (ans.rupee > account.balance) {
          console.log(chalk.red.bold("Insufficient balance"));
        }
        let newBalance = account.balance - ans.rupee;
        //Call transaction
        bank.transaction({ accNumber: account.accNumber, balance: newBalance });
      }
    }

    //Cash Deposit
    if (service.select == "Cash Deposit") {
      let res = await inquirer.prompt({
        type: "input",
        name: "number",
        message: "Please enter your Account Number : ",
      });
      let account = myBank.account.find((acc) => acc.accNumber == res.number);
      if (!account) {
        console.log(chalk.red.bold.italic("Invalid Account Number"));
      }
      if (account) {
        let ans = await inquirer.prompt({
          type: "number",
          message: "Please enter the amount : ",
          name: "rupee",
        });
        let newBalance = account.balance + ans.rupee;
        //Call transaction
        bank.transaction({ accNumber: account.accNumber, balance: newBalance });
      }
    }
  } while (true);
}

bankService(myBank);
