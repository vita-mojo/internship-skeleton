export interface ProductNutrition {
  [index: string]: number;
}

export interface ProductMetadata {
  dietary: string | undefined;
  ingredients: string;
  nutrition: ProductNutrition;
}

export interface ProductDetails {
  id: number;
  price: number;
  description: string;
  metadata: ProductMetadata;
  image: string;
  name: string;
}

export type ModifiersStateType = {
  [name: string]: Array<number>;
};

export type SelectedCategoryModifierType = {
  [name: string]: ModifiersStateType;
};

export interface CategoryModifierProps {
  productPrice: number;
}

export interface CategoryModifier {
  id: number;
  name: string;
  minSelection: number;
  maxSelection: number;
  productId: number;
  modifiers: Modifiers[];
}

export type Modifiers = {
  id: number;
  name: string;
  isDefault: boolean;
  price: number;
  modifierCategoryId: number;
  metadata: undefined;
};

export interface ProductSideProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    metadata: {
      dietary?: string;
      ingredients?: string;
      nutrition: {
        [key: string]: number;
      };
    };
  };
}
