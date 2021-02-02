//transaction
id = 1;

const Modal = {
  open() {
    document.querySelector('.modal_overlay').classList.add('active');
  },
  close() {
    document.querySelector('.modal_overlay').classList.remove('active');
  },
};

const Storange = {
  get() {
    return JSON.parse(localStorage.getItem('cabra.finances:transaction')) || [];
  },
  set(transaction) {
    localStorage.setItem(
      'cabra.finances:transaction',
      JSON.stringify(transaction)
    );
  },
};

const Transaction = {
  all: Storange.get(),

  add(trasaction) {
    Transaction.all.push(trasaction);

    App.reload();
  },
  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
  },
  incomes() {
    let income = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });

    return income;
  },

  expenses() {
    let expense = 0;
    Transaction.all.forEach((transaction) => {
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
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionContainer.appendChild(tr);
  },
  innerHTMLTransaction(transaction, index) {
    const cssClass =
      transaction.amount > 0 ? 'income totalColor' : 'expensive totalColor ';
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
        <td>${index + 1}</td>
        <td class="description">${transaction.description}</td>
        <td class="${cssClass}">${amount}</td>
        <td>${transaction.date}</td>
        <td>
          <img onclick="Transaction.remove(${index})"
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
  cleartransaction() {
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
  formatAmount(value) {
    date = Number(value) * 100;

    return date;
  },
  formatDate(value) {
    const aplitedDate = value.split('-');
    return `${aplitedDate[2]}/${aplitedDate[1]}/${aplitedDate[0]}`;
  },
};

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),
  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  validateField() {
    const { description, amount, date } = Form.getValues();
    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('Verifiue os campos, todos devem estar preenchidos');
    }
  },
  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return { id, description, amount, date };
  },
  commitTransaction(transaction) {
    Transaction.add(transaction);
  },
  clearFields() {
    Form.description.value = '';
    Form.amount.value = '';
    Form.date.value = '';
  },
  submit(event) {
    event.preventDefault();

    try {
      Form.validateField();

      const transaction = Form.formatValues();

      Form.commitTransaction(transaction);

      Form.clearFields();

      Modal.close();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      id = 0;
      DOM.addTransaction(transaction, index);

      id = transaction.id + 1;
    });

    DOM.updatebalance();

    Storange.set(Transaction.all);
  },
  reload() {
    DOM.cleartransaction();
    App.init();
  },
};

App.init();

// Transaction.remove(1);

// Transaction.add({
//   id: 14,
//   description: 'pa pa pa pa',
//   amount: 1425,
//   date: '21/01/2021',
// });

//code modal
