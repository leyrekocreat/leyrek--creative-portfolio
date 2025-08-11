import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Play, Pause, Mail, User, MessageSquare, Send, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Toaster } from './ui/toaster';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [portfolioCategory, setPortfolioCategory] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission - will be replaced with backend integration
    toast({
      title: "Message Sent! 🎮",
      description: "Thanks for reaching out! I'll get back to you soon - let's create something amazing together!",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="portfolio-container">
      <Toaster />
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 border-b-4 border-yellow-400 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="text-3xl font-bold text-white pixel-font cursor-pointer hover:scale-105 transition-transform"
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
                className="text-white hover:text-yellow-300 font-semibold transition-colors hover:scale-110 transform duration-200 retro-btn"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://customer-assets.emergentagent.com/job_gamedev-creative/artifacts/5hf97c0a_leyreko%20reel_2025.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        {/* Floating clouds */}
        <div className="absolute top-20 left-10 w-16 h-12 bg-white rounded-full opacity-80 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-20 h-14 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 left-1/3 w-12 h-8 bg-white rounded-full opacity-70 animate-bounce" style={{ animationDelay: '1s' }}></div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={48} className="text-white drop-shadow-lg" />
        </div>
        
        {/* Game-style UI Elements */}
        <div className="absolute top-24 left-6 bg-black bg-opacity-70 text-white p-4 rounded-lg pixel-border">
          <div className="pixel-font text-sm">
            <div>CREATIVE DIRECTOR</div>
            <div className="text-yellow-300">★ x8+ YEARS</div>
            <div>LEVEL: EXPERT</div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-bold text-center text-white mb-16 pixel-font drop-shadow-lg">
            MY QUEST LOG
          </h2>
          
          {!portfolioCategory ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { id: 'ua', title: 'UA', subtitle: 'User Acquisition', color: 'from-red-500 to-red-600' },
                { id: 'aso', title: 'ASO', subtitle: 'App Store Optimization', color: 'from-blue-500 to-blue-600' },
                { id: 'social', title: 'Social Media', subtitle: 'Social Campaigns', color: 'from-purple-500 to-purple-600' },
                { id: 'branding', title: 'Branding', subtitle: 'Brand Identity', color: 'from-orange-500 to-orange-600' }
              ].map((category) => (
                <Card 
                  key={category.id}
                  className={`portfolio-card cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br ${category.color} border-4 border-white`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CardContent className="p-8 text-center">
                    <h3 className="text-3xl font-bold text-white pixel-font mb-2">{category.title}</h3>
                    <p className="text-white text-lg">{category.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className={`transition-all duration-800 ${isTransitioning ? 'mario-transition' : ''}`}>
              <button 
                onClick={() => setPortfolioCategory('')}
                className="mb-8 bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors pixel-border"
              >
                ← Back to Categories
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getPortfolioItems(portfolioCategory).map((item, index) => (
                  <Card key={index} className="bg-white border-4 border-gray-800 hover:scale-105 transition-transform">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-6xl opacity-50">🎮</div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-2 pixel-font">{item.title}</h4>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tools.map((tool, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Production Section */}
      <section id="production" className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-700 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-bold text-center text-white mb-16 pixel-font drop-shadow-lg">
            POWER-UP PROCESS
          </h2>
          
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-white bg-opacity-95 border-4 border-yellow-400">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 pixel-font text-purple-800">Crafting Captivating Digital Experiences</h3>
                <p className="text-lg leading-relaxed mb-6">
                  As an experienced Senior Creative Designer and Producer, I specialise in unlocking the full potential of digital platforms. 
                  From App Store Optimisation (ASO) to innovative user acquisition ad concepts, performance marketing, and beyond, 
                  I bring a unique blend of creativity and technical expertise to every challenge.
                </p>
                <p className="text-lg leading-relaxed">
                  Known for my positive attitude, adaptability, and resourcefulness, I thrive in fast-paced, dynamic environments. 
                  By collaborating closely with cross-functional teams, I deliver impactful, data-driven creative solutions that drive measurable results.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Process Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              { title: 'Ideation', desc: 'Cultivating innovative concepts that captivate audiences', icon: '💡' },
              { title: 'Production', desc: 'Bringing visions to life through skilled execution', icon: '⚙️' },
              { title: 'Strategy', desc: 'Developing targeted solutions aligned with objectives', icon: '🎯' },
              { title: 'Analytics', desc: 'Leveraging data insights to optimize success', icon: '📊' }
            ].map((step, index) => (
              <Card key={index} className="bg-white border-4 border-white transform hover:scale-105 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h4 className="text-xl font-bold mb-3 pixel-font">{step.title}</h4>
                  <p className="text-gray-700">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Companies Worked With */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Rovio', 'EA Games', 'Radish', 'Zynga'].map((company, index) => (
              <div key={index} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-center border-2 border-white">
                <h4 className="text-xl font-bold text-white pixel-font">{company}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 py-20 relative overflow-hidden">
        {/* Mario-style background elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-600 to-green-500 mario-ground"></div>
        <div className="absolute bottom-32 left-10 w-16 h-16 bg-brown-600 rounded-lg pipe"></div>
        <div className="absolute bottom-32 right-20 w-12 h-12 bg-yellow-400 rounded-full coin animate-spin"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl font-bold text-center text-white mb-16 pixel-font drop-shadow-lg">
            PLAYER PROFILE
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white bg-opacity-95 border-4 border-yellow-400 mb-12">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-6 pixel-font text-orange-800">About The Player</h3>
                <p className="text-lg leading-relaxed mb-6">
                  With over 18 years of experience working within creative agencies, spanning branding, digital, media, and marketing, 
                  I've had the privilege to contribute to a wide range of projects, from concept development to full-scale game and advertising campaign launches.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  As a designer, art director, and producer, I've developed expertise in combining technical design with creative storytelling 
                  to craft visually compelling experiences that captivate audiences across multiple platforms.
                </p>
                <p className="text-lg leading-relaxed">
                  I thrive in fast-paced, dynamic environments where creativity and collaboration drive success.
                </p>
              </CardContent>
            </Card>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-blue-600 border-4 border-white">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-white mb-4 pixel-font">Player Skills</h4>
                  <div className="space-y-2 text-white">
                    {['Creative Direction', 'Marketing Strategy', 'Leadership', 'Branding & Identity', 'ASO', 'Team Player', 'Organized', 'Target Driven'].map((skill, i) => (
                      <div key={i} className="text-sm">• {skill}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-600 border-4 border-white">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-white mb-4 pixel-font">Weapons Arsenal</h4>
                  <div className="space-y-2 text-white">
                    {['Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro', 'After Effects', 'C4D // Maya', 'Figma', 'Dimension'].map((tool, i) => (
                      <div key={i} className="text-sm">• {tool}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-600 border-4 border-white">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-white mb-4 pixel-font">Magic Spells (AI)</h4>
                  <div className="space-y-2 text-white">
                    {['Midjourney', 'ChatGPT', 'Runway ML', 'Notion AI', 'Figma AI', 'Descript', 'Adobe Firefly'].map((ai, i) => (
                      <div key={i} className="text-sm">• {ai}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Likes Section */}
            <Card className="bg-yellow-400 border-4 border-orange-600 mt-8">
              <CardContent className="p-6">
                <h4 className="text-2xl font-bold mb-4 pixel-font text-orange-800">Power-Up Preferences</h4>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4 text-center">
                  {['🍦 Ice Creams', '🍺 Beer', '🌮 Street Food', '🐕 Dogs', '🦜 Parrots', '🦍 Gorillas', '🌱 Gardening', '🎮 Gaming'].map((like, i) => (
                    <div key={i} className="text-sm font-semibold text-orange-800">{like}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-gradient-to-br from-pink-500 to-red-600 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-6xl font-bold text-center text-white mb-8 pixel-font drop-shadow-lg">
            DON'T BE SHY!
          </h2>
          
          {/* Pixelated Lionel Richie Hello GIF placeholder */}
          <div className="text-center mb-12">
            <div className="inline-block bg-black border-4 border-white p-8 rounded-lg">
              <div className="text-6xl mb-4">👋</div>
              <p className="text-white pixel-font text-xl">Hello... Is it me you're looking for?</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white border-4 border-yellow-400">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 pixel-font text-center">Ready for Your Next Quest?</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      <User className="inline mr-2" size={16} />
                      Player Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      required
                      className="border-2 border-gray-300 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      <Mail className="inline mr-2" size={16} />
                      Contact Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                      required
                      className="border-2 border-gray-300 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      <MessageSquare className="inline mr-2" size={16} />
                      Quest Subject
                    </label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="What's this quest about?"
                      required
                      className="border-2 border-gray-300 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Quest Details</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell me about your project, ideas, or just say hello!"
                      rows="5"
                      required
                      className="border-2 border-gray-300 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 pixel-border"
                    >
                      <Send className="mr-2" size={16} />
                      Send Message
                    </Button>
                    <Button 
                      type="button"
                      onClick={handleClear}
                      variant="outline"
                      className="flex-1 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3"
                    >
                      <Trash2 className="mr-2" size={16} />
                      Clear Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

// Mock portfolio data
const getPortfolioItems = (category) => {
  const portfolioData = {
    ua: [
      { title: 'Star Trek Fleet Command - Picard Layout', description: 'Creative layout featuring Captain Picard for user acquisition', tools: ['Photoshop', 'After Effects'] },
      { title: 'Marvel Strike Force - Hulk Campaign', description: 'Choose good/bad side creative with Hulk', tools: ['Illustrator', 'Photoshop'] },
      { title: 'Monopoly Go - Board Selection', description: 'Interactive board selection creative', tools: ['Figma', 'Photoshop'] },
      { title: 'WWE - Roman Reigns Magazine', description: 'Magazine cover style creative', tools: ['InDesign', 'Photoshop'] },
      { title: 'Kingdom Maker - Castle Campaign', description: 'Series of castle sale ads (best performers)', tools: ['C4D', 'Photoshop'] }
    ],
    aso: [
      { title: 'Scrabble Go - ASO Screenshots', description: 'Complete ASO screenshot set for Hasbro & Mattel', tools: ['Photoshop', 'Figma'] },
      { title: 'Marvel Strike Force - Game of the Day', description: 'Guardians of Galaxy iOS Game of the Day feature', tools: ['Illustrator', 'Photoshop'] },
      { title: 'Star Trek - TNG ASO Set', description: 'Complete ASO screenshots for all timelines', tools: ['Photoshop', 'After Effects'] },
      { title: 'Yahtzee with Buddies', description: 'ASO screenshot optimization', tools: ['Photoshop', 'Figma'] },
      { title: 'Kingdom Maker - Feature Graphic', description: 'App store feature graphic design', tools: ['Illustrator', 'Photoshop'] }
    ],
    social: [
      { title: 'Stumble Guys - Gummy Bag', description: 'Social media campaign for new character skin', tools: ['Photoshop', 'After Effects'] },
      { title: 'Looney Tunes - Character Duals', description: 'Bugs & Duck social media creatives', tools: ['Illustrator', 'Photoshop'] },
      { title: 'Star Trek - Social Collage', description: 'Multi-creative social media layout', tools: ['Photoshop', 'InDesign'] },
      { title: 'Marvel Strike Force - Delta Creatives', description: 'Spiderman social media campaign', tools: ['Photoshop', 'After Effects'] }
    ],
    branding: [
      { title: 'Brand Identity Package', description: 'Complete branding solution for gaming IP', tools: ['Illustrator', 'InDesign'] },
      { title: 'Logo Design System', description: 'Scalable logo system for mobile games', tools: ['Illustrator', 'Figma'] },
      { title: 'Visual Style Guide', description: 'Comprehensive brand guidelines', tools: ['InDesign', 'Photoshop'] },
      { title: 'Marketing Collateral', description: 'Print and digital marketing materials', tools: ['InDesign', 'Illustrator'] }
    ]
  };
  
  return portfolioData[category] || [];
};

export default Portfolio;