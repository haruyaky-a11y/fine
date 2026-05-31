import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Award, Copy, Check, MessageSquare, ShieldCheck, Flame } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    service: string;
    tier: string;
    hours: string;
    position: string;
  } | null;
}

export default function ConsultationModal({ isOpen, onClose, initialData }: ConsultationModalProps) {
  // Form State
  const [gamertag, setGamertag] = useState('');
  const [position, setPosition] = useState('MID');
  const [currentTier, setCurrentTier] = useState('골드');
  const [targetGoal, setTargetGoal] = useState('에메랄드 이상 클래스');
  const [serviceType, setServiceType] = useState('실전형 듀오 피드백');
  const [notes, setNotes] = useState('');

  // Post-submit State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Sync simulator data if passed
  useEffect(() => {
    if (initialData) {
      if (initialData.position) setPosition(initialData.position);
      if (initialData.tier) {
        // clean string e.g., "골드 (GOLD)" -> "골드"
        const cleanTier = initialData.tier.split(' ')[0];
        setCurrentTier(cleanTier);
      }
      if (initialData.service) {
        setServiceType(initialData.service);
      }
    } else {
      // Clear form on fresh open
      setGamertag('');
      setNotes('');
      setIsSubmitted(false);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Build the copyable summary receipt text
  const getSubmitedSummaryText = () => {
    return `[타이탄팀 공식 수강 신청 견적서]
■ 신청자 닉네임: ${gamertag || '비공개'}
■ 주 포지션: ${position} / LINE
■ 현재 티어 구간: ${currentTier}
■ 맞춤 서비스 종류: ${serviceType}
■ 최종 수강 목표: ${targetGoal}
■ 유저 특별 요청 항목: ${notes || '라인전 습관 교정 및 게임 흐름 판 읽기 집중 교육'}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getSubmitedSummaryText());
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.warn('Failed to copy text', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      ></motion.div>

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-titan-dark-900 border border-brand-gold-500/40 rounded-3xl overflow-hidden shadow-2xl z-10 glow-gold"
      >
        {/* Header decoration band */}
        <div className="bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 h-1.5 w-full"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-titan-dark-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {!isSubmitted ? (
            /* Consultation form container */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="mb-2">
                <span className="font-display text-[10px] font-black tracking-wider text-brand-gold-400 uppercase bg-brand-gold-500/10 px-2.5 py-1 rounded-md border border-brand-gold-500/20">
                  SECURE MATCH MAKING
                </span>
                <h3 className="font-display text-2xl font-black text-white mt-2 leading-tight">
                  타이탄팀 무료 자가진단 신청
                </h3>
                <p className="font-sans text-xs text-slate-400 mt-1">
                  강사 배정과 구체적인 티어 상승 보증 한도 요금을 무료 분석해 드립니다.
                </p>
              </div>

              {/* NicName/Gamertag */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">게임 내 소환사명 (닉네임 + 태그#)</label>
                <input
                  type="text"
                  required
                  placeholder="예: 숨겨진고수 #KR1"
                  value={gamertag}
                  onChange={(e) => setGamertag(e.target.value)}
                  className="w-full bg-titan-dark-950 border border-titan-dark-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold-500 font-sans transition-colors"
                />
              </div>

              {/* Positions button checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">주요 라인 포지션</label>
                <div className="grid grid-cols-5 gap-2">
                  {['TOP', 'JUG', 'MID', 'ADC', 'SUP'].map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setPosition(pos)}
                      className={`text-xs font-bold py-2.5 rounded-lg border transition-all cursor-pointer ${
                        position === pos
                          ? 'bg-brand-gold-500/20 border-brand-gold-500 text-brand-gold-300 shadow'
                          : 'bg-titan-dark-950 border-titan-dark-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Tier and Service Type select inputs in grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">현재 티어 구간</label>
                  <select
                    value={currentTier}
                    onChange={(e) => setCurrentTier(e.target.value)}
                    className="w-full bg-titan-dark-950 border border-titan-dark-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-brand-gold-500 font-sans transition-colors cursor-pointer"
                  >
                    <option value="아이언">아이언 (Iron)</option>
                    <option value="브론즈">브론즈 (Bronze)</option>
                    <option value="실버">실버 (Silver)</option>
                    <option value="골드">골드 (Gold)</option>
                    <option value="플래티넘">플래티넘 (Platinum)</option>
                    <option value="에메랄드">에메랄드 (Emerald)</option>
                    <option value="다이아몬드">다이아몬드 (Diamond)</option>
                    <option value="마스터 이상">마스터+ (Master+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">원하시는 강의 형태</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-titan-dark-950 border border-titan-dark-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-brand-gold-500 font-sans transition-colors cursor-pointer"
                  >
                    <option value="1:1 정밀 피드백">1:1 리플레이 정밀 피드백</option>
                    <option value="실전형 듀오 피드백">실전형 듀오 피드백 플레이</option>
                    <option value="티어별 맞춤 코칭">티어 맞춤 마스터 클래스</option>
                  </select>
                </div>
              </div>

              {/* Goal text input */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">탈출하고 싶은 목표 골 티어</label>
                <input
                  type="text"
                  required
                  placeholder="예: 에메랄드 2 이상 안착"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  className="w-full bg-titan-dark-950 border border-titan-dark-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold-500 font-sans transition-colors"
                />
              </div>

              {/* User Custom Request Details */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">특별 요청 사항 (선택)</label>
                <textarea
                  placeholder="예: 라인전에서 선 2렙을 맨날 뺏겨요, 혹은 정글인데 역버프 카정 대처가 잘 안됩니다. 위주로 피드백받고 싶습니다."
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-titan-dark-950 border border-titan-dark-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-gold-500 font-sans resize-none transition-colors"
                ></textarea>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-400 hover:to-brand-gold-500 text-titan-dark-950 font-black py-4 rounded-xl text-sm transition-all duration-300 shadow-lg glow-gold cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>견적 자가진단표 자동 완성</span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-500 font-semibold font-sans mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                <span>작성하신 인적 정보는 매칭 완료 즉시 파기 처리됩니다.</span>
              </div>
            </form>
          ) : (
            /* Submission success state panel */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="inline-flex items-center justify-center p-4 bg-brand-gold-500/10 border border-brand-gold-500/30 text-brand-gold-400 rounded-full animate-bounce">
                <Award className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-display text-2xl font-black text-white">자가진단 신청서 준비 완료!</h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400 mt-2">
                  작성하신 내용이 완성되었습니다. 아래 내용을 복사 후 카카오톡으로 전송하시면 5분 내 상담원이 훈련 예약 조율을 완료해 드립니다.
                </p>
              </div>

              {/* Code/Invoice display container */}
              <div className="relative bg-titan-dark-950 rounded-2xl border border-titan-dark-800 text-left p-4 sm:p-5 font-mono text-xs text-slate-300 leading-relaxed max-h-[160px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-[11px] select-text">
                  {getSubmitedSummaryText()}
                </pre>

                {/* Abs Copy action overlay */}
                <button
                  onClick={handleCopy}
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-titan-dark-800 hover:bg-titan-dark-700 border border-titan-dark-700 hover:border-brand-gold-500 text-slate-300 hover:text-white transition-all duration-200 flex items-center space-x-1 cursor-pointer"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-[10px] text-green-500 font-bold">복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">복사하기</span>
                    </>
                  )}
                </button>
              </div>

              {/* Actions line */}
              <div className="space-y-3 pt-2">
                <a
                  href="https://open.kakao.com/o/sZPAcRri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-400 hover:to-brand-gold-500 text-titan-dark-950 font-black py-4 rounded-xl text-base shadow-lg cursor-pointer transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5 fill-titan-dark-950" />
                  <span>카카오톡 붙여넣고 상담 접수</span>
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors"
                >
                  정보 다시 작성하기
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
