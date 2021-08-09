/**
 * Задание 7
 * Напиши скрипт управления личным кабинетом интернет банка. Есть объект account в котором необходимо реализовать методы для работы с балансом и историей транзакций.
 *
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 *
 * const Transaction = {
 *   DEPOSIT: 'deposit',
 *   WITHDRAW: 'withdraw',
 * };
 *
 * Каждая транзакция это объект со свойствами: id, type и amount
 *
 * const account = {
 *   // Текущий баланс счета
 *   balance: 0,
 *
 *   // История транзакций
 *   transactions: [],
 *
 *
 * Метод создает и возвращает объект транзакции.
 * Принимает сумму и тип транзакции.
 *
 * createTransaction(amount, type) {},
 * Метод отвечающий за добавление суммы к балансу.
 * Принимает сумму танзакции.
 * Вызывает createTransaction для создания объекта транзакции
 * после чего добавляет его в историю транзакций
 * deposit(amount) {},
 *
 * Метод отвечающий за снятие суммы с баланса.
 * Принимает сумму танзакции.
 * Вызывает createTransaction для создания объекта транзакции
 * после чего добавляет его в историю транзакций.
 *
 * Если amount больше чем текущий баланс, выводи сообщение
 * о том, что снятие такой суммы не возможно, недостаточно средств.
 *
 *   withdraw(amount) {},
 *
 *
 * Метод возвращает текущий баланс
 *
 * getBalance() {},
 *
 * Метод ищет и возвращает объект транзации по id
 * getTransactionDetails(id) {},
 *
 * Метод возвращает количество средств
 * определенного типа транзакции из всей истории транзакций
 *
 * getTransactionTotal(type) {},
 *
*/

const Transaction = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  _id: 0,

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    let result = {
      id: this._id++,
      type: type,
      amount: amount,
    };
    console.debug(
      `Transaction with id: ${result.id}, type: ${result.type}, amount: ${result.amount} was created.`
    );
    return result;
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    let transaction = this.createTransaction(amount, Transaction.DEPOSIT);
    this.balance += amount;
    this.transactions.push(transaction);
    console.debug(`Added ${amount} to deposit. Balance left: ${this.balance}`);
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    let transaction = this.createTransaction(amount, Transaction.WITHDRAW);
    this.transactions.push(transaction);
    if (amount <= this.balance) {
      this.balance -= amount;
      console.debug(
        `Removed ${amount} from balance. Balance left: ${this.balance}`
      );
    } else {
      console.log(`Not enought money to get ${amount}.`);
    }
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return this.balance;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    return this.transactions.find((element) => element.id === id);
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    let total = 0;
    this.transactions.forEach((element) => {
      if (element.type === type) {
        total += element.amount;
      }
    });
    return total;
  },
};

console.log(`Balance: ${account.getBalance()}`);
account.deposit(50);
account.deposit(100);
account.withdraw(10);
console.log(`Balance: ${account.getBalance()}`);
account.withdraw(1000);
console.log(`Balance: ${account.getBalance()}`);
console.log(
  `Total deposits: ${account.getTransactionTotal(Transaction.DEPOSIT)}`
);
console.log(
  `Total withdraws: ${account.getTransactionTotal(Transaction.WITHDRAW)}`
);
console.log(
  `Transaction 2 details: type ${account.getTransactionDetails(2).type}, amount ${account.getTransactionDetails(2).amount}`
);