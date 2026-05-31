import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQ() {
  const [activeId, setActiveId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-titan-dark-900/40 relative border-t border-titan-dark-800">
      {/* Background radial glow */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-brand-gold-500/3 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display text-xs font-bold text-brand-gold-400 tracking-widest uppercase mb-3">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            자주 묻는 핵심 질문과 답변 (FAQ)
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-brand-gold-500 to-transparent mx-auto mt-4 rounded"></div>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = activeId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-titan-dark-900 border-brand-gold-500/50 shadow-md shadow-brand-gold-500/5'
                    : 'bg-titan-dark-900/40 border-titan-dark-800 hover:border-titan-dark-750'
                }`}
              >
                {/* Trigger Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between text-white font-sans font-bold text-sm sm:text-base focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <span className={`text-sm font-display ${isOpen ? 'text-brand-gold-400' : 'text-slate-500'}`}>
                      Q{idx + 1}.
                    </span>
                    <span className="hover:text-brand-gold-300 transition-colors leading-relaxed">
                      {faq.question}
                    </span>
                  </div>
                  
                  <span className={`p-1 rounded-lg transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-brand-gold-500/15 text-brand-gold-400' : 'bg-titan-dark-800 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {/* Answer Block with Smooth Transition */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-titan-dark-850 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 font-sans">
                        <p>{faq.answer}</p>
                        <p className="text-[11px] text-slate-500 font-semibold flex items-center">
                          <HelpCircle className="w-3.5 h-3.5 mr-1" />
                          더 궁금한 게 있으신가요? 카카오톡 빠른 응대를 통해 실시간 해결이 지원됩니다.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Extra KakaoTalk Box in FAQ */}
        <div className="mt-12 p-6 rounded-2xl bg-titan-dark-900 border border-titan-dark-800 text-center">
          <p className="font-sans text-sm text-slate-300 mb-4">
            여기에 없는 질문이 있으시거나 복잡한 맞춤형 예약을 조율하고 싶으신가요?
          </p>
          <a
            href="https://open.kakao.com/o/sZPAcRri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-brand-gold-500/10 hover:bg-brand-gold-500 hover:text-titan-dark-950 border border-brand-gold-400 text-brand-gold-300 font-sans font-bold px-6 py-2.5 rounded-xl text-xs transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>상담전담직원에게 직접 물어보기</span>
          </a>
        </div>

      </div>
    </section>
  );
}
