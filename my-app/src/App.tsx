import React, { useState, useEffect } from 'react';
import { ChevronUp, Menu, X, Star, Check, ArrowRight, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Send } from 'lucide-react';

interface ServiceModalData {
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

interface TestimonialData {
  name: string;
  company: string;
  image: string;
  text: string;
  rating: number;
}

interface CounterData {
  count: number;
  label: string;
  color: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const GopichandTechnologies: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceModalData | null>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [animatedCounts, setAnimatedCounts] = useState({ projects: 0, clients: 0, team: 0, years: 0 });
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });

  const serviceData: Record<string, ServiceModalData> = {
    'web-development': {
      title: 'Web Development',
      description: 'Our web development team specializes in creating responsive, high-performance websites and web applications. Using modern frameworks like React, Angular, and Vue.js, we build solutions that are scalable, secure, and user-friendly. From e-commerce platforms to complex SaaS applications, we deliver tailored solutions that drive business growth.',
      icon: '💻',
      color: 'blue',
      features: [
        'Custom solutions tailored to your business needs',
        'Cutting-edge technologies and modern approaches',
        'Agile development methodology',
        'Ongoing support and maintenance'
      ]
    },
    'mobile-apps': {
      title: 'Mobile App Development',
      description: 'We create native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences. Our team follows agile development methodologies to build apps that are intuitive, feature-rich, and optimized for performance. We handle everything from concept to deployment on app stores.',
      icon: '📱',
      color: 'green',
      features: [
        'Native and cross-platform development',
        'Intuitive user interface design',
        'App store optimization',
        'Performance monitoring and analytics'
      ]
    },
    'digital-marketing': {
      title: 'Digital Marketing',
      description: 'Our digital marketing services help businesses increase online visibility and generate quality leads. We develop comprehensive strategies including SEO, content marketing, social media management, PPC campaigns, and email marketing. Our data-driven approach ensures measurable results and a strong ROI for your marketing investment.',
      icon: '📢',
      color: 'purple',
      features: [
        'SEO and content marketing',
        'Social media management',
        'PPC and email campaigns',
        'Analytics and reporting'
      ]
    },
    'ui-ux-design': {
      title: 'UI/UX Design',
      description: 'We create user-centered designs that combine aesthetics with functionality. Our design process includes user research, wireframing, prototyping, and usability testing to ensure intuitive and engaging digital experiences. We focus on creating interfaces that drive user satisfaction and business goals.',
      icon: '🎨',
      color: 'red',
      features: [
        'User research and testing',
        'Wireframing and prototyping',
        'Responsive design systems',
        'Accessibility compliance'
      ]
    },
    'cloud-solutions': {
      title: 'Cloud Solutions',
      description: 'Our cloud experts help businesses leverage cloud technologies for scalability, flexibility, and cost savings. We provide cloud migration services, infrastructure setup, and management on platforms like AWS, Azure, and Google Cloud. We also develop cloud-native applications and implement DevOps practices for continuous delivery.',
      icon: '☁️',
      color: 'yellow',
      features: [
        'Cloud migration and setup',
        'Multi-cloud platform support',
        'DevOps implementation',
        '24/7 monitoring and support'
      ]
    },
    'data-analytics': {
      title: 'Data Analytics',
      description: 'Transform your business data into actionable insights with our analytics solutions. We help you collect, process, and visualize data to uncover trends, patterns, and opportunities. Our services include dashboard development, predictive analytics, machine learning models, and business intelligence solutions tailored to your needs.',
      icon: '📊',
      color: 'pink',
      features: [
        'Business intelligence dashboards',
        'Predictive analytics models',
        'Real-time data processing',
        'Custom reporting solutions'
      ]
    }
  };

  const testimonials: TestimonialData[] = [
    {
      name: 'Sarah Johnson',
      company: 'TechNova Solutions',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      text: "Gopichand Technologies transformed our outdated website into a modern, user-friendly platform. Our conversion rates increased by 45% within the first month!",
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'Global Retail Group',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: "The mobile app developed by Gopichand Technologies exceeded our expectations. Their attention to detail and user experience focus is unparalleled.",
      rating: 5
    },
    {
      name: 'Priya Sharma',
      company: 'FinTech Innovations',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: "Working with Gopichand Technologies was a game-changer for our business. Their cloud solutions helped us scale efficiently during our rapid growth phase.",
      rating: 4.5
    }
  ];

  const counters: CounterData[] = [
    { count: 500, label: 'Projects Completed', color: 'text-blue-600' },
    { count: 200, label: 'Happy Clients', color: 'text-green-600' },
    { count: 15, label: 'Team Members', color: 'text-purple-600' },
    { count: 8, label: 'Years Experience', color: 'text-red-600' }
  ];

  const portfolioItems = [
    { title: 'E-commerce Platform', category: 'web-development', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80' },
    { title: 'Fitness Tracker App', category: 'mobile-app', image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80' },
    { title: 'Corporate Website', category: 'web-development', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80' },
    { title: 'Banking App Interface', category: 'ui-ux', image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?auto=format&fit=crop&w=800&q=80' },
    { title: 'Brand Awareness Campaign', category: 'digital-marketing', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80' },
    { title: 'SaaS Business Platform', category: 'web-development', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80' }
  ];

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (countersStarted) {
      const animateCounters = () => {
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;

        counters.forEach((counter, index) => {
          let currentCount = 0;
          const increment = counter.count / steps;

          const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= counter.count) {
              currentCount = counter.count;
              clearInterval(timer);
            }

            setAnimatedCounts(prev => ({
              ...prev,
              [index === 0 ? 'projects' : index === 1 ? 'clients' : index === 2 ? 'team' : 'years']: Math.floor(currentCount)
            }));
          }, stepDuration);
        });
      };

      animateCounters();
    }
  }, [countersStarted]);

  // Handlers
  const openServiceModal = (serviceKey: string) => {
    setSelectedService(serviceData[serviceKey]);
    setIsServiceModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeServiceModal = () => {
    setIsServiceModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = '';
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We've received your message and will contact you at ${formData.email} shortly.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }
    return stars;
  };

  const filteredPortfolioItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-10 h-10 rounded-full bg-blue-400 opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-purple-400 opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 rounded-full bg-green-400 opacity-20 animate-bounce" style={{ animationDelay: '4s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-8 h-8 rounded-full bg-blue-400 opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-3">
              GT
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Gopichand Technologies
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Services', 'Portfolio', 'Team', 'Process', 'Testimonials', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            GT
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          {['Home', 'About', 'Services', 'Portfolio', 'Team', 'Process', 'Testimonials', 'Blog', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 text-lg"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 animate-gradient-x"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                Transforming Ideas Into 
                <span className="block text-yellow-300">Digital Reality</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-xl">
                We create exceptional digital experiences that help your business grow. From web design to mobile apps, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#contact" className="px-8 py-4 rounded-full bg-white text-blue-600 font-bold shadow-lg hover:bg-gray-100 transition-all">
                  Get Started
                </a>
                <a href="#portfolio" className="px-8 py-4 rounded-full border-2 border-white text-white font-bold hover:bg-white/10 transition-all">
                  View Our Work
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
                
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Digital Solutions" className="rounded-2xl shadow-2xl w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-24">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Our Team" className="w-full" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg w-3/4">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-4">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team Member" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team Member" className="w-10 h-10 rounded-full border-2 border-white" />
                    <img src="https://randomuser.me/api/portraits/men/62.jpg" alt="Team Member" className="w-10 h-10 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Expert Team</h4>
                    <p className="text-gray-600 text-sm">15+ Professionals</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About <span className="text-blue-600">Gopichand Technologies</span></h2>
              <p className="text-gray-600 text-lg mb-6">
                Founded in 2016, we've been at the forefront of digital innovation, helping businesses transform their ideas into powerful digital solutions. Our team of experts combines technical excellence with creative thinking to deliver exceptional results.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'We prioritize quality and attention to detail in every project we undertake',
                  'Our agile approach ensures flexibility and responsiveness to changing requirements',
                  'Client satisfaction is at the core of everything we do'
                ].map((text, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
              <a href="#contact" className="inline-block px-8 py-4 rounded-full bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition-all">
                Work With Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-blue-600">Digital Solutions</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We provide comprehensive digital services to help your business thrive in the online world.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              { 
                key: 'web-development', 
                image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=400&q=80',
                title: 'Web Development', 
                description: 'Custom websites and web applications built with the latest technologies for optimal performance.', 
                color: 'blue' 
              },
              { 
                key: 'mobile-apps', 
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80',
                title: 'Mobile Apps', 
                description: 'Native and cross-platform mobile applications for iOS and Android devices.', 
                color: 'green' 
              },
              { 
                key: 'digital-marketing', 
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
                title: 'Digital Marketing', 
                description: 'Comprehensive digital marketing strategies to increase your online visibility.', 
                color: 'purple' 
              },
              { 
                key: 'ui-ux-design', 
                image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?auto=format&fit=crop&w=400&q=80',
                title: 'UI/UX Design', 
                description: 'User-centered design solutions that enhance user experience and engagement.', 
                color: 'red' 
              },
              { 
                key: 'cloud-solutions', 
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
                title: 'Cloud Solutions', 
                description: 'Scalable cloud infrastructure and services to support your business growth.', 
                color: 'yellow' 
              },
              { 
                key: 'data-analytics', 
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
                title: 'Data Analytics', 
                description: 'Data-driven insights to help you make informed business decisions.', 
                color: 'pink' 
              }
            ].map((service) => (
              <div
                key={service.key}
                onClick={() => openServiceModal(service.key)}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                <div className="w-full h-32 md:h-40 rounded-lg md:rounded-xl overflow-hidden mb-4 md:mb-6">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-2 md:mb-4 text-sm md:text-base">{service.description}</p>
                <div className={`text-${service.color}-600 font-medium inline-flex items-center text-sm md:text-base`}>
                  Learn More <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {isServiceModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto m-4 relative">
            <button
              onClick={closeServiceModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className={`text-3xl font-bold mb-6 text-${selectedService.color}-600 flex items-center`}>
              <span className="text-3xl mr-3">{selectedService.icon}</span>
              {selectedService.title}
            </h3>
            <p className="text-gray-700 mb-6 text-lg">{selectedService.description}</p>
            <div className={`bg-${selectedService.color}-50 p-6 rounded-xl`}>
              <h4 className="font-bold text-lg mb-3">Key Features:</h4>
              <ul className="space-y-2">
                {selectedService.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className={`text-${selectedService.color}-600 w-5 h-5 mt-0.5 mr-3 flex-shrink-0`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            onMouseEnter={() => !countersStarted && setCountersStarted(true)}
          >
            {counters.map((counter, index) => (
              <div key={index} className="p-6 transform hover:scale-105 transition-all duration-300">
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${counter.color}`}>
                  {countersStarted ? (
                    index === 0 ? animatedCounts.projects :
                    index === 1 ? animatedCounts.clients :
                    index === 2 ? animatedCounts.team :
                    animatedCounts.years
                  ) : 0}
                  {index === 2 && '+'}
                </div>
                <div className="text-gray-600">{counter.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-blue-600">Portfolio</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore some of our recent projects and see how we've helped businesses like yours.</p>
          </div>
          
          {/* Portfolio Filter */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'web-development', label: 'Web Development' },
              { key: 'mobile-app', label: 'Mobile Apps' },
              { key: 'ui-ux', label: 'UI/UX Design' },
              { key: 'digital-marketing', label: 'Digital Marketing' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredPortfolioItems.map((item, index) => (
              <div key={index} className="group overflow-hidden rounded-xl md:rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3 md:p-6">
                    <div>
                      <h3 className="text-white text-sm md:text-xl font-bold">{item.title}</h3>
                      <p className="text-gray-300 capitalize text-xs md:text-base">{item.category.replace('-', ' ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our <span className="text-blue-600">Clients Say</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Don't just take our word for it - hear from businesses we've helped transform.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4 md:mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover" 
                  />
                  <div className="ml-3 md:ml-4">
                    <h4 className="font-bold text-sm md:text-lg">{testimonial.name}</h4>
                    <p className="text-blue-600 text-xs md:text-base">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">"{testimonial.text}"</p>
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In <span className="text-blue-600">Touch</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Have a project in mind? Let's discuss how we can help bring your vision to life.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Email Address"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Subject"
                  />
                </div>
                
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Your Message"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl text-white p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Our Location</h4>
                    <p className="text-blue-100">123 Tech Park, Hyderabad, Telangana 500081</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Phone Number</h4>
                    <p className="text-blue-100">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email Address</h4>
                    <p className="text-blue-100">contact@gopichandtech.com</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: '#' },
                    { icon: Twitter, href: '#' },
                    { icon: Instagram, href: '#' },
                    { icon: Linkedin, href: '#' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-3">
                  GT
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Gopichand Technologies
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Transforming ideas into digital reality with cutting-edge solutions and exceptional service.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
                  { icon: Twitter, href: '#', color: 'hover:bg-blue-400' },
                  { icon: Instagram, href: '#', color: 'hover:bg-purple-600' },
                  { icon: Linkedin, href: '#', color: 'hover:bg-blue-700' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white ${social.color} transition-all duration-300`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {[
                  'Web Development',
                  'Mobile App Development',
                  'UI/UX Design',
                  'Digital Marketing',
                  'Cloud Solutions',
                  'Data Analytics'
                ].map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'Services', href: '#services' },
                  { name: 'Portfolio', href: '#portfolio' },
                  { name: 'About Us', href: '#about' },
                  { name: 'Testimonials', href: '#testimonials' },
                  { name: 'Contact', href: '#contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-3 rounded-l-lg bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-lg transition-colors duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2023 Gopichand Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GopichandTechnologies;