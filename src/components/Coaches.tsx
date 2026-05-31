import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sword, Compass, Sparkles, Target, Shield, Star, Trophy, Award, MessageSquare } from 'lucide-react';
import { COACHES } from '../data';
import { Coach } from '../types';

const positionRoleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  TOP: Sword,
  JUG: Compass,
  MID: Sparkles,
  ADC: Target,
  SUP: Shield,
};

const positionLabels: Record<string, string> = {
  TOP: '탑 (TOP)',
  JUG: '정글 (JUNGLE)',
  MID: '미드 (MID)',
  ADC: '원딜 (ADC)',
  SUP: '서포터 (SUPPORT)',
};

interface CoachesProps {
  onSelectCoachConsultation: (coachName: string, position: string) => void;
}

export default function Coaches({ onSelectCoachConsultation }: CoachesProps) {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'TOP' | 'JUG' | 'MID' | 'ADC' | 'SUP'>('ALL');

  const filteredCoaches = COACHES.filter(
    (coach) => selectedFilter === 'ALL' || coach.position === selectedFilter
  );

  const filters: { value: typeof selectedFilter; label: string }[] = [
    { value: 'ALL', label: '전체 강사' },
    { value: 'TOP', label: '탑 (TOP)' },
    { value: 'JUG', label: '정글 (JUNGLE)' },
    { value: 'MID', label: '미드 (MID)' },
    { value: 'ADC', label: '원딜 (ADC)' },
    { value: 'SUP', label: '서포터 (SUP)' },
  ];

  return (
    <section id="coaches" className="py-24 bg-titan-dark-950 relative overflow-hidden">
      {/* Background glowing particles */}
      <div className="absolute right-1/4 top-1/4 w-[400px] h-[400px] bg-brand-gold-500/5 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-xs font-bold text-brand-gold-400 tracking-widest uppercase mb-3">
            CHALLENGER COACHES LINEUP
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            타이탄팀 TOP 클래스 전문 강사진
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-brand-gold-500 to-transparent mx-auto mt-4 rounded"></div>
          <p className="text-slate-400 font-sans mt-4 text-sm sm:text-base">
            대회 입상 경력, 전프로 및 챌린저 1,000점대 이상에서 철저하게 엄선된 1군 코치진입니다. 상위 0.01%의 격이 다른 인게임 디테일을 확인하세요.
          </p>
        </div>

        {/* Filter Tab UI */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`font-sans text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl border transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
                selectedFilter === filter.value
                  ? 'bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 border-brand-gold-400 text-titan-dark-950 shadow-md shadow-brand-gold-500/10'
                  : 'bg-titan-dark-900/60 hover:bg-titan-dark-850 border-titan-dark-800 text-slate-300 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Coach Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredCoaches.map((coach) => {
              const RoleIcon = positionRoleIcons[coach.position] || Sword;

              return (
                <motion.div
                  layout
                  key={coach.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group w-full max-w-md bg-gradient-to-b from-titan-dark-900 to-titan-dark-900/90 border border-titan-dark-800 hover:border-brand-gold-500/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold-500/5"
                >
                  <div>
                    {/* Position Label & Main Star */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center space-x-1.5 bg-titan-dark-800 border border-titan-dark-700 font-sans text-[11px] px-3 py-1 rounded-lg text-slate-300 font-bold">
                        <RoleIcon className="w-3.5 h-3.5 text-brand-gold-400" />
                        <span>{positionLabels[coach.position]}</span>
                      </span>

                      <div className="flex items-center bg-brand-gold-500/5 border border-brand-gold-500/20 px-2.5 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 text-brand-gold-400 fill-brand-gold-400 mr-1" />
                        <span className="font-display text-[11px] font-bold text-brand-gold-200">5.0 (Review)</span>
                      </div>
                    </div>

                    {/* Coach Profile Meta */}
                    <div className="flex items-center space-x-4 mb-4">
                      {/* Placeholder Avatar with Gradient and Role Badge inside */}
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-titan-dark-800 to-titan-dark-700 border-2 border-brand-gold-500/20 flex items-center justify-center shrink-0 shadow-inner group-hover:border-brand-gold-500/50 transition-colors">
                        <RoleIcon className="w-7 h-7 text-brand-gold-300" />
                        {/* Live Dot */}
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-lg font-black text-white leading-tight">
                          {coach.name}
                        </h3>
                        <p className="font-sans text-[11px] text-brand-gold-400 font-bold tracking-tight">
                          {coach.tier}
                        </p>
                        <p className="font-sans text-[11px] text-slate-500">
                          {coach.description}
                        </p>
                      </div>
                    </div>

                    {/* Carrier badge panel */}
                    <div className="mb-4 bg-titan-dark-950/80 rounded-xl p-3 border border-titan-dark-800/60 flex items-center justify-between">
                      <p className="text-[10px] text-slate-500 font-bold">인스타 피드백 평판</p>
                      <p className="font-display text-sm font-black text-brand-gold-300">최우수 TOP 코치</p>
                    </div>

                    {/* Intro phrase */}
                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                      “{coach.intro}”
                    </p>

                    {/* Specialties */}
                    <div className="space-y-2 mb-6 border-t border-titan-dark-800/60 pt-4">
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">코칭 핵심 전문 분야</p>
                      <div className="flex flex-wrap gap-1.5">
                        {coach.specialties.map((specialty, sIdx) => (
                          <span
                            key={sIdx}
                            className="font-sans text-[11px] bg-titan-dark-800 group-hover:bg-titan-dark-750 text-slate-300 px-2 py-1 rounded-md border border-titan-dark-700/50 transition-colors"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Trigger */}
                  <button
                    onClick={() => onSelectCoachConsultation(coach.name, coach.position)}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-titan-dark-850 hover:bg-brand-gold-500 hover:text-titan-dark-950 border border-titan-dark-700 hover:border-brand-gold-400 rounded-xl font-sans text-xs font-bold py-3.5 transition-all duration-300 cursor-pointer text-slate-200"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{coach.name} 코치 지목 상담</span>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Coach Lineup Info */}
        <div className="mt-12 text-center">
          <p className="font-sans text-xs text-slate-500 leading-relaxed max-w-lg mx-auto">
            * 강사의 인적 사항 공유 요구는 불가하며, 인게임 강의는 개인 디스코드 채널에서 안전하게 보호되어 이루어집니다.
          </p>
        </div>

      </div>
    </section>
  );
}
