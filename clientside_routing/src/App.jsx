import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Mail, ExternalLink, Github, Linkedin, Download, Code, Palette, Smartphone, Award, Calendar, MapPin, Phone } from 'lucide-react';


const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  return { currentPath, navigate };
};


const Navigation = ({ currentPath, navigate }) => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'blue' },
    { path: '/about', icon: User, label: 'About', color: 'green' },
    { path: '/portfolio', icon: Briefcase, label: 'Portfolio', color: 'purple' },
    { path: '/contact', icon: Mail, label: 'Contact', color: 'red' }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HEMANTH R
          </div>

          <div className="flex space-x-1">
            {navItems.map(({ path, icon: Icon, label, color }) => {
              const isActive = currentPath === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                    ? `bg-${color}-100 text-${color}-700 shadow-md transform scale-105`
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                >
                  <Icon size={18} />
                  <span className="font-medium hidden sm:inline">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};


const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="pt-24 pb-16">

      <div className="text-center mb-16">


        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Hemanth R</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Full-Stack Developer at PSG iTech's Software Development Cell
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
            <Download size={20} />
            <a href='https://drive.google.com/file/d/1MxghqCMpmggEaApA279GjU-dcOqXiewI/view'>Download Resume</a>
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2">
            <Mail size={20} />
            <span>Get In Touch</span>
          </button>
        </div>


        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2" />
            <span>Coimbatore, India</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Mail size={18} className="mr-2" />
            <span>raghuhemanth008@gmail.com</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone size={18} className="mr-2" />
            <span>9003103630</span>
          </div>
        </div>


        <div className="flex justify-center space-x-6">
          <a href="https://github.com/yourusername" className="text-gray-600 hover:text-blue-600 transition-colors p-2">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/yourprofile" className="text-gray-600 hover:text-blue-600 transition-colors p-2">
            <Linkedin size={24} />
          </a>
          <a href="https://codechef.com/users/yourprofile" className="text-gray-600 hover:text-blue-600 transition-colors p-2">
            <ExternalLink size={24} />
          </a>
        </div>
      </div>


      <div className="grid md:grid-cols-3 gap-8 mb-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="text-blue-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-3">Programming Languages</h3>
          <p className="text-gray-600 mb-4">Proficient in multiple programming languages</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">C++</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Python</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">JavaScript</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">C</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette className="text-purple-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-3">Web Technologies</h3>
          <p className="text-gray-600 mb-4">Full-stack development expertise</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React.js</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Node.js</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Express.js</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">HTML5</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">CSS3</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="text-green-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-3">Databases & Tools</h3>
          <p className="text-gray-600 mb-4">Database and development tools</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">MongoDB</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">MySQL</span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Git</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Figma</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const AboutPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About Me</h2>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Summary</h3>
          <p className="text-gray-600 mb-6">
            Passionate Computer Science student and Junior Developer at PSG iTech's Software Development Cell with expertise in full-stack web development.
            Proven track record of developing scalable applications serving 3,000+ users, including transport management systems, biometric attendance solutions,
            and student services.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-gray-800">Education</h3>
          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-medium text-gray-800">PSG INSTITUTE OF TECHNOLOGY AND APPLIED RESEARCH</h4>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Aug 2023 - Present</span>
            </div>
            <p className="text-gray-600">
              B.Tech. in Computer Science and Business Systems with CGPA: 8.33/10
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-800">Experience</h3>
          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-medium text-gray-800">Junior Developer - Software Development Cell, PSG iTech</h4>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Oct 2024 - Present</span>
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Leading development of enterprise-level applications including transport management and biometric attendance systems serving 3000+ students and faculty members</li>
              <li>Contributing to the digitization of college operations through innovative software solutions and user-centric design approaches</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const PortfolioPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <BusIcon className="text-white" size={48} />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Transport App - PSG iTech</h3>
              <p className="text-gray-600 mb-4">
                Developed a comprehensive transport management system for PSG iTech handling bus registration for academic year,
                evening bus registration, and automated bus seat allocation for students, staff, and faculty.
              </p>
              <div className="flex justify-between items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Live Project</span>
                <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                  <span>View Details</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
              <FingerprintIcon className="text-white" size={48} />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Mandatory Attendance System</h3>
              <p className="text-gray-600 mb-4">
                Built a biometric-based attendance tracking system designed to monitor attendance in the absence of internal faculty
                to prevent proxy attendance.
              </p>
              <div className="flex justify-between items-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Live Project</span>
                <a href="#" className="text-green-600 hover:text-green-800 flex items-center">
                  <span>View Details</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
              <PrinterIcon className="text-white" size={48} />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Student Printing Service</h3>
              <p className="text-gray-600 mb-4">
                Developed and launched a Student Printing Service Web Application used by over 200 students daily.
                System allows students to upload documents for printout from anywhere and collect using order ID.
              </p>
              <div className="flex justify-between items-center">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Live Project</span>
                <a href="#" className="text-orange-600 hover:text-orange-800 flex items-center">
                  <span>View Details</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const ContactPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-16">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Get In Touch</h2>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail size={20} className="text-blue-600 mt-1 mr-3" />
                  <div>
                    <h4 className="text-gray-500 text-sm">Email</h4>
                    <a href="mailto:raghuhemanth008@gmail.com" className="text-gray-800 hover:text-blue-600">raghuhemanth008@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone size={20} className="text-blue-600 mt-1 mr-3" />
                  <div>
                    <h4 className="text-gray-500 text-sm">Phone</h4>
                    <a href="tel:9003103630" className="text-gray-800 hover:text-blue-600">+91 9003103630</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin size={20} className="text-blue-600 mt-1 mr-3" />
                  <div>
                    <h4 className="text-gray-500 text-sm">Location</h4>
                    <p className="text-gray-800">Coimbatore, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Social Profiles</h3>
                <div className="flex space-x-4">
                  <a href="https://github.com/yourusername" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="https://linkedin.com/in/yourprofile" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://codechef.com/users/yourprofile" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Send Me a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                  <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const BusIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 6v6"></path>
    <path d="M15 6v6"></path>
    <path d="M2 12h19.6"></path>
    <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"></path>
    <circle cx="7" cy="18" r="2"></circle>
    <path d="M9 18h5"></path>
    <circle cx="16" cy="18" r="2"></circle>
  </svg>
);

const FingerprintIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"></path>
    <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.1-1.4.2-2"></path>
    <path d="M6.6 16c.4 1.2 1.2 2.7 2.3 3.5"></path>
    <path d="M12 22a10 10 0 0 0 10-10c0-4-1.3-7.6-3.5-10"></path>
    <path d="M12 22a10 10 0 0 0 10-10c0-4-1.3-7.6-3.5-10"></path>
    <path d="M13 2.1c1 .5 1.9 1.2 2.7 2"></path>
    <path d="M9 13l1.5 1.6"></path>
    <path d="M16.1 9c.9.9 1 2.4.4 3.6"></path>
  </svg>
);

const PrinterIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect x="6" y="14" width="12" height="8"></rect>
  </svg>
);


const App = () => {
  const { currentPath, navigate } = useRouter();

  const renderPage = () => {
    switch (currentPath) {
      case '/about':
        return <AboutPage />;
      case '/portfolio':
        return <PortfolioPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <Navigation currentPath={currentPath} navigate={navigate} />
      {renderPage()}
    </>
  );
};

export default App;