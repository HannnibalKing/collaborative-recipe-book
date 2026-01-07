import { Ingredient } from './types';

interface SubstitutionRule {
  ingredient: string;
  substitutes: { name: string; ratio: number; note?: string }[];
}

const substitutionRules: SubstitutionRule[] = [
  {
    ingredient: 'butter',
    substitutes: [
      { name: 'coconut oil', ratio: 1, note: 'Use melted for best results' },
      { name: 'olive oil', ratio: 0.75, note: 'Reduce slightly for baking' },
      { name: 'applesauce', ratio: 0.5, note: 'For baking only, reduces fat' },
    ],
  },
  {
    ingredient: 'milk',
    substitutes: [
      { name: 'almond milk', ratio: 1 },
      { name: 'oat milk', ratio: 1 },
      { name: 'coconut milk', ratio: 1 },
    ],
  },
  {
    ingredient: 'eggs',
    substitutes: [
      { name: 'flax eggs', ratio: 1, note: '1 tbsp flax + 3 tbsp water per egg' },
      { name: 'applesauce', ratio: 1, note: '¼ cup per egg, for baking' },
      { name: 'mashed banana', ratio: 1, note: '¼ cup per egg' },
    ],
  },
  {
    ingredient: 'all-purpose flour',
    substitutes: [
      { name: 'whole wheat flour', ratio: 1, note: 'May make denser' },
      { name: 'almond flour', ratio: 1, note: 'Gluten-free, different texture' },
      { name: 'oat flour', ratio: 1.25, note: 'Use slightly more' },
    ],
  },
  {
    ingredient: 'sugar',
    substitutes: [
      { name: 'honey', ratio: 0.75, note: 'Reduce liquid by ¼ cup' },
      { name: 'maple syrup', ratio: 0.75, note: 'Reduce liquid by 3 tbsp' },
      { name: 'coconut sugar', ratio: 1 },
    ],
  },
];

export function getSubstitutions(ingredientName: string): { name: string; ratio: number; note?: string }[] {
  const normalized = ingredientName.toLowerCase().trim();
  
  for (const rule of substitutionRules) {
    if (normalized.includes(rule.ingredient)) {
      return rule.substitutes;
    }
  }
  
  return [];
}

export function applySubstitution(
  ingredient: Ingredient,
  substituteName: string,
  ratio: number
): Ingredient {
  return {
    ...ingredient,
    name: substituteName,
    amount: parseFloat((ingredient.amount * ratio).toFixed(2)),
  };
}
