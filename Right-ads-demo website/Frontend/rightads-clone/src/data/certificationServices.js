import { Building2, Award, Factory } from 'lucide-react';

export const certificationServices = [
  {
    id: 'nsic',
    title: 'NSIC Registration For Government Tendering',
    shortDescription:
      'Get NSIC registered to participate in government tenders and access exclusive MSME benefits for public procurement.',
    icon: Building2,
    color: '#2563EB',
    details: {
      description:
        'NSIC (National Small Industries Corporation) registration enables your business to compete in government tenders with preferential treatment, fee exemptions, and enhanced credibility among public sector buyers.',
      benefits: [
        'Eligibility for government and PSU tenders',
        'Tender fee exemptions for registered MSMEs',
        'Enhanced buyer trust and vendor credibility',
        'Access to NSIC marketing support programs',
        'Single Window facilitation for procurement',
      ],
      documents: [
        'Udyam / MSME Registration Certificate',
        'PAN Card of Business Entity',
        'GST Registration (if applicable)',
        'Bank Account Details & Cancelled Cheque',
        'Ownership / Partnership / Company Documents',
        'Latest Audited Financial Statements',
      ],
      eligibility: [
        'Registered MSME / Small Scale Industry unit',
        'Valid Udyam Registration',
        'Manufacturing or service enterprise as per NSIC norms',
        'Compliant with statutory requirements',
      ],
      processingTime: '15–30 working days (subject to document completeness)',
      faqs: [
        {
          q: 'Is NSIC registration mandatory for government tenders?',
          a: 'While not always mandatory, NSIC registration provides significant advantages including fee exemptions and preferential treatment in many government procurement processes.',
        },
        {
          q: 'Can service businesses apply for NSIC?',
          a: 'Yes, eligible service enterprises with valid MSME registration can apply subject to NSIC category guidelines.',
        },
        {
          q: 'How long is NSIC registration valid?',
          a: 'Registration validity depends on the certificate type and must be renewed as per NSIC guidelines.',
        },
      ],
    },
  },
  {
    id: 'iso',
    title: 'ISO Certification',
    shortDescription:
      'Achieve internationally recognized quality standards that build trust, improve processes, and open global markets.',
    icon: Award,
    color: '#3B82F6',
    details: {
      description:
        'ISO certification demonstrates your commitment to quality management, operational excellence, and customer satisfaction. We guide you through audit preparation, documentation, and certification across popular ISO standards.',
      benefits: [
        'International quality recognition',
        'Improved operational efficiency',
        'Higher customer and partner confidence',
        'Competitive edge in B2B contracts',
        'Structured process improvement framework',
      ],
      documents: [
        'Company Registration Certificate',
        'Organization Chart & Process Flow',
        'Quality Manual & SOPs',
        'Internal Audit Records',
        'Management Review Meeting Minutes',
        'Employee Training Records',
      ],
      eligibility: [
        'Any registered business entity',
        'Defined organizational processes',
        'Management commitment to quality systems',
        'Willingness to implement ISO framework',
      ],
      processingTime: '4–12 weeks depending on ISO standard and readiness',
      faqs: [
        {
          q: 'Which ISO standard is right for my business?',
          a: 'ISO 9001 is most common for quality management. We assess your industry and recommend the appropriate standard.',
        },
        {
          q: 'Do you provide end-to-end certification support?',
          a: 'Yes, we assist with gap analysis, documentation, internal audits, and liaison with certification bodies.',
        },
        {
          q: 'Is ISO certification a one-time process?',
          a: 'Certification requires periodic surveillance audits to maintain validity, typically annually.',
        },
      ],
    },
  },
  {
    id: 'msme',
    title: 'MSME / Udyam Registration',
    shortDescription:
      'Register your enterprise under Udyam to unlock government schemes, subsidies, and priority sector benefits.',
    icon: Factory,
    color: '#60A5FA',
    details: {
      description:
        'Udyam Registration is the official MSME recognition by the Government of India. It enables access to collateral-free loans, subsidies, tax benefits, and preferential treatment in government procurement.',
      benefits: [
        'Access to MSME credit schemes',
        'Collateral-free loans under CGTMSE',
        'Subsidies on patent and trademark filing',
        'Protection against delayed payments',
        'Priority in government tenders',
      ],
      documents: [
        'Aadhaar Card of Proprietor / Partner / Director',
        'PAN Card of Business',
        'Business Address Proof',
        'Bank Account Details',
        'NIC Code for Business Activity',
        'Investment & Turnover Details',
      ],
      eligibility: [
        'Micro, Small, or Medium Enterprise as per investment/turnover limits',
        'Manufacturing or service enterprise',
        'Valid Aadhaar-linked application',
        'Single enterprise – one Udyam per entity',
      ],
      processingTime: '1–3 working days for online Udyam registration',
      faqs: [
        {
          q: 'Is Udyam registration free?',
          a: 'Yes, Udyam registration on the official government portal is free of cost.',
        },
        {
          q: 'Can I update my Udyam details later?',
          a: 'Yes, investment, turnover, and other details can be updated on the Udyam portal when required.',
        },
        {
          q: 'Is physical visit required?',
          a: 'No, Udyam registration is fully online with Aadhaar OTP verification.',
        },
      ],
    },
  },
];
