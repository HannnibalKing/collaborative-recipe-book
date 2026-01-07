import { sampleRecipes } from '@/lib/sample-data';
import RecipeCard from '@/components/RecipeCard';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function RecipesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Recipe Collection</h1>
            <p className="text-gray-600">Discover and share amazing recipes</p>
          </div>
          <Link
            href="/recipes/new"
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Recipe
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
