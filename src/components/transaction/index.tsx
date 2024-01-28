import { formatCurrency } from '../../utils/format-currency';
import { formatDate } from '../../utils/format-date';
import { Container, Content, Info } from './styles';

type TransactionProps = {
  id: number;
  title: string;
  date: string;
  amount: number;
  category: {
    title: string;
    color: string;
  };
  variant?: 'income' | 'expense';
};

export function Transaction({
  id,
  title,
  date,
  amount,
  category,
  variant = 'income',
}: TransactionProps) {
  return (
    <Container>
      <Info>
        <span>{id.toString().padStart(4, '0')}</span>
        <div>
          <strong>{title}</strong>
          <span>{formatDate(date)}</span>
        </div>
      </Info>
      <Content $variant={variant} $tagColor={category.color}>
        <strong>{formatCurrency(amount)}</strong>
        <span>{category.title.toUpperCase()}</span>
      </Content>
    </Container>
  );
}
