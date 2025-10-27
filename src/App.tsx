import { useState } from 'react';
import { Navigation } from './components/ui/navigation';
import { MyFinances } from './components/modules/MyFinances';
import { SavingsInvestments } from './components/modules/SavingsInvestments';
import { PersonalFinancialManagement } from './components/modules/PersonalFinancialManagement';

function App() {
  const [activeModule, setActiveModule] = useState('finances');

  const renderModule = () => {
    switch (activeModule) {
      case 'finances':
        return <MyFinances />;
      case 'savings':
        return <SavingsInvestments />;
      case 'management':
        return <PersonalFinancialManagement />;
      default:
        return <MyFinances />;
    }
  };

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