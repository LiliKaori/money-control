import { InputMask } from '@react-input/mask';
import { useCallback, useState } from 'react';

import { Button } from '../button';
import { Dialog } from '../dialog';
import { Input } from '../input';
import { Title } from '../title';
import {
  Container,
  Content,
  CurrencyInput,
  InputGroup,
  RadioForm,
  RadioGroup,
} from './styles';
import { paths } from '../../services/paths';

export function CreateTransactionDialog() {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(() => {
    handleClose();
  }, [handleClose]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova transação</Button>}
    >
      <Container>
        <Title
          title="Nova Transação"
          subtitle="Crie uma nova transação para seu controle financeiro"
        />

        <form method="POST" action={paths.post.createTransaction}>
          <Content>
            <InputGroup>
              <label>Categoria</label>
              <select>
                <option selected>Selecione uma categoria</option>
              </select>
            </InputGroup>
            <Input label="Nome" placeholder="Nome da transação..." />
            <InputGroup>
              <label>Valor</label>
              <CurrencyInput
                placeholder="R$ 0,00"
                format="currency"
                currency="BRL"
              />
            </InputGroup>
            <InputMask
              component={Input}
              mask="dd/mm/aaaa"
              replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
              label="Data"
              variant="black"
              placeholder="dd/mm/aaaa"
            />

            <RadioForm>
              <RadioGroup>
                <input type="radio" name="type" id="income" value="income" />
                <label htmlFor="income">Receita</label>
              </RadioGroup>
              <RadioGroup>
                <input type="radio" name="type" id="expense" value="expense" />
                <label htmlFor="expense">Gasto</label>
              </RadioGroup>
            </RadioForm>
          </Content>

          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Cancelar
            </Button>
            <Button onClick={onSubmit}>Cadastrar</Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  );
}
