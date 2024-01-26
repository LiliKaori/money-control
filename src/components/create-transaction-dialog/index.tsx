import { InputMask } from '@react-input/mask';
import { useCallback, useEffect, useRef, useState } from 'react';

import { api } from '../../services/api';
import { paths } from '../../services/paths';
import { CategoryType } from '../../types/category.type';
import { TransactionType } from '../../types/transaction.type';
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

export function CreateTransactionDialog() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const inputTitle = useRef<HTMLInputElement>(null);
  const inputAmount = useRef<HTMLInputElement>(null);
  const inputDate = useRef<HTMLInputElement>(null);
  const inputType = useRef<HTMLInputElement>(null);
  const inputCategory = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const renderCategory = async () => {
      try {
        const result = await api.get(paths.get.listCategories);
        setCategories(result.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    renderCategory();
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(() => {
    const newTransanction: TransactionType = {
      title: inputTitle.current ? inputTitle.current.value : null,
      amount: inputAmount.current ? inputAmount.current.value : null,
      date: inputDate.current ? inputDate.current.value : null,
      type: inputType.current ? inputType.current.value : null,
      categoryId: inputCategory.current ? inputCategory.current.value : null,
    };

    console.log(newTransanction);
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
              <select ref={inputCategory}>
                <option selected>Selecione uma categoria</option>
                {categories && categories.length > 0 ? (
                  categories.map((category: CategoryType) => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    );
                  })
                ) : (
                  <option value="" disabled>
                    Carregando categorias...
                  </option>
                )}
              </select>
            </InputGroup>
            <Input
              ref={inputTitle}
              label="Nome"
              placeholder="Nome da transação..."
            />
            <InputGroup>
              <label>Valor</label>
              <CurrencyInput
                ref={inputAmount}
                placeholder="R$ 0,00"
                format="currency"
                currency="BRL"
              />
            </InputGroup>
            <InputMask
              ref={inputDate}
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
                <input
                  ref={inputType}
                  type="radio"
                  name="type"
                  id="expense"
                  value="expense"
                />
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
