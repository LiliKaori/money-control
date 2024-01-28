export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  };
  return new Date(date).toLocaleDateString('pt-BR', options);
}

export function formatFormDate(date: string): string {
  const partes = date.split('/');
  const dateFormated = partes[2] + '-' + partes[1] + '-' + partes[0];
  return dateFormated;
}
