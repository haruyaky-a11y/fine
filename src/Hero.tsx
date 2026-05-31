import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
// @ts-ignore
import titanBg from '../assets/images/titan_gaming_bg_1780121809641.png';

interface HeroProps {
  onOpenConsultation: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-titan-dark-950 flex items-center justify-center pt-24 overflow-hidden border-b border-titan-dark-800">
      {/* Immersive background elements */}
      <div className="absolute inset-0 z-0">
        {/* Background Image - Raw original artwork filled naturally at 100% brightness and color */}
        <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
          <img 
            src={titanBg} 
            alt="Titan Team Hanbok Ahri Background" 
            className="w-full h-full object-cover object-center select-none"
          />
          {/* Subtle smooth linear fades to ensure seamless integration with headers and bottom sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-titan-dark-950"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 text-center">
        {/* Dynamic Glowing Title with custom heavy drop shadow for absolute legibility */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-4xl mx-auto font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6 text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.95)]"
        >
          롤 대리 듀오 강의{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 via-brand-gold-400 to-brand-gold-600 text-glow-gold drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
            전문
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 via-brand-gold-400 to-brand-gold-600 text-glow-gold drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
            타이탄팀
          </span>
        </motion.h1>

        {/* Subtitle description with heavy backmask text shadow */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto font-sans text-base sm:text-lg md:text-xl text-white font-bold leading-relaxed mb-10 drop-shadow-[0_3px_8px_rgba(0,0,0,1)]"
        >
          타이탄팀은 실력 향상, 듀오 플레이, 맞춤 강의를 제공하는 전문 팀입니다.<br className="hidden md:inline" />
          더 이상의 정체는 없습니다. 당신만을 관통하는 절대 승리 전략을 터득하세요.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center mb-16"
        >
          {/* Main Pricing Trigger */}
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-brand-gold-700 hover:from-brand-gold-400 hover:to-brand-gold-500 text-titan-dark-950 font-black px-12 py-4 rounded-xl text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-brand-gold-500/20 glow-gold cursor-pointer"
          >
            <span>이용 요금 보기</span>
            <Sparkles className="w-5 h-5 fill-titan-dark-950 animate-pulse text-titan-dark-950" />
          </a>
        </motion.div>

        {/* Live Service Pulse Status Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 gap-4 max-w-xl mx-auto pt-8 border-t border-titan-dark-900"
        >
          <div className="bg-titan-dark-900/50 backdrop-blur rounded-xl p-4 border border-titan-dark-800/40">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-1">수강생 평점</p>
            <p className="font-display text-2xl font-black text-white">4.98 / 5.0</p>
          </div>
          <div className="bg-titan-dark-900/50 backdrop-blur rounded-xl p-4 border border-titan-dark-800/40">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-1">실시간 상담 응대</p>
            <p className="font-display text-2xl font-black text-emerald-400 flex items-center justify-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
