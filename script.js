'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (account) {
  containerMovements.innerHTML = '';
  account.movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const calDisplayBalance = function (account) {
  const balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance}€`;
}

const calDisplaySummary = function (account) {
  const deposits = account.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
  const withdrawals = account.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + Math.abs(mov), 0);
  const interest = account.movements.filter((mov) => mov > 0).map((mov) => mov * account.interestRate /100).filter(mov => mov >=1).reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${deposits}€`;
  labelSumOut.textContent = `${withdrawals}€`;
  labelSumInterest.textContent = `${interest}€`;
}


const computeUserName = function (accounts) {
  accounts.forEach(function(account) {
    account.userName = account.owner.toLowerCase()
    .split(' ')
    .map((word => word[0]))
    .join('');
  })
}

const updateUI = function (account) {
  displayMovements(account);
  calDisplayBalance(account);
  calDisplaySummary(account);
}




// Assuming containerMovements is a valid DOM element

computeUserName(accounts);


/////////////////////////////////////////////////
/////////////////////////////////////////////////

//EVENT HANDLER
let currentAccount;

btnLogin.addEventListener('click',function (e) {
  e.preventDefault();
  currentAccount = accounts.find((account) => account.userName === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //welcome message
    labelWelcome.textContent = `welcome back, ${currentAccount.owner.split(' ')[0]}`;
    //display UI
    containerApp.style.opacity = 100;
    //empty the login inputs
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click',function (e) {
  e.preventDefault();
  const receiverAccount = accounts.find((account) => account.userName === inputTransferTo.value);
  const amount = inputTransferAmount.value;
  
  if (amount > 0 && currentAccount.balance >= amount && receiverAccount?.userName !== currentAccount.UserName) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    
    updateUI(currentAccount);
    
  }
  console.log(receiverAccount)
})


// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
