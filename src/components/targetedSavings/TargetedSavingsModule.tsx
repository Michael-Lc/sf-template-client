import { TargetedSavingsOverview } from './TargetedSavingsOverview';
import { CreateGoalWizard } from './CreateGoalWizard';
import { GoalDetailsModal } from './GoalDetailsModal';
import { useTargetedSavingsStore } from '@/stores/targetedSavingsStore';

export function TargetedSavingsModule() {
  const { isCreatingGoal, activeGoal } = useTargetedSavingsStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TargetedSavingsOverview />
      
      {isCreatingGoal && <CreateGoalWizard />}
      {activeGoal && <GoalDetailsModal />}
    </div>
  );
}