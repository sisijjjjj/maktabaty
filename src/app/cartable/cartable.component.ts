import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-cartable',
  templateUrl: './cartable.component.html',
  styleUrls: ['./cartable.component.css']
})
export class CartableComponent implements OnInit, AfterViewInit {
  // Données de recherche
  searchQuery: string = '';
  showSuggestions: boolean = false;
  searchSuggestions: string[] = [
    'Cartable Eastpak',
    'Trousse Adidas',
    'Sac à dos scolaire',
    'Cartable licorne',
    'Trousse de sport'
  ];

  // Panier
  cartCount: number = 2;
  cartOpen: boolean = false;
  cartItems: any[] = [
    {
      id: 7,
      name: 'Sac à dos Eastpak',
      price: 29.90,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      selectedColor: '#2C3E50',
      quantity: 1
    },
    {
      id: 11,
      name: 'Trousse Maped',
      price: 15.90,
      image: 'https://th.bing.com/th/id/OIP.iqZTw1WUvE3Wi0zWe37cSAHaHF?w=175&h=180&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
      selectedColor: '#1ABC9C',
      quantity: 1
    }
  ];
  cartTotal: number = 45.80;

  // Filtres
  productTypes = [
    { value: 'cartable', label: 'Cartables', emoji: '🎒' },
    { value: 'trousse', label: 'Trousses', emoji: '✏️' },
    { value: 'sac', label: 'Sacs', emoji: '👜' }
  ];

  selectedTypes: string[] = ['cartable', 'trousse', 'sac'];
  selectedColors: string[] = [];
  selectedBrands: string[] = [];
  selectedSizes: string[] = [];

  priceRange = {
    min: 0,
    max: 100
  };

  allColors = [
    { value: '#2C3E50', name: 'Noir' },
    { value: '#E74C3C', name: 'Rouge' },
    { value: '#3498DB', name: 'Bleu' },
    { value: '#F1C40F', name: 'Jaune' },
    { value: '#2ECC71', name: 'Vert' },
    { value: '#FFFFFF', name: 'Blanc' },
    { value: '#95A5A6', name: 'Gris' },
    { value: '#7E5109', name: 'Marron' },
    { value: '#9B59B6', name: 'Violet' },
    { value: '#1ABC9C', name: 'Turquoise' },
    { value: '#E67E22', name: 'Orange' },
    { value: '#FF69B4', name: 'Rose' }
  ];

  availableBrands = ['Eastpak', 'Adidas', 'Nike', 'Puma', 'Maped', 'Faber-Castell', 'Moleskine', 'Roxy'];
  availableSizes = ['Petit', 'Moyen', 'Grand', 'XL'];

  // Produits avec images par couleur
  allProducts = [
    {
      id: 1,
      name: 'Cartable Eastpak Classique',
      brand: 'Eastpak',
      type: 'cartable',
      category: 'Cartable',
      price: 49.90,
      originalPrice: 69.90,
      discount: 29,
      rating: 4,
      reviews: 128,
      // Images par couleur
      colorImages: {
        '#2C3E50': 'https://th.bing.com/th/id/OIP.l9XVeUJl-n1p-fvqWlGyowHaHa?w=205&h=205&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
        '#E74C3C': 'https://th.bing.com/th/id/OIP.l9XVeUJl-n1p-fvqWlGyowHaHa?w=205&h=205&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
        '#3498DB': 'https://th.bing.com/th/id/OIP.l9XVeUJl-n1p-fvqWlGyowHaHa?w=205&h=205&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3'
      },
      image: 'https://th.bing.com/th/id/OIP.l9XVeUJl-n1p-fvqWlGyowHaHa?w=205&h=205&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
      availableColors: ['#2C3E50', '#E74C3C', '#3498DB'],
      selectedColor: '#2C3E50',
      size: 'Moyen',
      capacity: '20L',
      material: 'Polyester',
      features: 'Compartiments multiples, bandoulière réglable',
      isNew: false,
      isBestseller: true,
      isLoading: false
    },
    {
      id: 2,
      name: 'Trousse Adidas Originals',
      brand: 'Adidas',
      type: 'trousse',
      category: 'Trousse',
      price: 24.90,
      originalPrice: null,
      discount: null,
      rating: 5,
      reviews: 89,
      colorImages: {
        '#2C3E50': 'https://th.bing.com/th/id/OIP.iqZTw1WUvE3Wi0zWe37cSAHaHF?w=175&h=180&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
        '#E74C3C': 'https://th.bing.com/th/id/OIP.iqZTw1WUvE3Wi0zWe37cSAHaHF?w=175&h=180&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
        '#F1C40F': 'https://th.bing.com/th/id/OIP.iqZTw1WUvE3Wi0zWe37cSAHaHF?w=175&h=180&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3'
      },
      image: 'https://th.bing.com/th/id/OIP.iqZTw1WUvE3Wi0zWe37cSAHaHF?w=175&h=180&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3',
      availableColors: ['#2C3E50', '#E74C3C', '#F1C40F'],
      selectedColor: '#2C3E50',
      size: 'Petit',
      capacity: null,
      material: 'Polyester',
      features: 'Fermeture éclair, compartiment principal',
      isNew: true,
      isBestseller: false,
      isLoading: false
    },
    {
      id: 3,
      name: 'Sac à dos Nike Sport',
      brand: 'Nike',
      type: 'sac',
      category: 'Sac',
      price: 39.90,
      originalPrice: 49.90,
      discount: 20,
      rating: 4,
      reviews: 156,
      colorImages: {
        '#3498DB': 'data:image/webp;base64,UklGRpwGAABXRUJQVlA4IJAGAABQJQCdASqqALQAPp1MoEulpKMlJXXaQLATiWlu3V90sOX3QLe8/b7NPB5cqpYD8y6IHQc9a+wZ/JOop6Nn6jE73cbRIXK0hJOLz0CLz6aJTF60ItiG01GEq90C6ThonhPYFQJXpwrzLZXeqJElc1B7wdkAU0ZVHKpneJZG5nLUfeJodjk31JW4BSnTFyUbukdZRV8VHM0S8EwxsDa/CLvxJaRyrWX09W0W2dgcmMFVsBlsINPZTDq+pe384OlkNYt4ZN0tUrnx5huqe6iJDVROlV7+iTtTAZKzIbbmzO+nEH9wrsocBOf1vjbqJNbZpDKyhsI1y4d0c1G8cLa+HwIMI/EVdlGS51csiCWdEAMVZYF/4CK1dk0FeiHJ9F+Wjgr04DYyHjB0ZSpn6+VSbevuDlWAAP742gLHChTZtONM56HNcmJQyHiKA+HaeWnFFNnb4dyUhhEb5yZHXqeTp7rEiL1sYtB7GCn+gwBFS2b3MW3K937i2r3jLQEXn5Jn8vE2zwjv0VGmqFHT89T4Ef0BnebvI0FrzuTHagyiIzGiA2HKjduEg509piJJUX+uRKsu1HuSH0ZitHCMvLjHuj7hWJliuqWEE8tkDdx/6e2+CGQp2ARvoO0XZukOTyyOMdVK/QuEJibDVnPbh9tE0iXaixhbNiuLyVgLw0MLF6fvPrZff4Bpfh2vwBvTUANJeWCvJ78SqVFE3mK3BZRxCFkSWOEfG772mt7PZMZb6D/dKM+fcnmvC9CPLdobcgdg2pZ/syogR7oQeCJMps5IFCvZD5UgzSX+3TEFdoY7dmfgoIoFaulr/AejSFuJYjsOPILCmTnk+a07I30yUXCtt6AhRpzOsAM0z6Q9D6IpXuuQWmgG/CteCoqCXnr0iWUf5qXsTWFSxmtnNNR+6zku6j04wM28qfrcG72uuAxkFlO2CijurtMETPA1BhTBSiTC5TqKDvBJ0QhpSBbgkZ+kghwgFEgp/8xJYxj+95F9c7Uj6js7xD69fNjRF+ExflCtn+llbP1QhKvSt9IW+T7L6HJHcKYJzR+NsYG8NQgVQYJhOaPz+NibELavtYDBP0pvwGMYiTNWLDT6YXPtuVOqEy0tPmv7S3oBq9pFCtEEOSDb8xElchbB3WG9kco57NvYC6/HNVX/6kXijd0Y1f1zOo0XFgIUmc7gXOtW8IOe8EDnkZ4+vefkA//jzccT3IWVAc0zwMxDKamqx0jhAqceZZu4i+kJlMdXQEwKJ8+kSl/c7jGg6H/owk7/oEu3CQk+buceKJ7FSql/7+++Tp6VQncOOlpsFgd9UE6nWAq5YX2bjjYp/jUVudnc0YP/1xofDwAMbjPI7a1rMZcIHoNiZ8oSdCedcyS6gotgYgmhy9KDCO344OqkRdREd0e0BXPvrB8dkRjSNhiFvhmGD6GerK2rN1ZSN7hFh4G9w6MKEFqeYBLN9Y8D0zusiqb1SMmH42lHb3wNi6fVpbOp0lUTYjSgeTHwGMnnIOSFsq5BYPEBR0Krw2nZzyBx4HOivEZWATWshIp+AQFR814b42kMFpXLLP3H1KzXwX1cgzYUgxgxadahYNBO9IxJ06+KORdc2Ui+zKyp6sG8bQZigLEstntXOztfl9WByaud6MHvgXdsVyzWzbngn+pSNwgKUjUOntcn8pleoFRQUqb0CrZkvZT8CtRFxKGWTpIUfzi3oCCkflzre71CZIYnujJRdnEAH/gTS8ki4q6OxHsTkIuyjuF5ZVWrKO9Von+zyop2sjM7lpZ89dcKzjfzbYgw/8Nryxpebaqlxd1ODf1WkDc3PVrGIvrTjMqsKIV04HXdB+1kxomazcYckydhSSGVvVIDv6x+SB+MNTsvTDMSL50dMxlwbQ1fYWSBrw6cRUYIyvRDeX6fh4XWm5dtJ49oiahdhDVwETt9uSuKa9hpblwaNTfOkXRHjY01oND4tn8S2pjxfJcunlF35DZOn+NiFzvsUuCxnD7QYx7n78oSjpMBY+p8JTqQdqZIjDPj0mkIoZYRv3Ydj6OgL6+uxD7FivkUg4VpoJCxxDbI9mc2giRhjus79k9EEfOgQ1eMJUdl25Tgge0/TA6Tl+dxTKgAqekmbiuxNJrYpizQtCawDOa2zqWhlYYPFzKGs1Z/MXt0MuuTDvrSpibuPjAXpPcvvu/AD1KZ6OHcVUgwNuoonhiMEgolIxAgT/db8DbM4TjS5A8rggryqgbNBr57qFdQGogAAAA=',
        '#2C3E50': 'data:image/webp;base64,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',
        '#2ECC71': 'data:image/webp;base64,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'
      },
      image: 'data:image/webp;base64,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',
      availableColors: ['#3498DB', '#2C3E50', '#2ECC71'],
      selectedColor: '#3498DB',
      size: 'Grand',
      capacity: '25L',
      material: 'Nylon',
      features: 'Poche latérale pour bouteille, bandoulière ergonomique',
      isNew: false,
      isBestseller: true,
      isLoading: false
    },
    {
      id: 9,
      name: 'Cartable Spiderman',
      brand: 'Eastpak',
      type: 'cartable',
      category: 'Cartable',
      price: 42.90,
      originalPrice: 52.90,
      discount: 19,
      rating: 5,
      reviews: 145,
      // Images par couleur pour Spiderman
      colorImages: {
        '#E74C3C': 'https://www.bing.com/th/id/OIP.pfG-8Xp3a9S6_6u3JgUV8AHaHa?w=195&h=211&c=8&rs=1&qlt=90&o=6&cb=ucfimgc1&pid=3.1&rm=2',
        '#2C3E50': 'data:image/webp;base64,UklGRogaAABXRUJQVlA4IHwaAAAQXQCdASq/AL8APp1AmEilo6IhLnsbILATiUEOADMTMDsTVN9g+xP0nALGPtm/8H1y/pn2AP1S6e/7Zepr9qPVN9LX9w9QD+zf4Drmf1V9gDy4/Zm/b70stVsZf/lPBfyJ/JP3P/E+pbif7EtRHuT/n+bv/T8C/lrqF/l/9a/2/pqPoOnP4foEe8H3r/o+hf8z/2PRH7Lf73+6/AB/Nf7N6U/9/waPv3/G9gD+Xf2L/n/33+/fuT8oX/r/sfy09tH1R/7vcM/n/929N/2H/uH///dE/YD/wpHpSjkhJvt62+cVvf5WMYxiqg/1r8OqD+5lU5IBh3hktvbq+4MOl6wi1OPnOc5GXbmbldqIpPWVDezn9qLVmHg8XmuHTzD46RgfCUzfPdLdhPhNGdaiXXqmOea1rRLwt7una+OXgqo7S//oORcLBG88HR1NLX5rX6CcDN66tkDl2lPt0U7zHrBATQ/veI9sJj8SPWOlUcKoAjB9TtJEhj/TL9NxbirlGQE4QR9yHrOVd3T9ML/HHx1XcsQMOHNMwVvE2+PVt+SuZjMO/7Xj/98zU8AvJPq4kj9zLU4BsZKeEnNcXfO7o5s5Tzdq4N+7294OrTHdXm6D8WlWvZTAgB9hS4yczWdPbZjNCg5WejWznlnIGRyNDP65VkdcjTz29tGXrJmzJEcz1vtn0fAJg5lMQe8bBipUkIUm8uAzP3Qxyt5lAaRdcGRCAhiIotwL7OJOJ4sDvKnS2h7m0Ynbqqll7tO821eHCT30JD8pRjLlEp9xVny9rapIGR7JTMZiuJo/adHvQWX5zUb7Xla8nAIXNauS7qKZM7YMtXYYtL8TexJN5Hb2l3nnT4cVeMf/Dte0i+Uvad48cDqiwYCwZr/E14tlTf/wP/98rJg6mAheTLr3g6Xfxjp6+poAfZ6O+OAlnQ2kE5xpAKN9+uWhDX+mlPI+rlnQw/97X8c7mR1k8JJRE+6Ier1+KPlWU1GF0SwXN66kHVkMMAAA/sf8FMifocZ94lbTBKU69fKqwZ/68uFb49aaTUROm61MftoZWU+D7AVKK0GXbg47c9oyxZAUv0v1Ojnu56pcPyahqrYXdh4vzUFjAjJlQ1MYThqhEtnYkFQxLMdKUeth7pxnvGHxIWD+Dscc2mSU0njbeLGVl/pbxMTZxq8vYHrz/TGrhxQuDAIFzeMd2kt3R4gzs1vanMj0t2JLPTj/OR147o93rLzz2zQDtnpuSS6iSKQC9DGsTUomaCXiXqBuH+bFDs3Bm7gXEZCqB1v37CfgfHoVFLfXkqwYMBKNoOzPTmv+H/vYbrAzyefojc800iR8AN1FmXci3oRRciKXBmyRdpYtz9IHbXdHyVVFCOEHaOl9be9WrOxoENrx3b+a1lqy3ptJP1FT9AQL2YXgaiUObsXMq+ZCi6LGXutEofmxe0Yizm36Y9dLhNza3fc7MR/gpWJHxIyUHkxa7VwV4AMCSWrwaTnS+LoAIfbfU/0k6+IHppTdKwmd+vdRhyE8uThSMgoilNP7qHvqcaX5egEpQuSUQ3omgVNQlZBHF7Gr8uPji2qR4R2yFm8y5swfWqehcOWyxJdkQ/ATWG8BsuayHH7OwReOw498wkB0xQ9mbg/BcgPqjS/EKrFSiNGTaefufMpA7l9uGidOwa5S3Yq3ffKpNEKnU9JyZaUR/y1qkLBdt6ps4WqxeDvL5a8tTlInOqQ6DZODFy8rJjwUyhe0CRMyw/YIZtLe/DdLtnENE09FhGLWfgaNnrHJMbF7ivUCaIudr32aEvxUPZ/+d3nwhV9qp+jv4vhLsOZONunBoDjW9BQZjr3+05/J+97oByrMliJp29+7j5iFKYVR9XOwYvgQT6GcNgwu2ZrcXhZO1C/DTqIefKxc5RRA/nC3hl67N/fCEx92kVliI708DtlCjYRNDkIn6wONpRfCDEkaXEaCpEOVQYX8U0C8gBptxKAug0PJ5vwTqc9h1aMD73tvaAPg/s8NzqJ6Q4onak8sUv2T3j8ZhCcbLyFvyk2aIE7bHa70UMhsLh3BNZQEyMhG/DKPSjEIgPlkaiLj8hPMVZ2oZzZszsqbNiEcdF0Fyd6afzc/1Yl+fkah6Mc2rKSh4bm+HdVNIK1YGPogEm7IxlE6uK55jixjyKxEcDWM3uXvK+TTCuRzz/2kaucxD/Asd0ZPadajG+yU1sXKnLdRtbd3GWd2m0LmY89xYk3s4+6kprAjTWajpVDupuzFdR36D7CGkQ4myTQmrjvGwk9WScX5cG8plggASQnKezG/Y9N8mi2bU0v7nya0zMhyGKUGN5zLwZC+8P0EOtpjnmvrZGDiujHrc6J+0Z2rz9F+mdtQ7h7LNoVn/IHOYygELCCr2Gq2qXVxnI44Kcy+v8XU787yCtoaiCL91avcShS3vCj/HTc7jZYw5C3P1IZn+0IRvj29Pyc48r17eNJoa4XT2vGbNkLpVKNMpOvez4vXaNR1xy+ddEvmobCqRhpG5pWqrb3LKDaci4633sfzL8D/8TNF3o5QJne+Cv2u/c5uDhFCV791FuajcZcyF2UqP6Ir3pw9Y6SmvnYtZavvwjqFpUJUtT3emXyGx7nnsoDc5mrgP1gYI29CLk/DR9kkt9oXiDbpkMevup4T/M9dZ/yDrPrw/He7Q73HFCzkKxezRtq65lgVtkBB/zeNaqfC/2PC/bpWhnMA9LL+wF3eRmWv6Szgf8n1m6nNNzM8btWuuhyN0M12d2SxhuuvmSL9jOV8/aESzEXeP+LeJOu/XY1e1FTh9gNJRdBrkiNtd9EAa1F2rn8RDB5j7jtyoiEcVMmmYY/iiEFYJXTXWyWx6HMVdeSlnxFb7wL2gpAbENhdM/lf1acQQOCmsrdkNL4w012Sfe8wlqbrBCqJxXSqVlCTi7AweV3GTY0Ez7e34Ez30LHhCv/+/MlJamqv/5MjkER8Cimu6izvU1vTFxmC/5TyltVRr1PgrtB+RpiNbctBtv22rPBGCH/HQiyNUkDSr+17isQO1X8oPODUST225i59VsmNZVpSm5nm1+r13nNq5cYhUPXd/VkItbg16Xj8jZC71Xwjul9lGkHR4YYp0JUQ2Wz/fYeXwvK56PuPjHyYS5wya4aH27DX/Xgk68AtXsy9Q1V/lS5/7bBl1M+7qnlejExaiZMtd/3cwo2kB8xPe/ELLtf47cur3HQTTV7HA8Zo3MCdoGdsCbR60dHqt9D7PPgQEaWpxmVQK7QQsRsvHyFQ0i675zssvUbgSZzu3dDs18bg1XlKh0NCHWH8tX9ggrfET1SztPD40LsglJb0SZuvmp5/zbdCkyRz/EjhvEQ3J35MWTyGeFc/7uRpcx0hbL8qmyW2qU4vk7SFo9w9FXL8kOXnVVPc93xLwEKKsgTpILwPrcTJ1T7F85bUTIP4MZBZGtO/Ej1H2xlP2oM6W8Lk3c2vt+vg6NwfzXlF2eMqLS+shpGbf1wgu9s9lFZIjhp/1cg4TAShivb+1MZdQzKOL+BB2TPez7rusm+dOyXMZcS6pVYViaYsji0PHe65pjszqtQuSjDXn/+ULwpbfbdFBEqL/J7sV1YDJ2Mlz2iuxNz06cJWVvW/KeObhh8YlkPPNWm9xyUosbDKlJBXwWfvET9KuS99Gk4uLTHTjKAYwAVxoFKRNLgAqhOhYBT+B28Q7leclt2P3wOKF+E2U4lF9zlRgDpv5fEKqArb/tUNcCNjhprOELeYh0olrJxXSs/P3RxLwYbDUTL3T0R3MJSwqoDiW2Q91dBbmoQof+EKzKXtmzr8CRDZT7X19tmsOrc1X58yrhKHxcCDQpBxBBgIWD5MVsCGoQnrJPz+0iYqjphpYj/yZ/oSfivhcMB4f8VHTTORiWZeaMvzvy2JeLw5ylbt5S1xnr2+hpY7dphgr5vwIWngK5lvl8SRfQivnqySLvRo+4j8/DJP0mrovcdzU+XJLUk6ZEpiBRiPdLXgcyCqXhVlOd3H00ep55uCS4DmNxsIIIV4ssq/+bQnxm58UmNqBk9XntE2/cwYKWn6pwc1jmAFR1pRs/AFWcP3+VeufwdLhfccWyQPWSIBNFk8lyApYw29P5sX4sWkZF/jEZQr4ynEDaDYIRBV5xr2QAXPrPchN+U1O26srvxYrkto3YJ6U890qd8n1ONPC4RyXY9zKXJdeA8wM3h0bQX4DOT400xdJnZw29gbOb1DjO7WBOhLC2AIsgGJceFS5rPvBmC7XI2tu0M9hQnWemIPO1gp6MaoyWtU+jNjZProflIbFNrWEnXd8S6zS8UI/H9Cpfzai4W2H8kCfqclgAdbiWOOm7SJ0JojYV6OtO0M1X2tDQJD34fau5QrUeTtuy8S+XE/4N2djsdPo5+yNEHT5iaGR/HbyJSzCBGGbDsHuNu3zpqKW6iA22B1vIpGJsbkLDtWbVF19hfslIWoM42QJXzCuimAU5oJeFfd0hBdHybVOnUEQA3DtRaiIcVsE8MYNH8P1U7FfBgJO7d6xIt3UExkHwpaCEgx3PljYM40lf2F9xxrtYXPtfqXd8i/VZ9kJQ3rdaCcStDSQJEYg3bk8NJcC+nXJfGmWneYeaN5jEYF0WPLZMWgjruHZbmEHBSsfHMnrfRZCGWItnag3hNjV4I4+2D2fJnE6VWC/r+PTSgGSONVWuKnesW9e77sxEHltOyDNd7HgTnOzS23Mh0s0CKOKJQlE+AHPiIVKAftIpbiKF+kduC+yDZOSKwgQOLNPmq7YgLSKF8THwQSpdQQCKrAuNELJJl9BDaqa2jjyDoDfm23njUyVDOJmxc7YyGCwII/jKE6FM7UztCEO8bEJtp3RUf6X53lLfWMiP1ty/BMzoeR1EUb7EQpqs6F/yPlLCB+byJ7X2IvuCyW4t21wX2Xd2DQH7ygXXjee8hMaH3pgwOanw+lzc1AJY8bUrVMXP7dykP4yuBUHHY8xRTA3FmgQKqZPKjggHbKxkYQ84ySIMM0MzVMpNozkR7n7XRj0K0+TJbB2x8fAI9k2t3++aRfBw66t+Clq/ekJMLF6kSouONAit9jZToNlu1WE/F7wJ/tB2TUen8ExgvrGlEGFvPo/HLgeCyzq4D1oiUhHGo+qfBnriqOXGK74fgZmqYqT9EpUBlQNBmAkHlw0cAsNE1eSJn40R2AVqzBwyQg2YuRJ901PKt++w1hRU9AwHCYW1NmOdsy0Soy7wEGeT0FED39cOb9c51/7iybYHOq596gKkpk1QXog53K0OpEd3CCGIOKiLAF6WIbBbxnMNiR1/VTPix7j+4rt5keVmBr54oAfvyRtKIdslzPJprrmKNc5hMD+oq6D1MWDXbGIff4jqXbFCXBwgHDNfTEzTlal/BGHVZsO8IHsEju8Y1jUS00lVGIqsgUjrG2fSTbBh73ZbHUmow4Zv1xc9TdIahU28k09Tqs/+dPLu++HTSjvoLJqjSj+cD1KvWJ0Ne2tcT+lwA1EJBOrCp0Gctq9HK8Elx1I/iKmu/38igXsx4hymbT5cNpjThegNw38SqbjkN+v1kNqPQf/Y5t+kpLjStj1t3C4c8IOtNr2QhPDVvXgFPEwGia/3qJuPuCUvsWb24ylfc35Ht/R794wALVnQAILO0VOVUwWYh+MIrVaFxnoQ/QRXnH48dxSLUtr5B82F4bhHFdxVP3+OCVWGEi50KoBeXSjBT6rBZ5sn5ixL+fF0wsKLywzpBAZh+m540lZDgMUwAN2Etd/I43VuzIkhyjJ07ReAfqme7lkVh8M6CUu/Kqz9lBskVGNZqpBWCgsEC9nYMSp3UrnWoRyWw9LuChQJT7oblzcZiys+JX+VDiJe5iuEdLsqIbG1zVdiueXC9IhH2s1in7zmMmnP+mKUHPHE1BYOjL9RTiGWEdYGZGnX3AfCT0LFnXLlm1pWcGNVkl9YU7w8U4VqUlPTa1WLbF5iRVfeMTOsA9vtsaaDHlU/Aa/Cljp+9aAqw7+hsZZyyw5p0wDvDUn4Q2rb5T8SOTRu6BOjoAPmIrJm3qsyzpR8Sz2UDWsBbwqT0Q1f/jEGfygaH7eeT6LckHFwHq/hLC9vnLEtOsms8VX71Q1smVKmPNYkswL3R9y0wMI62wxnBGg/medUC8Oy4PMHiiaboYrZtsVIluemv7AqZ1jURZzGlGbvHBBOcR1FiOw7SAVFpDXvR64XxOBFp355eLMc6jH6jinoNi5K4LE+uon/DkpL7EotGlfExw3/NQoIbdkxPPoNkY3KYMnzYC9FbZw9dKTqaopzm17Sbaw8ymIk6mCvHBvhRzTrzkWUibY2FrruPCNnpSwOqChEWmg5xxBuHQaSPHpk17H3S3N+b/PeK2ElwfrOo+QfbEBvg1Wy9NhauQD6vexg3ZuZrZzaRkQAAlGo4ZP+kkajP11t2g6hS4NXgIGNHu2Q+DIGRKC0zd3fIID8XsunanQDXWnDi318mTH57rRzl22rl8LKSDt0m1OKCsf8roJTRZR2iVAX6VS0pdWfrHTmxJdw5bc0TPYhJJ9JsSUl4L0qVkvlaKgm4JP38dGYvhGObQq5jkMXxdTK2grvf3iywc8x/8P080MaA7C6hl2zNF04GJx4eRliPFtKU5UDd3bWIWK8JRI83QGPyW6sx1DH76GybSpGabBJ7/CQ7b3R7G5vH4/Dh8DblzgzHihtmAXJZsJVPBgQrFMZUIJEnIQEZ86MvWfbDfQ8Gh6LKbY83LfqSF7rp5gWIUESJ3u+CGXdgz6jkKHtise6xGR+cyfuyp/uM+Z8E2MKON9BqAiHQ8442HC0JzO9quNXZ0xCw5tH1sKTckmIJNuNxIQh2DY/Sqo0vGJ45CAC45VciSooIKnEYXR1/3zaIKGcbyggNgX7EX8wN7HFYF5IS8AOV/Vk1wFIXO4UrVIghnwVSossb84DhKFli9teK+91BY17WxxFEq0nplEzI4aPZyVChoq/IZ16kmrJOZFwreqVCTxwLyHeg3PtUBqM4/lGduBxY33nQsD1+k64wns4y1MeAT0kAaSYp1Pf8QerhPYuRohZOMnry6Z+XaAGTRmyNkQtbwli5P6NHeUHC2UBWElLbZrsYXSF9Ie5l3cAhCpHkvOw5k1YVUaqW7wCWgTB4W/Fb4Z8BYOHfL5b4Ul+uprBdXKAEQL5rRmeWzqnQBDIQ3VWAMhLIZvQPkWpQjXph8J2XcaF0Osd+XBdkenqre+yO7zu2XR6F3DDKwT6RFk+ZyorShbsJOztqFyODDPW6CvS7UG7A666ZoX1uk963NfSkTVl5BnNy41GSXjbDgvUcJmNNigKXDih0hXsM8UYi1m5F8js7/qnjpeXagKHBHDSJwZd4DUrTXbIp7hJKeP3McwK9BvXO7CIrWs6xxmo3I2o6enaSRQVRoDpzj+FGvRGZEst0jX+czWol6FvSh0G1L1hTYJQRKy0kT/MjuSaOcG+lKs28QvzuPvlsJiGt3eiwGMGHzRTBzZKDEzMpvjI1U59rrHfqTpdlCWIaX7rykDPTvYC3pOYuNdiBmE9EkEVpgGzDcxrHSVZ5ERQ+x5kdpnmkqCSAh8EyCzEJzfH1DdTgHCm5oz/hfpK9FprimyhCokeyoHL/4o0s+nQlimoz4/Ih4L/6zAnslC1kLPplMoq5MKQhexueLVLdVkJ90iAHCJYw6cfdPgP0KxkbA48+wKgTr2CWaWshtDczoy9oTYnjbpOwoInO2IAm3jxGvHHd5lxZ+QS6nx44tWQPdzSq5Ey2EeP+6T9nrezxvJZqCe6W0s0gZZJaRGpZ/X0EDAOuLb3ftn9mkRx7wDmckkvCjp19cmt05RaAu97FGbnyJXeuDCYi4vll4WTMwnMKVQjFCNhC/JTmOlqCfPyUKeExo1tTnlzroSVD9B4B0zQM3D5cp0KPQZ/w6dNmcpon56HkAI5/B4WLrtjowMKLDj6GKZtSf1n8S389f4X+bdE8aExvksy7n752KEQ3ZhOdIebFUOr8NTWo/+34VY8k/WMW0ycAKCbyntsWkdH/ZJTp7j80H9hqHQHmmhfEylvcZlFNenBCPN9TWzr4nX1dfr9N8CvovDZXTMwbIK+qpG+OJHR7kZjhfppimSXbV5J/1Q7TBBNQQY/XyAp7aCdjc41rKUNyTCVY8QhIWO6QAd6G0yDJWAjh0MITcZAu2icRUfgc4RgnqYsIBNJgpwuEX+D78KAun8NjEmzyhWVtauRrdHIQTkKVCWixWBsIL0J/0rTTNDKli2PG7DMJLOCZ5ZCU9XybsTj6cNY/Rc+xAm7XmV/fvzlmnqFrW/hd6s9TERqhM+iYWi+kYH6oM8TK2E4vdrBljvaScoB94/FwGvZaoSpmrib/hWkoWGBmvDhUw8Szw0DYqeITFtoB2uVIkBbhszyn6D0JNmbw2xwM71rca7FT4eIU8rt4iLnRfYVwXN8a+25HKe2Z9FW/bpJDoUKIjNrKIgoKluw8qksQZI1SVmR4CJ5HvYFnOISvXArgVyVoqhJu2kkFwLHG7LeZ3AkfTdfU9UrpwCg+L8iUdTgGpMvXrgeU+Ak6jI/X5Gc7UoIi0aYlmT72Z/TcYMu6ypnuB5Bh/k9qTA7FMBXqRWnymcNN9Vvjul2IO/cSpOBydmHX9izFZPPLn4+dZFa1jv+xNMrEtuUyve/t9jvbHSOQ4AxBGJtDaMevTh/oMlHNnxzWuU/Yj7JMHGlOeECHBIUPftSZqXvmNgYXtJ8ZJ70j3PyoykALonSCmYdQM4iwBGv6gJ8PKugZgG2F/X5+NpSiOxuKP1sHIZJIzcM5UD/DdPNn+2doge8e6t4Z7thlds7bde8wtHuEKXYl9lDx+fmtnYONIAJJYIkjQZoLj07zy36FYe9OpUiV6mgxENQCsBcUAO29XvscFgN1941oYpOMSgYZWEayyPvv6zuc8bHXlsj4X+B2H7j6J3T9K98s78zCa8p/Eu6psYXU4C4uAHInbJurVpr926+dlF2D9x91Mi4fJYMS1nDOBlzNQ9QmwTWqI6oWmNNlala82IfazJMbniXdXktRuOXEnQstwDKxL8uf4gfgAAAA='
      },
      image: 'data:image/webp;base64,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',
      availableColors: ['#E74C3C', '#3498DB', '#2C3E50'],
      selectedColor: '#E74C3C',
      size: 'Petit',
      capacity: '16L',
      material: 'Polyester',
      features: 'Design Spiderman, compartiment tablette',
      isNew: true,
      isBestseller: false,
      isLoading: false
    }
    // ... autres produits avec colorImages
  ];

  filteredProducts: any[] = [];
  wishlist: any[] = [];

  // Pagination et Affichage
  currentPage: number = 1;
  productsPerPage: number = 9;
  viewMode: string = 'grid';
  sortBy: string = 'name';

  // Compte à rebours
  countdown = {
    days: 25,
    hours: 12,
    minutes: 30
  };

  constructor() { }

  ngOnInit(): void {
    this.filteredProducts = [...this.allProducts];
    this.startCountdown();
    this.calculateCartTotal();
  }

  ngAfterViewInit(): void {
    this.createParticles();
  }

  createParticles(): void {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 8 + 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.animationDelay = `${delay}s`;
      
      particlesContainer.appendChild(particle);
    }
  }

  // NOUVELLE MÉTHODE : Changer la couleur du produit
  changeProductColor(product: any, color: string): void {
    // Sauvegarder l'ancienne couleur pour l'animation
    const oldColor = product.selectedColor;
    
    // Changer la couleur sélectionnée
    product.selectedColor = color;
    
    // Activer l'indicateur de chargement
    product.isLoading = true;
    
    // Changer l'image si disponible
    if (product.colorImages && product.colorImages[color]) {
      // Simuler un léger délai pour l'effet de chargement
      setTimeout(() => {
        product.image = product.colorImages[color];
        product.isLoading = false;
        
        // Animation de transition
        this.animateColorChange(product, oldColor, color);
      }, 300);
    } else {
      product.isLoading = false;
      this.animateColorChange(product, oldColor, color);
    }
  }

  // Animation pour le changement de couleur
  animateColorChange(product: any, oldColor: string, newColor: string): void {
    const productElement = document.querySelector(`[data-product-id="${product.id}"]`);
    if (productElement) {
      const imageElement = productElement.querySelector('.product-image img');
      if (imageElement) {
        // Animation de fondu
        imageElement.classList.add('color-changing');
        
        setTimeout(() => {
          imageElement.classList.remove('color-changing');
        }, 300);
      }
    }
  }

  // ... (le reste des méthodes reste inchangé)

  applyFilters(): void {
    this.filteredProducts = this.allProducts.filter(product => {
      if (this.selectedTypes.length > 0 && !this.selectedTypes.includes(product.type)) {
        return false;
      }

      if (this.selectedColors.length > 0) {
        const hasMatchingColor = product.availableColors.some((color: string) => 
          this.selectedColors.includes(color)
        );
        if (!hasMatchingColor) return false;
      }

      if (product.price < this.priceRange.min || product.price > this.priceRange.max) {
        return false;
      }

      if (this.selectedBrands.length > 0 && !this.selectedBrands.includes(product.brand)) {
        return false;
      }

      if (this.selectedSizes.length > 0 && !this.selectedSizes.includes(product.size)) {
        return false;
      }

      if (this.searchQuery && 
          !product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          !product.brand.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });

    this.sortProducts();
    this.currentPage = 1;
  }

  getProductCountByType(type: string): number {
    return this.allProducts.filter(product => product.type === type).length;
  }

  getProductCountByColor(color: string): number {
    return this.allProducts.filter(product => 
      product.availableColors.includes(color)
    ).length;
  }

  getProductCountByBrand(brand: string): number {
    return this.allProducts.filter(product => product.brand === brand).length;
  }

  getProductCountBySize(size: string): number {
    return this.allProducts.filter(product => product.size === size).length;
  }

  toggleTypeFilter(type: string): void {
    const index = this.selectedTypes.indexOf(type);
    if (index > -1) {
      this.selectedTypes.splice(index, 1);
    } else {
      this.selectedTypes.push(type);
    }
    this.applyFilters();
  }

  toggleColorFilter(color: string): void {
    const index = this.selectedColors.indexOf(color);
    if (index > -1) {
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }
    this.applyFilters();
  }

  toggleBrandFilter(brand: string): void {
    const index = this.selectedBrands.indexOf(brand);
    if (index > -1) {
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brand);
    }
    this.applyFilters();
  }

  toggleSizeFilter(size: string): void {
    const index = this.selectedSizes.indexOf(size);
    if (index > -1) {
      this.selectedSizes.splice(index, 1);
    } else {
      this.selectedSizes.push(size);
    }
    this.applyFilters();
  }

  onPriceChange(): void {
    this.applyFilters();
  }

  clearTypeFilter(): void {
    this.selectedTypes = [];
    this.applyFilters();
  }

  clearColorFilter(): void {
    this.selectedColors = [];
    this.applyFilters();
  }

  clearBrandFilter(): void {
    this.selectedBrands = [];
    this.applyFilters();
  }

  clearSizeFilter(): void {
    this.selectedSizes = [];
    this.applyFilters();
  }

  clearPriceFilter(): void {
    this.priceRange = { min: 0, max: 100 };
    this.applyFilters();
  }

  resetAllFilters(): void {
    this.selectedTypes = ['cartable', 'trousse', 'sac'];
    this.selectedColors = [];
    this.selectedBrands = [];
    this.selectedSizes = [];
    this.priceRange = { min: 0, max: 100 };
    this.searchQuery = '';
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return this.selectedTypes.length > 0 || 
           this.selectedColors.length > 0 || 
           this.selectedBrands.length > 0 || 
           this.selectedSizes.length > 0 ||
           this.priceRange.min > 0 || 
           this.priceRange.max < 100;
  }

  sortProducts(): void {
    switch (this.sortBy) {
      case 'name':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
        break;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.productsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.productsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  setViewMode(mode: string): void {
    this.viewMode = mode;
  }

  onSearch(): void {
    this.showSuggestions = this.searchQuery.length > 2;
    this.applyFilters();
  }

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }

  addToCart(product: any): void {
    const existingItem = this.cartItems.find(item => item.id === product.id && item.selectedColor === product.selectedColor);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        ...product,
        quantity: 1
      });
    }
    
    this.cartCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.calculateCartTotal();
    
    this.animateAddToCart(product);
  }

  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id || cartItem.selectedColor !== item.selectedColor);
    this.cartCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.calculateCartTotal();
  }

  increaseCartQuantity(item: any): void {
    item.quantity++;
    this.cartCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.calculateCartTotal();
  }

  decreaseCartQuantity(item: any): void {
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

  isInCart(product: any): boolean {
    return this.cartItems.some(item => item.id === product.id && item.selectedColor === product.selectedColor);
  }

  toggleWishlist(product: any): void {
    const index = this.wishlist.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(product);
    }
  }

  isInWishlist(product: any): boolean {
    return this.wishlist.some(item => item.id === product.id);
  }

  // Ancienne méthode remplacée par changeProductColor
  selectProductColor(product: any, color: string): void {
    this.changeProductColor(product, color);
  }

  getColorName(colorValue: string): string {
    const color = this.allColors.find(c => c.value === colorValue);
    return color ? color.name : 'Inconnu';
  }

  scrollToProducts(): void {
    const productsSection = document.querySelector('.main-content-section');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  }

  showPromotions(): void {
    this.selectedTypes = ['cartable', 'trousse', 'sac'];
    this.selectedColors = [];
    this.filteredProducts = this.allProducts.filter(product => product.discount);
    this.currentPage = 1;
  }

  animateAddToCart(product: any): void {
    const button = event?.target as HTMLElement;
    const productCard = button.closest('.product-card');
    const productImage = productCard?.querySelector('img') as HTMLImageElement;
    
    if (productImage) {
      const rect = productImage.getBoundingClientRect();
      const cartIcon = document.querySelector('.fa-shopping-cart') as HTMLElement;
      
      if (cartIcon) {
        const cartRect = cartIcon.getBoundingClientRect();
        
        const flyingImage = productImage.cloneNode(true) as HTMLImageElement;
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
        
        setTimeout(() => {
          flyingImage.style.top = cartRect.top + 'px';
          flyingImage.style.left = cartRect.left + 'px';
          flyingImage.style.width = '30px';
          flyingImage.style.height = '30px';
          flyingImage.style.opacity = '0.7';
        }, 10);
        
        setTimeout(() => {
          document.body.removeChild(flyingImage);
          
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
  }

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

  openLogin(): void {
    console.log('Ouvrir modale connexion');
  }

  openSignup(): void {
    console.log('Ouvrir modale inscription');
  }

  toggleSearch(): void {
    const headerSearch = document.querySelector('.header-search');
    headerSearch?.classList.toggle('active');
  }

  openProductModal(product: any): void {
    console.log('Ouvrir modal produit:', product.name);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.animateOnScroll();
  }

  animateOnScroll(): void {
    const elements = document.querySelectorAll('.product-card');
    
    elements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      if (position.top < window.innerHeight - 100) {
        element.classList.add('animate-in');
      }
    });
  }
}