import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Coaches from './components/Coaches';
import Pricing from './components/Pricing';
import EventSection from './components/EventSection';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [prefilledData, setPrefilledData] = useState<{
    service: string;
    tier: string;
    hours: string;
    position: string;
  } | null>(null);

  // Opens a fresh consultation dialog
  const handleOpenFreshConsultation = () => {
    setPrefilledData(null);
    setIsConsultationOpen(true);
  };

  // Opens consultation preloaded from Quote Simulator
  const handleOpenConsultationWithData = (data: {
    service: string;
    tier: string;
    hours: string;
    position: string;
  }) => {
    setPrefilledData(data);
    setIsConsultationOpen(true);
  };

  // Opens consultation preloaded from specific Coach designation click
  const handleOpenCoachConsultation = (coachName: string, position: string) => {
    setPrefilledData({
      service: `[강사 지정] ${coachName} 코치님과의 1:1 디렉팅`,
      tier: '골드 (GOLD)',
      hours: '5시간',
      position: position,
    });
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-titan-dark-950 text-slate-100 overflow-x-hidden selection:bg-brand-gold-500 selection:text-titan-dark-950">
      {/* 1. Header Navigation */}
      <Header onOpenConsultation={handleOpenFreshConsultation} />

      {/* 2. Main Hero Banner with animations */}
      <Hero onOpenConsultation={handleOpenFreshConsultation} />

      {/* 2.5 Interactive Event Notice Board & Promotional Campaigns */}
      <EventSection onOpenConsultation={handleOpenFreshConsultation} />

      {/* 3. Principles & Safe Benefits Section */}
      <Benefits />

      {/* 5. Professional Challenger Coaches Section */}
      <Coaches onSelectCoachConsultation={handleOpenCoachConsultation} />

      {/* 6. Price Lists & Interactive Quote Estimator */}
      <Pricing onOpenConsultationWithData={handleOpenConsultationWithData} />

      {/* 7. Student reviews and growth badges */}
      <Reviews />

      {/* 8. Accordion FAQs */}
      <FAQ />

      {/* 9. Final CTA & Regulatory Footer */}
      <Footer onOpenConsultation={handleOpenFreshConsultation} />

      {/* 10. Floating or Teleport Dialog Consultation Card */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialData={prefilledData}
      />
    </div>
  );
}
