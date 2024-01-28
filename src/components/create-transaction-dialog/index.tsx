import { zodResolver } from '@hookform/resolvers/zod';
import { InputMask } from '@react-input/mask';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ZodError, z } from 'zod';

import { api } from '../../services/api';
import { paths } from '../../services/paths';
import { CategoryType } from '../../types/category.type';
import { formatFormDate } from '../../utils/format-date';
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

  enum TypeTransaction {
    INCOME = 'income',
    EXPENSE = 'expense',
  }

  const transactionSchema = z.object({
    title: z.string().min(1, 'O nome é obrigatório'),
    amount: z
      .string()
      .min(1, 'O valor é obrigatório')
      .transform(string => Number(string.replace(/\D/g, ''))),
    type: z.nativeEnum(TypeTransaction),
    date: z.string().transform(date => formatFormDate(date)),
    categoryId: z.string().length(24, { message: 'Categoria inválida' }),
  });

  type FormTransactionType = z.infer<typeof transactionSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTransactionType>({
    resolver: zodResolver(transactionSchema),
  });

  const saveTransaction: SubmitHandler<
    FormTransactionType
  > = async transactionData => {
    try {
      const response = await api.post(
        paths.post.createTransaction,
        transactionData,
      );
      handleClose();
      console.log('Transação criada com sucesso:', response.data);
    } catch (error) {
      handleClose();
      if (error instanceof ZodError) {
        console.error('Erro ao criar a categoria:', error.errors);
      }
    }
  };

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

        <form onSubmit={handleSubmit(saveTransaction)}>
          <Content>
            <InputGroup>
              <label>Categoria</label>
              <select {...register('categoryId')}>
                <option selected>Selecione uma categoria</option>
                {categories && categories.length > 0 ? (
                  categories.map((category: CategoryType) => {
                    // console.log(category.title);
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
              {errors.categoryId && <p>{errors.categoryId.message}</p>}
            </InputGroup>
            <Input
              {...register('title')}
              label="Nome"
              placeholder="Nome da transação..."
            />
            {errors.title && <p>{errors.title.message}</p>}
            <InputGroup>
              <label>Valor</label>
              <CurrencyInput
                {...register('amount')}
                placeholder="R$ 0,00"
                format="currency"
                currency="BRL"
              />
            </InputGroup>
            {errors.amount && <p>{errors.amount.message}</p>}
            <InputMask
              {...register('date')}
              component={Input}
              mask="dd/mm/aaaa"
              replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
              label="Data"
              variant="black"
              placeholder="dd/mm/aaaa"
            />
            {errors.date && <p>{errors.date.message}</p>}
            <RadioForm>
              <RadioGroup>
                <input
                  {...register('type')}
                  type="radio"
                  name="type"
                  id="income"
                  value="income"
                />
                <label htmlFor="income">Receita</label>
              </RadioGroup>
              <RadioGroup>
                <input
                  {...register('type')}
                  type="radio"
                  name="type"
                  id="expense"
                  value="expense"
                />
                <label htmlFor="expense">Gasto</label>
              </RadioGroup>
            </RadioForm>
            {errors.type && <p>{errors.type.message}</p>}
          </Content>

          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Cancelar
            </Button>
            <Button>Cadastrar</Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  );
}
