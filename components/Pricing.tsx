import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Check, MessageSquare, ShieldCheck, Flame, Info, Trophy, Sparkles } from 'lucide-react';

interface PricingProps {
  onOpenConsultationWithData: (data: {
    service: string;
    tier: string;
    hours: string;
    position: string;
  }) => void;
}

// Full Tier Pricing Data mapping directly to the screenshots!
interface SubTierData {
  name: string;
  perGame: number;
  placement: number;
  perWin: number;
}

export interface TierPricing {
  id: string;
  nameEn: string;
  nameKr: string;
  badgeSymbol: string;
  colorClass: string; // Tailwind colors
  textGlow: string;    // CSS light glow
  bgGlow: string;      // RGB for backgrounds
  borderGlow: string;  // Border styling custom
  perGame: number | string;
  placement: number | string; // 5 games
  perWin: number | string;
  subTiers?: SubTierData[];
  description: string;
}

const PRICING_DATA: TierPricing[] = [
  {
    id: 'unranked',
    nameEn: 'UNRANKED',
    nameKr: '언랭크',
    badgeSymbol: '⚔️',
    colorClass: 'text-slate-400',
    textGlow: 'text-slate-400 shadow-slate-500/10',
    bgGlow: 'rgba(100, 116, 139, 0.1)',
    borderGlow: 'border-slate-500/30 group-hover:border-slate-400/60',
    perGame: 6500,
    placement: 47000,
    perWin: 8500,
    description: '랭크 배정이 진행되지 않은 신규 계정 듀오 매치',
  },
  {
    id: 'iron',
    nameEn: 'IRON',
    nameKr: '아이언',
    badgeSymbol: '🛡️',
    colorClass: 'text-neutral-500',
    textGlow: 'text-neutral-400 shadow-neutral-500/10',
    bgGlow: 'rgba(115, 115, 115, 0.1)',
    borderGlow: 'border-neutral-500/30 group-hover:border-neutral-400/60',
    perGame: 3500,
    placement: 22000,
    perWin: 4000,
    description: '아이언 티어 탈출 및 실력 향상 맞춤 솔루션',
  },
  {
    id: 'bronze',
    nameEn: 'BRONZE',
    nameKr: '브론즈',
    badgeSymbol: '🪵',
    colorClass: 'text-amber-600',
    textGlow: 'text-amber-500 shadow-amber-600/10',
    bgGlow: 'rgba(217, 119, 6, 0.08)',
    borderGlow: 'border-amber-700/30 group-hover:border-amber-600/60',
    perGame: 3500,
    placement: 22000,
    perWin: 4000,
    description: '쉽고 명확하게 게임을 승리하는 공식 가이드',
  },
  {
    id: 'silver',
    nameEn: 'SILVER',
    nameKr: '실버',
    badgeSymbol: '⚪',
    colorClass: 'text-slate-300',
    textGlow: 'text-slate-350 shadow-slate-300/10',
    bgGlow: 'rgba(148, 163, 184, 0.08)',
    borderGlow: 'border-slate-400/30 group-hover:border-slate-300/60',
    perGame: 4000,
    placement: 25000,
    perWin: 4000,
    description: '고질적인 라인전 실수 제거 및 빠른 성장 루트 설계',
  },
  {
    id: 'gold',
    nameEn: 'GOLD',
    nameKr: '골드',
    badgeSymbol: '👑',
    colorClass: 'text-yellow-400',
    textGlow: 'text-yellow-400 shadow-yellow-500/20 text-glow-gold',
    bgGlow: 'rgba(234, 179, 8, 0.08)',
    borderGlow: 'border-yellow-500/30 group-hover:border-yellow-400/60',
    perGame: 4500,
    placement: 27000,
    perWin: 4500,
    description: '플래티넘 진입을 위한 스마트한 맵 리딩 및 변수 제어',
  },
  {
    id: 'platinum',
    nameEn: 'PLATINUM',
    nameKr: '플래티넘',
    badgeSymbol: '💎',
    colorClass: 'text-teal-400',
    textGlow: 'text-teal-350 shadow-teal-500/20',
    bgGlow: 'rgba(20, 184, 166, 0.08)',
    borderGlow: 'border-teal-500/30 group-hover:border-teal-400/60',
    perGame: 7500,
    placement: 37000,
    perWin: 7500,
    description: '미새한 교전 피지컬 트레이닝 및 소규모 오브젝트 운영 안착',
  },
  {
    id: 'emerald',
    nameEn: 'EMERALD',
    nameKr: '에메랄드',
    badgeSymbol: '🐉',
    colorClass: 'text-emerald-400',
    textGlow: 'text-emerald-400 shadow-emerald-500/25',
    bgGlow: 'rgba(16, 185, 129, 0.08)',
    borderGlow: 'border-emerald-500/30 group-hover:border-emerald-400/60',
    perGame: 9005, // will use subtiers for granular
    placement: 49005,
    perWin: 9005,
    description: '정교한 라인 구도 주도권 활용 및 최우수 다수팀 합류 판단 수련',
    subTiers: [
      { name: '에메랄드 2~4', perGame: 9000, placement: 49000, perWin: 9000 },
      { name: '에메랄드 1', perGame: 10000, placement: 54000, perWin: 10000 },
    ],
  },
  {
    id: 'diamond',
    nameEn: 'DIAMOND',
    nameKr: '다이아몬드',
    badgeSymbol: '💫',
    colorClass: 'text-sky-400',
    textGlow: 'text-sky-400 shadow-sky-500/30',
    bgGlow: 'rgba(14, 165, 233, 0.1)',
    borderGlow: 'border-sky-500/40 group-hover:border-sky-450/75',
    perGame: 12000,
    placement: 64000,
    perWin: 12000,
    description: '메이저 게이밍 디테일 교반, 초단위 승률 플랜 정밀 설계',
    subTiers: [
      { name: '다이아몬드 4', perGame: 12000, placement: 64000, perWin: 12000 },
      { name: '다이아몬드 3', perGame: 13000, placement: 74000, perWin: 14000 },
      { name: '다이아몬드 2', perGame: 15000, placement: 99000, perWin: 18000 },
      { name: '다이아몬드 1', perGame: 19000, placement: 124000, perWin: 23000 },
    ],
  },
];

export default function Pricing({ onOpenConsultationWithData }: PricingProps) {
  // Active Tab Type: 'perGame' (듀오 판당제) | 'placement' (배치고사) | 'perWin' (승당제)
  const [activeTab, setActiveTab] = useState<'perGame' | 'placement' | 'perWin'>('perGame');

  // Calculator Interactive States
  const [selectedTierId, setSelectedTierId] = useState<string>('gold');
  const [selectedSubTierIndex, setSelectedSubTierIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(5);
  const [selectedPosition, setSelectedPosition] = useState<string>('MID');

  // Find currently selected Tier Object
  const currentTierData = PRICING_DATA.find((t) => t.id === selectedTierId) || PRICING_DATA[4];

  // Derive granular prices
  const basePerGame = typeof currentTierData.perGame === 'number' ? currentTierData.perGame : 0;
  const basePlacement = typeof currentTierData.placement === 'number' ? currentTierData.placement : 0;
  const basePerWin = typeof currentTierData.perWin === 'number' ? currentTierData.perWin : 0;

  let unitPrice = 0;
  let hasSubTiers = false;
  let activeSubTierName = '';

  if (currentTierData.subTiers && currentTierData.subTiers.length > 0) {
    hasSubTiers = true;
    const sub = currentTierData.subTiers[selectedSubTierIndex] || currentTierData.subTiers[0];
    activeSubTierName = sub.name;
    if (activeTab === 'perGame') unitPrice = sub.perGame;
    else if (activeTab === 'placement') unitPrice = sub.placement;
    else unitPrice = sub.perWin;
  } else {
    if (activeTab === 'perGame') unitPrice = basePerGame;
    else if (activeTab === 'placement') unitPrice = basePlacement;
    else unitPrice = basePerWin;
  }

  // Calculate Total Price
  // Note: placements are already priced for "5 Matches Set" as shown in screenshot.
  // We can treat placements as packs of 5 matches.
  const calculateTotal = () => {
    if (selectedTierId === 'high-tier') return 0;
    return unitPrice * (activeTab === 'placement' ? Math.ceil(quantity / 5) : quantity);
  };

  const handleApplyEstimate = () => {
    const calculatedPriceStr = calculateTotal() > 0 ? `${calculateTotal().toLocaleString()}원` : '상담 후 협의';
    const subTierLabel = hasSubTiers ? ` (${activeSubTierName})` : '';
    const quantityLabel = activeTab === 'placement' 
      ? `${quantity}판 (배치고사 패키지)`
      : `${quantity}${activeTab === 'perGame' ? '판' : '승'}`;

    const serviceTypeName = 
      activeTab === 'perGame' ? '듀오 판당제' : 
      activeTab === 'placement' ? '배치고사 5판' : '승당제';

    onOpenConsultationWithData({
      service: `[견적기 신청] ${serviceTypeName} - ${calculatedPriceStr}`,
      tier: `${currentTierData.nameKr}${subTierLabel}`,
      hours: quantityLabel,
      position: selectedPosition,
    });
  };

  // Helper to switch tier inside calculator from card click
  const selectTierFromCard = (tierId: string) => {
    setSelectedTierId(tierId);
    setSelectedSubTierIndex(0);
    // Adjust default quantities to make sense
    if (activeTab === 'placement') {
      setQuantity(5);
    } else {
      setQuantity(5);
    }

    // Scroll smoothly to estimator
    const element = document.getElementById('titan-estimator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-titan-dark-900/50 relative border-y border-titan-dark-800">
      {/* Background Graphic Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-[15%] top-[10%] w-[350px] h-[350px] bg-sky-500/5 rounded-full blur-[130px]" />
        <div className="absolute right-[15%] bottom-[10%] w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with high-end premium styling like kaynteam */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-brand-gold-500/10 border border-brand-gold-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-gold-400 mb-4 tracking-wider uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-gold-400" />
            <span>롤 대리 보증 한도 업계 1위 보장</span>
          </motion.div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            듀오 랭크 실시간 투명 요금표
          </h2>
          <p className="text-slate-400 font-sans mt-4 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            업계 유일 캡처본 요약 그대로 정량 명시! 타이탄팀은 허위 견적 없이, <br className="hidden sm:inline" />
            오직 고객님이 신청하신 정찰가 기준 실명 그대로 최고 효율 보이스 코칭 연계를 약속합니다.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-gold-500 via-brand-gold-400 to-transparent mx-auto mt-6 rounded-[2px]" />
        </div>

        {/* --- PREMIUM SERVICE TABS --- */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-titan-dark-950/90 border border-titan-dark-800 rounded-2xl shadow-inner max-w-xl w-full sm:w-auto overflow-x-auto space-x-1">
            <button
              onClick={() => {
                setActiveTab('perGame');
                if (quantity % 5 === 0 && quantity > 10) setQuantity(5);
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'perGame'
                  ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-titan-dark-950 font-black shadow-lg shadow-brand-gold-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-titan-dark-900/40'
              }`}
            >
              <span>⭐ 듀오 판당제</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('placement');
                setQuantity(5); // Placements are 5-match sets
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'placement'
                  ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-titan-dark-950 font-black shadow-lg shadow-brand-gold-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-titan-dark-900/40'
              }`}
            >
              <span>📝 배치고사 (5판 기준)</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('perWin');
                if (quantity % 5 === 0 && quantity > 10) setQuantity(5);
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'perWin'
                  ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 text-titan-dark-950 font-black shadow-lg shadow-brand-gold-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-titan-dark-900/40'
              }`}
            >
              <span>🔥 승당제</span>
            </button>
          </div>
        </div>

        {/* --- DYNAMIC TWIN PANELS (ESTIMATOR & VISUAL GRID) --- */}
        <div id="titan-estimator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 scroll-mt-24">
          
          {/* LEFT: THE INTERACTIVE ESTIMATOR (5 COLS) - Kaynteam Styled */}
          <div className="lg:col-span-5">
            <motion.div
              layout
              className="bg-gradient-to-b from-titan-dark-900 to-titan-dark-950 border border-brand-gold-500/50 rounded-3xl p-6 sm:p-7 shadow-xl shadow-brand-gold-500/5 relative overflow-hidden"
            >
              {/* Background high-end tech lines overlay */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-500 to-transparent" />
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-brand-gold-500/5 rounded-full blur-2xl" />

              <div className="flex items-center space-x-2 text-white mb-6 border-b border-titan-dark-800 pb-4">
                <Calculator className="w-5 h-5 text-brand-gold-400" />
                <h3 className="font-display text-lg font-black tracking-tight">타이탄 실시간 견적 솔루션</h3>
              </div>

              {/* Calculator Form */}
              <div className="space-y-5">
                
                {/* 1. Position Line */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">• 포지션 라인 지정</span>
                    <span className="text-[10px] text-brand-gold-400 font-bold bg-brand-gold-500/10 px-2 py-0.5 rounded border border-brand-gold-500/20">추가 금액 없음</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {['TOP', 'JUG', 'MID', 'ADC', 'SUP'].map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setSelectedPosition(pos)}
                        className={`text-xs font-black py-2.5 rounded-lg border transition-all duration-150 cursor-pointer ${
                          selectedPosition === pos
                            ? 'bg-brand-gold-500 text-titan-dark-950 border-brand-gold-400 shadow-lg font-black'
                            : 'bg-titan-dark-950 border-titan-dark-800 text-slate-400 hover:text-slate-200 hover:bg-titan-dark-850'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Tier Selection Wheel */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">• 고객님 현재 티어</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {PRICING_DATA.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedTierId(t.id);
                          setSelectedSubTierIndex(0);
                        }}
                        className={`py-2 px-1 rounded-lg border text-center transition-all duration-155 cursor-pointer flex flex-col items-center justify-center ${
                          selectedTierId === t.id
                            ? 'bg-brand-gold-500/15 border-brand-gold-500 text-brand-gold-300 font-bold'
                            : 'bg-titan-dark-950 border-titan-dark-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-sm mb-0.5">{t.badgeSymbol}</span>
                        <span className="text-[10px] uppercase font-black tracking-tighter">{t.nameEn}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Granular Sub Tier (Conditional) */}
                {hasSubTiers && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-1.5"
                  >
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">• 상세 소구간 선택</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {currentTierData.subTiers?.map((sub, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => setSelectedSubTierIndex(sIdx)}
                          className={`text-xs font-bold py-2 rounded-lg border transition-all cursor-pointer ${
                            selectedSubTierIndex === sIdx
                              ? 'bg-brand-gold-500/20 border-brand-gold-400 text-brand-gold-300 font-extrabold'
                              : 'bg-titan-dark-950 border-titan-dark-800 text-slate-400 hover:text-slate-300'
                          }`}
                        >
                          {sub.name.replace('에메랄드 ', '').replace('다이아몬드 ', '')}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 4. Match Counter / Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">• 신청 규모 설정</label>
                    <span className="font-mono text-xs font-black text-brand-gold-400">
                      {activeTab === 'placement' 
                        ? `${quantity}판 (배치고사 ${Math.ceil(quantity/5)}세트)` 
                        : `${quantity}${activeTab === 'perGame' ? '판' : '승리'}`
                      }
                    </span>
                  </div>

                  {activeTab === 'placement' ? (
                    /* Placements matches helper grid */
                    <div className="grid grid-cols-2 gap-2">
                      {[5, 10].map((v) => (
                        <button
                          key={v}
                          onClick={() => setQuantity(v)}
                          className={`text-xs py-3 rounded-xl border font-bold transition-all cursor-pointer ${
                            quantity === v
                              ? 'bg-brand-gold-500/20 border-brand-gold-400 text-brand-gold-300'
                              : 'bg-titan-dark-950 border-titan-dark-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          배치고사 풀 {v}판 세트 ({v === 5 ? '가장 일반적' : '풀 솔루션'})
                        </button>
                      ))}
                    </div>
                  ) : (
                    /* Slider for other modes */
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="1"
                        max="15"
                        step="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-titan-dark-950 rounded-lg appearance-none cursor-pointer accent-brand-gold-500 border border-titan-dark-850"
                      />
                      <div className="grid grid-cols-4 gap-1">
                        {[1, 5, 10, 15].map((presetVal) => (
                          <button
                            key={presetVal}
                            onClick={() => setQuantity(presetVal)}
                            className={`text-xs py-1 bg-titan-dark-950 hover:bg-titan-dark-800 rounded border transition-colors cursor-pointer ${
                              quantity === presetVal 
                                ? 'border-brand-gold-500 text-brand-gold-400 font-bold' 
                                : 'border-titan-dark-850 text-slate-500'
                            }`}
                          >
                            {presetVal}{activeTab === 'perGame' ? '판' : '승'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ESTIMATION LIVE BILL RECEIPT */}
              <div className="mt-6 p-5 rounded-2xl bg-titan-dark-950/80 border border-titan-dark-850 font-mono space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>TITAN ESTIMATION REGISTER // ID-LOL</span>
                  <span className="text-emerald-400 font-bold">● ONLINE READY</span>
                </div>
                
                <hr className="border-dashed border-titan-dark-850" />
                
                <div className="space-y-2.5 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">• 선택 코스유형</span>
                    <span className="text-white font-extrabold">
                      {activeTab === 'perGame' ? '실전형 듀오 판당제' : activeTab === 'placement' ? '배치고사 보증 플레이' : '승률 보장형 승당제'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">• 타겟 랭크구간</span>
                    <span className="text-brand-gold-400 font-extrabold uppercase">
                      {currentTierData.nameKr} {hasSubTiers ? `(${activeSubTierName})` : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">• 예약 포지션</span>
                    <span className="text-white font-bold">{selectedPosition} LINE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">• 신청 규모 (수량)</span>
                    <span className="text-white font-extrabold">
                      {activeTab === 'placement' 
                        ? `배치 ${quantity}판` 
                        : `${quantity} ${activeTab === 'perGame' ? '게임 판당' : '승리 승당'}`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-titan-dark-850/60 pt-2.5 text-xs">
                    <span className="text-slate-400">• 단가 책정</span>
                    <span className="text-slate-100 font-bold">
                      {unitPrice === 0 ? '협의 필요' : `${unitPrice.toLocaleString()}원 / 1`}{activeTab === 'placement' ? '세트(5판)' : activeTab === 'perGame' ? '판' : '승'}
                    </span>
                  </div>
                </div>

                <hr className="border-dashed border-titan-dark-850" />

                <div className="flex justify-between items-center bg-titan-dark-900 border border-titan-dark-850 p-4 rounded-xl">
                  <span className="text-xs sm:text-sm text-brand-gold-400 font-bold">종합 정찰제 합산요금</span>
                  <div className="text-right">
                    <span className="text-lg sm:text-2xl font-black text-white text-glow-gold">
                      {calculateTotal() > 0 ? `${calculateTotal().toLocaleString()}원` : '상담 매칭 요망'}
                    </span>
                    <p className="text-[10px] text-slate-500 font-sans mt-0.5 font-semibold">정직 신용 제재율 0% 보증</p>
                  </div>
                </div>
              </div>

              {/* Consultation trigger action */}
              <button
                onClick={handleApplyEstimate}
                className="w-full mt-6 inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-400 hover:to-brand-gold-500 text-titan-dark-950 font-black py-4.5 rounded-2xl text-base transition-all duration-300 shadow-xl glow-gold cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Flame className="w-5 h-5 fill-titan-dark-950 animate-bounce" />
                <span>이 견적으로 가격 무료 문의하기</span>
              </button>

              <div className="flex items-center justify-center space-x-1.5 mt-4 text-slate-500 text-[10px] font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>접수 요금 청구서는 수강생 상담 시 최종 룰베이스 매칭 후 확약됩니다.</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: REAL PRICING GRAPHICS GRID (7 COLS) - Shows exact images data as requested! */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-titan-dark-800 pb-3">
              <h3 className="font-display text-xl font-black text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-brand-gold-500 rounded-sm"></span>
                <span>
                  {activeTab === 'perGame' && 'Duo Rank Match Duo - 듀오 판당제 요금 안내'}
                  {activeTab === 'placement' && 'Placement Full Service - 배치고사 5판 요금 안내'}
                  {activeTab === 'perWin' && 'Win Rate Duo Premium - "승당제" 요금 안내'}
                </span>
              </h3>
              <span className="text-xs bg-brand-gold-500/10 text-brand-gold-400 font-bold border border-brand-gold-500/20 px-2.5 py-1 rounded">
                이미지 요약판 완독 적용됨
              </span>
            </div>

            {/* Custom Interactive Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRICING_DATA.map((tier) => {
                const isSelected = selectedTierId === tier.id;
                
                // Fetch dynamic price text to show on card based on selected tab type
                let priceText = '';
                if (tier.subTiers && tier.subTiers.length > 0) {
                  // If has subtiers, show range or general
                  const min = Math.min(...tier.subTiers.map(s => activeTab === 'perGame' ? s.perGame : activeTab === 'placement' ? s.placement : s.perWin));
                  const max = Math.max(...tier.subTiers.map(s => activeTab === 'perGame' ? s.perGame : activeTab === 'placement' ? s.placement : s.perWin));
                  priceText = `${min.toLocaleString()}원 ~ ${max.toLocaleString()}원`;
                } else {
                  const p = activeTab === 'perGame' ? tier.perGame : activeTab === 'placement' ? tier.placement : tier.perWin;
                  priceText = typeof p === 'number' ? `${p.toLocaleString()}원` : p;
                }

                // Subtitle context
                const pricingSubtitle = 
                  activeTab === 'perGame' ? '1판당' : 
                  activeTab === 'placement' ? '5판 세트당' : '1승당';

                return (
                  <motion.div
                    key={tier.id}
                    onClick={() => selectTierFromCard(tier.id)}
                    whileHover={{ scale: 1.015, y: -2 }}
                    className={`p-5.5 rounded-2xl border transition-all duration-200 cursor-pointer group flex flex-col justify-between ${
                      isSelected
                        ? 'bg-titan-dark-850 border-brand-gold-500 shadow shadow-brand-gold-500/5'
                        : 'bg-titan-dark-900 border-titan-dark-800/80 hover:bg-titan-dark-850 hover:border-titan-dark-600'
                    }`}
                  >
                    <div>
                      {/* Top Rank indicator with custom glow circle */}
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${tier.colorClass.startsWith('text-') ? 'bg-titan-dark-950 border border-titan-dark-800' : tier.colorClass} flex items-center justify-center text-lg shadow-inner`}>
                            {tier.badgeSymbol}
                          </div>
                          <div>
                            <span className="font-display text-xs text-slate-400 font-extrabold block tracking-wider uppercase">
                              {tier.nameEn}
                            </span>
                            <span className="font-sans text-base sm:text-lg font-black text-white">
                              {tier.nameKr}
                            </span>
                          </div>
                        </div>

                        {/* Action select node */}
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'border-brand-gold-500 bg-brand-gold-500' 
                            : 'border-titan-dark-750 bg-titan-dark-950 group-hover:border-slate-500'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-titan-dark-950" />}
                        </div>
                      </div>

                      <p className="text-xs text-slate-350 font-sans leading-relaxed mb-4 min-h-[30px]">
                        {tier.description}
                      </p>
                    </div>

                    {/* Pricing readout with gold highlighting matching screenshots! */}
                    <div className="border-t border-titan-dark-850 pt-3.5 flex justify-between items-end">
                      <div>
                        <span className="text-xs text-slate-500 font-bold uppercase block tracking-wider">
                          과정 구분
                        </span>
                        <span className="text-xs sm:text-sm text-slate-400 font-semibold font-sans">
                          {tier.nameKr} / {pricingSubtitle}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className={`font-display text-lg sm:text-xl font-black tracking-tight ${
                          isSelected ? 'text-brand-gold-400 text-glow-gold' : 'text-white'
                        }`}>
                          {priceText}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Master/Grandmaster/Challenger premium card */}
              <motion.div
                onClick={() => onOpenConsultationWithData({
                  service: '[특수 상담] 마스터/그랜드마스터/챌린저 최정상 집중 클래스',
                  tier: '마스터/그랜드마스터/챌린저',
                  hours: '가격 상담 문의',
                  position: 'MID'
                })}
                whileHover={{ scale: 1.015, y: -2 }}
                className="p-6 rounded-2xl border bg-titan-dark-900 border-purple-500/20 hover:border-purple-500/40 cursor-pointer group flex flex-col justify-between sm:col-span-2 relative overflow-hidden"
              >
                {/* Background lighting */}
                <div className="absolute -right-20 -bottom-20 w-44 h-44 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 via-pink-600 to-red-500 flex items-center justify-center text-xl shadow-lg animate-pulse">
                      🔱
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-display text-xs text-purple-400 font-black tracking-wider uppercase bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                          LEGEND MASTER CLASS
                        </span>
                        <span className="text-xs bg-red-500/15 text-red-400 font-black px-2 py-0.5 rounded tracking-widest animation-pulse">EXCLUSIVE</span>
                      </div>
                      <span className="font-display text-lg sm:text-xl font-black text-white block mt-1">
                        MASTER / GRANDMASTER / CHALLENGER
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-500 font-bold block">요금 산정 방식</span>
                    <span className="text-sm sm:text-base font-black text-purple-400 text-glow-gold">실시간 맞춤 협상 조율</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-titan-dark-850 pt-3.5">
                  <p className="text-sm text-slate-400 font-sans max-w-xl leading-relaxed">
                    초상위 0.01% 마스터 구간부터 챌린저 천상계까지 최상위권 전담 코치진(전 프로 및 LCK 아카데미 소속 강사진)의 스페셜 1:1 보이스 오더형 마스터 클래스입니다. 전담 조율팀에서 실시간 밀착 상담해 드립니다.
                  </p>
                  <button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-500/50 text-purple-300 font-bold text-sm py-2.5 px-4.5 rounded-xl transition-all font-sans whitespace-nowrap cursor-pointer">
                    실시간 가격 상담하기 ⚡
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM TRUST/FEATURES BAR - matching exact structure in pictures! --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-titan-dark-800">
          <div className="bg-titan-dark-950/40 border border-titan-dark-850/60 p-5 rounded-2xl flex items-start space-x-4">
            <div className="p-3 bg-brand-gold-500/10 rounded-xl border border-brand-gold-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5 text-brand-gold-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">전 구간 배치∙승리 듀오 가능</h4>
              <p className="text-[11px] text-slate-450 leading-relaxed font-sans">
                신규 언랭크부터 천상계 구간까지 상시 수용 가능한 압도적인 실력의 전담 듀오 연계 훈련이 즉시 진행됩니다.
              </p>
            </div>
          </div>

          <div className="bg-titan-dark-950/40 border border-titan-dark-850/60 p-5 rounded-2xl flex items-start space-x-4">
            <div className="p-3 bg-brand-gold-500/10 rounded-xl border border-brand-gold-500/20 shrink-0">
              <Flame className="w-5 h-5 text-brand-gold-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">철저한 보안 & 비공개 보장</h4>
              <p className="text-[11px] text-slate-455 leading-relaxed font-sans">
                접수 소환사 정보 및 인적 이력은 암호화 보안 서버에 로깅되며 완료 즉시 복구 불가능하게 원격 파기되어 안전합니다.
              </p>
            </div>
          </div>

          <div className="bg-titan-dark-950/40 border border-titan-dark-850/60 p-5 rounded-2xl flex items-start space-x-4">
            <div className="p-3 bg-brand-gold-500/10 rounded-xl border border-brand-gold-500/20 shrink-0">
              <Trophy className="w-5 h-5 text-brand-gold-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">실력 입증 전담 챌린저 듀오팀</h4>
              <p className="text-[11px] text-slate-455 leading-relaxed font-sans">
                실력 검증 면접 통과 후 보증 제재를 거친 전설급 챌린저/그랜드마스터 강사진이 가장 빠르고 정확하게 타겟 승리를 완성합니다.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
