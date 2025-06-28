export interface Agent {
  id: string;
  name: string;
  description: string;
  type: 'Chat-type' | 'RAG-type' | 'Integration' | 'Prompt-type' | 'Data-type';
  department: string;
  metrics: {
    accuracy: number;
    responseTime: string;
    dailyTasks: number;
  };
  demos: Demo[];
}

export interface Demo {
  id: string;
  title: string;
  description: string;
  conversation: ConversationTurn[];
}

export interface ConversationTurn {
  role: 'user' | 'agent';
  message: string;
  timestamp: string;
  visualType?: 'chart' | 'bar' | 'pie' | 'graph' | 'map' | 'timeline' | 'heatmap' | 'table' | 'none';
  visualData?: any;
}

export const constructionAgents: Agent[] = [
  {
    id: 'sift',
    name: 'Sift',
    description: 'Email and call parsing agent that routes communications, filters spam, and automatically creates tasks in monday.com for the operations team.',
    type: 'Chat-type',
    department: 'Communications',
    metrics: {
      accuracy: 94.2,
      responseTime: '2.3 sec',
      dailyTasks: 156,
    },
    demos: [
      {
        id: 'sift-demo-1',
        title: 'Email Classification & Routing',
        description: 'Automated email parsing and task creation workflow.',
        conversation: [
          {
            role: 'user',
            message: 'Process incoming email from contractor about demolition project at 615 Main Street.',
            timestamp: '9:15 AM',
          },
          {
            role: 'agent',
            message: 'Email Classification Complete:\n\n📧 **EMAIL ANALYSIS:**\n• Sender: HaulerCo <info@haulerco.com>\n• Subject: "Demo Permit Update - 615 Main Street"\n• Classification: PROJECT UPDATE (95% confidence)\n• Priority: HIGH (contains permit keywords)\n• Client Tier: Tier 1 (verified contractor)\n\n🎯 **ROUTING DECISION:**\n• Route to: Project Management Team\n• Task Created: "Review demo permit status for 615 Main"\n• Due Date: Today 5:00 PM\n• Assigned to: Bill Fay\n• Project Code: 615MAIN_DEMO_001\n\n📝 **KEY INFORMATION EXTRACTED:**\n• Project Address: 615 Main Street\n• Permit Status: Approved with conditions\n• Start Date: March 25, 2024\n• Special Requirements: Asbestos inspection required\n• Contact: Mike Johnson (Project Manager)\n\n✅ **ACTIONS TAKEN:**\n• Created monday.com task #TDR-2024-0315\n• Flagged for Bill Fay review\n• Added to project timeline\n• Set follow-up reminder for March 20th',
            timestamp: '9:17 AM',
            visualType: 'table',
          },
        ],
      },
    ],
  },
  {
    id: 'fang',
    name: 'Fang',
    description: 'Fraud detection and anomaly tracking agent that monitors client communications for red flags and manages client tier prioritization.',
    type: 'Chat-type',
    department: 'Risk & Compliance',
    metrics: {
      accuracy: 96.8,
      responseTime: '1.1 sec',
      dailyTasks: 89,
    },
    demos: [
      {
        id: 'fang-demo-1',
        title: 'Fraud Detection Analysis',
        description: 'Real-time fraud detection and client risk assessment.',
        conversation: [
          {
            role: 'user',
            message: 'Analyze communication from new potential client requesting urgent demolition services with cash payment.',
            timestamp: '2:30 PM',
          },
          {
            role: 'agent',
            message: '🚨 **FRAUD RISK ASSESSMENT: HIGH (8.7/10)**\n\n**CLIENT ANALYSIS:**\n• Company: "QuickDemo LLC"\n• First Contact: Today (new client)\n• Payment Method: Cash only (RED FLAG)\n• Urgency Level: "Emergency" without clear reason\n• Documentation: No permits mentioned\n\n**RISK INDICATORS DETECTED:**\n\n⚠️ **HIGH RISK FACTORS:**\n• Cash-only payment request (Weight: 3.2)\n• Pressure for immediate start (Weight: 2.8)\n• Vague project details (Weight: 2.1)\n• No previous work history (Weight: 2.3)\n• Unusual contact patterns (multiple numbers)\n\n🔍 **VERIFICATION CHECKS:**\n• Business License: NOT FOUND in TN database\n• Phone Numbers: 3 different numbers used\n• Email Domain: Generic Gmail account\n• Address: Virtual office location\n• References: None provided\n\n**CLIENT TIER ASSESSMENT:**\n• Current Tier: UNVERIFIED (Tier 4)\n• Recommended Actions:\n  - Require business license verification\n  - Request project permits\n  - Verify property ownership\n  - Mandate 50% deposit via business check\n  - Schedule in-person site meeting\n\n🎯 **RECOMMENDATIONS:**\n1. **HOLD** - Do not proceed without verification\n2. Flag for Bill Fay immediate review\n3. Request standard documentation package\n4. Consider requiring bonding/insurance proof\n5. Document all interactions for audit trail\n\n**ESCALATION TRIGGERED:** Case #FR-2024-0315-001 created for management review.',
            timestamp: '2:32 PM',
            visualType: 'heatmap',
          },
        ],
      },
    ],
  },
  {
    id: 'triage',
    name: 'Triage',
    description: 'RAG-type agent providing secondary classification, issue prediction, and pattern recognition across all company communications and documents.',
    type: 'RAG-type',
    department: 'Operations Intelligence',
    metrics: {
      accuracy: 92.4,
      responseTime: '3.8 sec',
      dailyTasks: 203,
    },
    demos: [
      {
        id: 'triage-demo-1',
        title: 'Pattern Recognition & Issue Prediction',
        description: 'Advanced classification and predictive analysis workflow.',
        conversation: [
          {
            role: 'user',
            message: 'Analyze recent communications pattern showing repeated delays on demolition projects.',
            timestamp: '11:45 AM',
          },
          {
            role: 'agent',
            message: '📊 **PATTERN ANALYSIS COMPLETE:**\n\n**ISSUE CLASSIFICATION:**\n• Pattern Type: RECURRING DELAYS (87% confidence)\n• Frequency: 5 projects in last 2 weeks\n• Common Thread: Weather-related postponements\n• Risk Level: MODERATE\n\n**HISTORICAL CONTEXT (RAG Analysis):**\n• Similar pattern occurred March 2023\n• Resolution time averaged 8.3 days\n• Cost impact: $23K in extended overhead\n• Client satisfaction impact: -12% NPS\n\n**PREDICTIVE INSIGHTS:**\n\n🌦️ **WEATHER CORRELATION:**\n• Spring weather patterns match 2023 data\n• 78% probability of continued delays through April\n• Recommended buffer: +3 days per project\n• Alternative: Indoor prep work scheduling\n\n📈 **BUSINESS IMPACT PREDICTION:**\n• Revenue at risk: $186K (next 30 days)\n• Cash flow impact: 15-day delay average\n• Resource utilization: 67% efficiency\n• Client communication volume: +340% calls\n\n**RECOMMENDED ACTIONS:**\n1. **Proactive Communication**: Pre-notify all active clients\n2. **Resource Reallocation**: Focus on indoor/covered work\n3. **Schedule Optimization**: Build weather buffers\n4. **Alternative Revenue**: Offer planning/consulting\n5. **Client Retention**: Implement delay compensation\n\n**KNOWLEDGE BASE UPDATED:**\n• Added seasonal delay patterns\n• Updated risk assessment models\n• Enhanced weather correlation data\n• Improved prediction algorithms',
            timestamp: '11:47 AM',
            visualType: 'chart',
            visualData: {
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
              datasets: [
                {
                  label: 'Project Delays',
                  data: [2, 5, 3, 7],
                  borderColor: 'rgb(239, 68, 68)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  fill: true,
                },
                {
                  label: 'Weather Score',
                  data: [30, 75, 45, 85],
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  fill: true,
                }
              ]
            }
          },
        ],
      },
    ],
  },
  {
    id: 'bidsentry',
    name: 'BidSentry',
    description: 'Integration agent that detects bid opportunities, handles document renaming and uploading, and provides weather flagging for project planning.',
    type: 'Integration',
    department: 'Business Development',
    metrics: {
      accuracy: 89.7,
      responseTime: '5.2 sec',
      dailyTasks: 67,
    },
    demos: [
      {
        id: 'bidsentry-demo-1',
        title: 'Bid Detection & Processing',
        description: 'Automated bid opportunity detection and document management.',
        conversation: [
          {
            role: 'user',
            message: 'Process new bid invitation received through BuildingConnected for downtown office complex demolition.',
            timestamp: '3:20 PM',
          },
          {
            role: 'agent',
            message: '🎯 **BID OPPORTUNITY DETECTED:**\n\n**PROJECT DETAILS:**\n• Project Name: Downtown Office Complex Demo\n• Location: 450 Commerce Street, Nashville, TN\n• GC: Turner Construction\n• Bid Due: April 2, 2024 at 2:00 PM\n• Project Value: $2.8M (estimated)\n• Building Type: 12-story office (1987)\n\n**DOCUMENT PROCESSING:**\n\n📄 **Files Renamed & Organized:**\n• Original: "RFP_Downtown_Office.pdf"\n• New: "20240315_1520_Turner_BidInvite_450Commerce_001.pdf"\n• Location: OneDrive/01-PreCon/1.2-Proposals/\n• Backup: Procore Project #450COM_DEMO\n\n📋 **BID PACKAGE ANALYSIS:**\n• Drawings: 47 sheets (architectural, structural)\n• Specifications: 156 pages\n• Special Requirements: Asbestos survey, lead paint\n• Insurance: $5M general liability required\n• Bonding: 100% performance bond\n• Prevailing Wage: Yes (city project)\n\n🌦️ **WEATHER ANALYSIS:**\n• Project Timeline: June-August 2024\n• Weather Risk: MODERATE (summer storms)\n• Recommended Buffer: 8 days for weather delays\n• Alternative: Night/weekend work options\n\n**QUALIFICATION CHECK:**\n✅ Project Size: Within capability ($2.8M)\n✅ Location: Primary service area\n✅ Insurance: Current limits sufficient\n✅ Bonding: Available capacity\n⚠️ Scheduling: Overlaps with Main Street project\n\n**ACTIONS TAKEN:**\n• Created monday.com task: "Bid Review - 450 Commerce"\n• Assigned to: Bill Fay & estimating team\n• Site visit scheduled: March 18, 2024\n• Subcontractor outreach initiated\n• Calendar blocked for bid preparation',
            timestamp: '3:22 PM',
            visualType: 'timeline',
          },
        ],
      },
    ],
  },
  {
    id: 'demoscope',
    name: 'DemoScope',
    description: 'Prompt-type agent that creates post-award launch packages, identifies scope gaps, and generates GC summary reports for project kickoff.',
    type: 'Prompt-type',
    department: 'Project Management',
    metrics: {
      accuracy: 91.3,
      responseTime: '4.7 sec',
      dailyTasks: 34,
    },
    demos: [
      {
        id: 'demoscope-demo-1',
        title: 'Project Launch Package Generation',
        description: 'Automated post-award project setup and scope analysis.',
        conversation: [
          {
            role: 'user',
            message: 'Generate launch package for awarded demolition contract at 615 Main Street.',
            timestamp: '1:15 PM',
          },
          {
            role: 'agent',
            message: '📦 **PROJECT LAUNCH PACKAGE GENERATED:**\n\n**PROJECT OVERVIEW:**\n• Project: 615 Main Street Demolition\n• Award Value: $485,000\n• GC: Henderson Construction\n• Start Date: April 1, 2024\n• Completion: May 15, 2024 (45 days)\n\n**SCOPE ANALYSIS:**\n\n✅ **INCLUDED SCOPE:**\n• Complete building demolition (3-story)\n• Basement excavation and backfill\n• Utility disconnections\n• Site cleanup and grading\n• Debris removal and disposal\n• Environmental monitoring\n\n⚠️ **SCOPE GAPS IDENTIFIED:**\n• Asbestos abatement (separate contractor)\n• Street closure permits (GC responsibility)\n• Temporary fencing (not clearly defined)\n• Weekend work provisions (labor rate gaps)\n• Dust control measures (equipment rental unclear)\n\n**GC COORDINATION SUMMARY:**\n\n🏗️ **Henderson Construction Profile:**\n• Relationship: 8 previous projects\n• Payment History: Net 30, consistent\n• Communication Style: Weekly progress calls\n• Special Requirements: Daily photo documentation\n• Key Contacts:\n  - PM: Sarah Johnson (sarah@henderson.com)\n  - Super: Mike Rodriguez (mike@henderson.com)\n\n**LAUNCH DELIVERABLES:**\n\n📋 **Documentation Package:**\n• Signed subcontract (executed)\n• Insurance certificates (submitted)\n• Safety plan (approved)\n• Equipment list (finalized)\n• Material disposal plan (approved)\n• Emergency contact list (distributed)\n\n⚡ **IMMEDIATE ACTIONS:**\n• Schedule pre-demo meeting: March 25, 2024\n• Order equipment delivery: March 28, 2024\n• Coordinate utility shutoffs: March 30, 2024\n• Site setup begins: April 1, 2024\n• First progress meeting: April 3, 2024\n\n**RISK MITIGATION:**\n• Weather contingency: 5-day buffer included\n• Equipment backup: Secondary vendor on standby\n• Permit tracking: Daily status monitoring\n• Quality control: Third-party inspection scheduled',
            timestamp: '1:17 PM',
            visualType: 'bar',
            visualData: {
              labels: ['Documentation', 'Permits', 'Equipment', 'Safety', 'Coordination'],
              datasets: [
                {
                  label: 'Completion %',
                  data: [100, 85, 90, 100, 75],
                  backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                  ],
                }
              ]
            }
          },
        ],
      },
    ],
  },
  {
    id: 'shear',
    name: 'Shear',
    description: 'Data-type agent handling redactions, compliance scans for GDPR/CCPA/TN regulations, and sensitive information protection across all documents.',
    type: 'Data-type',
    department: 'Compliance & Data',
    metrics: {
      accuracy: 98.1,
      responseTime: '1.8 sec',
      dailyTasks: 127,
    },
    demos: [
      {
        id: 'shear-demo-1',
        title: 'Document Compliance & Redaction',
        description: 'Automated compliance scanning and sensitive data protection.',
        conversation: [
          {
            role: 'user',
            message: 'Scan and redact sensitive information from project documents before client sharing.',
            timestamp: '4:45 PM',
          },
          {
            role: 'agent',
            message: '🔒 **COMPLIANCE SCAN COMPLETE:**\n\n**DOCUMENT ANALYSIS:**\n• Files Processed: 23 documents\n• Total Pages: 187\n• Scan Duration: 12.3 seconds\n• Confidence Level: 98.1%\n\n**SENSITIVE DATA DETECTED:**\n\n🆔 **PERSONAL INFORMATION:**\n• SSNs Found: 3 (REDACTED)\n• Driver License Numbers: 2 (REDACTED)\n• Phone Numbers: 12 (PERSONAL - REDACTED)\n• Email Addresses: 8 (PERSONAL - REDACTED)\n• Home Addresses: 5 (REDACTED)\n\n💰 **FINANCIAL INFORMATION:**\n• Bank Account Numbers: 1 (REDACTED)\n• Credit Card Numbers: 0\n• Tax ID Numbers: 4 (BUSINESS - RETAINED)\n• Salary Information: 6 instances (REDACTED)\n\n🏢 **BUSINESS SENSITIVE:**\n• Internal Cost Data: 14 instances (REDACTED)\n• Proprietary Methods: 3 instances (REDACTED)\n• Vendor Pricing: 8 instances (REDACTED)\n• Employee Records: 12 instances (REDACTED)\n\n**COMPLIANCE VALIDATION:**\n\n✅ **GDPR COMPLIANCE:**\n• Right to Privacy: Ensured\n• Data Minimization: Applied\n• Purpose Limitation: Verified\n• Consent Basis: Client-shared docs only\n\n✅ **CCPA COMPLIANCE:**\n• Personal Info Protection: Complete\n• Business Purpose: Construction only\n• Third-Party Sharing: Restricted\n• Retention Limits: 7-year standard\n\n✅ **TENNESSEE STATE:**\n• Construction Records: TN Code 62-6-114\n• Privacy Protection: TN Code 10-7-504\n• Public Records: Properly classified\n\n**OUTPUT DOCUMENTS:**\n• Original Files: Archived securely\n• Redacted Versions: Ready for sharing\n• Audit Log: Compliance record created\n• Client Package: Safe for distribution\n\n🛡️ **SECURITY MEASURES:**\n• Encryption: AES-256 applied\n• Access Control: Role-based permissions\n• Backup: Secure cloud storage\n• Audit Trail: Complete activity log',
            timestamp: '4:47 PM',
            visualType: 'pie',
            visualData: {
              labels: ['Personal Info', 'Financial Data', 'Business Sensitive', 'Public Records'],
              datasets: [
                {
                  data: [35, 20, 30, 15],
                  backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                  ],
                }
              ]
            }
          },
        ],
      },
    ],
  },
  {
    id: 'fieldhustle',
    name: 'Field Hustle',
    description: 'Integration agent that ingests field data, tags photos with metadata, and validates GPS coordinates for site documentation.',
    type: 'Integration',
    department: 'Field Operations',
    metrics: {
      accuracy: 94.6,
      responseTime: '2.1 sec',
      dailyTasks: 89,
    },
    demos: [
      {
        id: 'fieldhustle-demo-1',
        title: 'Field Data Processing & GPS Validation',
        description: 'Automated field data ingestion and photo geotagging workflow.',
        conversation: [
          {
            role: 'user',
            message: 'Process field photos and data from today\'s demolition progress at 615 Main Street.',
            timestamp: '6:30 PM',
          },
          {
            role: 'agent',
            message: '📸 **FIELD DATA PROCESSING COMPLETE:**\n\n**DATA INGESTION SUMMARY:**\n• Photos Processed: 47 images\n• GPS Coordinates: Validated\n• Upload Time: 6:15 PM - 6:30 PM\n• Data Source: DemoField Mobile App\n• Upload Quality: 4K resolution verified\n\n**GPS VALIDATION:**\n\n📍 **LOCATION VERIFICATION:**\n• Project Site: 615 Main Street, Nashville\n• GPS Coordinates: 36.1627° N, 86.7816° W\n• Accuracy: ±3 meters (VERIFIED)\n• All photos: ON-SITE confirmed\n• Geo-fence Status: Within approved boundaries\n\n**PHOTO ANALYSIS & TAGGING:**\n\n🏗️ **PROGRESS DOCUMENTATION:**\n• **Morning (8:00 AM)**: Site setup complete\n  - Equipment positioned\n  - Safety barriers installed\n  - Utility shutoffs verified\n\n• **Midday (12:30 PM)**: Demolition progress\n  - 2nd floor removal: 60% complete\n  - Debris chute operational\n  - Dust control active\n\n• **Evening (5:45 PM)**: Daily wrap-up\n  - Equipment secured\n  - Site cleaned\n  - Safety inspection complete\n\n**AUTOMATED METADATA TAGGING:**\n• Project Code: 615MAIN_DEMO_001\n• Date: March 15, 2024\n• Weather: Partly cloudy, 65°F\n• Crew: Team Alpha (5 members)\n• Equipment: CAT 320, Volvo L60H\n• Safety Score: 100% (no incidents)\n\n**FILE ORGANIZATION:**\n\n📂 **STRUCTURED UPLOAD:**\n• Folder: 3.0-Field Data/615Main/20240315/\n• Naming: 20240315_HHMM_615Main_[Type]_[Seq].jpg\n• Backup: Procore sync complete\n• Archive: OneDrive automated\n\n**QUALITY CONTROL:**\n\n✅ **VALIDATION CHECKS:**\n• Image Quality: All photos 4K+ resolution\n• GPS Accuracy: All within ±5 meter tolerance\n• Timestamp: Verified against work schedule\n• Personnel: All crew members visible/accounted\n• Equipment: Proper usage documented\n\n**INTEGRATION STATUS:**\n• DemoField: Synced\n• Tenna GPS: Equipment locations verified\n• ClockShark: Time tracking aligned\n• FuelCloud: Equipment usage logged\n• Procore: Photos uploaded automatically\n\n**COMPLIANCE NOTES:**\n• All safety protocols visible in photos\n• Environmental controls documented\n• Progress aligns with schedule\n• Quality standards maintained\n• Ready for client/GC review',
            timestamp: '6:32 PM',
            visualType: 'map',
          },
        ],
      },
    ],
  },
  {
    id: 'prod',
    name: 'Prod',
    description: 'Chat-type agent handling bid follow-up communications, response logging, and generating summary reports for business development.',
    type: 'Chat-type',
    department: 'Business Development',
    metrics: {
      accuracy: 88.9,
      responseTime: '3.4 sec',
      dailyTasks: 78,
    },
    demos: [
      {
        id: 'prod-demo-1',
        title: 'Bid Follow-up & Response Tracking',
        description: 'Automated bid communication and win/loss analysis.',
        conversation: [
          {
            role: 'user',
            message: 'Generate follow-up communication for submitted bid on Commerce Street project and analyze response patterns.',
            timestamp: '10:30 AM',
          },
          {
            role: 'agent',
            message: '📧 **BID FOLLOW-UP COMMUNICATION:**\n\n**PROJECT STATUS:**\n• Project: 450 Commerce Street Demolition\n• Bid Submitted: March 20, 2024\n• Follow-up Due: March 27, 2024 (today)\n• GC: Turner Construction\n• Bid Amount: $2.8M\n\n**GENERATED FOLLOW-UP EMAIL:**\n\n---\n**Subject:** Follow-up: 450 Commerce Demo Proposal - Tiny\'s Demolition\n\n**Hi Sarah,**\n\n**I wanted to follow up on our demolition proposal for the 450 Commerce Street project submitted last week. Our team is excited about the opportunity to work with Turner Construction again.**\n\n**Key highlights of our proposal:**\n• Competitive pricing with transparent breakdown\n• 45-day completion timeline\n• Proven track record on similar downtown projects\n• Full environmental compliance and safety protocols\n\n**I\'m available to discuss any questions about our approach or pricing. We\'re flexible on scheduling to meet your project timeline.**\n\n**Best regards,**\n**Bill Fay, President**\n**Tiny\'s Demolition & Recycling**\n---\n\n**RESPONSE PATTERN ANALYSIS:**\n\n📊 **TURNER CONSTRUCTION HISTORY:**\n• Total Bids: 12 (last 24 months)\n• Win Rate: 67% (8 projects awarded)\n• Average Response Time: 8.3 days\n• Typical Decision Timeline: 2-3 weeks\n• Communication Preference: Email + phone\n\n**HISTORICAL PERFORMANCE:**\n• Last Project: Main Street Office (Won)\n• Relationship Quality: STRONG\n• Payment History: NET 30, always on time\n• Preferred Contractor Status: YES\n\n**MARKET INTELLIGENCE:**\n\n🏗️ **COMPETITOR ANALYSIS:**\n• Likely Competitors: Metro Demo, Southern Wrecking\n• Our Advantage: Downtown experience, relationship\n• Risk Factors: Pricing pressure, schedule constraints\n• Win Probability: 72% (based on historical data)\n\n**RESPONSE TRACKING:**\n\n📅 **TIMELINE MONITORING:**\n• Email Sent: March 27, 2024 at 10:45 AM\n• Expected Response: March 29-31, 2024\n• Decision Timeline: April 5, 2024 (estimated)\n• Next Follow-up: April 2, 2024 (if no response)\n\n**AUTOMATION SETUP:**\n• Response tracking: Enabled\n• Sentiment analysis: Active\n• Calendar reminders: Set\n• Win/loss logging: Ready\n\n**BUSINESS DEVELOPMENT INSIGHTS:**\n• Pipeline Value: $8.7M (active bids)\n• Close Rate (Q1): 64% (above target)\n• Response Quality: Improving (+12% engagement)\n• Relationship Score: 8.3/10 (Turner Construction)\n\n**RECOMMENDED ACTIONS:**\n1. Schedule courtesy call for March 30\n2. Prepare alternative pricing if needed\n3. Have subcontractor quotes ready\n4. Monitor competitor activity\n5. Prepare award acceptance workflow',
            timestamp: '10:32 AM',
            visualType: 'chart',
            visualData: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'Bids Submitted',
                  data: [8, 12, 15, 10, 9, 11],
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  fill: true,
                },
                {
                  label: 'Projects Won',
                  data: [5, 8, 9, 7, 6, 8],
                  borderColor: 'rgb(16, 185, 129)',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  fill: true,
                }
              ]
            }
          },
        ],
      },
    ],
  },
];