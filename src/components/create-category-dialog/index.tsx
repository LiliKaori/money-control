import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ZodError, z } from 'zod';

import { api } from '../../services/api';
import { paths } from '../../services/paths';
// import { CategoryType } from '../../types/category.type';
import { Button } from '../button';
import { Dialog } from '../dialog';
import { Input } from '../input';
import { Title } from '../title';
import { Container } from './styles';

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);

  // const inputTitle = useRef<HTMLInputElement>(null);
  // const inputColor = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const schema = z.object({
    title: z.string().min(1, { message: 'O nome é obrigatório' }),
    color: z.string(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const saveCategory: SubmitHandler<FormData> = async categoryData => {
    try {
      const response = await api.post(paths.post.createCategory, categoryData);
      console.log('Categoria criada com sucesso:', response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Erro ao criar a categoria:', error.errors);
      }
    }
  };

  // const onSubmit = useCallback(async () => {
  //   const newCategory: CategoryType = {
  //     title: inputTitle.current ? inputTitle.current.value : null,
  //     color: inputColor.current ? inputColor.current.value : null,
  //   };

  //   await saveCategory(newCategory);

  //   handleClose();
  // }, [handleClose, inputTitle, inputColor]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova categoria</Button>}
    >
      <Container>
        <Title
          title="Nova Categoria"
          subtitle="Crie uma nova categoria para suas transações"
        />

        <form onSubmit={handleSubmit(saveCategory)}>
          <div>
            <Input
              {...register('title')}
              label="Nome"
              placeholder="Nome da categoria..."
            />
            {errors.title && <p>{errors.title.message}</p>}

            <Input {...register('color')} label="Cor" type="color" />
            {errors.color && <p>{errors.color.message}</p>}
          </div>
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
