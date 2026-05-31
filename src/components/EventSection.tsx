import { useState } from 'react';
import { Gift, Calendar, ArrowRight, Copy, Sparkles, Check, CheckCircle2 } from 'lucide-react';

interface EventSectionProps {
  onOpenConsultation: () => void;
}

interface EventItem {
  id: string;
  title: string;
  tag: string;
  period: string;
  status: 'ongoing' | 'always' | 'ended';
  description: string;
  benefits: string[];
  couponCode?: string;
  buttonText: string;
  accentColor: string; // Tailwind border/text accent
}

export default function EventSection({ onOpenConsultation }: EventSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ongoing' | 'always' | 'ended'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const events: EventItem[] = [
    {
      id: 'event-1',
      title: '믿고 맡기는 10+1 특별 보너스 이벤트',
      tag: '10+1 혜택',
      period: '상시 진행',
      status: 'always',
      description: '수강생 여러분의 꾸준한 노력을 타이탄팀이 응원합니다! 판당제 또는 승당제 10판 수강 시 1판을 무료 보너스로 추가 제공해 드립니다.',
      benefits: [
        '듀오 판당제 or 승당제 10단위 주문 시 10+1 즉시 혜택',
        '추가 제공 1판도 전담 베테랑 강사진과 동일하게 고품격 진행',
        '횟수 무제한 중복 적용 (예: 20판 신청 시 2판 추가 보너스!)'
      ],
      couponCode: 'TITAN10PLUS1',
      buttonText: '10+1 혜택 적용 상담받기',
      accentColor: 'border-brand-gold-500 text-brand-gold-400'
    },

    {
      id: 'event-3',
      title: '주말 초고속 고승률 듀오 집중 케어 패키지',
      tag: '주말 전용',
      period: '상시 진행',
      status: 'always',
      description: '유저 유입이 많아 혼란스러운 주말 랭크 게임을 완벽하게 수호합니다. 주말 밤샘 및 프리미엄 시간대 맞춤 전담팀을 고정 배정합니다.',
      benefits: [
        '주말(금~일) 10판 이상 주문 시 맞춤 분석 리포트 무상 제공',
        '연패 방지 실시간 멘탈 에이전트 다이렉트 보이스 브리핑 링크',
        '원점 매치 메이킹 방지 시크릿 피드백 세션 포함'
      ],
      buttonText: '주말 수호단 패키지 상담',
      accentColor: 'border-emerald-500 text-emerald-400'
    },

    {
      id: 'event-5',
      title: '시즌 스타트 프리 시즌 얼리버드 15% 할인',
      tag: '시즌 리셋',
      period: '종료됨',
      status: 'ended',
      description: '새로운 랭크 시즌이 시작되기 전, 선착순 50명 한정으로 배치고사 고승률 솔루션을 조기 예약하고 15% 파격 할인 혜택을 드렸던 이벤트입니다.',
      benefits: [
        '배치고사 보증 플레이 5판 정찰가 얼리버드 할인',
        '예약 대기 없이 시즌 시작 즉시 매칭 0순위',
        '마감 성원에 머리 숙여 감사드립니다!'
      ],
      buttonText: '이벤트 마감 (다음 시즌 대기)',
      accentColor: 'border-slate-800 text-slate-500'
    }
  ];

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEvents = events.filter(evt => {
    if (activeFilter === 'all') return true;
    return evt.status === activeFilter;
  });

  return (
    <section id="events" className="relative py-24 bg-titan-dark-950/70 border-t border-titan-dark-900 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-gold-500/10 text-brand-gold-400 font-bold px-3 py-1.5 rounded-full text-xs border border-brand-gold-500/20 mb-4 animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SPECIAL BENEFITS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight leading-none mb-4">
            실시간 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-400 to-brand-gold-200">혜택 & 이벤트</span> 공지
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            타이탄팀에서 수강생분들을 위해 제공하는 상시 혜택 및 특별 프로모션을 확인해보세요. <br className="hidden sm:inline" />
            코스 접수 및 상담 신청 시 혜택 코드를 말씀해주시면 즉시 할인 혜택이 적용됩니다!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-titan-dark-900/90 border border-titan-dark-800 rounded-xl max-w-full overflow-x-auto gap-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-brand-gold-500 text-titan-dark-950 shadow-md shadow-brand-gold-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-titan-dark-800/50'
              }`}
            >
              전체 혜택 ({events.length})
            </button>
            <button
              onClick={() => setActiveFilter('ongoing')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'ongoing'
                  ? 'bg-brand-gold-500 text-titan-dark-950 shadow-md shadow-brand-gold-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-titan-dark-800/50'
              }`}
            >
              진행 중
            </button>
            <button
              onClick={() => setActiveFilter('always')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'always'
                  ? 'bg-brand-gold-500 text-titan-dark-950 shadow-md shadow-brand-gold-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-titan-dark-800/50'
              }`}
            >
              상시 혜택
            </button>
            <button
              onClick={() => setActiveFilter('ended')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'ended'
                  ? 'bg-brand-gold-500 text-titan-dark-950 shadow-md shadow-brand-gold-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-titan-dark-800/50'
              }`}
            >
              종료됨
            </button>
          </div>
        </div>

        {/* Event List Layout (Bento-like 2 Column Cards Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredEvents.map((evt) => {
            const isEnded = evt.status === 'ended';
            return (
              <div
                key={evt.id}
                id={evt.id}
                className={`relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isEnded
                    ? 'bg-titan-dark-900/40 border-titan-dark-850 opacity-60'
                    : 'bg-titan-dark-900/80 border-titan-dark-800 hover:border-titan-dark-600 hover:shadow-xl hover:shadow-brand-gold-500/2 hover:-translate-y-1'
                }`}
              >
                {/* Accent line */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r rounded-full ${
                  evt.status === 'ongoing' 
                    ? 'from-purple-500 to-pink-500' 
                    : evt.status === 'always' 
                    ? 'from-brand-gold-500 to-brand-gold-300' 
                    : 'from-slate-700 to-slate-800'
                }`} />

                <div>
                  {/* Badge & Period Info */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[10px] sm:text-xs font-black px-2.5 py-1 rounded border tracking-wide uppercase ${
                      evt.status === 'ongoing'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        : evt.status === 'always'
                        ? 'bg-brand-gold-500/10 text-brand-gold-400 border-brand-gold-500/20'
                        : 'bg-slate-850 text-slate-500 border-slate-800'
                    }`}>
                      {evt.status === 'ongoing' && '🔥 진행중_EVENT'}
                      {evt.status === 'always' && '⭐ 상시_BENEFIT'}
                      {evt.status === 'ended' && '🔒 마감_CLOSED'}
                    </span>
                    <div className="flex items-center space-x-1 text-slate-500 text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.period}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-lg sm:text-xl font-black mb-3 ${isEnded ? 'text-slate-500' : 'text-white'}`}>
                    {evt.title}
                  </h3>
                  <p className={`text-xs sm:text-sm font-sans leading-relaxed mb-6 ${isEnded ? 'text-slate-500' : 'text-slate-450'}`}>
                    {evt.description}
                  </p>

                  {/* Key Benefits Bullet List */}
                  <div className="bg-titan-dark-950/60 rounded-xl p-4 mb-6 border border-titan-dark-850/60">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider mb-2.5">
                      핵심 공지 혜택 세부내용
                    </span>
                    <ul className="space-y-2">
                      {evt.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start text-xs font-medium text-slate-350">
                          <CheckCircle2 className={`w-3.5 h-3.5 mr-2 shrink-0 mt-0.5 ${isEnded ? 'text-slate-600' : 'text-brand-gold-400'}`} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom interactive action / Codes */}
                <div className="mt-auto space-y-4">
                  {evt.couponCode && (
                    <div className="flex items-center justify-between bg-titan-dark-950 border border-titan-dark-850 p-3 rounded-xl">
                      <div>
                        <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">
                          상담용 자동 적용 할인코드
                        </span>
                        <code className={`font-mono text-xs font-black ${isEnded ? 'text-slate-600' : 'text-brand-gold-400'}`}>
                          {evt.couponCode}
                        </code>
                      </div>
                      {!isEnded && (
                        <button
                          onClick={() => handleCopyCode(evt.couponCode!, evt.id)}
                          className="flex items-center space-x-1.5 text-xs bg-titan-dark-850 hover:bg-titan-dark-800 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-titan-dark-800 transition-colors cursor-pointer"
                        >
                          {copiedId === evt.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">복사됨</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>코드 복사</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  <button
                    disabled={isEnded}
                    onClick={onOpenConsultation}
                    className={`w-full font-serif flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isEnded
                        ? 'bg-titan-dark-850 text-slate-600 border border-titan-dark-800 cursor-not-allowed'
                        : 'bg-gradient-to-r from-titan-dark-900 to-titan-dark-850 hover:from-titan-dark-850 hover:to-titan-dark-800 text-slate-200 hover:text-white border border-titan-dark-800 hover:border-titan-dark-600 cursor-pointer shadow-lg shadow-black/10'
                    }`}
                  >
                    <span>{evt.buttonText}</span>
                    {!isEnded && <ArrowRight className="w-4 h-4 ml-1" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
