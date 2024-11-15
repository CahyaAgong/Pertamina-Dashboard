import React from 'react';
import {
  Home, Upload, FileText, Layout, PieChart,
  HelpCircle, Download, Settings, Bell,
  ChevronRight, X
} from 'lucide-react';
import SidebarLayout from '../Component/Sidebar/Layout';
import { Link } from 'react-router-dom';

const TemplateSelectionPage = () => {
  return (
    <SidebarLayout>
      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#F3F4F6]">
        {/* Card Wrapper for the entire content */}
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-lg space-y-8">
          {/* Header */}
          <div className="p-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <span>Dashboard</span>
              <ChevronRight size={16} />
              <span className="text-gray-900">Upload</span>
            </div>

            {/* Template Sections */}
            <div className="space-y-8">
              {/* Customize Templates Section */}
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#1E3A8A]"> {/* Deep Navy for headers */}
                  Customize your templates
                </h2>
                <p className="text-gray-600 mb-4">
                  Upload your document using our prebuilt templates or create your own custom template to suit your specific needs
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <TemplateOption
                    icon={<Layout size={24} />}
                    title="Pre-Built Template"
                    description="Build your own document extractor in no time with our template"
                  />
                  <TemplateOption
                    icon={<Layout size={24} />}
                    title="Custom Template"
                    description="Build your own document extractor in no time with our template"
                  />
                </div>
              </div>

              {/* Ready Templates Section */}
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#1E3A8A]"> {/* Deep Navy for headers */}
                  Ready to use templates
                </h2>
                <p className="text-gray-600 mb-4">
                  Upload your document using tested pre-trained templates just select your documents and upload
                </p>

                {/* Finance Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-[#1E3A8A] mb-4"> {/* Deep Navy for section headings */}
                    Finance
                  </h3>
                  <div className="grid grid-cols-4 gap-6">
                    <DocumentTemplate
                      icon="📄"
                      title="Invoice"
                      description="Payment request document issued from parties"
                      mylink='invoice'
                    />
                    <DocumentTemplate
                      icon="🏦"
                      title="E-Statement"
                      description="Report of bank transactions in a bank account"
                      mylink='e-statement'
                    />
                    <DocumentTemplate
                      icon="🚚"
                      title="Delivery Notes"
                      description="Delivery details of goods shipment"
                      mylink='delivery-notes'
                    />
                    <DocumentTemplate
                      icon="📝"
                      title="Purchase Order"
                      description="Buyer's order confirmation document"
                      mylink='purchase-order'
                    />
                    <DocumentTemplate
                      icon="📑"
                      title="Tax Invoice"
                      description="Taxable transaction records"
                      mylink='tax-invoice'
                    />
                    <DocumentTemplate
                      icon="🧾"
                      title="Receipt"
                      description="Proof of payments from stores"
                      mylink='receipt'
                    />
                  </div>
                </div>

                {/* Legal Section */}
                <div>
                  <h3 className="text-lg font-medium text-[#1E3A8A] mb-4"> {/* Deep Navy for section headings */}
                    Legal
                  </h3>
                  <div className="grid grid-cols-4 gap-6">
                    <DocumentTemplate
                      icon="🪪"
                      title="ID Card"
                      description="Identification Card"
                      badge="Verify" // Badge usage here
                      mylink='id-card'
                    />
                    <DocumentTemplate
                      icon="🚗"
                      title="Vehicle Ownership"
                      description="Proof of vehicle ownership"
                      badge="Beta"
                      mylink='vehicle-ownership'
                    />
                    <DocumentTemplate
                      icon="📜"
                      title="Business License"
                      description="Business registration number as the company identifier"
                      badge="Verify"
                      mylink='business-licence'
                    />
                    <DocumentTemplate
                      icon="👨‍👩‍👧‍👦"
                      title="Family Card"
                      description="Family Registry Card"
                      mylink='family-card'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

const SidebarItem = ({ icon, text, active }) => (
  <div className={`flex items-center space-x-2 px-4 py-2 cursor-pointer ${active ? 'bg-[#EFF6FF] text-[#1E3A8A]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'}`}>
    {icon}
    <span>{text}</span>
  </div>
);

const TemplateOption = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] hover:border-[#1E3A8A] cursor-pointer shadow-md transition">
    <div className="text-[#1E3A8A] mb-4">{icon}</div> {/* Deep Navy for icon */}
    <h3 className="font-medium mb-2 text-[#111827]">{title}</h3> {/* Dark Gray for title */}
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const DocumentTemplate = ({ icon, title, description, badge, mylink }) => (
  <Link to={`/upload/${mylink}`}>
  <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] hover:border-[#1E3A8A] cursor-pointer shadow-md transition">
    <div className="flex justify-between items-start mb-4">
      <div className="text-3xl">{icon}</div>
      {badge && (
        <span className={`text-xs px-2 py-1 rounded ${
          badge === 'Verify' ? 'bg-[#34D399] text-[#1E3A8A]' : 'bg-[#F59E0B] text-[#1E3A8A]'
        }`}>
          {badge}
        </span>
      )}
    </div>
    <h2 className="font-medium mb-2 text-[#111827]">{title}</h2> {/* Dark Gray for title */}
    <p className="text-sm text-gray-600">{description}</p>
  </div>
  </Link>
);

export default TemplateSelectionPage;
