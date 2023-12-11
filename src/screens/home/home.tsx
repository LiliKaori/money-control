import { InputMask } from '@react-input/mask';

import { Button } from '../../components/button';
import { ButtonIcon } from '../../components/button-icon';
import { Input } from '../../components/input';
import { Title } from '../../components/title';
import { Filters, Header, InputGroup, Main, Section } from './styles';

export function Home() {
  return (
    <>
      <Header>
        <h1>Money Control$</h1>
        <div>
          <Button>Nova transação</Button>
          <Button>Nova categoria</Button>
        </div>
      </Header>
      <Main>
        <Section>
          <Filters>
            <Title title="Saldo" subtitle="Receitas e despesas no período" />
            <InputGroup>
              <InputMask
                component={Input}
                mask="dd/mm/yyyy"
                replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
                variant="dark"
                label="Início"
                placeholder="dd/mm/aaaa"
              />
              <InputMask
                component={Input}
                mask="dd/mm/yyyy"
                replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/aaaa"
              />
              <ButtonIcon />
            </InputGroup>
          </Filters>
        </Section>
      </Main>
    </>
  );
}
