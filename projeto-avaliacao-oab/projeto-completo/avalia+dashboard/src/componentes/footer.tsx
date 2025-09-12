
"use client"

import { Instagram, Twitter, Youtube, Facebook, Scale, Fingerprint, Search, Laptop, BarChart, ArrowUp } from 'lucide-react';

export default function Footer() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { href: "https://www.instagram.com/oabma/", icon: Instagram },
    { href: "https://twitter.com/oabma", icon: Twitter },
    { href: "https://www.youtube.com/oabma", icon: Youtube },
    { href: "https://www.facebook.com/oabma", icon: Facebook },
  ];

  const serviceLinks = [
    { href: "https://pje.oabma.org.br/", icon: Scale, text: "pJe OAB" },
    { href: "https://pje.oabma.org.br/inss-digital", icon: Fingerprint, text: "Inss Digital" },
    { href: "https://pje.oabma.org.br/zone-criminal", icon: Search, text: "Área Criminal" },
    { href: "https://pje.oabma.org.br/portal-advocacia", icon: Laptop, text: "Portal Advocacia" },
    { href: "https://pje.oabma.org.br/status-services", icon: BarChart, text: "Status Serviços" },
  ];

  return (
    <footer className="w-full bg-[#121b30] text-gray-300 mt-auto py-10 px-6">
      <div className="container mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">

          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/logo-oabma.png"
              alt="Logo OAB Forte Maranhão"
              className="h-16 mb-4"
            />
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="w-full md:w-auto">
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.text}>
                  <a href={link.href} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <link.icon size={18} />
                    <span className="text-sm">{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 flex justify-between items-center">
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} - Gerência de Tecnologia da Informação
          </p>
          <button 
            onClick={scrollToTop}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}