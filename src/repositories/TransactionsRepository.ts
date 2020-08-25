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
  private total: number;
  private sumIncomes: number;
  private sumOutcomes: number;

  constructor() {
    this.transactions = [];
    this.total = 0;
    this.sumIncomes = 0;
    this.sumOutcomes = 0;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomesFilter = this.transactions.filter(transaction => transaction.type === 'income')
      .map(income => income.value);
    const outcomesFilter = this.transactions.filter(transaction => transaction.type === 'outcome')
      .map(outcome => outcome.value);
    if(incomesFilter.length !== 0) {
      this.sumIncomes = incomesFilter.reduce((acc, atual) => acc + atual);
    }
    if(outcomesFilter.length !== 0) {
      this.sumOutcomes = outcomesFilter.reduce((acc, atual) => acc + atual);
    }
    this.total = this.sumIncomes - this.sumOutcomes;
    if (this.total < 0) {
      throw Error('Invalid balance');
    }
    return {
      income: this.sumIncomes,
      outcome: this.sumOutcomes,
      total: this.total
    }
  }

  public create({title, value, type}: TransactionDTO): Transaction {
    if(type == 'outcome' && value > this.sumIncomes) {
      throw Error('Invalid balance');
    }
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
