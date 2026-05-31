import { motion } from 'motion/react';
import { Star, ArrowRight, Quote, TrendingUp } from 'lucide-react';
import { REVIEWS } from '../data';

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-titan-dark-950 relative overflow-hidden">
      {/* Background glow shadow */}
      <div className="absolute left-0 bottom-0 w-[450px] h-[450px] bg-brand-gold-500/3 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-xs font-bold text-brand-gold-400 tracking-widest uppercase mb-3">
            STUDENT SUCCESS STORIES
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            실시간 티어 상승으로 증명된 후기
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-brand-gold-500 to-transparent mx-auto mt-4 rounded"></div>
          <p className="text-slate-400 font-sans mt-4 text-sm sm:text-base">
            타이탄팀에서 밀착 코칭 및 동행 케어 플레이를 진행하여 티어 수직 상승을 직접 경험한 수강생님들의 100% 리얼 후기입니다.
          </p>
        </div>

        {/* 4 Cards Grid - Responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-titan-dark-900/40 hover:bg-titan-dark-900 border border-titan-dark-800 hover:border-brand-gold-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold-500/5 relative"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-6 text-titan-dark-800 group-hover:text-brand-gold-500/10 transition-colors">
                <Quote className="w-10 h-10 transform translate-x-1 -translate-y-1" />
              </div>

              <div>
                {/* Meta Head (Stars, Date, Author) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 text-brand-gold-400 fill-brand-gold-400" />
                    ))}
                  </div>
                  <span className="font-sans text-xs text-slate-500 font-semibold">{review.date}</span>
                </div>

                {/* Growth Badge Tracker (Challenger Style) */}
                <div className="inline-flex items-center space-x-2.5 bg-titan-dark-950/90 border border-brand-gold-500/30 rounded-xl px-4 py-2 mb-4">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-gold-400 animate-pulse" />
                  <span className="font-sans text-xs font-bold text-slate-300">{review.growth.from}</span>
                  <ArrowRight className="w-3 h-3 text-brand-gold-400" />
                  <span className="font-sans text-xs font-black text-brand-gold-300 text-glow-gold">
                    {review.growth.to}
                  </span>
                </div>

                {/* Review Text */}
                <h3 className="font-sans text-base sm:text-lg font-bold text-white group-hover:text-brand-gold-300 transition-colors mb-2.5">
                  “{review.title}”
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
                  {review.content}
                </p>
              </div>

              {/* Author Info footer */}
              <div className="border-t border-titan-dark-800/80 pt-4 flex items-center justify-between text-xs font-semibold font-sans">
                <span className="text-white">{review.author} 수강생님</span>
                <span className="text-slate-500">{review.serviceType}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA phrase inside reviews */}
        <div className="mt-16 text-center">
          <p className="font-sans text-sm text-slate-400">
            실명 및 닉네임 유실 방지 가이드라인과 개인정보 보호 방침을 철저하게 수호합니다.
          </p>
        </div>

      </div>
    </section>
  );
}
