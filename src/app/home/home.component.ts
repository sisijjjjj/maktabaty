import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('categoriesSection') categoriesSection!: ElementRef;

  // Filtrage actif
  activeFilter: string = 'all';

  // Données de recherche
  searchQuery: string = '';
  showSuggestions: boolean = false;
  searchSuggestions: string[] = [
    'Harry Potter',
    'Stephen King',
    'Romans policiers',
    'Livres jeunesse',
    'Cahiers A4',
    'Stylos plume',
    'Sac à dos',
    'Marqueurs'
  ];

  // Panier
  cartCount: number = 3;
  cartOpen: boolean = false;
  cartItems: any[] = [
    {
      id: 1,
      name: 'L\'Étranger',
      price: 8.90,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      quantity: 1
    },
    {
      id: 6,
      name: 'Cahier A4 96 pages',
      price: 3.50,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      quantity: 2
    }
  ];
  cartTotal: number = 15.90;

  // Modales
  loginOpen: boolean = false;
  signupOpen: boolean = false;
  checkoutOpen: boolean = false;

  // Données de formulaire
  loginData = { email: '', password: '' };
  signupData = { 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  };
  paymentData = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholder: '',
    address: '',
    city: '',
    zipCode: ''
  };

  // Best-sellers avec images réelles
  bestSellers = [
    {
      id: 1,
      title: 'L\'Étranger',
      author: 'Albert Camus',
      price: 8.90,
      originalPrice: 12.90,
      rating: 4,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: 20,
      category: 'books'
    },
    {
      id: 2,
      title: 'Harry Potter à l\'école des sorciers',
      author: 'J.K. Rowling',
      price: 15.90,
      originalPrice: null,
      rating: 5,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: null,
      category: 'books'
    },
    {
      id: 3,
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      price: 6.50,
      originalPrice: null,
      rating: 5,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: null,
      category: 'books'
    },
    {
      id: 4,
      title: '1984',
      author: 'George Orwell',
      price: 9.90,
      originalPrice: 14.90,
      rating: 4,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: 30,
      category: 'books'
    },
    {
      id: 5,
      title: 'Dune',
      author: 'Frank Herbert',
      price: 12.90,
      originalPrice: null,
      rating: 4,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      discount: null,
      category: 'books'
    }
  ];

  // Fournitures scolaires avec images correspondantes
  schoolSupplies = [
    {
      id: 6,
      name: 'Cahier A4 96 pages',
      brand: 'Oxford',
      price: 3.50,
      originalPrice: 4.20,
      image: 'data:image/webp;base64,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',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'],
      selectedColor: '#FF6B6B',
      category: 'supplies'
    },
    {
      id: 7,
      name: 'Sac à dos scolaire',
      brand: 'Eastpak',
      price: 29.90,
      originalPrice: 39.90,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      colors: ['#2C3E50', '#E74C3C', '#3498DB', '#F1C40F'],
      selectedColor: '#2C3E50',
      category: 'cartables'
    },
    {
      id: 8,
      name: 'Stylos à encre gel',
      brand: 'Pilot',
      price: 12.90,
      originalPrice: null,
      image: 'https://tse3.mm.bing.net/th/id/OIP.zlSs1z_RZxtknoSsyxqXMAHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3',
      colors: ['#1ABC9C', '#9B59B6', '#E67E22', '#34495E'],
      selectedColor: '#1ABC9C',
      category: 'supplies'
    },
    {
      id: 9,
      name: 'Marqueurs fluo',
      brand: 'Stabilo',
      price: 8.50,
      originalPrice: 10.90,
      image: 'https://th.bing.com/th/id/OIP.JJMqtnLvwJYDs-PDMdu5xAHaHa?w=216&h=216&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
      colors: ['#FFFF00', '#FF00FF', '#00FF00', '#00FFFF'],
      selectedColor: '#FFFF00',
      category: 'supplies'
    },
    {
      id: 10,
      name: 'Bloc-notes adhésif',
      brand: 'Post-it',
      price: 5.20,
      originalPrice: null,
      image: 'https://th.bing.com/th/id/OIP.blhRq8Qazq0Ke7zQOXTIOgHaGy?w=232&h=212&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
      colors: ['#FF9999', '#99FF99', '#9999FF', '#FFFF99'],
      selectedColor: '#FF9999',
      category: 'supplies'
    },
    {
      id: 11,
      name: 'Trousse complète',
      brand: 'Maped',
      price: 15.90,
      originalPrice: 19.90,
      image: 'https://th.bing.com/th/id/OIP.iqZTw1WUvE3Wi0zWe37cSAHaHF?w=175&h=180&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'],
      selectedColor: '#FF6B6B',
      category: 'supplies'
    }
  ];

  // Packs de rentrée avec images correspondantes
  schoolPacks = [
    {
      id: 12,
      name: 'Pack Primaire Complet',
      description: 'Tout le nécessaire pour une rentrée en primaire',
      price: 49.90,
      originalPrice: 69.90,
      discount: 29,
      image: 'https://tse2.mm.bing.net/th/id/OIP.jQmWBefqMmFjWn9vMJOFmAHaHa?cb=ucfimgc2&w=848&h=848&rs=1&pid=ImgDetMain&o=7&rm=3',
      includes: [
        '5 cahiers 96 pages',
        'Trousse complète',
        'Stylos et crayons',
        'Règle et équerre'
      ],
      category: 'packs'
    },
    {
      id: 13,
      name: 'Pack Collège Essentiel',
      description: 'L\'essentiel pour réussir au collège',
      price: 79.90,
      originalPrice: 99.90,
      discount: 20,
      image: 'https://tse3.mm.bing.net/th/id/OIP.jKnc56h8QmK2ZojRCbXU4AHaNK?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3',
      includes: [
        '8 cahiers 96 pages',
        'Calculatrice scientifique',
        'Matériel géométrie',
        'Classeur et intercalaires'
      ],
      category: 'packs'
    },
    {
      id: 14,
      name: 'Pack Lycée Premium',
      description: 'Pack complet pour les études supérieures',
      price: 129.90,
      originalPrice: 169.90,
      discount: 24,
      image: 'https://img.freepik.com/premium-vector/school-bag-with-supplies-school_1278344-2339.jpg',
      includes: [
        '10 cahiers 96 pages',
        'Ordinateur portable',
        'Logiciels éducatifs',
        'Accessoires high-tech'
      ],
      category: 'packs'
    }
  ];

  carouselOffset: number = 0;
  currentSlide: number = 0;

  // Compte à rebours promo
  countdown = {
    days: 15,
    hours: 8,
    minutes: 45
  };

  // Témoignages
  testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Enseignante',
      text: 'Une sélection incroyable de livres pédagogiques. La livraison a été ultra-rapide et l\'emballage soigné. Je recommande vivement !',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Thomas Martin',
      role: 'Étudiant',
      text: 'J\'ai trouvé tous mes manuels universitaires à des prix imbattables. Le site est très intuitif et le service client réactif.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Sophie Lambert',
      role: 'Maman de deux enfants',
      text: 'Parfait pour les fournitures scolaires ! Qualité au rendez-vous et livraison express. Mes enfants adorent leurs nouveaux cahiers.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    }
  ];

  currentTestimonial: number = 0;

  // Newsletter
  newsletterEmail: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startCountdown();
    this.startTestimonialSlider();
    this.calculateCartTotal();
  }



  // Navigation vers promotions
  navigateToPromotions(): void {
    this.router.navigate(['/promotions']);
  }

  // Filtrage
  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }

  // Recherche
  onSearch(): void {
    this.showSuggestions = this.searchQuery.length > 2;
  }

  // Panier
  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }

  // Modales
  openLogin(): void {
    this.loginOpen = true;
  }

  closeLogin(): void {
    this.loginOpen = false;
  }

  openSignup(): void {
    this.signupOpen = true;
  }

  closeSignup(): void {
    this.signupOpen = false;
  }

  openCheckout(): void {
    this.checkoutOpen = true;
  }

  closeCheckout(): void {
    this.checkoutOpen = false;
  }

  // Navigation
  scrollToCategories(): void {
    this.categoriesSection.nativeElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }

  // Carousel best-sellers
  nextSlide(): void {
    if (this.currentSlide < this.bestSellers.length - 1) {
      this.currentSlide++;
      this.carouselOffset = -this.currentSlide * 320;
    }
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.carouselOffset = -this.currentSlide * 320;
    }
  }

  // Gestion du panier
  addToCart(product: any): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.title || product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    this.cartCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.calculateCartTotal();
    
    // Animation d'ajout au panier
    const button = event?.target as HTMLElement;
    const productImage = button.closest('.product-card, .supply-card, .pack-card')?.querySelector('img') as HTMLImageElement;
    
    if (productImage) {
      this.animateAddToCart(productImage);
    }
  }

  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.cartCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.calculateCartTotal();
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.cartCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.calculateCartTotal();
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeFromCart(item);
    }
    this.cartCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.calculateCartTotal();
  }

  calculateCartTotal(): void {
    this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Sélection de couleur
  selectColor(supply: any, color: string): void {
    supply.selectedColor = color;
  }

  animateAddToCart(image: HTMLImageElement): void {
    const rect = image.getBoundingClientRect();
    const cartIcon = document.querySelector('.fa-shopping-cart') as HTMLElement;
    
    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();
      
      // Créer un clone de l'image pour l'animation
      const flyingImage = image.cloneNode(true) as HTMLImageElement;
      flyingImage.style.position = 'fixed';
      flyingImage.style.top = rect.top + 'px';
      flyingImage.style.left = rect.left + 'px';
      flyingImage.style.width = rect.width + 'px';
      flyingImage.style.height = rect.height + 'px';
      flyingImage.style.zIndex = '1000';
      flyingImage.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      flyingImage.style.borderRadius = '10px';
      flyingImage.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
      
      document.body.appendChild(flyingImage);
      
      // Lancer l'animation
      setTimeout(() => {
        flyingImage.style.top = cartRect.top + 'px';
        flyingImage.style.left = cartRect.left + 'px';
        flyingImage.style.width = '30px';
        flyingImage.style.height = '30px';
        flyingImage.style.opacity = '0.7';
      }, 10);
      
      // Nettoyer après l'animation
      setTimeout(() => {
        document.body.removeChild(flyingImage);
        
        // Animation du badge panier
        const cartBadge = document.querySelector('.cart-badge') as HTMLElement;
        if (cartBadge) {
          cartBadge.style.transform = 'scale(1.3)';
          setTimeout(() => {
            cartBadge.style.transform = 'scale(1)';
          }, 300);
        }
      }, 800);
    }
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

  // Slider témoignages
  startTestimonialSlider(): void {
    setInterval(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  setTestimonial(index: number): void {
    this.currentTestimonial = index;
  }

  // Newsletter
  subscribeNewsletter(): void {
    if (this.newsletterEmail && this.validateEmail(this.newsletterEmail)) {
      console.log('Inscription newsletter:', this.newsletterEmail);
      alert('Merci pour votre inscription ! Vous recevrez un code promo de -10% par email.');
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

  // Authentification
  onLogin(): void {
    if (this.loginData.email && this.loginData.password) {
      console.log('Connexion:', this.loginData);
      alert('Connexion réussie ! Bienvenue sur Maktabaty.');
      this.closeLogin();
      this.loginData = { email: '', password: '' };
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }

  onSignup(): void {
    if (this.signupData.password !== this.signupData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    
    if (this.signupData.firstName && this.signupData.lastName && this.signupData.email && this.signupData.password) {
      console.log('Inscription:', this.signupData);
      alert('Inscription réussie ! Bienvenue sur Maktabaty.');
      this.closeSignup();
      this.signupData = { 
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
      };
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }

  onCheckout(): void {
    if (this.validatePayment()) {
      console.log('Paiement:', this.paymentData);
      alert('Paiement réussi ! Votre commande est en cours de préparation.');
      this.closeCheckout();
      this.cartItems = [];
      this.cartCount = 0;
      this.cartTotal = 0;
      this.cartOpen = false;
    }
  }

  validatePayment(): boolean {
    if (!this.paymentData.cardNumber || !this.paymentData.expiryDate || 
        !this.paymentData.cvv || !this.paymentData.cardholder ||
        !this.paymentData.address || !this.paymentData.city || !this.paymentData.zipCode) {
      alert('Veuillez remplir tous les champs du formulaire de paiement.');
      return false;
    }
    return true;
  }

  // Gestion du scroll pour les animations
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.animateOnScroll();
  }

  animateOnScroll(): void {
    const elements = document.querySelectorAll('.product-card, .supply-card, .pack-card');
    
    elements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      if (position.top < window.innerHeight - 100) {
        element.classList.add('animate-in');
      }
    });
  }
// Méthode pour filtrer les produits par catégorie
filterByCategory(items: any[], category: string): any[] {
  if (!items || !category) {
    return items;
  }
  return items.filter(item => item.category === category);
}
// Navigation par catégorie
navigateToCategory(event: any): void {
  const route = event.target.value;
  if (route) {
    this.router.navigate([route]);
  }
  // Réinitialiser la sélection
  event.target.value = '';
}
}