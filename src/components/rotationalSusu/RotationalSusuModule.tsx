import { RotationalSusuOverview } from './RotationalSusuOverview';
import { CreateGroupWizard } from './CreateGroupWizard';
import { GroupDetailsModal } from './GroupDetailsModal';
import { CycleRestartModal } from './CycleRestartModal';
import { useRotationalSusuStore } from '@/stores/rotationalSusuStore';

export function RotationalSusuModule() {
  const { isCreatingGroup, activeGroup, isRestartingCycle } = useRotationalSusuStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RotationalSusuOverview />
      
      {isCreatingGroup && <CreateGroupWizard />}
      {activeGroup && <GroupDetailsModal />}
      {isRestartingCycle && <CycleRestartModal />}
    </div>
  );
}