import { useState } from 'react';
import { Navigation } from './components/ui/navigation';
import { MyFinances } from './components/modules/MyFinances';
import { SavingsInvestments } from './components/modules/SavingsInvestments';
import { PersonalFinancialManagement } from './components/modules/PersonalFinancialManagement';
import { ProfileModule } from './components/profile/ProfileModule';
import { OnboardingModule } from './components/onboarding/OnboardingModule';

function App() {
  const [activeModule, setActiveModule] = useState('onboarding');

  const renderModule = () => {
    switch (activeModule) {
      case 'onboarding':
        return <OnboardingModule />;
      case 'finances':
        return <MyFinances />;
      case 'savings':
        return <SavingsInvestments />;
      case 'management':
        return <PersonalFinancialManagement />;
      case 'profile':
        return <ProfileModule />;
      default:
        return <OnboardingModule />;
    }
  };

  // Show onboarding without navigation for demo
  if (activeModule === 'onboarding') {
    return renderModule();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="pb-8">
        {renderModule()}
      </main>
    </div>
  );
}

export default App;