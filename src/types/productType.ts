export interface ProductReviews {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
  }

export interface ProdcutDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Product {
    id: number;                      
    title: string;                    
    description: string;             
    category: string;
    price: number;                   
    discountPercentage: number;
    dimensions: ProdcutDimensions;
    weight: number;
    images: string[];                
    stock: number;                
    rating?: number; 
    reviews: ProductReviews[];
    quantity?: number;        
    isFavorite?: boolean;
  }

  export interface ProductsList {
    products: Product[];
    total: number;                              
  }