import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  // Filtrage actif
  activeSort: string = 'relevance';
  activeCategory: string = 'all';
  activePrice: string = 'all';
  activeDiscount: string = 'all';

  // Données de recherche
  searchQuery: string = '';
  showSuggestions: boolean = false;
  searchSuggestions: string[] = [
    'Promotions livres',
    'Fournitures soldées',
    'Packs rentrée -50%',
    'Cahiers promotion',
    'Stylos discount',
    'Romans -30%',
    'Matériel scolaire soldé'
  ];

  // Panier
  cartCount: number = 0;
  cartOpen: boolean = false;
  cartItems: any[] = [];
  cartTotal: number = 0;

  // Compte à rebours promo
  countdown = {
    days: 15,
    hours: 8,
    minutes: 45
  };

  // Tous les produits disponibles
  allProducts = [
    {
      id: 1,
      title: 'L\'Étranger',
      author: 'Albert Camus',
      price: 8.90,
      originalPrice: 29.90,
      rating: 4,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: 70,
      timeLeft: '2j 5h',
      category: 'books',
      featured: true
    },
    {
      id: 2,
      title: 'Cahier A4 96 pages',
      author: 'Oxford',
      price: 3.50,
      originalPrice: 7.00,
      rating: 5,
      reviews: 89,
      image: 'https://th.bing.com/th/id/OIP._MC-bXgTTucrO94g1We1DQHaFj?w=284&h=213&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1',
      discount: 50,
      timeLeft: '5j 12h',
      category: 'supplies',
      featured: false
    },
    {
      id: 3,
      title: 'Sac à dos scolaire',
      author: 'Eastpak',
      price: 29.90,
      originalPrice: 42.70,
      rating: 4,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      discount: 30,
      timeLeft: '1j 18h',
      category: 'supplies',
      featured: true
    },
    {
      id: 4,
      title: '1984',
      author: 'George Orwell',
      price: 9.90,
      originalPrice: 16.50,
      rating: 4,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: 40,
      timeLeft: '3j 7h',
      category: 'books',
      featured: false
    },
    {
      id: 5,
      title: 'Dune',
      author: 'Frank Herbert',
      price: 12.90,
      originalPrice: 17.20,
      rating: 4,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: 25,
      timeLeft: '6j 2h',
      category: 'books',
      featured: false
    },
    {
      id: 6,
      title: 'Trousse complète',
      author: 'Maped',
      price: 15.90,
      originalPrice: 39.75,
      rating: 5,
      reviews: 92,
      image: 'https://th.bing.com/th/id/OIP.iqZTw1WUvE3Wi0zWe37cSAHaHF?w=175&h=180&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
      discount: 60,
      timeLeft: '2j 14h',
      category: 'supplies',
      featured: true
    },
    {
      id: 7,
      title: 'Harry Potter à l\'école des sorciers',
      author: 'J.K. Rowling',
      price: 15.90,
      originalPrice: 24.50,
      rating: 5,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: 35,
      timeLeft: '4j 9h',
      category: 'books',
      featured: false
    },
    {
      id: 8,
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      price: 6.50,
      originalPrice: 8.10,
      rating: 5,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: 20,
      timeLeft: '7j 3h',
      category: 'books',
      featured: false
    },
    {
      id: 9,
      title: 'Stylos à encre gel',
      author: 'Pilot',
      price: 12.90,
      originalPrice: 23.45,
      rating: 4,
      reviews: 67,
      image: 'https://th.bing.com/th/id/OIP.zlSs1z_RZxtknoSsyxqXMAHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3',
      discount: 45,
      timeLeft: '2j 22h',
      category: 'supplies',
      featured: false
    },
    {
      id: 10,
      title: 'Marqueurs fluo',
      author: 'Stabilo',
      price: 8.50,
      originalPrice: 18.90,
      rating: 5,
      reviews: 124,
      image: 'https://th.bing.com/th/id/OIP.JJMqtnLvwJYDs-PDMdu5xAHaHa?w=216&h=216&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
      discount: 55,
      timeLeft: '1j 11h',
      category: 'supplies',
      featured: false
    },
    {
      id: 11,
      title: 'Pack Primaire Complet',
      author: 'Maktabaty',
      price: 49.90,
      originalPrice: 69.90,
      rating: 5,
      reviews: 78,
      image: 'https://tse2.mm.bing.net/th/id/OIP.jQmWBefqMmFjWn9vMJOFmAHaHa?cb=ucfimgc2&w=848&h=848&rs=1&pid=ImgDetMain&o=7&rm=3',
      discount: 29,
      timeLeft: '10j 6h',
      category: 'packs',
      featured: true
    },
    {
      id: 12,
      title: 'Calculatrice scientifique',
      author: 'Casio',
      price: 24.90,
      originalPrice: 39.90,
      rating: 4,
      reviews: 203,
      image: 'https://th.bing.com/th/id/OIP.5vxWjJ1cJ6O7q9Q9Q9Q9Q9QHaHa?w=168&h=180&c=7&r=0&o=5&pid=1.7',
      discount: 38,
      timeLeft: '3j 15h',
      category: 'supplies',
      featured: false
    },
    {
      id: 13,
      title: 'Le Seigneur des Anneaux',
      author: 'J.R.R. Tolkien',
      price: 18.90,
      originalPrice: 29.90,
      rating: 5,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: 37,
      timeLeft: '5j 8h',
      category: 'books',
      featured: true
    },
    {
      id: 14,
      title: 'Classeur 4 anneaux',
      author: 'Rexel',
      price: 7.90,
      originalPrice: 12.90,
      rating: 4,
      reviews: 89,
      image: 'https://th.bing.com/th/id/OIP.8Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9QHaHa?w=168&h=180&c=7&r=0&o=5&pid=1.7',
      discount: 39,
      timeLeft: '2j 20h',
      category: 'supplies',
      featured: false
    },
    {
      id: 15,
      title: 'Orgueil et Préjugés',
      author: 'Jane Austen',
      price: 10.90,
      originalPrice: 16.90,
      rating: 5,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: 36,
      timeLeft: '4j 12h',
      category: 'books',
      featured: false
    },
    {
      id: 16,
      title: 'Feutres de couleur',
      author: 'Crayola',
      price: 14.90,
      originalPrice: 24.90,
      rating: 4,
      reviews: 156,
      image: 'https://th.bing.com/th/id/OIP.9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9QHaHa?w=168&h=180&c=7&r=0&o=5&pid=1.7',
      discount: 40,
      timeLeft: '1j 23h',
      category: 'supplies',
      featured: false
    },
    {
      id: 17,
      title: 'Pack Collège Essentiel',
      author: 'Maktabaty',
      price: 79.90,
      originalPrice: 99.90,
      rating: 4,
      reviews: 112,
      image: 'https://tse3.mm.bing.net/th/id/OIP.jKnc56h8QmK2ZojRCbXU4AHaNK?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3',
      discount: 20,
      timeLeft: '8j 4h',
      category: 'packs',
      featured: true
    },
    {
      id: 18,
      title: 'Cahier de textes',
      author: 'Clairefontaine',
      price: 5.90,
      originalPrice: 9.90,
      rating: 4,
      reviews: 234,
      image: 'https://th.bing.com/th/id/OIP.0Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9QHaHa?w=168&h=180&c=7&r=0&o=5&pid=1.7',
      discount: 41,
      timeLeft: '3j 9h',
      category: 'supplies',
      featured: false
    },
    {
      id: 19,
      title: 'Les Misérables',
      author: 'Victor Hugo',
      price: 11.90,
      originalPrice: 19.90,
      rating: 4,
      reviews: 278,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: 40,
      timeLeft: '6j 17h',
      category: 'books',
      featured: false
    },
    {
      id: 20,
      title: 'Pack Lycée Premium',
      author: 'Maktabaty',
      price: 129.90,
      originalPrice: 169.90,
      rating: 5,
      reviews: 67,
      image: 'https://img.freepik.com/premium-vector/school-bag-with-supplies-school_1278344-2339.jpg',
      discount: 24,
      timeLeft: '12j 2h',
      category: 'packs',
      featured: true
    }
  ];

  // Produits filtrés
  filteredProducts: any[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;
  displayedProducts: any[] = [];

  // Newsletter
  newsletterEmail: string = '';

  constructor() { }

  ngOnInit(): void {
    this.startCountdown();
    this.filteredProducts = [...this.allProducts];
    this.calculatePagination();
    this.loadCartFromStorage();
    this.animateOnScroll();
  }

  // Filtrage
  setActiveSort(sort: string): void {
    this.activeSort = sort;
    this.applyFilters();
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.applyFilters();
  }

  setActivePrice(price: string): void {
    this.activePrice = price;
    this.applyFilters();
  }

  setActiveDiscount(discount: string): void {
    this.activeDiscount = discount;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.allProducts];

    // Filtre par catégorie
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.activeCategory);
    }

    // Filtre par prix
    if (this.activePrice !== 'all') {
      switch (this.activePrice) {
        case 'under10':
          filtered = filtered.filter(product => product.price < 10);
          break;
        case '10-25':
          filtered = filtered.filter(product => product.price >= 10 && product.price <= 25);
          break;
        case '25-50':
          filtered = filtered.filter(product => product.price >= 25 && product.price <= 50);
          break;
        case 'over50':
          filtered = filtered.filter(product => product.price > 50);
          break;
      }
    }

    // Filtre par réduction
    if (this.activeDiscount !== 'all') {
      const discountValue = parseInt(this.activeDiscount);
      filtered = filtered.filter(product => product.discount >= discountValue);
    }

    // Tri
    switch (this.activeSort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'discount-desc':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Pertinence - produits featured d'abord
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    this.filteredProducts = filtered;
    this.currentPage = 1;
    this.calculatePagination();
  }

  // Recherche
  onSearch(): void {
    this.showSuggestions = this.searchQuery.length > 2;
    
    if (this.searchQuery.trim() === '') {
      this.applyFilters();
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.allProducts.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.author.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
    
    this.currentPage = 1;
    this.calculatePagination();
  }

  selectSuggestion(suggestion: string): void {
    this.searchQuery = suggestion;
    this.showSuggestions = false;
    this.onSearch();
  }

  // Panier
  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }

  addToCart(product: any, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        author: product.author
      });
    }
    
    this.updateCartCount();
    this.calculateCartTotal();
    this.saveCartToStorage();
    
    // Animation d'ajout au panier
    this.animateAddToCart(event);
  }

  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.updateCartCount();
    this.calculateCartTotal();
    this.saveCartToStorage();
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.updateCartCount();
    this.calculateCartTotal();
    this.saveCartToStorage();
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeFromCart(item);
    }
    this.updateCartCount();
    this.calculateCartTotal();
    this.saveCartToStorage();
  }

  updateCartCount(): void {
    this.cartCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  calculateCartTotal(): void {
    this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  saveCartToStorage(): void {
    localStorage.setItem('maktabaty_cart', JSON.stringify(this.cartItems));
  }

  loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('maktabaty_cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCartCount();
      this.calculateCartTotal();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartCount();
    this.calculateCartTotal();
    this.saveCartToStorage();
  }

  animateAddToCart(event?: Event): void {
    // Animation du badge panier
    const cartBadge = document.querySelector('.cart-badge') as HTMLElement;
    if (cartBadge) {
      cartBadge.style.transform = 'scale(1.3)';
      setTimeout(() => {
        cartBadge.style.transform = 'scale(1)';
      }, 300);
    }

    // Animation de l'icône panier
    const cartIcon = document.querySelector('.header-action-item.cart') as HTMLElement;
    if (cartIcon) {
      cartIcon.classList.add('pulse');
      setTimeout(() => {
        cartIcon.classList.remove('pulse');
      }, 600);
    }
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Votre panier est vide !');
      return;
    }
    
    console.log('Commande passée:', this.cartItems);
    alert(`Commande validée ! Total: ${this.formatPrice(this.cartTotal)}€`);
    this.clearCart();
    this.cartOpen = false;
  }

  // Pagination
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProducts();
      this.scrollToTop();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
      this.scrollToTop();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
      this.scrollToTop();
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 600, behavior: 'smooth' });
  }

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

  // Compte à rebours promo
  startCountdown(): void {
    setInterval(() => {
      if (this.countdown.minutes > 0) {
        this.countdown.minutes--;
      } else if (this.countdown.hours > 0) {
        this.countdown.hours--;
        this.countdown.minutes = 59;
      } else if (this.countdown.days > 0) {
        this.countdown.days--;
        this.countdown.hours = 23;
        this.countdown.minutes = 59;
      }
    }, 60000);
  }

  // Newsletter
  subscribeNewsletter(): void {
    if (this.newsletterEmail && this.validateEmail(this.newsletterEmail)) {
      console.log('Inscription newsletter:', this.newsletterEmail);
      alert('Merci pour votre inscription ! Vous recevrez nos meilleures promotions par email.');
      this.newsletterEmail = '';
    } else {
      alert('Veuillez entrer une adresse email valide.');
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Header search
  toggleSearch(): void {
    const headerSearch = document.querySelector('.header-search');
    headerSearch?.classList.toggle('active');
  }

  // Authentication modals
  openLogin(): void {
    console.log('Ouvrir modale connexion');
  }

  openSignup(): void {
    console.log('Ouvrir modale inscription');
  }

  // Gestion du scroll pour les animations
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.animateOnScroll();
  }

  animateOnScroll(): void {
    const elements = document.querySelectorAll('.promo-product-card');
    
    elements.forEach((element, index) => {
      const position = element.getBoundingClientRect();
      
      if (position.top < window.innerHeight - 100) {
        setTimeout(() => {
          element.classList.add('animate-in');
        }, index * 100);
      }
    });
  }

  // Méthode pour calculer le pourcentage d'économie
  calculateSavings(product: any): number {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }

  // Méthode pour formater le prix
  formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',');
  }

  // Méthode pour obtenir le nombre de produits filtrés
  get filteredProductsCount(): number {
    return this.filteredProducts.length;
  }

  // Méthode pour réinitialiser les filtres
  resetFilters(): void {
    this.activeSort = 'relevance';
    this.activeCategory = 'all';
    this.activePrice = 'all';
    this.activeDiscount = 'all';
    this.searchQuery = '';
    this.applyFilters();
  }

  // Gestion des erreurs d'image
  handleImageError(event: any): void {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGQUZDIi8+CjxwYXRoIGQ9Ik03NSA1MEgxMjVWMTUwSDc1VjUwWiIgZmlsbD0iI0NCRDVFMSIvPgo8cGF0aCBkPSJNODUgNjBWMTQwSDExNVY2MEg4NVpNODUgNjBIMTE1VjE0MEg4NVY2MFoiIGZpbGw9IiM2NDc0OEIiLz4KPC9zdmc+';
    event.target.alt = 'Image non disponible';
  }
}