import { MessageCircle, ArrowUpRight, ShieldCheck, HeartPulse } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-titan-dark-950 border-t border-titan-dark-800">
      
      {/* Footer Top: High conversion CTA (9. 하단 CTA) */}
      <div className="py-20 relative overflow-hidden border-b border-titan-dark-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            지금 타이탄팀과 함께 실력을 올려보세요
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            더 이상의 연패와 탈출구 없는 실력 침체는 끝내야 합니다. <br />
            당신의 플레이를 꿰뚫어 보는 1:1 진단과 맞춤 설루션으로 승리 공식을 손에 넣으세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* CTA Option 1: Live Consultation popup */}
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-gold-500 via-brand-gold-600 to-brand-gold-700 hover:from-brand-gold-400 hover:to-brand-gold-500 text-titan-dark-950 font-black px-8 py-4 rounded-xl text-base shadow-lg shadow-brand-gold-500/20 glow-gold cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>실시간 1:1 상담 예약하기</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* CTA Option 2: KakaoTalk redirection */}
            <a
              href="https://open.kakao.com/o/sZPAcRri"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-titan-dark-900 hover:bg-titan-dark-800 border-2 border-slate-700 hover:border-brand-gold-400 text-white font-sans font-extrabold px-8 py-4 rounded-xl text-base transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 fill-current text-brand-gold-400" />
              <span>카카오톡 상담하기</span>
            </a>
          </div>

          {/* Quick status counters */}
          <div className="flex items-center justify-center space-x-4 mt-8 text-xs text-slate-500 font-semibold font-sans">
            <span className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              24시간 상시 가동 중
            </span>
            <span className="h-3 w-px bg-titan-dark-800"></span>
            <span>평균 상담원 매칭 3분 미만</span>
            <span className="h-3 w-px bg-titan-dark-800"></span>
            <span className="text-brand-gold-400 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-green-500" />
              제재 보장제 안심 동행
            </span>
          </div>
        </div>
      </div>

      {/* Footer Bottom Content (Company information, fine print, compliance details) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-500 font-sans text-xs">
        
        {/* Compliance Guard Paragraph */}
        <div className="mb-8 p-5 bg-titan-dark-900/40 rounded-xl border border-titan-dark-800/60 leading-relaxed space-y-2">
          <p className="text-slate-400 font-bold flex items-center">
            <ShieldCheck className="w-4 h-4 text-brand-gold-400 mr-2 shrink-0" />
            타이탄팀 공식 건전게임 및 약관 안내
          </p>
          <p className="text-[11px] text-slate-500">
            타이탄팀은 게임 주식회사(Riot Games, Inc. 포함)의 공식 서비스 약관을 철저히 존중하고 준수합니다. 본 플랫폼은 비정상적 IP 우회, 계정 정보 대여, 타인의 등급을 부정한 방법으로 대신 올려주는 비순수 플레이 대행(대리 행위), 악의적 트롤링, 헬퍼/핵 같은 부정행위를 일체 거절하며 엄격하게 제재하고 있습니다. 본 서비스는 오직 유저 자신의 눈높이와 손가락 단점을 지적하는 교육적인 인게임 디스코드 1:1 화면공유 피드백, 실전 보조 동행 플레이 강의 등의 합법적인 지식 공유를 골자로 합니다. 이에 따른 부당 제재나 약관 위반 처리는 0% 임을 보증해 드립니다.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-titan-dark-900 pb-8 mb-8">
          {/* Logo & Slogan */}
          <div>
            <span className="font-display font-black text-lg tracking-wider text-white">
              TITAN TEAM
            </span>
            <p className="text-[11px] text-slate-500 mt-1 font-semibold">
              롤 대리 듀오 강의 전문 타이탄팀
            </p>
          </div>

          {/* Quick legal/nav list */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-400 font-semibold">
            <a href="#about" className="hover:text-brand-gold-400 transition-colors">팀 소개</a>
            <a href="#services" className="hover:text-brand-gold-400 transition-colors">서비스</a>
            <a href="#pricing" className="hover:text-brand-gold-400 transition-colors">이용 요금</a>
            <a href="#faq" className="hover:text-brand-gold-400 transition-colors">FAQ</a>
            <a href="https://open.kakao.com/o/sZPAcRri" target="_blank" rel="noopener noreferrer" className="text-brand-gold-400 hover:text-brand-gold-300 transition-colors">카카오 채널상담</a>
          </div>
        </div>

        {/* Corporate Legal Footer details */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-slate-500">
          <div className="space-y-1">
            <p>상호명: (주)타이탄게임코칭컴퍼니 | 대표이사: 타이탄 마스터 | 사업자등록번호: [정식 제휴 가동]</p>
          </div>
          
          <div className="text-left md:text-right">
            <p>© {currentYear} TITAN TEAM. All rights reserved.</p>
            <p className="text-[10px] text-slate-600 mt-0.5">League of Legends is a trademark of Riot Games, Inc. This service is not authorized or endorsed by Riot Games.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
