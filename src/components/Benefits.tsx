import React from 'react';
import { motion } from 'motion/react';
import { Clock, Users, Zap, Target, Shield, Award, ShieldAlert } from 'lucide-react';
import { BENEFITS } from '../data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock: Clock,
  Users: Users,
  Zap: Zap,
  Target: Target,
  Shield: Shield,
  Award: Award,
};

export default function Benefits() {
  return (
    <section id="about" className="py-24 bg-titan-dark-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-brand-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-xs font-bold text-brand-gold-400 tracking-widest uppercase mb-3">
            TITAN TEAM PROMISE & PRINCIPLES
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            타이탄팀만의 독보적인 6가지 혜택
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-brand-gold-500 to-transparent mx-auto mt-4 rounded"></div>
          <p className="text-slate-400 font-sans mt-4 text-sm sm:text-base">
            대리나 정지 위험이 있는 불법 행위는 절대 엄금합니다. 본인의 피지컬과 게임 지능을 뇌리 깊숙이 새겨 드리는 100% 합법적이고 투명한 실력 양성 커리큘럼입니다.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, idx) => {
            const IconComponent = iconMap[benefit.iconName] || ShieldAlert;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative bg-titan-dark-900/60 hover:bg-titan-dark-900 border border-titan-dark-800 hover:border-brand-gold-500/50 p-6 sm:p-8 rounded-2xl transition-all duration-300 shadow-md hover:shadow-brand-gold-500/5"
              >
                {/* Glowing subtle hover corner dot */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-radial from-brand-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-2xl pointer-events-none"></div>

                {/* Animated Icon Wrapper */}
                <div className="inline-flex items-center justify-center p-3.5 rounded-xl bg-titan-dark-800 border border-titan-dark-700/60 group-hover:border-brand-gold-500/30 group-hover:bg-brand-gold-500/10 transition-all duration-300 text-slate-300 group-hover:text-brand-gold-400 mb-6">
                  <IconComponent className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Text Details */}
                <h3 className="font-sans text-lg font-bold text-white group-hover:text-brand-gold-300 transition-colors mb-2">
                  {benefit.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Informational Compliance Banner */}
        <div className="mt-12 p-4 rounded-xl bg-red-950/20 border border-red-900/40 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          <div className="flex items-center space-x-3 mb-3 sm:mb-0">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="font-sans text-xs sm:text-sm text-red-300 font-bold">
              주의: 타 수강업체의 비정상 IP 우회 대리 게임(계정 공유)은 게임 정지 및 사기 행위 영구 박탈의 지름길입니다.
            </span>
          </div>
          <span className="font-sans font-bold text-[10px] text-red-400/80 px-2 py-1 rounded bg-red-950 border border-red-900/30">
            타이탄팀 듀오 피드백 안심보장제
          </span>
        </div>

      </div>
    </section>
  );
}
