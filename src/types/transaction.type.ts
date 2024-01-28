export type TransactionType = {
  _id?: string;
  title: string;
  amount: number;
  date: string;
  type: string;
  category: {
    title: string;
    color: string;
  };
};
