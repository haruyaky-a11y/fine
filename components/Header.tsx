import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: '이벤트', href: '#events' },
    { label: '팀 소개', href: '#about' },
    { label: '강사진', href: '#coaches' },
    { label: '가격안내', href: '#pricing' },
    { label: '수강후기', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-titan-dark-950/90 backdrop-blur-md border-b border-titan-dark-800 py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2 group">
              <span className="relative flex h-3 w-3 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-gold-500"></span>
              </span>
              <span className="font-display font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold-300 to-brand-gold-500">
                TITAN <span className="text-white group-hover:text-brand-gold-400 transition-colors">TEAM</span>
              </span>
              <span className="hidden sm:inline-block font-sans text-xs bg-titan-dark-800 text-brand-gold-400 px-2 py-0.5 rounded border border-brand-gold-500/20 font-bold">
                타이탄팀
              </span>
            </a>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-5 lg:space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-sans text-[18.5px] lg:text-[20.5px] font-bold text-slate-100 hover:text-brand-gold-400 hover:text-glow-gold transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={onOpenConsultation}
                className="font-sans text-[18px] lg:text-[20px] font-bold text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                빠른 견적내기
              </button>
              <a
                href="https://open.kakao.com/o/sZPAcRri" // Official KakaoTalk open chat link
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-400 hover:to-brand-gold-500 text-titan-dark-950 font-black px-6 py-3 rounded-lg text-[18px] lg:text-[20px] transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-brand-gold-500/20"
              >
                <MessageCircle className="w-5.5 h-5.5 fill-titan-dark-950" />
                <span>카카오톡 1:1 상담</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-titan-dark-900 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Content */}
        <div className="fixed right-0 top-0 bottom-0 w-3/4 max-w-sm bg-titan-dark-900 border-l border-titan-dark-800 p-6 flex flex-col justify-between shadow-2xl z-50">
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-titan-dark-800">
              <span className="font-display font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-gold-400">
                TITAN TEAM
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-[21px] font-extrabold text-slate-100 hover:text-brand-gold-400 py-3 border-b border-titan-dark-950 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 mt-auto">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full inline-flex items-center justify-center bg-titan-dark-800 text-brand-gold-400 border border-brand-gold-500/20 font-black px-4 py-3.5 rounded-lg text-[17px] transition-colors hover:bg-titan-dark-700"
            >
              실시간 프로그램 즉시 진단
            </button>
            <a
              href="https://open.kakao.com/o/sZPAcRri"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-titan-dark-950 font-black px-6 py-4 rounded-lg text-[20px] shadow-lg shadow-brand-gold-500/10"
            >
              <MessageCircle className="w-5.5 h-5.5 fill-titan-dark-950" />
              <span>카카오톡 1:1 상담</span>
              <ArrowUpRight className="w-4.5 h-4.5" />
            </a>
            <p className="text-[10px] text-center text-slate-500 font-medium">
              * 비정상 플레이 대행, 대리 게임 등의 행위를 엄격히 근절합니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
