'use client';

import { useState } from 'react';
import { Recipe, Ingredient } from '@/lib/types';
import { scaleIngredients, formatIngredient } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

interface IngredientScalerProps {
  recipe: Recipe;
  onServingsChange?: (newServings: number) => void;
}

export default function IngredientScaler({ recipe, onServingsChange }: IngredientScalerProps) {
  const [servings, setServings] = useState(recipe.servings);
  const [scaledIngredients, setScaledIngredients] = useState<Ingredient[]>(recipe.ingredients);

  const updateServings = (newServings: number) => {
    if (newServings < 1) return;
    
    setServings(newServings);
    const scaled = scaleIngredients(recipe.ingredients, recipe.servings, newServings);
    setScaledIngredients(scaled);
    
    if (onServingsChange) {
      onServingsChange(newServings);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Adjust Servings</h3>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => updateServings(servings - 1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
            disabled={servings <= 1}
            aria-label="Decrease servings"
          >
            <Minus className="w-5 h-5" />
          </button>
          
          <div className="flex-1 text-center">
            <div className="text-3xl font-bold text-primary-600">{servings}</div>
            <div className="text-sm text-gray-600">servings</div>
          </div>
          
          <button
            onClick={() => updateServings(servings + 1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Increase servings"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex gap-2 flex-wrap justify-center">
          {[2, 4, 6, 8, 12].map((count) => (
            <button
              key={count}
              onClick={() => updateServings(count)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                servings === count
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Ingredients</h4>
        <ul className="space-y-2">
          {scaledIngredients.map((ingredient) => (
            <li
              key={ingredient.id}
              className="flex items-start gap-2 text-gray-700"
            >
              <span className="text-primary-600 mt-1">•</span>
              <span>{formatIngredient(ingredient)}</span>
            </li>
          ))}
        </ul>
      </div>

      {servings !== recipe.servings && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Recipe scaled from {recipe.servings} to {servings} servings
          </p>
        </div>
      )}
    </div>
  );
}
