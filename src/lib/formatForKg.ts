export default function formatForKg(num: number) {
  // Converte o número para uma string com duas casas decimais
  const formattedWeight = num.toFixed(2).replace('.', ',');
  return `${formattedWeight} kg`;
}
