import { useCallback, useRef, useState } from 'react';

import { api } from '../../services/api';
import { paths } from '../../services/paths';
import { CategoryType } from '../../types/category.type';
import { Button } from '../button';
import { Dialog } from '../dialog';
import { Input } from '../input';
import { Title } from '../title';
import { Container } from './styles';

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);

  const inputTitle = useRef<HTMLInputElement>(null);
  const inputColor = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(async () => {
    const newCategory: CategoryType = {
      title: inputTitle.current ? inputTitle.current.value : null,
      color: inputColor.current ? inputColor.current.value : null,
    };

    await saveCategory(newCategory);

    handleClose();
  }, [handleClose, inputTitle, inputColor]);

  const saveCategory = async (categoryData: CategoryType) => {
    try {
      const response = await api.post(paths.post.createCategory, categoryData);
      console.log('Categoria criada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar a categoria:', error);
    }
  };

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

        <form>
          <div>
            <Input
              ref={inputTitle}
              label="Nome"
              placeholder="Nome da categoria..."
            />

            <Input ref={inputColor} label="Cor" type="color" />
          </div>
          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Cancelar
            </Button>
            <Button onClick={onSubmit} type="button">
              Cadastrar
            </Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  );
}
