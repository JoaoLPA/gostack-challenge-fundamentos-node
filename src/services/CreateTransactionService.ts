// import { uuid } from 'uuidv4';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Invalid operation');
    }

    if (type === 'outcome' && value > total) {
      throw new Error('Not enough balance');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
