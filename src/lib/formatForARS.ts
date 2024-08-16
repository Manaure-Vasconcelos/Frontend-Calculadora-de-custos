import { IngredientProps } from '@/components/AllRecipesDashboard';

export default function formatForARS(
  num: number | undefined,
  additional?: IngredientProps[]
) {
  if (!num)
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(0);

  if (additional) {
    const newValue = additional.reduce(
      (total: number, additional: IngredientProps) =>
        total + additional.realAmount,
      num
    );

    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(newValue);
  }

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(num);
}
