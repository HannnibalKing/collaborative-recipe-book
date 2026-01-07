export interface Recipe {
  id: string;
  title: string;
  description: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  image?: string;
  author: string;
  createdAt: Date;
  tags: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category?: 'protein' | 'vegetable' | 'spice' | 'dairy' | 'grain' | 'other';
  substitutions?: string[];
}

export interface Instruction {
  id: string;
  step: number;
  text: string;
  duration?: number; // in minutes
  image?: string;
}

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  sharedWith: string[];
  createdBy: string;
  updatedAt: Date;
}

export interface GroceryItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  checked: boolean;
  addedBy: string;
  category?: string;
}
