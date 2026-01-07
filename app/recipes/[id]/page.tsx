import { notFound } from 'next/navigation';
import { sampleRecipes } from '@/lib/sample-data';
import IngredientScaler from '@/components/IngredientScaler';
import CookingMode from '@/components/CookingMode';
import { Clock, Users, ChefHat } from 'lucide-react';

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const recipe = sampleRecipes.find((r) => r.id === params.id);

  if (!recipe) {
    notFound();
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{recipe.description}</p>

          <div className="flex items-center gap-6 text-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              <span>
                <strong>Total:</strong> {totalTime} min
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              <span>
                <strong>Servings:</strong> {recipe.servings}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-primary-600" />
              <span>
                <strong>By:</strong> {recipe.author}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Ingredient Scaler */}
          <div className="lg:col-span-1">
            <IngredientScaler recipe={recipe} />
          </div>

          {/* Cooking Mode */}
          <div className="lg:col-span-2">
            <CookingMode recipe={recipe} />
          </div>
        </div>
      </div>
    </div>
  );
}
