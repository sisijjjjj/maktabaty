import { Component, OnInit } from '@angular/core';

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

interface RatingFilter {
  stars: number;
  label: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  brand: string;
  image: string;
  discount?: number;
  featured?: boolean;
}

interface SelectedFilters {
  priceRange: PriceRange | null;
  minRating: number | null;
  brands: string[];
  inStock: boolean;
  onSale: boolean;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  // Filtres actifs
  activeCategory: string = 'all';
  activeSubcategory: string = 'all';
  sortBy: string = 'popular';
  
  // Catégories principales
  categories = [
    {
      id: 'books',
      name: 'Livres 📚',
      icon: 'fas fa-book',
      subcategories: [
        { id: 'fiction', name: 'Fiction & Romans 📖' },
        { id: 'school', name: 'Scolaire 🎒' },
        { id: 'children', name: 'Jeunesse 👧' },
        { id: 'science', name: 'Sciences 🔬' },
        { id: 'history', name: 'Histoire 🏛️' },
        { id: 'art', name: 'Art & Culture 🎨' }
      ]
    },
    {
      id: 'supplies',
      name: 'Fournitures ✏️',
      icon: 'fas fa-pencil-alt',
      subcategories: [
        { id: 'writing', name: 'Écriture 🖊️' },
        { id: 'paper', name: 'Papeterie 📄' },
        { id: 'geometry', name: 'Géométrie 📐' },
        { id: 'organization', name: 'Organisation 🗂️' },
        { id: 'art-supplies', name: 'Arts 🎨' }
      ]
    },
    {
      id: 'packs',
      name: 'Packs 🎒',
      icon: 'fas fa-box',
      subcategories: [
        { id: 'primary', name: 'Primaire 👦' },
        { id: 'middle-school', name: 'Collège 👧' },
        { id: 'high-school', name: 'Lycée 🎓' },
        { id: 'university', name: 'Université 🏫' }
      ]
    },
    {
      id: 'digital',
      name: 'Digital 💻',
      icon: 'fas fa-laptop',
      subcategories: [
        { id: 'ebooks', name: 'E-books 📱' },
        { id: 'software', name: 'Logiciels 🖥️' },
        { id: 'accessories', name: 'Accessoires ⌨️' }
      ]
    }
  ];

  // Produits par catégorie
  categoryProducts: Product[] = [];
  
  // Filtres disponibles
  filters = {
    priceRanges: [
      { label: 'Moins de 10€', min: 0, max: 10 },
      { label: '10€ - 25€', min: 10, max: 25 },
      { label: '25€ - 50€', min: 25, max: 50 },
      { label: 'Plus de 50€', min: 50, max: 1000 }
    ] as PriceRange[],
    ratings: [
      { stars: 5, label: '5 étoiles ⭐' },
      { stars: 4, label: '4 étoiles & plus ⭐' },
      { stars: 3, label: '3 étoiles & plus ⭐' }
    ] as RatingFilter[],
    brands: [
      'Oxford 📓', 'Clairefontaine 🏷️', 'Maped ✏️', 'Bic 🖊️', 
      'Stabilo 🎨', 'Pilot ✒️', 'Eastpak 🎒', 'Hachette 📚'
    ] as string[]
  };

  // Produits d'exemple
  allProducts: Product[] = [
    // Livres - Fiction
    {
      id: 1,
      name: 'L\'Étranger',
      category: 'books',
      subcategory: 'fiction',
      price: 8.90,
      originalPrice: 12.90,
      rating: 4,
      reviews: 128,
      brand: 'Gallimard',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      discount: 20,
      featured: true
    },
    {
      id: 2,
      name: 'Harry Potter à l\'école des sorciers',
      category: 'books',
      subcategory: 'fiction',
      price: 15.90,
      rating: 5,
      reviews: 456,
      brand: 'Gallimard Jeunesse',
      image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      featured: true
    },
    
    // Livres - Scolaire
    {
      id: 3,
      name: 'Bescherelle - Conjugaison',
      category: 'books',
      subcategory: 'school',
      price: 6.50,
      rating: 4,
      reviews: 89,
      brand: 'Hatier',
      image: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },

    // Fournitures - Écriture
    {
      id: 4,
      name: 'Stylos plume calligraphie',
      category: 'supplies',
      subcategory: 'writing',
      price: 24.90,
      originalPrice: 29.90,
      rating: 4,
      reviews: 67,
      brand: 'Pilot',
      image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      discount: 15
    },

    // Fournitures - Papeterie
    {
      id: 5,
      name: 'Cahiers A4 96 pages - Pack de 5',
      category: 'supplies',
      subcategory: 'paper',
      price: 12.90,
      rating: 5,
      reviews: 234,
      brand: 'Oxford',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },

    // Packs - Primaire
    {
      id: 6,
      name: 'Pack Primaire Complet',
      category: 'packs',
      subcategory: 'primary',
      price: 49.90,
      originalPrice: 69.90,
      rating: 4,
      reviews: 156,
      brand: 'Maktabaty',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      discount: 29,
      featured: true
    },

    // Digital - E-books
    {
      id: 7,
      name: 'Collection complète Harry Potter - E-book',
      category: 'digital',
      subcategory: 'ebooks',
      price: 39.90,
      originalPrice: 59.90,
      rating: 5,
      reviews: 89,
      brand: 'Pottermore',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      discount: 33
    }
  ];

  // Filtres sélectionnés
  selectedFilters: SelectedFilters = {
    priceRange: null,
    minRating: null,
    brands: [],
    inStock: false,
    onSale: false
  };

  // Propriétés calculées pour le template
  currentSubcategories: any[] = [];
  currentCategoryName: string = '';
  currentSubcategoryName: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.updateTemplateProperties();
    this.loadCategoryProducts();
  }

  // Mettre à jour les propriétés pour le template
  updateTemplateProperties(): void {
    // Sous-catégories actuelles
    const currentCategory = this.categories.find(c => c.id === this.activeCategory);
    this.currentSubcategories = currentCategory ? currentCategory.subcategories : [];
    
    // Nom de la catégorie actuelle
    this.currentCategoryName = currentCategory ? currentCategory.name : '';
    
    // Nom de la sous-catégorie actuelle
    if (this.activeSubcategory !== 'all' && currentCategory) {
      const subcat = currentCategory.subcategories.find(s => s.id === this.activeSubcategory);
      this.currentSubcategoryName = subcat ? subcat.name : '';
    } else {
      this.currentSubcategoryName = '';
    }
  }

  // Charger les produits par catégorie
  loadCategoryProducts(): void {
    let filteredProducts = [...this.allProducts];

    // Filtre par catégorie principale
    if (this.activeCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === this.activeCategory
      );
    }

    // Filtre par sous-catégorie
    if (this.activeSubcategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.subcategory === this.activeSubcategory
      );
    }

    // Appliquer les autres filtres
    filteredProducts = this.applyFilters(filteredProducts);

    // Trier les produits
    filteredProducts = this.sortProducts(filteredProducts);

    // Pagination
    this.totalPages = Math.ceil(filteredProducts.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.categoryProducts = filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Appliquer les filtres
  applyFilters(products: Product[]): Product[] {
    let filtered = products;

    // Filtre par prix
    if (this.selectedFilters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= this.selectedFilters.priceRange!.min && 
        product.price <= this.selectedFilters.priceRange!.max
      );
    }

    // Filtre par rating
    if (this.selectedFilters.minRating) {
      filtered = filtered.filter(product => 
        product.rating >= this.selectedFilters.minRating!
      );
    }

    // Filtre par marques
    if (this.selectedFilters.brands.length > 0) {
      filtered = filtered.filter(product => 
        this.selectedFilters.brands.includes(product.brand)
      );
    }

    // Filtre produits en stock
    if (this.selectedFilters.inStock) {
      // Simuler des produits en stock
      filtered = filtered.filter((_, index) => index % 3 !== 0);
    }

    // Filtre produits en promotion
    if (this.selectedFilters.onSale) {
      filtered = filtered.filter(product => product.discount);
    }

    return filtered;
  }

  // Trier les produits
  sortProducts(products: Product[]): Product[] {
    switch (this.sortBy) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return products.sort((a, b) => b.id - a.id);
      case 'popular':
      default:
        return products.sort((a, b) => b.reviews - a.reviews);
    }
  }

  // Changer de catégorie
  selectCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.activeSubcategory = 'all';
    this.currentPage = 1;
    this.updateTemplateProperties();
    this.loadCategoryProducts();
  }

  // Changer de sous-catégorie
  selectSubcategory(subcategoryId: string): void {
    this.activeSubcategory = subcategoryId;
    this.currentPage = 1;
    this.updateTemplateProperties();
    this.loadCategoryProducts();
  }

  // Appliquer les filtres
  applyFilter(filterType: string, value: any): void {
    switch (filterType) {
      case 'price':
        this.selectedFilters.priceRange = value;
        break;
      case 'rating':
        this.selectedFilters.minRating = value;
        break;
      case 'brand':
        const index = this.selectedFilters.brands.indexOf(value);
        if (index > -1) {
          this.selectedFilters.brands.splice(index, 1);
        } else {
          this.selectedFilters.brands.push(value);
        }
        break;
      case 'stock':
        this.selectedFilters.inStock = value;
        break;
      case 'sale':
        this.selectedFilters.onSale = value;
        break;
    }
    this.currentPage = 1;
    this.loadCategoryProducts();
  }

  // Réinitialiser les filtres
  resetFilters(): void {
    this.selectedFilters = {
      priceRange: null,
      minRating: null,
      brands: [],
      inStock: false,
      onSale: false
    };
    this.sortBy = 'popular';
    this.currentPage = 1;
    this.loadCategoryProducts();
  }

  // Changer de page
  changePage(page: number): void {
    this.currentPage = page;
    this.loadCategoryProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Générer les numéros de page
  getPageNumbers(): number[] {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  // Ajouter au panier (à adapter selon votre implémentation)
  addToCart(product: Product): void {
    console.log('Ajouter au panier:', product);
    // Implémentez la logique d'ajout au panier ici
  }

  // Ajouter aux favoris
  addToFavorites(product: Product): void {
    console.log('Ajouter aux favoris:', product);
    // Implémentez la logique des favoris ici
  }

  // Méthode pour gérer les changements de checkbox
  onBrandFilterChange(brand: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.applyFilter('brand', brand);
  }

  // Méthode pour gérer les changements de checkbox stock
  onStockFilterChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.applyFilter('stock', isChecked);
  }

  // Méthode pour gérer les changements de checkbox promotion
  onSaleFilterChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.applyFilter('sale', isChecked);
  }

  // Méthode pour calculer l'étoile moitié
  shouldShowHalfStar(star: number, rating: number): boolean {
    return star === Math.ceil(rating) && rating % 1 !== 0;
  }

  // Newsletter
  subscribeNewsletter(email: string): void {
    if (email && this.validateEmail(email)) {
      console.log('Inscription newsletter:', email);
      alert('Merci pour votre inscription à la newsletter ! 🎉');
      // Réinitialiser le champ
      const input = document.querySelector('input[type="email"]') as HTMLInputElement;
      if (input) input.value = '';
    } else {
      alert('Veuillez entrer une adresse email valide.');
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}