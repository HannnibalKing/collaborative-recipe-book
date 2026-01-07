import Link from 'next/link';
import { ChefHat, Calculator, Mic, ShoppingCart, Camera } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <ChefHat className="w-16 h-16 text-primary-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Collaborative Recipe Book
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A social cooking experience with minimal friction. Scale recipes, cook hands-free, and share with friends.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Calculator className="w-8 h-8" />}
            title="Ingredient Scaling"
            description="Instantly scale recipes from 2 to 8 servings (or any number) with automatic calculation"
            href="/scale"
          />
          
          <FeatureCard
            icon={<Mic className="w-8 h-8" />}
            title="Voice Control"
            description="Hands-free cooking mode with voice commands. No more messy phone screens!"
            href="/cook"
          />
          
          <FeatureCard
            icon={<ShoppingCart className="w-8 h-8" />}
            title="Shared Grocery Lists"
            description="Real-time syncing grocery lists that update instantly across all devices"
            href="/grocery"
          />
          
          <FeatureCard
            icon={<Camera className="w-8 h-8" />}
            title="Photo Upload"
            description="Share your creations with automatic cropping and beautiful filters"
            href="/recipes/new"
          />
          
          <FeatureCard
            icon={<ChefHat className="w-8 h-8" />}
            title="Smart Substitutions"
            description="Get intelligent ingredient substitution suggestions when you're missing items"
            href="/recipes"
          />
          
          <FeatureCard
            icon={<ChefHat className="w-8 h-8" />}
            title="Recipe Collection"
            description="Browse and save your favorite recipes from the community"
            href="/recipes"
          />
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/recipes"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description, href }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full">
        <div className="text-primary-600 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </Link>
  );
}
