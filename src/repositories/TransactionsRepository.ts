import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  type: 'income' | 'outcome';
  value: number;
  title: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        transaction.type === 'income'
          ? (accumulator.income += transaction.value)
          : (accumulator.outcome += transaction.value);

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ type, value, title }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ type, value, title });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
