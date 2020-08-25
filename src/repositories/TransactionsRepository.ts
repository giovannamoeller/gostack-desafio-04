import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome'
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
    const incomes = this.transactions.filter(transaction => transaction.type === 'income');
    const outcomes = this.transactions.filter(transaction => transaction.type === 'outcome');
    const sumIncomes = incomes.map(income => income.value).reduce((acc, atual) => acc + atual);
    const sumOutcomes = outcomes.map(outcome => outcome.value).reduce((acc, atual) => acc + atual);
    const total = sumIncomes - sumOutcomes;
    return {
      income: sumIncomes,
      outcome: sumOutcomes,
      total
    }
  }

  public create({title, value, type}: TransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
