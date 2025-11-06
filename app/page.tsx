"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Service from "./components/service";

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: ''
  });

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard support for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for contact field - only allow 10 digits
    if (name === 'contact') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const faqs = [
    {
      question: "What types of properties does KLAS Realty develop?",
      answer: "KLAS Realty specializes in both residential and commercial projects. We develop premium residential complexes and commercial spaces across Mumbai, Thane, Chennai, and Gujarat, with over 1 million sq. ft. of planned built-up area currently in development."
    },
    {
      question: "Where are KLAS Realty properties located?",
      answer: "We own premium lands across Mumbai and Thane, and lease prime commercial premises in Mumbai, Chennai, and Gujarat. Our expanding national footprint includes strategic locations in key metropolitan areas across India."
    },
    {
      question: "Does KLAS Realty work with joint venture partners?",
      answer: "Yes, we actively engage in joint venture development partnerships. Our premium lands in Mumbai and Thane are currently in advanced stages of joint venture development, creating landmark residential and commercial projects."
    },
    {
      question: "What makes KLAS Realty different?",
      answer: "Established in 2000, KLAS Realty combines decades of experience with a robust portfolio of high-value properties. We focus on Converting properties into value. while creating steady, long-term value across every asset class through strategic development and leasing."
    },
    {
      question: "Are KLAS Realty properties available for commercial leasing?",
      answer: "Yes, we lease prime commercial premises in Mumbai, Chennai, and Gujarat to leading corporates. Our commercial properties offer strategic locations that create steady, long-term value for businesses."
    }
  ];

  // Loading screen
  if (isLoading) {
    return (
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-[#12394C] to-[#12394C]/70 flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2 
            className="text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            KLAS Realty
          </motion.h2>
          <motion.p 
            className="text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Transforming land into landmarks...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}>
        <nav className={`container mx-auto px-6 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}>
          <div className="flex items-center justify-between">
            <div className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              KLAS Realty
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link href="#about" className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#12394C]' 
                  : 'text-white/90 hover:text-white'
              }`}>About</Link>
              <Link href="#portfolio" className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#12394C]' 
                  : 'text-white/90 hover:text-white'
              }`}>Portfolio</Link>
              <Link href="#gallery" className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#12394C]' 
                  : 'text-white/90 hover:text-white'
              }`}>Gallery</Link>
              {/* <Link href="#services" className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#12394C]' 
                  : 'text-white/90 hover:text-white'
              }`}>Services</Link>
              <Link href="#faq" className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#12394C]' 
                  : 'text-white/90 hover:text-white'
              }`}>FAQ</Link> */}
              <Link href="#contact" className={`px-6 py-1 rounded-lg font-medium transition-all duration-300 ${
                isScrolled 
                  ? 'bg-[#12394C] text-white hover:bg-[#12394C]/80' 
                  : 'bg-white/20 text-white border border-white/30 hover:bg-white hover:text-gray-800'
              }`}>Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-800 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/20'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className={`py-4 space-y-4 ${
              isScrolled 
                ? 'bg-white/95 backdrop-blur-sm rounded-lg shadow-lg' 
                : 'bg-black/20 backdrop-blur-sm rounded-lg'
            }`}>
              <Link 
                href="#about" 
                className={`block px-4 py-2 transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-teal-600 hover:bg-gray-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="#portfolio" 
                className={`block px-4 py-2 transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-teal-600 hover:bg-gray-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                href="#gallery" 
                className={`block px-4 py-2 transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-teal-600 hover:bg-gray-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              {/* <Link 
                href="#services" 
                className={`block px-4 py-2 transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-teal-600 hover:bg-gray-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="#faq" 
                className={`block px-4 py-2 transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-teal-600 hover:bg-gray-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link> */}
              <Link 
                href="#contact" 
                className={`block mx-4 px-4 py-2 rounded-lg text-center font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-[#12394C] text-white hover:bg-[#12394C]/80' 
                    : 'bg-white/20 text-white border border-white/30 hover:bg-white hover:text-gray-800'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#12394C]/80 to-[#12394C]/60 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Section 1: Banner */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src="/images/2.jpg"
            alt="KLAS Realty Background"
            fill
            className="object-cover"
            priority
          />
          <motion.div 
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>
        <motion.div 
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Converting properties into value.
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Established in 2000, KLAS Realty holds a robust portfolio of high-value properties across India.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.a 
              href="#portfolio"
              className="bg-[#12394C] cursor-pointer text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors inline-block"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(13, 148, 136, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Explore Portfolio
            </motion.a>
            <motion.a 
              href="#contact"
              className="border-2 border-white cursor-pointer text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-white transition-colors inline-block"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: About */}
      <motion.section 
        id="about" 
        className="py-20 bg-gradient-to-br from-slate-50 to-teal-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-[42%_58%] gap-12 items-stretch">
            {/* Left Content - Image */}
            <motion.div 
              className="relative h-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-xl h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-full relative bg-gradient-to-br from-slate-800 to-slate-900">
                  <Image
                    src="/images/realestart.png"
                    alt="KLAS Realty Premium Development"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Header with Icon */}
              {/* <motion.div 
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-3 h-3 bg-[#12394C]"></div>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#12394C]">
                  ABOUT OUR COMPANY
                </span>
              </motion.div> */}

              {/* Main Title */}
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                KLAS Realty
              </motion.h2>

              {/* Team Avatars */}
           

              {/* Team Description */}
            

              {/* Original Content Paragraphs */}
              <motion.div 
                className="prose prose-lg text-gray-600 leading-relaxed space-y-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-xl text-gray-700 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  Established in 2000, KLAS Realty holds a robust portfolio of high-value properties across India.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  KLAS owns premium lands across Mumbai and Thane, which are currently in advanced stages of joint venture development of Residential & Commercial Projects totalling 1+ million sq. ft. of planned built-up area.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  viewport={{ once: true }}
                >
                  Beyond development, we lease prime commercial premises in Mumbai, Chennai, and Gujarat to leading corporates—creating steady, long-term value across every asset class.
                </motion.p>
              </motion.div>

              {/* Separator */}
              <motion.div 
                className="relative mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <div className="h-px bg-gray-200"></div>
                <div className="absolute left-0 top-0 w-16 h-1 bg-[#12394C]"></div>
              </motion.div>

              {/* Metrics */}
              <motion.div 
                className="grid grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                viewport={{ once: true }}
              >
                {/* Left Metric */}
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-[#12394C] mb-2">
                    1M+
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Sq. Ft. Development
                  </div>
                </div>

                {/* Right Metric */}
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-[#12394C] mb-2">
                    2000
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Established
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 3: Portfolio */}
      <motion.section 
        id="portfolio" 
        className="py-20 bg-gradient-to-br from-slate-50 to-teal-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Our Portfolio
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Premium lands and commercial properties creating enduring value across India.
            </motion.p>
          </motion.div>
          
          <div className="space-y-12">
            {/* Portfolio Item 1 - Prime Commercial Offices for Lease */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Content - Left side */}
              <motion.div 
                className="space-y-6 md:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div>
                  <span className="inline-block px-3 py-1 bg-teal-500/10 text-teal-600 text-sm font-semibold rounded-full mb-4">
                    Leasing
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Prime Commercial Offices for Lease
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Premium commercial office spaces in prime locations, offering strategic business advantages and exceptional connectivity.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="font-medium">Nariman Point, Mumbai</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="font-medium">Info City, Gandhinagar (Gujarat)</span>
                  </div>
                
                </div>
              </motion.div>

              {/* Image - Right side */}
              <motion.div 
                className="relative h-96 rounded-lg overflow-hidden shadow-lg md:order-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                  alt="Prime Commercial Offices for Lease"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Portfolio Item 2 - Completed Projects */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
               {/* Image - Left side */}
               <motion.div 
                className="relative h-96 rounded-lg overflow-hidden shadow-lg md:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                  alt="Completed Projects"
                  fill
                  className="object-cover"
                />
              </motion.div>
              {/* Content - Right side */}
              <motion.div 
                className="space-y-6 md:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div>
                  <span className="inline-block px-3 py-1 bg-green-500/10 text-green-600 text-sm font-semibold rounded-full mb-4">
                    Completed
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Completed Projects
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Successfully delivered commercial and logistics projects across key metropolitan areas, creating lasting value and impact.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Commercial Tower, T Nagar, Chennai</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Commercial Tower, Adayar, Chennai</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Logistics Center, Kolshet Road, Thane (W)</span>
                  </div>
                 
                </div>
              </motion.div>
            </motion.div>

            {/* Portfolio Item 3 - Upcoming Residential & Commercial Projects */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Content - Left side */}
              <motion.div 
                className="space-y-6 md:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div>
                  <span className="inline-block px-3 py-1 bg-[#12394C]/10 text-[#12394C] text-sm font-semibold rounded-full mb-4">
                    Upcoming
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Upcoming Residential & Commercial Projects
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Exciting new developments in prime locations, combining residential luxury with commercial excellence across Mumbai and Thane.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#12394C] rounded-full"></div>
                    <span className="font-medium">Ghodbunder Road, Thane</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#12394C] rounded-full"></div>
                    <span className="font-medium">Bandra, Mumbai</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#12394C] rounded-full"></div>
                    <span className="font-medium">Chembur, Mumbai</span>
                  </div>
                 
                </div>
              </motion.div>

              {/* Image - Right side */}
              <motion.div 
                className="relative h-96 rounded-lg overflow-hidden shadow-lg md:order-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                  alt="Upcoming Residential & Commercial Projects"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 4: Gallery */}
      <motion.section 
        id="gallery" 
        className="py-20 bg-gradient-to-br from-slate-50 to-teal-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Our Gallery
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Explore our premium properties and developments through stunning visuals
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { src: "/images/Abhinav Center 1.jpg", alt: "Abhinav Center" },
              { src: "/images/ShivaCenter2.jpeg", alt: "Abhinav Center Exterior" },
            ].map((image, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-8 h-8 text-[#12394C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="relative w-full h-full max-w-5xl">
                  <Image
                    src={selectedImage}
                    alt="Gallery Image"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

    

      {/* Section 7: FAQ */}
  

      {/* Section 8: Contact */}
      <motion.section 
        id="contact" 
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/3.jpg"
            alt="Contact Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </motion.div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.h2>
         
          </motion.div>

          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg"
                    placeholder="Your full name"
                    whileFocus={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.6)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg"
                    placeholder="your@email.com"
                    whileFocus={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.6)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <label htmlFor="contact" className="block text-white text-sm font-medium mb-2">
                  Contact Number
                </label>
                <motion.input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full px-4 py-3 bg-transparent border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg"
                  placeholder="Enter 10-digit phone number"
                  whileFocus={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.6)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/40 rounded-lg resize-none"
                  placeholder="Tell us about your property requirements..."
                  whileFocus={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.6)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <motion.button
                  type="submit"
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Submit Message
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">KLAS Realty </h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Converting properties into value. Established in 2000, we hold a robust portfolio of high-value properties across India, creating enduring value through strategic development and leasing.
              </p>
              {/* <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#12394C] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div> */}
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 (XXX) XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@klasrealty.com</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 KLAS Realty . All rights reserved.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
