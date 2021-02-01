//transaction
const transactions = [
  {
    id: 1,
    description: 'Aluguel',
    amount: -50000,
    date: '23/01/2021',
  },
  {
    id: 2,
    description: 'Aluguel casa 1',
    amount: -400000,
    date: '23/01/2021',
  },
  {
    id: 4,
    description: 'Cachaça',
    amount: 1000,
    date: '23/01/2021',
  },
  {
    id: 5,
    description: 'Alguma coisa aqui',
    amount: 36520,
    date: '23/01/2021',
  },
  {
    id: 6,
    description: 'Alguma coisa 2',
    amount: 6859568,
    date: '23/01/2021',
  },
];
const Transaction = {
  all: transactions,
  add(trasaction) {
    Transaction.all.push(trasaction);

    App.reload();
  },
  remove(index) {
    Transaction.splice(index, 1);

    App.reload();
  },
  incomes() {
    let income = 0;
    transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });

    return income;
  },

  expenses() {
    let expense = 0;
    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });

    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionContainer: document.querySelector('#data_table tbody'),

  addTransaction(transaction, index) {
    // console.log(transaction);
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionContainer.appendChild(tr);
  },
  innerHTMLTransaction(transaction) {
    const cssClass = transaction.amount > 0 ? 'income' : 'expensive';
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
        <td>${transaction.id}</td>
        <td class="description">${transaction.description}</td>
        <td class="${cssClass}">${amount}</td>
        <td>${transaction.date}</td>
        <td>
          <img
            src="./assets/delete.svg"
            alt="Remover lançamento"
            srcset=""
            title="Excluir"
          />
        </td>`;

    return html;
  },
  updatebalance() {
    document.getElementById('totalExpense').innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById('totalIncome').innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById('totalAll').innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
    const cssClass = Transaction.total() < 0 ? 'expensiveBg' : 'incomeBg';
    document.querySelector('.total').classList.add(cssClass);
  },
  clearTransactions() {
    DOM.transactionContainer.innerHTML = '';
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : '';

    value = String(value).replace(/\D/g, '');
    value = Number(value) / 100;

    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return signal + ' ' + value;
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction) => {
      DOM.addTransaction(transaction);
    });

    DOM.updatebalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),
  getValues() {
    return {
      descriptio: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  validateField() {
    const { description, amount, date } = Form.getValues();
    console.log(description);
  },
  formatData() {
    console.log('Formatar os dados');
  },
  submit(event) {
    event.preventDefault();

    Form.validateField();

    Form.formatData();

    //clean data the form

    //close modal

    //update data display
  },
};

App.init();

// Transaction.remove(1);

Transaction.add({
  id: 14,
  description: 'pa pa pa pa',
  amount: 1425,
  date: '21/01/2021',
});

//code modal
const modal = {
  open() {
    document.querySelector('.modal_overlay').classList.add('active');
  },
  close() {
    document.querySelector('.modal_overlay').classList.remove('active');
  },
};
