export default function formatForBRL(num: number) {
  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}
