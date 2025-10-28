import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Briefcase, CreditCard, FileText, Edit, Download, Eye } from 'lucide-react';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

export function ProfileView() {
  const { formData } = useOnboardingStore();
  const [expandedSection, setExpandedSection] = useState<string | null>('basic');

  const sections = [
    {
      id: 'basic',
      title: 'Basic Information',
      icon: User,
      color: 'blue',
      data: [
        { label: 'Full Name', value: `${formData.firstName} ${formData.middleName || ''} ${formData.lastName}`.trim() },
        { label: 'Date of Birth', value: formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : '' },
        { label: 'Gender', value: formData.gender },
        { label: 'Nationality', value: formData.nationality },
        { label: 'Ghana Card Number', value: formData.ghanaCardNumber },
        { label: 'TIN Number', value: formData.tinNumber || 'Not provided' },
        { label: 'SSNIT Number', value: formData.ssnitNumber || 'Not provided' }
      ]
    },
    {
      id: 'contact',
      title: 'Contact & Address',
      icon: MapPin,
      color: 'green',
      data: [
        { label: 'Mobile Number', value: `${formData.countryCode} ${formData.mobileNumber}` },
        { label: 'Email Address', value: formData.emailAddress },
        { label: 'Residential Address', value: formData.residentialAddress },
        { label: 'Digital Address', value: formData.digitalAddress || 'Not provided' },
        { label: 'Nearest Landmark', value: formData.nearestLandmark || 'Not provided' }
      ]
    },
    {
      id: 'employment',
      title: 'Employment & Income',
      icon: Briefcase,
      color: 'purple',
      data: [
        { label: 'Employer Name', value: formData.employerName },
        { label: 'Employer Type', value: formData.employerType },
        { label: 'Employment Type', value: formData.employmentType },
        { label: 'Occupation', value: formData.occupation },
        { label: 'Net Take-Home Pay', value: formData.netTakeHomePay ? formatCurrency(formData.netTakeHomePay) : '' },
        { label: 'Payment Frequency', value: formData.salaryFrequency },
        { label: 'Salary Account Bank', value: formData.salaryAccountBank },
        { label: 'Date of Employment', value: formData.dateOfEmployment ? new Date(formData.dateOfEmployment).toLocaleDateString() : '' }
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency Contact',
      icon: Phone,
      color: 'orange',
      data: [
        { label: 'Name', value: formData.nextOfKinName },
        { label: 'Relationship', value: formData.nextOfKinRelationship },
        { label: 'Contact Number', value: formData.nextOfKinContact },
        { label: 'Address', value: formData.nextOfKinAddress || 'Not provided' }
      ]
    },
    {
      id: 'banking',
      title: 'Banking & Wallet',
      icon: CreditCard,
      color: 'indigo',
      data: [
        { label: 'Smiggle Wallet ID', value: formData.smiggleWalletId },
        { label: 'Mobile Money Network', value: formData.mobileMoneyNetwork || 'Not linked' },
        { label: 'Mobile Money Number', value: formData.mobileMoneyNumber || 'Not linked' },
        { label: 'Bank Name', value: formData.bankName || 'Not linked' },
        { label: 'Card Number', value: formData.bankCardNumber ? `****-****-****-${formData.bankCardNumber?.slice(-4)}` : 'Not linked' },
        { label: 'Card Expiry', value: formData.cardExpiryDate || 'Not linked' }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600">View and manage your personal information</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile Summary */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {`${formData.firstName} ${formData.lastName}`}
              </h2>
              <p className="text-gray-600">{formData.occupation}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>{formData.emailAddress}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CreditCard className="w-4 h-4" />
                  <span>{formData.smiggleWalletId}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-700 mb-2">Verified</Badge>
              <p className="text-sm text-gray-600">Joined January 2024</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Profile Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          
          return (
            <Card key={section.id} className="overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(section.color)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                      <p className="text-sm text-gray-600">
                        {section.data.filter(item => item.value && item.value !== 'Not provided').length} fields completed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </Badge>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {section.data.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs font-medium text-gray-600 mb-1">{item.label}</p>
                        <p className="text-sm text-gray-900">
                          {item.value || 'Not provided'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {/* Documents Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Uploaded Documents</h3>
                <p className="text-sm text-gray-600">Identity and employment verification documents</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'National ID (Front)', status: 'verified' },
              { name: 'National ID (Back)', status: 'verified' },
              { name: 'Employment Letter', status: 'verified' },
              { name: 'Latest Payslip', status: 'verified' },
              { name: 'Selfie Photo', status: 'verified' }
            ].map((doc, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    {doc.status}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Edit Profile Information
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          Update Documents
        </button>
        <button className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">
          Download Profile PDF
        </button>
      </div>
    </div>
  );
}