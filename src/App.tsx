/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Leaf, 
  Droplets, 
  Sun, 
  Zap,
  Instagram,
  Facebook,
  Twitter,
  ChevronDown
} from 'lucide-react';

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg viewBox="0 0 40 40" className="w-full h-full fill-golden">
        <path d="M20 2C20 2 28 10 28 20C28 30 20 38 20 38C20 38 12 30 12 20C12 10 20 2 20 2Z" />
        <path d="M20 5C20 5 16 12 16 20C16 28 20 35 20 35" className="stroke-forest fill-none" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
    <span className="font-serif text-2xl font-bold tracking-tight text-forest">Fruitea</span>
  </div>
);

const DrinkIllustration = ({ type, color }: { type: string, color: string }) => {
  return (
    <div className="relative w-48 h-60 mx-auto flex items-end justify-center perspective-1000">
      {/* Glass Body */}
      <div className="relative w-32 h-48 bg-white/30 border-2 border-white/50 rounded-b-3xl rounded-t-lg backdrop-blur-sm overflow-hidden transform-gpu">
        {/* Liquid */}
        <motion.div 
          initial={{ height: "0%" }}
          whileInView={{ height: "85%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ backgroundColor: color }}
          className="absolute bottom-0 left-0 right-0 w-full drink-liquid"
        >
          {/* Bubbles or details based on type */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [-10, -100], opacity: [0, 1, 0] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{ left: `${20 + Math.random() * 60}%`, bottom: '0' }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Reflection */}
        <div className="absolute top-0 right-4 w-2 h-full bg-white/20 rounded-full" />
      </div>

      {/* Condensation dots for premium feel */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-blue-100/40 rounded-full"
            style={{ 
              top: `${40 + Math.random() * 40}%`, 
              left: `${35 + Math.random() * 30}%`
            }} 
          />
        ))}
      </div>

      {/* Garnish */}
      {type === 'watermelon' && (
        <motion.div 
          initial={{ rotate: -20, opacity: 0 }}
          whileInView={{ rotate: 15, opacity: 1 }}
          className="absolute -right-4 top-4 w-12 h-8 bg-green-600 rounded-full border-b-4 border-red-400 rotate-15"
        />
      )}
      {type === 'mint' && (
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="absolute -right-2 top-0 text-green-500"
        >
          <Leaf size={24} fill="currentColor" />
        </motion.div>
      )}
    </div>
  );
};

interface Drink {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  type: string;
}

const DRINKS: Drink[] = [
  { id: 1, name: "Watermelon Juice", description: "Cool, hydrating bliss with a hint of mint", price: 5.99, color: "#FF5E5E", type: "watermelon" },
  { id: 2, name: "Banana Shake", description: "Creamy, rich, and naturally sweet", price: 6.49, color: "#FFE135", type: "banana" },
  { id: 3, name: "Mango Juice", description: "Tropical golden nectar, thick and lush", price: 5.99, color: "#FF9100", type: "mango" },
  { id: 4, name: "Apple Juice", description: "Crisp, refreshing, orchard-fresh", price: 4.99, color: "#C3E88D", type: "apple" },
  { id: 5, name: "Strawberry Smoothie", description: "Berry-bright and bursting with flavour", price: 6.99, color: "#FC5C7D", type: "strawberry" },
  { id: 6, name: "Pineapple Cooler", description: "Tangy tropical zing, ice cold", price: 5.49, color: "#FFD700", type: "pineapple" },
  { id: 7, name: "Mixed Citrus Juice", description: "A zingy blend of orange, lemon, grapefruit", price: 5.99, color: "#FFA500", type: "citrus" },
  { id: 8, name: "Avocado Green Shake", description: "Velvety, nourishing, and earthy smooth", price: 7.49, color: "#568203", type: "avocado" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['home', 'story', 'menu', 'spotlight', 'values', 'testimonials'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Our Story', href: '#story', id: 'story' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Values', href: '#values', id: 'values' },
  ];

  return (
    <div className="min-h-screen selection:bg-golden selection:text-forest overflow-x-hidden">
      
      {/* --- Sticky Navigation --- */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Logo />
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-coral ${
                  activeSection === link.id ? 'text-coral' : 'text-forest'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button className="relative group p-2 text-forest hover:text-coral transition-colors">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-1 -right-1 bg-coral text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button className="relative p-2 text-forest">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-coral text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-forest"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-cream border-t border-forest/10 p-6 md:hidden shadow-xl"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map(link => (
                  <a 
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-serif font-semibold text-forest hover:text-coral"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- SECTION 1: HERO --- */}
      <section 
        id="home"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,#FFFDF5_0%,#F4A921_100%)] opacity-30" />
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-forest/5 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-golden/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-forest mb-6">
              Nature's Finest Drinks, <span className="text-coral">Crafted</span> for You
            </h1>
            <p className="text-lg md:text-xl text-forest/70 mb-10 max-w-lg leading-relaxed">
              100% real fruit. Zero compromise. Delivered fresh to your doorstep every single morning.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#menu" 
                className="px-8 py-4 bg-forest text-cream rounded-full font-semibold hover:bg-forest/90 transition-all shadow-lg hover:shadow-forest/20 flex items-center gap-2 group"
              >
                Explore Our Menu
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#story" 
                className="px-8 py-4 border-2 border-forest text-forest rounded-full font-semibold hover:bg-forest hover:text-cream transition-all"
              >
                Our Story
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Hero Mockup */}
            <DrinkIllustration type="watermelon" color="#FF5E5E" />
            
            {/* Floating Fruit Icons */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-10 p-4 bg-white rounded-2xl shadow-xl"
            >
              <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
              </div>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 left-0 p-4 bg-white rounded-2xl shadow-xl"
            >
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M18,3V5H15V3H18M18,7V9H15V7H18M18,11V13H15V11H18M18,15V17H15V15H18M18,19V21H15V19H18M2,21H4V12H2V21M6,21H8V15H6V21M10,21H12V9H10V21Z" /></svg>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.a 
          href="#story"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 p-3 text-forest/40 hover:text-forest transition-colors"
        >
          <ChevronDown size={32} />
        </motion.a>
      </section>

      {/* --- SECTION 2: OUR STORY --- */}
      <section id="story" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square bg-cream rounded-[40px] border-2 border-forest/10 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-golden/20 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-forest/5 rounded-full -ml-24 -mb-24" />
                
                {/* CSS Art: Orchard */}
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <div className="flex gap-4">
                    {[...Array(3)].map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="w-16 h-24 bg-forest rounded-t-full relative"
                      >
                         <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-coral rounded-full" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="w-full h-2 bg-forest/20 mt-2 rounded-full" />
                </div>
              </div>
              
              <motion.div 
                whileInView={{ x: [0, 20, 0] }}
                className="absolute -bottom-6 -right-6 bg-forest p-6 rounded-2xl text-cream shadow-2xl z-10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-serif font-bold">15+</span>
                  <p className="text-xs uppercase tracking-widest opacity-70">Years of<br/>Pure Freshness</p>
                </div>
              </motion.div>
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 bg-golden/10 text-golden text-sm font-bold uppercase tracking-wider rounded-full mb-4">
                Our Heritage
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-forest mb-6">
                From Orchard to Your Glass
              </h2>
              <p className="text-lg text-forest/70 mb-8 leading-relaxed">
                We started with a simple belief: the best drinks come straight from the tree. Our journey takes us to handpicked local orchards where we select only the ripest, most vibrant seasonal fruits.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: <CheckCircle2 className="text-coral" />, title: "100% Natural" },
                  { icon: <CheckCircle2 className="text-coral" />, title: "No Preservatives" },
                  { icon: <CheckCircle2 className="text-coral" />, title: "Farmer Direct" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2 p-4 bg-cream rounded-2xl border border-forest/5">
                    {stat.icon}
                    <span className="font-bold text-forest text-sm">{stat.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: MENU --- */}
      <section id="menu" className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-forest mb-4">Our Premium Collection</h2>
            <div className="w-24 h-1 bg-coral mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {DRINKS.map((drink) => (
              <motion.div
                key={drink.id}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-forest/5 flex flex-col h-full"
              >
                <div className="mb-6 bg-cream rounded-[24px] py-8 overflow-hidden">
                  <DrinkIllustration type={drink.type} color={drink.color} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-forest mb-2">{drink.name}</h3>
                  <p className="text-sm text-forest/60 mb-4 line-clamp-2">
                    {drink.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-forest/5">
                  <span className="text-2xl font-serif font-bold text-coral">${drink.price}</span>
                  <button 
                    onClick={addToCart}
                    className="p-3 bg-forest text-cream rounded-2xl hover:bg-coral transition-colors"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: SPOTLIGHT --- */}
      <section id="spotlight" className="py-32 bg-forest text-cream overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative order-2 md:order-1"
            >
              <div className="absolute inset-0 bg-coral/20 blur-[120px] rounded-full" />
              <div className="relative z-10">
                <DrinkIllustration type="mint" color="#FF5E5E" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-cream/10 rounded-full animate-pulse-slow" />
              </div>
            </motion.div>

            <div className="order-1 md:order-2">
              <span className="text-coral font-bold uppercase tracking-widest text-sm mb-4 block">Drink of the Season</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Watermelon <br/>
                <span className="text-golden italic">Refreshment</span>
              </h2>
              
              <div className="space-y-6 mb-12">
                {[
                  { icon: <Droplets className="text-coral" />, name: "Watermelon", dose: "85%" },
                  { icon: <Sun className="text-golden" />, name: "Key Lime", dose: "10%" },
                  { icon: <Leaf className="text-green-400" />, name: "Fresh Mint", dose: "5%" },
                ].map((ing, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-cream/10">
                    <div className="flex items-center gap-4">
                      {ing.icon}
                      <span className="text-lg font-medium">{ing.name}</span>
                    </div>
                    <span className="text-sm opacity-50">{ing.dose}</span>
                  </div>
                ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addToCart}
                className="w-full sm:w-auto px-10 py-5 bg-coral text-white rounded-full font-bold text-lg shadow-2xl shadow-coral/30 hover:bg-coral/90 transition-all flex items-center justify-center gap-3"
              >
                Order Now
                <ArrowRight />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: WHY FRUITEA --- */}
      <section id="values" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: <div className="w-16 h-16 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mb-6"><Leaf size={32} /></div>,
                title: "Farm Fresh Fruits",
                desc: "Sourced directly from certified organic local farms to ensure peak ripeness."
              },
              { 
                icon: <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-6"><Droplets size={32} /></div>,
                title: "Cold-Pressed Process",
                desc: "We use mechanical pressure to extract juice without heat, locking in all nutrients."
              },
              { 
                icon: <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-3xl flex items-center justify-center mb-6"><Sun size={32} /></div>,
                title: "No Added Sugar",
                desc: "Purely natural sweetness. We never use artificial sweeteners or syrups."
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -12 }}
                className="p-10 bg-cream rounded-4xl border border-forest/5 flex flex-col items-center text-center group transition-all"
              >
                {card.icon}
                <h3 className="text-2xl font-bold text-forest mb-4">{card.title}</h3>
                <p className="text-forest/60 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: TESTIMONIALS --- */}
      <section id="testimonials" className="py-24 bg-cream overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-forest mb-4">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-golden mx-auto rounded-full" />
          </div>

          <div className="flex gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar">
            {[
              { name: "Sophia Reynolds", quote: "Best cold-pressed juices I've ever had. Subscription is worth every penny!", stars: 5 },
              { name: "Marcus Chen", quote: "The Watermelon Mint is my daily ritual. So refreshing after my morning run.", stars: 5 },
              { name: "Elena Gomez", quote: "True fruit taste. You can really tell there's no added garbage in here.", stars: 5 },
              { name: "David Miller", quote: "Fast delivery and the packaging is beautiful. A premium experience throughout.", stars: 5 },
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="min-w-[300px] md:min-w-[400px] bg-white p-8 rounded-[32px] snap-center shadow-sm border border-forest/5"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(item.stars)].map((_, s) => <Star key={s} size={16} fill="#F4A921" stroke="none" />)}
                </div>
                <p className="text-lg text-forest italic mb-6">"{item.quote}"</p>
                <div className="font-bold text-forest">— {item.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 7: CTA --- */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            whileInView={{ scale: [0.95, 1] }}
            className="bg-[linear-gradient(135deg,#1B4332_0%,#2D6A4F_100%)] p-12 md:p-20 rounded-[48px] text-center text-cream shadow-3xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-golden/20 rounded-full blur-[80px] -mr-32 -mt-32" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral/20 rounded-full blur-[80px] -ml-32 -mb-32" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">Ready to Taste the Difference?</h2>
            <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto relative z-10">Order fresh. Delivered in 60 minutes or less within city limits.</p>
            
            <motion.button 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={addToCart}
              className="px-12 py-6 bg-coral text-white rounded-full font-bold text-xl shadow-2xl hover:bg-white hover:text-coral transition-all relative z-10"
            >
              Order Now
            </motion.button>

            <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 text-sm">
              <span className="flex items-center gap-2"><Zap size={18} /> Free Delivery over $30</span>
              <span className="flex items-center gap-2"><Droplets size={18} /> Fresh Daily</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={18} /> 100% Satisfaction</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 8: FOOTER --- */}
      <footer className="bg-forest pt-24 pb-12 text-cream">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <Logo className="invert brightness-0 mb-6" />
              <p className="opacity-60 leading-relaxed mb-8">
                Pure. Fresh. Extraordinary. Crafting health-conscious beverages with a premium touch for the modern lifestyle.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-coral transition-colors text-white"><Instagram size={20} /></a>
                <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-coral transition-colors text-white"><Facebook size={20} /></a>
                <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-coral transition-colors text-white"><Twitter size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8">Menu</h4>
              <ul className="space-y-4 opacity-60">
                <li><a href="#menu" className="hover:opacity-100 transition-opacity">Fruit Juices</a></li>
                <li><a href="#menu" className="hover:opacity-100 transition-opacity">Creamy Shakes</a></li>
                <li><a href="#menu" className="hover:opacity-100 transition-opacity">Veggie Mixes</a></li>
                <li><a href="#menu" className="hover:opacity-100 transition-opacity">Seasonal Specials</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8">Company</h4>
              <ul className="space-y-4 opacity-60">
                <li><a href="#story" className="hover:opacity-100 transition-opacity">About Us</a></li>
                <li><a href="#story" className="hover:opacity-100 transition-opacity">Our Sourcing</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Sustainability</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8">Support</h4>
              <ul className="space-y-4 opacity-60">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Help Center</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Delivery Area</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Refund Policy</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center opacity-40 text-sm">
            © 2024 Fruitea Premium Beverages. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
