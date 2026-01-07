import { Ingredient } from './types';

/**
 * Scale ingredient amounts based on original and new serving sizes
 */
export function scaleIngredients(
  ingredients: Ingredient[],
  originalServings: number,
  newServings: number
): Ingredient[] {
  const scaleFactor = newServings / originalServings;
  
  return ingredients.map(ingredient => ({
    ...ingredient,
    amount: parseFloat((ingredient.amount * scaleFactor).toFixed(2)),
  }));
}

/**
 * Format ingredient amount with proper fractions
 */
export function formatAmount(amount: number): string {
  const fractions: { [key: number]: string } = {
    0.25: '¼',
    0.33: '⅓',
    0.5: '½',
    0.66: '⅔',
    0.75: '¾',
  };

  const whole = Math.floor(amount);
  const decimal = amount - whole;
  
  // Check if decimal is close to a common fraction
  for (const [dec, frac] of Object.entries(fractions)) {
    if (Math.abs(decimal - parseFloat(dec)) < 0.05) {
      return whole > 0 ? `${whole} ${frac}` : frac;
    }
  }
  
  // Return as is if not a common fraction
  return amount % 1 === 0 ? whole.toString() : amount.toFixed(2);
}

/**
 * Format full ingredient string
 */
export function formatIngredient(ingredient: Ingredient): string {
  const amount = formatAmount(ingredient.amount);
  return `${amount} ${ingredient.unit} ${ingredient.name}`;
}
