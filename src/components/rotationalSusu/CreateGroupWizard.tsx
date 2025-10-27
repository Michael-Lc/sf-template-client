import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ArrowLeft, ArrowRight, Check, Users, Mail, Phone } from 'lucide-react';
import { useRotationalSusuStore } from '@/stores/rotationalSusuStore';
import { DURATION_OPTIONS, FREQUENCY_OPTIONS, FUNDING_SOURCES, SusuMember } from '@/types/rotationalSusu';
import { formatCurrency } from '@/lib/utils';

export function CreateGroupWizard() {
  const { 
    currentStep, 
    groupForm, 
    selectedMembers,
    setCurrentStep, 
    updateGroupForm, 
    resetGroupForm, 
    setIsCreatingGroup,
    createGroup 
  } = useRotationalSusuStore();

  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePhone, setInvitePhone] = useState('');

  const handleClose = () => {
    resetGroupForm();
    setIsCreatingGroup(false);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const newGroup = {
      id: Date.now().toString(),
      name: groupForm.name || '',
      description: groupForm.description || '',
      adminId: 'current-user-id',
      adminName: 'Current User',
      organizationId: 'org1',
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      durationPerRound: groupForm.durationPerRound || 4,
      savingsFrequency: groupForm.savingsFrequency || 'monthly',
      contributionAmount: groupForm.contributionAmount || 0,
      hasPenaltyPolicy: groupForm.hasPenaltyPolicy || false,
      penaltyDaysAfter: groupForm.penaltyDaysAfter,
      penaltyRate: groupForm.penaltyRate,
      currentCycle: 1,
      currentRound: 1,
      maxMembers: selectedMembers.length + 1,
      totalBalance: 0,
      members: [
        {
          id: 'admin',
          userId: 'current-user-id',
          name: 'Current User',
          email: 'current@user.com',
          phone: '+233123456789',
          rotationOrder: 1,
          fundingSource: 'wallet',
          status: 'confirmed',
          joinedAt: new Date().toISOString(),
          totalContributed: 0,
          missedPayments: 0,
          penaltiesOwed: 0,
          hasReceivedPayout: false
        },
        ...selectedMembers
      ]
    };

    createGroup(newGroup);
    handleClose();
  };

  const addMember = () => {
    if (!inviteEmail && !invitePhone) return;

    const newMember: SusuMember = {
      id: Date.now().toString(),
      userId: `user-${Date.now()}`,
      name: inviteEmail.split('@')[0] || 'New Member',
      email: inviteEmail,
      phone: invitePhone,
      rotationOrder: selectedMembers.length + 2,
      fundingSource: 'wallet',
      status: 'invited',
      joinedAt: new Date().toISOString(),
      totalContributed: 0,
      missedPayments: 0,
      penaltiesOwed: 0,
      hasReceivedPayout: false
    };

    // In a real app, this would update the store
    setInviteEmail('');
    setInvitePhone('');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter group name"
                    value={groupForm.name || ''}
                    onChange={(e) => updateGroupForm({ name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    placeholder="Describe the purpose of this savings group..."
                    value={groupForm.description || ''}
                    onChange={(e) => updateGroupForm({ description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration per Round
                  </label>
                  <select
                    value={groupForm.durationPerRound || ''}
                    onChange={(e) => updateGroupForm({ durationPerRound: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select duration</option>
                    {DURATION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Penalty Policy</h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={groupForm.hasPenaltyPolicy || false}
                    onChange={(e) => updateGroupForm({ hasPenaltyPolicy: e.target.checked })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable Penalty Policy</span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-7">
                  Charge penalties for late or missed payments
                </p>
              </div>

              {groupForm.hasPenaltyPolicy && (
                <div className="ml-7 space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Days after missed payment
                    </label>
                    <input
                      type="number"
                      placeholder="3"
                      value={groupForm.penaltyDaysAfter || ''}
                      onChange={(e) => updateGroupForm({ penaltyDaysAfter: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Penalty Rate (%)
                    </label>
                    <input
                      type="number"
                      placeholder="5"
                      value={groupForm.penaltyRate || ''}
                      onChange={(e) => updateGroupForm({ penaltyRate: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Savings Frequency
                </label>
                <select
                  value={groupForm.savingsFrequency || ''}
                  onChange={(e) => updateGroupForm({ savingsFrequency: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select frequency</option>
                  {FREQUENCY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contribution Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={groupForm.contributionAmount || ''}
                    onChange={(e) => updateGroupForm({ contributionAmount: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {groupForm.contributionAmount && groupForm.savingsFrequency && (
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="text-sm font-medium text-purple-800 mb-2">Contribution Summary</h4>
                <p className="text-sm text-purple-700">
                  Each member will contribute {formatCurrency(groupForm.contributionAmount)} {groupForm.savingsFrequency}
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite Members</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  As the group admin, you'll be automatically added as the first member. 
                  Invite colleagues from your organization to join the group.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      placeholder="colleague@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="tel"
                      placeholder="+233123456789"
                      value={invitePhone}
                      onChange={(e) => setInvitePhone(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={addMember}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      Invite
                    </button>
                  </div>
                </div>
              </div>

              {/* Members List */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Group Members ({selectedMembers.length + 1})</h4>
                
                <div className="space-y-2">
                  {/* Admin (current user) */}
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">You (Admin)</p>
                        <p className="text-xs text-gray-500">current@user.com</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Admin</Badge>
                  </div>

                  {/* Invited members */}
                  {selectedMembers.map((member, index) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <Badge variant="outline">Invited</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        const totalMembers = selectedMembers.length + 1;
        const totalPerRound = (groupForm.contributionAmount || 0) * totalMembers;
        
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Summary</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Group Name</p>
                  <p className="font-semibold text-gray-900">{groupForm.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Members</p>
                  <p className="font-semibold text-gray-900">{totalMembers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contribution Amount</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(groupForm.contributionAmount || 0)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Frequency</p>
                  <p className="font-semibold text-gray-900 capitalize">{groupForm.savingsFrequency}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration per Round</p>
                  <p className="font-semibold text-gray-900">{groupForm.durationPerRound} weeks</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payout per Round</p>
                  <p className="font-semibold text-green-600">{formatCurrency(totalPerRound)}</p>
                </div>
              </div>
              
              {groupForm.hasPenaltyPolicy && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Penalty Policy</p>
                  <p className="text-sm text-gray-900">
                    {groupForm.penaltyRate}% penalty after {groupForm.penaltyDaysAfter} days of missed payment
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">Next Steps</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Group will be created in draft status</li>
                <li>• Invitations will be sent to all members</li>
                <li>• Group becomes active once all members confirm</li>
                <li>• You can manage settings and rotation order before activation</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return groupForm.name && groupForm.durationPerRound;
      case 2:
        return !groupForm.hasPenaltyPolicy || (groupForm.penaltyDaysAfter && groupForm.penaltyRate);
      case 3:
        return groupForm.savingsFrequency && groupForm.contributionAmount;
      case 4:
        return true; // Can proceed without inviting members
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create Susu Group</h2>
              <p className="text-sm text-gray-600">Step {currentStep} of 5</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i + 1 <= currentStep ? 'bg-purple-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Group Info</span>
              <span>Penalty Policy</span>
              <span>Configuration</span>
              <span>Members</span>
              <span>Summary</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep === 5 ? (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                <span>Create Group</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}