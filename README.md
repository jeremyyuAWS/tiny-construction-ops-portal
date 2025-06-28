🛠 PRD: Tiny’s AI-Powered Operating System – “Riddler”
📌 Phase I Objective

Deploy an AI-powered, multi-agent platform (“Riddler”) for Tiny’s Demolition & Recycling. The system will automate inbound communications, classify and route documents, monitor for fraud and compliance, and provide real-time decision support for preconstruction workflows — all through a centralized Streamlit dashboard.

🧱 App Structure (4 Tabs)

1. Agent Gallery

Purpose: Showcase and document each operational agent
Includes:

* Interactive cards for each Phase I agent (Sift, Fang, Triage, BidSentry, etc.)
* Description of logic, triggers, confidence thresholds, outputs
* Sample inputs/outputs for each agent
* Live chat interaction or logs for agents like Sift, Fang, Prod


2. Riddler OS (Core Ops Dashboard)

Purpose: Daily operating interface for Tiny’s team
Built in Streamlit with mobile optimization via Jamf
Sections:

* Inbound Activity Feed: Email + call parsing by Sift + Triage
* Bid Tracker: Visual status of detected bids from BidSentry
* Alerts & Flags: From Fang, Shear, and DemoScope
* Tasks + Routing: Synced with monday.com (incl. confidence scores)
* Audit Trail: Escalation logs, redactions, compliance events


3. Field Ops & Compliance

Purpose: Track and validate site-level activity
Features:

* Syncs with DemoField, Field Hustle, and Tenna GPS
* Displays folder structure and file logs (e.g., haul tickets, site photos)
* Compliance overlays from Shear and Jamf lockdown validation
* Alerts on unverified data (e.g., photo not geotagged on site)


4. Insights & Retraining

Purpose: Data-driven oversight + monthly model improvement
Includes:

* Win/loss tracking powered by Prod and Triage
* Agent performance (volume, accuracy, false positives)
* Summary reports: unread-deleted emails, unresolved flags
* Retraining logs for RAG-type and classifier agents


🤖 Agent Overview (Phase I)

Agent
	Type
	Key Capabilities

Sift
	Chat-type
	Email/call parsing, routing, spam filtering, task creation

Fang
	Chat-type
	Fraud detection, anomaly tracking, client-tier prioritization

Triage
	RAG-type
	Secondary classification, issue prediction, pattern recognition

BidSentry
	Integration
	Bid detection, document renaming/uploading, weather flagging

DemoScope
	Prompt-type
	Post-award launch packages, scope gap, GC summary

Shear
	Data-type
	Redactions, compliance scans (GDPR/CCPA/TN)

Field Hustle
	Integration
	Ingest field data, tag photos, GPS validation

Prod
	Chat-type
	Bid follow-up, response logging, summary reports



🔌 Integrations (Phase I)

* Emails: Outlook (monitored by Sift)
* Calls: OpenPhone + AssemblyAI (call routing, transcripts)
* Storage: OneDrive + Procore (structured uploads)
* Tasks: monday.com (auto-created via agents)
* Field Data: DemoField, Tenna, ClockShark, FuelCloud
* Compliance: Jamf, Azure IP
* LLMs & Frameworks: LlamaIndex (context), LYZR agent orchestration
* UI Layer: Streamlit for real-time, branded dashboard
* Bid Sources: BuildingConnected, ShareFile, Dropbox, etc.


📂 File & Folder Conventions

* Naming: [YYYYMMDD_HHMM]_[Contractor]_[Topic]_[Project]_ID.pdf
* Example: 20250612_1010_HaulerCo_TicketReview_615Main_003.pdf
* Call Logs: 1.4-Calls/
* Field Data: 3.0-Field Data/
* Bid Proposals: 01-PreCon/1.2-Proposals/


✅ Success Criteria

* 

85% bid invites auto-routed with correct metadata

* <2% unread-deleted emails without action taken
* All flagged fraud >$100K reviewed within 24h
* 

90% field uploads geo-validated

* At least one agent retrained with live usage data

