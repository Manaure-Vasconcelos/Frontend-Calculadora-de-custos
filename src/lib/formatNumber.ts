export default function Format(num: number) {
  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}
