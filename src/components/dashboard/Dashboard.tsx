import CompanySection from './CompanySection';
import Timeline from './Timeline';
import RegulatoryFramework from './RegulatoryFramework';
import Benefits from './Benefits';
import Documentation from './Documentation';
import Support from './Support';
import Chatbot from '@/components/chat/Chatbot';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <CompanySection />
      <Timeline />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RegulatoryFramework />
        <Benefits />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Documentation />
        <Support />
      </div>

      <Chatbot />
    </div>
  );
}