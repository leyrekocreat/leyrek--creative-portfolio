import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Play, Pause, Volume2, VolumeX, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Toaster } from './ui/toaster';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [portfolioCategory, setPortfolioCategory] = useState('');
  const [productionCompany, setProductionCompany] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isMuted, setIsMuted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef(null);
  const { toast } = useToast();

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle portfolio category selection with Mario-style transition
  const handleCategorySelect = (category) => {
    setIsTransitioning(true);
    
    // Mario-style sweep transition
    setTimeout(() => {
      setPortfolioCategory(category);
      setIsTransitioning(false);
    }, 800);
  };

  // Handle production company selection
  const handleCompanySelect = (company) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setProductionCompany(company);
      setIsTransitioning(false);
    }, 800);
  };

  // Handle project selection
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  // Handle audio toggle
  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle form submission with cursor animation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Change cursor to pixelated heart
    document.body.classList.add('submitting-form');
    
    // Mock submission - will be replaced with backend integration
    setTimeout(() => {
      toast({
        title: "Quest Complete! 🎮",
        description: "Thanks for reaching out! I'll get back to you soon - let's create something amazing together!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      document.body.classList.remove('submitting-form');
    }, 2000);
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="portfolio-container">
      <Toaster />
      
      {/* Navigation Header - Black Modern Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 shadow-2xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="text-3xl font-bold text-yellow-300 minecraft-font cursor-pointer hover:scale-105 transition-transform glow-text-yellow lowercase"
            onClick={() => scrollToSection('home')}
          >
            leyrekō
          </div>
          <div className="flex space-x-8">
            {[
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'production', label: 'Production' },
              { id: 'about', label: 'About Me' },
              { id: 'contact', label: "Don't Be Shy" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-white font-semibold transition-all hover:scale-110 transform duration-200 minecraft-font text-sm tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Home Section - Dark Elegant with Collage Background */}
      <section id="home" className="min-h-screen relative overflow-hidden bg-black">
        {/* Subtle Creative Collage Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="collage-bg-home"></div>
        </div>
        
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-90"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          >
            <source src="https://customer-assets.emergentagent.com/job_gamedev-creative/artifacts/5hf97c0a_leyreko%20reel_2025.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        </div>
        
        {/* Audio Control */}
        <div className="absolute top-24 right-6 z-10">
          <button
            onClick={toggleAudio}
            className="gaming-element bg-black/50 backdrop-blur-sm text-white p-3 rounded-lg border border-gray-700 hover:bg-black/70 transition-all"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
        
        {/* Floating geometric elements */}
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-yellow-300/30 rotate-45 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 animate-bounce"></div>
        <div className="absolute top-40 left-1/3 w-12 h-12 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={48} className="text-white drop-shadow-lg" />
        </div>
        
        {/* Game-style UI Elements - Modern Dark */}
        <div className="absolute top-24 left-6 bg-black/70 backdrop-blur-md text-white p-6 rounded-lg border border-gray-700 shadow-2xl">
          <div className="minecraft-font text-sm space-y-1">
            <div className="text-cyan-400">CREATIVE DIRECTOR</div>
            <div className="text-yellow-400">★ 8+ YEARS EXP</div>
            <div className="text-green-400">STATUS: ONLINE</div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Dark Theme with Collage */}
      <section id="portfolio" className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-20 relative">
        {/* Creative Collage Background */}
        <div className="absolute inset-0 opacity-3">
          <div className="collage-bg-portfolio"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl font-bold text-center text-white mb-16 minecraft-font drop-shadow-lg glow-text">
            QUEST LOG
          </h2>
          
          {!portfolioCategory ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { id: 'ua', title: 'UA', subtitle: 'User Acquisition', gradient: 'from-red-600 to-orange-500' },
                { id: 'aso', title: 'ASO', subtitle: 'App Store Optimization', gradient: 'from-blue-600 to-cyan-500' },
                { id: 'social', title: 'RRSS', subtitle: 'Social Campaigns', gradient: 'from-purple-600 to-pink-500' },
                { id: 'branding', title: 'Branding', subtitle: 'Brand Identity', gradient: 'from-green-600 to-teal-500' }
              ].map((category) => (
                <div 
                  key={category.id}
                  className={`gaming-element modern-card cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br ${category.gradient} border border-gray-700`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="p-8 text-center">
                    <h3 className="text-3xl font-bold text-white minecraft-font mb-2">{category.title}</h3>
                    <p className="text-white/80 text-lg">{category.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`transition-all duration-800 ${isTransitioning ? 'mario-transition' : ''}`}>
              <button 
                onClick={() => setPortfolioCategory('')}
                className="creative-back-button mb-8 minecraft-font"
              >
                ← Back to Categories
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getPortfolioItems(portfolioCategory).map((item, index) => (
                  <div 
                    key={index} 
                    className="gaming-element modern-card bg-gray-800 border border-gray-700 hover:border-gray-500 hover:scale-105 transition-all cursor-pointer"
                    onClick={() => handleProjectSelect(item)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center relative overflow-hidden">
                      <div className="text-6xl opacity-50">🎮</div>
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <ExternalLink className="text-white" size={24} />
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2 minecraft-font text-white">{item.title}</h4>
                      <p className="text-gray-400 mb-3 text-sm line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tools.slice(0, 3).map((tool, i) => (
                          <span key={i} className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs border border-blue-600/30">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Production Section - Modern Dark with Company Selection */}
      <section id="production" className="min-h-screen bg-gradient-to-br from-black to-gray-900 py-20 relative">
        {/* Creative Collage Background */}
        <div className="absolute inset-0 opacity-3">
          <div className="collage-bg-production"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl font-bold text-center text-white mb-16 minecraft-font drop-shadow-lg glow-text">
            CREATIVE PROCESS
          </h2>
          
          <div className="max-w-4xl mx-auto mb-16">
            <div className="modern-card bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 minecraft-font text-white">Crafting Digital Experiences</h3>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  As an experienced Senior Creative Designer and Producer, I specialise in unlocking the full potential of digital platforms. 
                  From App Store Optimisation (ASO) to innovative user acquisition ad concepts, performance marketing, and beyond, 
                  I bring a unique blend of creativity and technical expertise to every challenge.
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  Known for my positive attitude, adaptability, and resourcefulness, I thrive in fast-paced, dynamic environments. 
                  By collaborating closely with cross-functional teams, I deliver impactful, data-driven creative solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Process Timeline - Gaming Style Icons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              { title: 'Ideation', desc: 'Cultivating innovative concepts that captivate audiences', icon: '🎨', color: 'from-blue-600 to-purple-600' },
              { title: 'Production', desc: 'Bringing visions to life through skilled execution', icon: '⚔️', color: 'from-green-600 to-blue-600' },
              { title: 'Strategy', desc: 'Developing targeted solutions aligned with objectives', icon: '🏰', color: 'from-orange-600 to-red-600' },
              { title: 'Analytics', desc: 'Leveraging data insights to optimize success', icon: '📈', color: 'from-purple-600 to-pink-600' }
            ].map((step, index) => (
              <div key={index} className={`gaming-element modern-card bg-gradient-to-br ${step.color} border border-gray-700 transform hover:scale-105 transition-all`}>
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4 gaming-icon">{step.icon}</div>
                  <h4 className="text-xl font-bold mb-3 minecraft-font text-white">{step.title}</h4>
                  <p className="text-white/80 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Companies Section */}
          {!productionCompany ? (
            <div>
              <h3 className="text-3xl font-bold text-center text-white mb-8 minecraft-font">Companies I've Worked With</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                {['Scopely', 'Rovio', 'EA', 'Peak', 'Zynga', 'Mobilityware', 'Radish'].map((company, index) => (
                  <div 
                    key={index} 
                    className="gaming-element modern-card bg-gray-800/30 backdrop-blur-sm border border-gray-700 p-6 text-center hover:bg-gray-800/50 transition-all cursor-pointer"
                    onClick={() => handleCompanySelect(company)}
                  >
                    <h4 className="text-xl font-bold text-white minecraft-font">{company}</h4>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={`transition-all duration-800 ${isTransitioning ? 'mario-transition' : ''}`}>
              <button 
                onClick={() => setProductionCompany('')}
                className="creative-back-button mb-8 minecraft-font"
              >
                ← Back to Companies
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getCompanyProjects(productionCompany).map((project, index) => (
                  <div 
                    key={index} 
                    className="gaming-element modern-card bg-gray-800 border border-gray-700 hover:border-gray-500 hover:scale-105 transition-all cursor-pointer"
                    onClick={() => handleProjectSelect(project)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center relative overflow-hidden">
                      <div className="text-6xl opacity-50">🏢</div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2 minecraft-font text-white">{project.title}</h4>
                      <p className="text-gray-400 mb-3 text-sm line-clamp-2">{project.description}</p>
                      <div className="text-cyan-400 text-sm minecraft-font">{project.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Me Section - Gaming UI Style */}
      <section id="about" className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-20 relative overflow-hidden">
        {/* Creative Collage Background */}
        <div className="absolute inset-0 opacity-3">
          <div className="collage-bg-about"></div>
        </div>
        
        {/* Modern gaming background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-400 rotate-45"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-green-400 transform rotate-12"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl font-bold text-center text-white mb-16 minecraft-font drop-shadow-lg glow-text">
            PLAYER PROFILE
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="modern-card bg-gray-800/50 backdrop-blur-sm border border-gray-700 mb-12">
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-6 minecraft-font text-white">About The Player</h3>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  With over 18 years of experience working within creative agencies, spanning branding, digital, media, and marketing, 
                  I've had the privilege to contribute to a wide range of projects, from concept development to full-scale game and advertising campaign launches.
                </p>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  As a designer, art director, and producer, I've developed expertise in combining technical design with creative storytelling 
                  to craft visually compelling experiences that captivate audiences across multiple platforms.
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  I thrive in fast-paced, dynamic environments where creativity and collaboration drive success.
                </p>
              </div>
            </div>

            {/* Skills Grid - Updated Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 gaming-element modern-card bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-500">
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-4 minecraft-font">Player Skills</h4>
                  <div className="space-y-2 text-white/90">
                    {['Creative Direction', 'Marketing Strategy', 'Leadership', 'Resilience', 'Adaptability', 'Branding & Identity', 'ASO', 'Team Player', 'Organized', 'Result Driven'].map((skill, i) => (
                      <div key={i} className="text-sm flex items-center">
                        <span className="text-cyan-400 mr-2">▶</span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 gaming-element modern-card bg-gradient-to-br from-green-600 to-green-800 border border-green-500" style={{width: '110%'}}>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-4 minecraft-font">Weapons Arsenal</h4>
                  <div className="space-y-2 text-white/90">
                    {[
                      'Photoshop | Illustrator | Indesign | Figma | Canva', 
                      'Premiere Pro | After Effects | Media Encoder',
                      'Autodesk Maya | C4D | Blender | Dimension',
                      '*Modelling | Illumination | Rendering'
                    ].map((tool, i) => (
                      <div key={i} className="text-sm flex items-center">
                        <span className="text-green-400 mr-2">▶</span>
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 gaming-element modern-card bg-gradient-to-br from-purple-600 to-purple-800 border border-purple-500">
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-4 minecraft-font">AI Magic</h4>
                  <div className="space-y-2 text-white/90">
                    {[
                      'Midjourney / DALL·E / Adobe Firefly / Flux',
                      'ChatGPT / Claude / Gemini / Grok / Deepsek',
                      'Runway ML',
                      'Notion AI / Copy.ai',
                      'Figma AI / Framer AI',
                      'Descript / ElevenLabs'
                    ].map((ai, i) => (
                      <div key={i} className="text-sm flex items-center">
                        <span className="text-purple-400 mr-2">▶</span>
                        {ai}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Likes Section - Modern Style */}
            <div className="modern-card bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-600/30 mt-8">
              <div className="p-6">
                <h4 className="text-2xl font-bold mb-4 minecraft-font text-white">Power-Up Preferences</h4>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-4 text-center">
                  {['🍦 Ice Creams', '🌮 Street Food', '🐕 Dogs', '🦜 Parrots', '🦍 Gorillas', '🌱 Gardening', '🎮 Gaming'].map((like, i) => (
                    <div key={i} className="text-sm font-semibold text-yellow-400 minecraft-font">{like}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Dark Modern */}
      <section id="contact" className="min-h-screen bg-gradient-to-br from-black to-gray-900 py-20 relative">
        {/* Creative Collage Background */}
        <div className="absolute inset-0 opacity-3">
          <div className="collage-bg-contact"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl font-bold text-center text-white mb-8 minecraft-font drop-shadow-lg glow-text">
            DON'T BE SHY!
          </h2>
          
          {/* Pixelated Lionel Richie Hello reference */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gray-800 border border-gray-600 p-8 rounded-lg">
              <div className="text-6xl mb-4">👋</div>
              <p className="text-white minecraft-font text-xl">Hello... Is it me you're looking for?</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="modern-card bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6 minecraft-font text-center text-white">Ready for Your Next Quest?</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-300 minecraft-font">
                      Player Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      required
                      className="bg-gray-700 border-gray-600 text-white focus:border-cyan-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-300 minecraft-font">
                      Contact Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                      required
                      className="bg-gray-700 border-gray-600 text-white focus:border-cyan-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-300 minecraft-font">
                      Quest Subject
                    </label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="What's this quest about?"
                      required
                      className="bg-gray-700 border-gray-600 text-white focus:border-cyan-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-300 minecraft-font">Quest Details</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell me about your project, ideas, or just say hello!"
                      rows="5"
                      required
                      className="bg-gray-700 border-gray-600 text-white focus:border-cyan-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 minecraft-font"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending Quest...' : 'Send Message'}
                    </Button>
                    <Button 
                      type="button"
                      onClick={handleClear}
                      variant="outline"
                      className="flex-1 border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-bold py-3 minecraft-font"
                      disabled={isSubmitting}
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Project Modal with Multiple Images */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="modern-card bg-gray-900 border border-gray-600 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-white minecraft-font">{selectedProject.title}</h3>
                <button
                  onClick={closeProjectModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Image Gallery */}
              <div className="mb-6">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-lg relative overflow-hidden">
                  <div className="text-8xl opacity-50">🎮</div>
                  
                  {selectedProject.images && selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
                        {currentImageIndex + 1} / {selectedProject.images.length}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Additional Project Images */}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {selectedProject.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                        <div className="text-2xl opacity-50">🖼️</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed">{selectedProject.description}</p>
                
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-xl font-bold text-white minecraft-font mb-3">Tools Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool, i) => (
                      <span key={i} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded border border-blue-600/30">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedProject.metrics && (
                  <div className="border-t border-gray-700 pt-4">
                    <h4 className="text-xl font-bold text-white minecraft-font mb-3">Performance Metrics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(selectedProject.metrics).map(([key, value]) => (
                        <div key={key} className="bg-gray-800 p-3 rounded border border-gray-700">
                          <div className="text-sm text-gray-400 uppercase tracking-wide minecraft-font">{key}</div>
                          <div className="text-xl font-bold text-green-400">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.role && (
                  <div className="border-t border-gray-700 pt-4">
                    <h4 className="text-xl font-bold text-white minecraft-font mb-3">My Role</h4>
                    <p className="text-cyan-400 text-lg">{selectedProject.role}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock portfolio data with multiple images
const getPortfolioItems = (category) => {
  const portfolioData = {
    ua: [
      { 
        title: 'Star Trek Fleet Command - Picard Layout', 
        description: 'Creative layout screen featuring Captain Picard for user acquisition campaign. This high-performing creative increased install rates by 45% through compelling character-driven storytelling and strategic visual hierarchy that resonated with both Trek fans and new users.',
        ip: 'Star Trek Fleet Command',
        tools: ['Photoshop', 'After Effects', 'Illustrator'],
        metrics: { ctr: '3.2%', installs: '50K+', performance: 'Best Performer' },
        images: ['main', 'variant1', 'variant2', 'localized']
      },
      { 
        title: 'Marvel Strike Force - Choose Side Hulk', 
        description: 'Interactive good vs bad side selection creative featuring Hulk. Dynamic creative that drove high engagement through moral choice mechanics, allowing users to align with heroes or villains before gameplay.',
        ip: 'Marvel Strike Force',
        tools: ['Photoshop', 'Illustrator', 'After Effects'],
        metrics: { ctr: '2.8%', installs: '35K+', performance: 'High Performer' },
        images: ['main', 'hero_side', 'villain_side', 'animated']
      },
      { 
        title: 'Monopoly Go - Board Selection', 
        description: 'Choose your Monopoly board interactive creative for user acquisition. Featured multiple themed boards with nostalgic design elements that appealed to both classic Monopoly fans and mobile gaming audiences.',
        ip: 'Monopoly Go',
        tools: ['Figma', 'Photoshop', 'After Effects'],
        metrics: { ctr: '3.5%', installs: '42K+', performance: 'Top Performer' },
        images: ['main', 'classic_board', 'themed_board', 'comparison']
      },
      { 
        title: 'WWE - Roman Reigns Magazine Style', 
        description: 'Magazine cover style creative featuring Roman Reigns for WWE mobile game. Combined sports entertainment aesthetic with gaming UI elements to create compelling user acquisition material.',
        ip: 'WWE',
        tools: ['InDesign', 'Photoshop', 'Illustrator'],
        metrics: { ctr: '2.9%', installs: '28K+', performance: 'Strong Performer' },
        images: ['main', 'magazine_cover', 'action_shot', 'champion_version']
      },
      { 
        title: 'Kingdom Maker - Make it Reign Campaign', 
        description: 'Series of castle on sale ads that became the best performing creatives for Kingdom Maker. Strategic use of medieval aesthetics combined with modern mobile gaming sensibilities to drive exceptional conversion rates.',
        ip: 'Kingdom Maker',
        tools: ['C4D', 'Photoshop', 'After Effects'],
        metrics: { ctr: '4.1%', installs: '65K+', performance: 'Best Performer' },
        images: ['main', 'castle_1', 'castle_2', 'castle_3', 'animated_sequence']
      }
    ],
    aso: [
      { 
        title: 'Scrabble Go - ASO Screenshots', 
        description: 'Complete ASO screenshot set for both Hasbro & Mattel versions of Scrabble Go. Optimized for App Store visibility with clear gameplay demonstration and brand consistency across both publisher versions.',
        ip: 'Scrabble Go',
        tools: ['Photoshop', 'Figma', 'Illustrator'],
        metrics: { conversion: '+25%', ranking: 'Top 10', visibility: 'Featured' },
        images: ['main', 'hasbro_version', 'mattel_version', 'gameplay_showcase']
      },
      { 
        title: 'Marvel Strike Force - Game of the Day', 
        description: 'The Guardians of Galaxy themed ASO set that achieved iOS Game of the Day feature. Strategic visual storytelling that highlighted beloved characters while demonstrating core gameplay mechanics.',
        ip: 'Marvel Strike Force',
        tools: ['Photoshop', 'Illustrator', 'After Effects'],
        metrics: { conversion: '+35%', ranking: 'Game of the Day', visibility: 'Featured' },
        images: ['main', 'guardians_team', 'gameplay_shot', 'featured_badge']
      }
    ],
    social: [
      { 
        title: 'Stumble Guys - Gummy Bag Campaign', 
        description: 'Social media campaign for new Gummy Bag character skin launch. Colorful, playful design that captured the fun, chaotic nature of the battle royale while highlighting the new cosmetic content.',
        ip: 'Stumble Guys',
        tools: ['Photoshop', 'After Effects', 'Illustrator'],
        metrics: { likes: '150K+', shares: '25K+', engagement: '8.5%' },
        images: ['main', 'character_showcase', 'gameplay_action', 'community_response']
      }
    ],
    branding: [
      { 
        title: 'Complete Brand Identity Package', 
        description: 'Comprehensive branding solution including logo design, color palette, typography, and brand guidelines. Scalable identity system designed for cross-platform consistency and brand recognition.',
        ip: 'Multiple Gaming IPs',
        tools: ['Illustrator', 'InDesign', 'Photoshop', 'Figma'],
        metrics: { projects: '15+', satisfaction: '98%', impact: 'High' },
        images: ['main', 'logo_variations', 'color_palette', 'applications']
      }
    ]
  };
  
  return portfolioData[category] || [];
};

// Mock company projects data
const getCompanyProjects = (company) => {
  const companyData = {
    'Scopely': [
      {
        title: 'Star Trek Fleet Command Marketing',
        description: 'Led the creative marketing strategy for the flagship IP, developing user acquisition campaigns and ASO optimization.',
        role: 'Senior Marketing Artist & Brand Strategist',
        tools: ['Photoshop', 'After Effects', 'Figma'],
        images: ['main', 'campaign1', 'campaign2', 'aso_set']
      },
      {
        title: 'Marvel Strike Force Creative Direction',
        description: 'Creative direction for major Marvel IP campaigns, focusing on character-driven storytelling and conversion optimization.',
        role: 'Creative Director',
        tools: ['Illustrator', 'Photoshop', 'After Effects'],
        images: ['main', 'hero_campaign', 'villain_campaign', 'crossover_event']
      }
    ],
    'Rovio': [
      {
        title: 'Angry Birds Creative Production',
        description: 'Creative producer for Angry Birds franchise campaigns, managing global creative assets and brand consistency.',
        role: 'Creative Producer',
        tools: ['Photoshop', 'Illustrator', 'After Effects'],
        images: ['main', 'global_campaign', 'character_evolution', 'seasonal_events']
      }
    ],
    'EA': [
      {
        title: 'Star Wars Mobile Creative',
        description: 'Creative development for Star Wars mobile gaming experiences, balancing franchise authenticity with mobile gaming appeal.',
        role: 'Senior Creative Designer',
        tools: ['Photoshop', 'C4D', 'After Effects'],
        images: ['main', 'character_design', 'ui_concepts', 'promotional_materials']
      }
    ],
    'Peak': [
      {
        title: 'Toon Blast & Toy Blast Marketing',
        description: 'Creative marketing campaigns for casual gaming hits, focusing on broad audience appeal and viral potential.',
        role: 'Creative Designer',
        tools: ['Photoshop', 'Illustrator', 'After Effects'],
        images: ['main', 'toon_blast_campaign', 'toy_blast_campaign', 'cross_promotion']
      }
    ],
    'Zynga': [
      {
        title: 'Wizard of Oz Slots Creative',
        description: 'Creative campaigns for classic IP adaptation, balancing nostalgia with modern gaming aesthetics.',
        role: 'Creative Consultant',
        tools: ['Photoshop', 'Illustrator', 'After Effects'],
        images: ['main', 'wizard_theme', 'slot_designs', 'bonus_features']
      }
    ],
    'Mobilityware': [
      {
        title: 'Casual Games Portfolio',
        description: 'Creative direction for casual gaming portfolio including Solitaire, Spider Solitaire, and card game variants.',
        role: 'Creative Director',
        tools: ['Photoshop', 'Illustrator', 'Figma'],
        images: ['main', 'solitaire_suite', 'spider_solitaire', 'card_designs']
      }
    ],
    'Radish': [
      {
        title: 'Romance Novels Creative Ads',
        description: 'Creative advertising campaigns for romance novel mobile apps, targeting emotional engagement and conversion.',
        role: 'Creative Specialist',
        tools: ['Photoshop', 'After Effects', 'Illustrator'],
        images: ['main', 'romance_campaign', 'character_art', 'story_teasers']
      }
    ]
  };
  
  return companyData[company] || [];
};

export default Portfolio;