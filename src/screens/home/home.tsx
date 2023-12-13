import { InputMask } from '@react-input/mask';

import { ButtonIcon } from '../../components/button-icon';
import { Card } from '../../components/card';
import { CategoriesPieChart } from '../../components/categories-pie-chart';
import { CreateCategoryDialog } from '../../components/create-category-dialog';
import { CreateTransactionDialog } from '../../components/create-transaction-dialog';
import { Input } from '../../components/input';
import { Title } from '../../components/title';
import { Transaction } from '../../components/transaction';
import {
  Aside,
  Balance,
  ChartAction,
  ChartContainer,
  ChartContent,
  Filters,
  Header,
  InputGroup,
  Main,
  SearchTransaction,
  Section,
  TransactionGroup,
} from './styles';
import { FinancialEvolutionBarChart } from '../../components/financial-evolution-bar-chart';

export function Home() {
  return (
    <>
      <Header>
        <h1>Money Control$</h1>
        <div>
          <CreateTransactionDialog />
          <CreateCategoryDialog />
        </div>
      </Header>
      <Main>
        <Section>
          <Filters>
            <Title title="Saldo" subtitle="Receitas e despesas no período" />
            <InputGroup>
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Início"
                placeholder="dd/mm/aaaa"
              />
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/aaaa"
              />
              <ButtonIcon />
            </InputGroup>
          </Filters>
          <Balance>
            <Card title="Saldo" amount={10000} />
            <Card variant="incomes" title="Receitas" amount={10000} />
            <Card variant="expenses" title="Gastos" amount={10000} />
          </Balance>
          <ChartContainer>
            <header>
              <Title
                title="Gastos"
                subtitle="Despesas por categoria no período"
              />
            </header>
            <ChartContent>
              <CategoriesPieChart />
            </ChartContent>
          </ChartContainer>
          <ChartContainer>
            <header>
              <Title
                title="Evolução Financeira"
                subtitle="Saldos, Resceitas e Gastos no ano"
              />
              <ChartAction>
                <InputMask
                  component={Input}
                  mask="aaaa"
                  replacement={{ a: /\d/ }}
                  variant="black"
                  label="Ano"
                  placeholder="aaaa"
                />
                <ButtonIcon />
              </ChartAction>
            </header>
            <ChartContent>
              <FinancialEvolutionBarChart />
            </ChartContent>
          </ChartContainer>
        </Section>
        <Aside>
          <header>
            <Title title="Transações" subtitle="Receitas e Gastos no período" />
            <SearchTransaction>
              <Input variant="black" placeholder="Procurar transação..." />
              <ButtonIcon />
            </SearchTransaction>
          </header>
          <TransactionGroup>
            <Transaction
              id={1}
              title="Transação"
              date="12/12/2023"
              amount={10000}
              category={{ title: 'Mercado', color: '#55ffff' }}
            />
            <Transaction
              id={1}
              title="Transação"
              date="12/12/2023"
              amount={10000}
              category={{ title: 'Mercado', color: '#55ffff' }}
            />
            <Transaction
              id={1}
              title="Transação"
              date="12/12/2023"
              amount={10000}
              category={{ title: 'Mercado', color: '#55ffff' }}
            />
            <Transaction
              id={1}
              title="Transação"
              date="12/12/2023"
              amount={10000}
              category={{ title: 'Mercado', color: '#55ffff' }}
            />
            <Transaction
              id={1}
              title="Transação"
              date="12/12/2023"
              amount={10000}
              category={{ title: 'Mercado', color: '#55ffff' }}
            />
            <Transaction
              id={1}
              title="Transação"
              date="12/12/2023"
              amount={10000}
              category={{ title: 'Mercado', color: '#55ffff' }}
            />
          </TransactionGroup>
        </Aside>
      </Main>
    </>
  );
}
