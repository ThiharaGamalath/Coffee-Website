"use client";
import React, { useState, useEffect } from 'react';
import { Coffee, MapPin, Clock, Phone, Star, Menu, X, ShoppingCart, Award, Users, Leaf, Heart, Minus, Plus, Trash2, CreditCard, User, Mail, ArrowRight, ChevronDown, Instagram, Facebook, Twitter } from 'lucide-react';

// Enhanced menu items with real images
interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  specialty?: boolean;
  origin?: string;
  roastLevel?: string;
  caffeine?: string;
  ingredients?: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Heritage Ethiopian Espresso",
    price: 5.95,
    description: "Single-origin Ethiopian Yirgacheffe beans with bright acidity, floral notes, and hints of blueberry. Stone fruit finish with wine-like complexity. Hand-pulled by our master baristas.",
    category: "hot",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&auto=format",
    specialty: true,
    origin: "Yirgacheffe, Ethiopia",
    roastLevel: "Medium",
    caffeine: "High",
    ingredients: ["Ethiopian Yirgacheffe Coffee"],
    nutrition: { calories: 5, protein: 0.3, carbs: 0, fat: 0 }
  },
  {
    id: 2,
    name: "Madagascar Vanilla Bean Latte",
    price: 7.25,
    description: "Premium espresso with authentic Madagascar vanilla bean syrup and perfectly steamed organic whole milk. Finished with delicate rosetta latte art and a sprinkle of vanilla bean powder.",
    category: "hot",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format",
    origin: "Brazil Santos",
    roastLevel: "Medium-Dark",
    caffeine: "Medium",
    ingredients: ["Espresso", "Organic Whole Milk", "Madagascar Vanilla", "Vanilla Bean Powder"],
    nutrition: { calories: 180, protein: 9, carbs: 18, fat: 7 }
  },
  {
    id: 3,
    name: "Colombian Cold Brew Reserve",
    price: 6.75,
    description: "24-hour cold-steeped Colombian Huila beans served over hand-carved ice spheres. Smooth, naturally sweet with chocolate undertones and zero acidity. Served in our signature glass.",
    category: "cold",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=300&fit=crop&auto=format",
    specialty: true,
    origin: "Huila, Colombia",
    roastLevel: "Medium",
    caffeine: "High",
    ingredients: ["Colombian Huila Coffee", "Filtered Water"],
    nutrition: { calories: 10, protein: 1, carbs: 0, fat: 0 }
  },
  {
    id: 4,
    name: "Salted Caramel Macchiato",
    price: 7.50,
    description: "Double shot espresso layered with cold organic oat milk and house-made salted caramel sauce. Topped with whipped cream and Himalayan pink salt. A perfect balance of bitter and sweet.",
    category: "cold",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&auto=format",
    origin: "Guatemala Antigua",
    roastLevel: "Dark",
    caffeine: "High",
    ingredients: ["Espresso", "Oat Milk", "Salted Caramel", "Whipped Cream", "Pink Salt"],
    nutrition: { calories: 240, protein: 6, carbs: 28, fat: 12 }
  },
  {
    id: 5,
    name: "Artisan Butter Croissant",
    price: 4.95,
    description: "Handcrafted daily using European-style butter and traditional French techniques. 72-hour fermentation process creates perfectly flaky layers with a golden, crispy exterior and soft, buttery interior.",
    category: "food",
    image: "https://images.unsplash.com/photo-1555507036-ab794f576c39?w=400&h=300&fit=crop&auto=format",
    ingredients: ["Organic Flour", "European Butter", "Sea Salt", "Yeast"],
    nutrition: { calories: 280, protein: 6, carbs: 28, fat: 16 }
  },
  {
    id: 6,
    name: "Avocado Toast Deluxe",
    price: 12.50,
    description: "Fresh California avocado mashed with lime and sea salt on house-made sourdough. Topped with heirloom cherry tomatoes, microgreens, everything bagel seasoning, and a drizzle of extra virgin olive oil.",
    category: "food",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop&auto=format",
    ingredients: ["Sourdough Bread", "California Avocado", "Cherry Tomatoes", "Microgreens", "Everything Seasoning", "Olive Oil"],
    nutrition: { calories: 380, protein: 12, carbs: 35, fat: 24 }
  },
  {
    id: 7,
    name: "Chocolate Affogato Supreme",
    price: 8.95,
    description: "Premium Madagascar vanilla gelato drowned in a double shot of our signature espresso. Finished with Belgian dark chocolate shavings, candied orange peel, and a delicate almond tuile.",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format",
    specialty: true,
    caffeine: "Medium",
    ingredients: ["Vanilla Gelato", "Espresso", "Dark Chocolate", "Orange Peel", "Almond Tuile"],
    nutrition: { calories: 320, protein: 8, carbs: 35, fat: 18 }
  },
  {
    id: 8,
    name: "Ceremonial Matcha Latte",
    price: 7.95,
    description: "Ceremonial grade matcha from Uji, Kyoto whisked to perfection with steamed organic oat milk and a touch of raw honey. Served in traditional Japanese ceramic and garnished with matcha powder.",
    category: "specialty",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop&auto=format",
    origin: "Uji, Kyoto",
    caffeine: "Medium",
    ingredients: ["Ceremonial Matcha", "Oat Milk", "Raw Honey"],
    nutrition: { calories: 150, protein: 4, carbs: 22, fat: 5 }
  },
  {
    id: 9,
    name: "Truffle Mushroom Panini",
    price: 14.95,
    description: "Wild mushroom medley with truffle oil, aged gruyere cheese, caramelized onions, and fresh thyme on artisan ciabatta. Pressed to perfection and served with mixed greens.",
    category: "food",
    image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&auto=format",
    ingredients: ["Ciabatta", "Wild Mushrooms", "Truffle Oil", "Gruyere", "Caramelized Onions", "Fresh Thyme"],
    nutrition: { calories: 420, protein: 18, carbs: 32, fat: 24 }
  },
  {
    id: 10,
    name: "Tiramisu Slice",
    price: 6.95,
    description: "Traditional Italian tiramisu made with ladyfingers soaked in our signature espresso, mascarpone cream, and dusted with premium cocoa powder. A perfect end to any meal.",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format",
    ingredients: ["Ladyfingers", "Mascarpone", "Espresso", "Cocoa Powder", "Marsala Wine"],
    nutrition: { calories: 380, protein: 8, carbs: 28, fat: 26 }
  }
];

export default function ElegantCoffeeShop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart Page Component
  const CartPage = () => (
    <div className="fixed inset-0 bg-neutral-900/95 backdrop-blur-xl z-50 overflow-y-auto">
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">Your Cart</h1>
            <button
              onClick={() => setShowCart(false)}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-24 w-24 text-neutral-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
              <p className="text-neutral-400 mb-8">Add some delicious items to get started</p>
              <button
                onClick={() => setShowCart(false)}
                className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Order Summary</h2>
                  <div className="space-y-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-neutral-900">{item.name}</h3>
                          <p className="text-sm text-neutral-600 mb-2">{item.description.slice(0, 80)}...</p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="font-semibold text-neutral-900 w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <span className="font-bold text-amber-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 sticky top-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Checkout</h2>
                  
                  {/* Customer Information */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        <User className="h-4 w-4 inline mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="border-t border-neutral-200 pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-neutral-600">Subtotal:</span>
                      <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-neutral-600">Tax (8.5%):</span>
                      <span className="font-semibold">${(cartTotal * 0.085).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-amber-600">${(cartTotal * 1.085).toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={async () => {
                      const orderData = {
                        customer: customerInfo,
                        items: cart,
                        total: cartTotal,
                        tax: cartTotal * 0.085,
                      };

                      const response = await fetch('/api/orders', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(orderData),
                      });

                      if (response.ok) {
                        alert('Order placed successfully!');
                        setCart([]); // Clear the cart after successful order
                      } else {
                        alert('Failed to place order. Please try again.');
                      }
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center group"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Place Order
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-xs text-neutral-500 text-center mt-4">
                    By placing your order, you agree to our terms and conditions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-amber-50 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-neutral-900/95 backdrop-blur-xl shadow-2xl border-b border-amber-600/20' 
          : 'bg-neutral-900/80 backdrop-blur-md'
      }`}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Coffee className="h-10 w-10 text-amber-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white tracking-tight">Brew & Bean</span>
                <div className="text-xs text-amber-400 font-medium">ARTISAN COFFEE HOUSE</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Menu', 'Experience', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} 
                   className="text-neutral-300 hover:text-amber-400 font-medium transition-all duration-300 relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <div className="relative group">
                <button 
                  onClick={() => setShowCart(true)}
                  className="flex items-center space-x-2 text-neutral-300 hover:text-amber-400 transition-colors duration-300"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemsCount > 0 && (
                    <span className="bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-neutral-300 hover:text-amber-400 hover:bg-neutral-800/50 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800">
            <div className="px-4 py-6 space-y-4">
              {['Home', 'Menu', 'Experience', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} 
                   className="block px-4 py-3 text-neutral-300 hover:text-amber-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-300">
                  {item}
                </a>
              ))}
              <button 
                onClick={() => { setShowCart(true); setIsMenuOpen(false); }}
                className="w-full flex items-center px-4 py-3 text-neutral-300 hover:text-amber-400 hover:bg-neutral-800/50 rounded-lg transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5 mr-3" />
                Cart ({cartItemsCount})
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-stone-900/70 to-neutral-800/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[15s] ease-out"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop&auto=format')",
            transform: `scale(1.1) translateY(${scrollY * 0.3}px)`
          }}
        ></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center px-6 py-3 bg-amber-600/20 backdrop-blur-sm border border-amber-600/30 rounded-full text-amber-300 text-sm font-medium mb-8 animate-pulse">
                <Award className="h-4 w-4 mr-2" />
                Award-Winning Artisan Coffee Since 2018
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Crafted with
                <span className="block text-amber-400 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent animate-pulse">
                  Passion
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-neutral-300 leading-relaxed max-w-xl">
                Experience the perfect blend of tradition and innovation in every carefully curated cup. 
                Where artistry meets flavor in our sustainable, community-centered coffee house.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-amber-600 hover:bg-amber-500 text-white px-10 py-5 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center"
                >
                  <span>Explore Menu</span>
                  <Coffee className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                </button>
                <button className="border-2 border-neutral-400 hover:border-amber-400 hover:bg-amber-400/10 text-white px-10 py-5 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  Visit Our Roastery
                </button>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-900/30 to-stone-900/30 backdrop-blur-lg border border-amber-600/20 rounded-3xl p-8 transform hover:rotate-1 transition-transform duration-500">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-amber-400 mb-2 animate-pulse">25k+</div>
                      <div className="text-neutral-300 text-sm">Happy Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-amber-400 mb-2 animate-pulse">98%</div>
                      <div className="text-neutral-300 text-sm">Satisfaction Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-amber-400 mb-2 animate-pulse">35+</div>
                      <div className="text-neutral-300 text-sm">Coffee Origins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-amber-400 mb-2 animate-pulse">5★</div>
                      <div className="text-neutral-300 text-sm">Average Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 via-transparent to-amber-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">The Experience</h2>
            <p className="text-xl text-neutral-400 max-w-4xl mx-auto leading-relaxed">
              More than just coffee – it's a journey of the senses, a moment of reflection, and a celebration of craftsmanship 
              that transforms ordinary moments into extraordinary memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Leaf className="h-16 w-16" />,
                title: "Sustainably Sourced",
                description: "Direct partnerships with over 50 coffee farms across 12 countries, ensuring fair trade practices, environmental sustainability, and the highest quality beans that support farming communities.",
                features: ["Direct Trade Partnerships", "Organic Certification", "Carbon Neutral Shipping", "Fair Wage Guarantee"]
              },
              {
                icon: <Coffee className="h-16 w-16" />,
                title: "Expert Craftsmanship",
                description: "Our master roasters and certified baristas bring decades of experience, using precision techniques and artisanal methods to create the perfect cup every single time.",
                features: ["Master Roasted Daily", "Precision Brewing", "Latte Art Mastery", "Temperature Perfect"]
              },
              {
                icon: <Heart className="h-16 w-16" />,
                title: "Community Focused",
                description: "A warm, inviting space designed for connection, creativity, and community. From business meetings to first dates, we create the perfect atmosphere for life's important moments.",
                features: ["Cozy Atmosphere", "Free High-Speed WiFi", "Community Events", "Private Spaces"]
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-amber-900/20 to-stone-900/20 backdrop-blur-sm border border-amber-600/20 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-500">
                  <div className="text-amber-400 mb-6 inline-flex p-4 bg-amber-600/10 rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-neutral-400 mb-6 leading-relaxed">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-amber-300 flex items-center">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 bg-gradient-to-br from-stone-50 via-neutral-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-8">Our Menu</h2>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Discover our carefully curated selection of artisanal coffees, handcrafted beverages, and gourmet treats. 
              Each item is prepared with passion and precision by our expert team.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['all', 'hot', 'cold', 'food', 'dessert', 'specialty'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-neutral-700 hover:bg-amber-100 hover:text-amber-700 border border-neutral-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.specialty && (
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Specialty
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.name}</h3>
                  <p className="text-neutral-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                  
                  {item.origin && (
                    <p className="text-sm text-amber-600 font-medium mb-2">Origin: {item.origin}</p>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-amber-600">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Our Story</h2>
              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                Founded in 2018 by a team of passionate coffee enthusiasts, Brew & Bean was born from a simple belief: 
                that exceptional coffee should be accessible to everyone while supporting the communities that grow it.
              </p>
              <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                From our humble beginnings as a small roastery to becoming a beloved community hub, we've remained 
                committed to our core values of quality, sustainability, and community. Every cup tells a story of 
                dedication, craftsmanship, and the incredible journey from bean to brew.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold text-amber-400 mb-2">50+</div>
                  <div className="text-neutral-300">Partner Farms</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-amber-400 mb-2">12</div>
                  <div className="text-neutral-300">Countries</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-amber-400 mb-2">100%</div>
                  <div className="text-neutral-300">Fair Trade</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-amber-400 mb-2">Zero</div>
                  <div className="text-neutral-300">Waste Goal</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=800&fit=crop&auto=format"
                alt="Coffee roasting"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-amber-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">Master Roaster</div>
                <div className="text-sm opacity-90">15+ Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-stone-50 via-neutral-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-8">Visit Us</h2>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              We'd love to welcome you to our coffee house. Come experience the perfect blend of exceptional coffee, 
              warm hospitality, and community connection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-3xl font-bold text-neutral-900 mb-8">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-amber-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Location</h4>
                      <p className="text-neutral-600">123 Artisan Street, Coffee District, CA 94107</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-amber-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Hours</h4>
                      <p className="text-neutral-600">Mon-Fri: 6:00 AM - 8:00 PM</p>
                      <p className="text-neutral-600">Sat-Sun: 7:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-amber-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Phone</h4>
                      <p className="text-neutral-600">(415) 555-BREW</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="p-3 bg-neutral-100 hover:bg-amber-100 rounded-full transition-colors">
                      <Instagram className="h-5 w-5 text-neutral-700" />
                    </a>
                    <a href="#" className="p-3 bg-neutral-100 hover:bg-amber-100 rounded-full transition-colors">
                      <Facebook className="h-5 w-5 text-neutral-700" />
                    </a>
                    <a href="#" className="p-3 bg-neutral-100 hover:bg-amber-100 rounded-full transition-colors">
                      <Twitter className="h-5 w-5 text-neutral-700" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-3xl font-bold text-neutral-900 mb-8">Send Us a Message</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Coffee className="h-8 w-8 text-amber-600" />
                <span className="text-xl font-bold">Brew & Bean</span>
              </div>
              <p className="text-neutral-400 text-sm">
                Crafting exceptional coffee experiences with passion and purpose.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
                <li><a href="#menu" className="hover:text-amber-400 transition-colors">Menu</a></li>
                <li><a href="#experience" className="hover:text-amber-400 transition-colors">Experience</a></li>
                <li><a href="#about" className="hover:text-amber-400 transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Catering</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Private Events</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Coffee Subscriptions</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>(415) 555-BREW</li>
                <li>123 Artisan Street</li>
                <li>Coffee District, CA 94107</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm text-neutral-400">
            <p>&copy; 2024 Brew & Bean Artisan Coffee House. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {showCart && <CartPage />}
    </div>
  );
}
