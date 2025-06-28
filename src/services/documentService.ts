export interface Document {
  id: string;
  originalName: string;
  generatedName: string;
  type: 'bid_proposal' | 'call_log' | 'field_data' | 'contract' | 'permit' | 'invoice' | 'photo' | 'other';
  category: string;
  project?: string;
  contractor?: string;
  size: number;
  uploadDate: Date;
  uploadedBy: string;
  path: string;
  tags: string[];
  version: number;
  isLatest: boolean;
  parentId?: string;
  metadata: {
    gpsCoordinates?: { lat: number; lng: number };
    confidence?: number;
    extractedData?: Record<string, any>;
    processingAgent?: string;
  };
}

export interface FolderStructure {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children?: FolderStructure[];
  documentCount?: number;
  totalSize?: number;
}

class DocumentService {
  private documents: Document[] = [];
  private listeners: ((documents: Document[]) => void)[] = [];

  constructor() {
    this.initializeMockDocuments();
  }

  private initializeMockDocuments() {
    const mockDocs: Document[] = [
      {
        id: '1',
        originalName: 'Turner_Bid_Response.pdf',
        generatedName: '20240315_1430_Turner_BidResponse_450Commerce_001.pdf',
        type: 'bid_proposal',
        category: '01-PreCon/1.2-Proposals',
        project: '450 Commerce',
        contractor: 'Turner Construction',
        size: 2457600, // 2.4MB
        uploadDate: new Date('2024-03-15T14:30:00'),
        uploadedBy: 'BidSentry',
        path: '01-PreCon/1.2-Proposals/20240315_1430_Turner_BidResponse_450Commerce_001.pdf',
        tags: ['bid', 'response', 'commercial'],
        version: 1,
        isLatest: true,
        metadata: {
          confidence: 95,
          extractedData: {
            bidAmount: '$2.8M',
            dueDate: '2024-04-02',
            projectType: 'demolition'
          },
          processingAgent: 'BidSentry'
        }
      },
      {
        id: '2',
        originalName: 'Site_Photos_615Main.zip',
        generatedName: '20240315_0830_615Main_SitePhotos_DailyProgress_042.zip',
        type: 'photo',
        category: '3.0-Field Data',
        project: '615 Main',
        size: 12845760, // 12.8MB
        uploadDate: new Date('2024-03-15T08:30:00'),
        uploadedBy: 'Field Hustle',
        path: '3.0-Field Data/615Main/20240315_0830_615Main_SitePhotos_DailyProgress_042.zip',
        tags: ['photos', 'progress', 'demolition'],
        version: 1,
        isLatest: true,
        metadata: {
          gpsCoordinates: { lat: 36.1627, lng: -86.7816 },
          confidence: 100,
          extractedData: {
            photoCount: 47,
            gpsVerified: true,
            timestamp: '2024-03-15T08:30:00'
          },
          processingAgent: 'Field Hustle'
        }
      },
      {
        id: '3',
        originalName: 'Metro_Permits_Call.mp3',
        generatedName: '20240314_1515_MetroPermits_PermitDiscussion_615Main_018.mp3',
        type: 'call_log',
        category: '1.4-Calls',
        project: '615 Main',
        contractor: 'Metro Permits Office',
        size: 4567890, // 4.5MB
        uploadDate: new Date('2024-03-14T15:15:00'),
        uploadedBy: 'Sift',
        path: '1.4-Calls/20240314_1515_MetroPermits_PermitDiscussion_615Main_018.mp3',
        tags: ['call', 'permits', 'regulatory'],
        version: 1,
        isLatest: true,
        metadata: {
          confidence: 87,
          extractedData: {
            duration: '12:30',
            transcript: 'Available',
            keyPoints: ['Permit approved', 'Asbestos inspection required']
          },
          processingAgent: 'Sift'
        }
      },
      {
        id: '4',
        originalName: 'safety_inspection.pdf',
        generatedName: '20240315_0800_615Main_SafetyInspection_DailyCheck_089.pdf',
        type: 'field_data',
        category: '3.0-Field Data',
        project: '615 Main',
        size: 856432, // 856KB
        uploadDate: new Date('2024-03-15T08:00:00'),
        uploadedBy: 'DemoScope',
        path: '3.0-Field Data/615Main/20240315_0800_615Main_SafetyInspection_DailyCheck_089.pdf',
        tags: ['safety', 'inspection', 'compliance'],
        version: 2,
        isLatest: true,
        parentId: '4_v1',
        metadata: {
          confidence: 98,
          extractedData: {
            inspectionResult: 'Passed',
            issues: 0,
            inspector: 'Safety Officer'
          },
          processingAgent: 'Shear'
        }
      }
    ];

    this.documents = mockDocs;
  }

  public generateFileName(
    originalName: string,
    contractor?: string,
    topic?: string,
    project?: string,
    timestamp?: Date
  ): string {
    const now = timestamp || new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = now.toTimeString().slice(0, 5).replace(/:/g, '');
    
    // Clean up names for file system compatibility
    const clean = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '');
    
    const contractorPart = contractor ? clean(contractor) : 'Unknown';
    const topicPart = topic ? clean(topic) : 'Document';
    const projectPart = project ? clean(project) : 'General';
    
    // Get next sequence number for this project/contractor combo
    const existingDocs = this.documents.filter(doc => 
      doc.contractor === contractor && doc.project === project
    );
    const sequenceNum = (existingDocs.length + 1).toString().padStart(3, '0');
    
    const extension = originalName.split('.').pop() || 'pdf';
    
    return `${dateStr}_${timeStr}_${contractorPart}_${topicPart}_${projectPart}_${sequenceNum}.${extension}`;
  }

  public getFolderStructure(): FolderStructure {
    const structure: FolderStructure = {
      name: 'Tiny\'s Documents',
      path: '/',
      type: 'folder',
      children: [
        {
          name: '01-PreCon',
          path: '01-PreCon',
          type: 'folder',
          children: [
            {
              name: '1.1-Leads',
              path: '01-PreCon/1.1-Leads',
              type: 'folder',
              documentCount: this.getDocumentCount('01-PreCon/1.1-Leads'),
              totalSize: this.getTotalSize('01-PreCon/1.1-Leads')
            },
            {
              name: '1.2-Proposals',
              path: '01-PreCon/1.2-Proposals',
              type: 'folder',
              documentCount: this.getDocumentCount('01-PreCon/1.2-Proposals'),
              totalSize: this.getTotalSize('01-PreCon/1.2-Proposals')
            },
            {
              name: '1.3-Contracts',
              path: '01-PreCon/1.3-Contracts',
              type: 'folder',
              documentCount: this.getDocumentCount('01-PreCon/1.3-Contracts'),
              totalSize: this.getTotalSize('01-PreCon/1.3-Contracts')
            }
          ]
        },
        {
          name: '1.4-Calls',
          path: '1.4-Calls',
          type: 'folder',
          documentCount: this.getDocumentCount('1.4-Calls'),
          totalSize: this.getTotalSize('1.4-Calls')
        },
        {
          name: '2.0-Projects',
          path: '2.0-Projects',
          type: 'folder',
          children: [
            {
              name: '615Main',
              path: '2.0-Projects/615Main',
              type: 'folder',
              documentCount: this.getDocumentCount('2.0-Projects/615Main'),
              totalSize: this.getTotalSize('2.0-Projects/615Main')
            },
            {
              name: '450Commerce',
              path: '2.0-Projects/450Commerce',
              type: 'folder',
              documentCount: this.getDocumentCount('2.0-Projects/450Commerce'),
              totalSize: this.getTotalSize('2.0-Projects/450Commerce')
            }
          ]
        },
        {
          name: '3.0-Field Data',
          path: '3.0-Field Data',
          type: 'folder',
          children: [
            {
              name: '615Main',
              path: '3.0-Field Data/615Main',
              type: 'folder',
              documentCount: this.getDocumentCount('3.0-Field Data/615Main'),
              totalSize: this.getTotalSize('3.0-Field Data/615Main')
            },
            {
              name: 'Equipment',
              path: '3.0-Field Data/Equipment',
              type: 'folder',
              documentCount: this.getDocumentCount('3.0-Field Data/Equipment'),
              totalSize: this.getTotalSize('3.0-Field Data/Equipment')
            }
          ]
        },
        {
          name: '4.0-Compliance',
          path: '4.0-Compliance',
          type: 'folder',
          children: [
            {
              name: 'Safety',
              path: '4.0-Compliance/Safety',
              type: 'folder',
              documentCount: this.getDocumentCount('4.0-Compliance/Safety'),
              totalSize: this.getTotalSize('4.0-Compliance/Safety')
            },
            {
              name: 'Environmental',
              path: '4.0-Compliance/Environmental',
              type: 'folder',
              documentCount: this.getDocumentCount('4.0-Compliance/Environmental'),
              totalSize: this.getTotalSize('4.0-Compliance/Environmental')
            }
          ]
        }
      ]
    };

    return structure;
  }

  private getDocumentCount(path: string): number {
    return this.documents.filter(doc => doc.path.startsWith(path)).length;
  }

  private getTotalSize(path: string): number {
    return this.documents
      .filter(doc => doc.path.startsWith(path))
      .reduce((total, doc) => total + doc.size, 0);
  }

  public uploadDocument(file: File, metadata: Partial<Document>): Promise<Document> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const generatedName = this.generateFileName(
          file.name,
          metadata.contractor,
          metadata.category,
          metadata.project
        );

        const document: Document = {
          id: Date.now().toString(),
          originalName: file.name,
          generatedName,
          type: this.inferDocumentType(file.name),
          category: metadata.category || 'other',
          project: metadata.project,
          contractor: metadata.contractor,
          size: file.size,
          uploadDate: new Date(),
          uploadedBy: metadata.uploadedBy || 'Manual Upload',
          path: `${metadata.category}/${generatedName}`,
          tags: metadata.tags || [],
          version: 1,
          isLatest: true,
          metadata: {
            confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
            processingAgent: this.inferProcessingAgent(file.name),
            ...metadata.metadata
          }
        };

        this.documents.unshift(document);
        this.notifyListeners();
        resolve(document);
      }, 1500); // Simulate upload time
    });
  }

  private inferDocumentType(filename: string): Document['type'] {
    const name = filename.toLowerCase();
    if (name.includes('bid') || name.includes('proposal')) return 'bid_proposal';
    if (name.includes('call') || name.includes('audio')) return 'call_log';
    if (name.includes('photo') || name.includes('image') || name.endsWith('.jpg') || name.endsWith('.png')) return 'photo';
    if (name.includes('field') || name.includes('site')) return 'field_data';
    if (name.includes('contract')) return 'contract';
    if (name.includes('permit')) return 'permit';
    if (name.includes('invoice')) return 'invoice';
    return 'other';
  }

  private inferProcessingAgent(filename: string): string {
    const name = filename.toLowerCase();
    if (name.includes('bid')) return 'BidSentry';
    if (name.includes('call') || name.includes('email')) return 'Sift';
    if (name.includes('photo') || name.includes('field')) return 'Field Hustle';
    if (name.includes('safety') || name.includes('compliance')) return 'Shear';
    return 'DemoScope';
  }

  public getDocuments(filters?: {
    project?: string;
    contractor?: string;
    type?: string;
    dateRange?: { start: Date; end: Date };
  }): Document[] {
    let filtered = [...this.documents];

    if (filters) {
      if (filters.project) {
        filtered = filtered.filter(doc => doc.project?.includes(filters.project!));
      }
      if (filters.contractor) {
        filtered = filtered.filter(doc => doc.contractor?.includes(filters.contractor!));
      }
      if (filters.type) {
        filtered = filtered.filter(doc => doc.type === filters.type);
      }
      if (filters.dateRange) {
        filtered = filtered.filter(doc => 
          doc.uploadDate >= filters.dateRange!.start && 
          doc.uploadDate <= filters.dateRange!.end
        );
      }
    }

    return filtered.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime());
  }

  public searchDocuments(query: string): Document[] {
    const searchTerm = query.toLowerCase();
    return this.documents.filter(doc =>
      doc.originalName.toLowerCase().includes(searchTerm) ||
      doc.generatedName.toLowerCase().includes(searchTerm) ||
      doc.contractor?.toLowerCase().includes(searchTerm) ||
      doc.project?.toLowerCase().includes(searchTerm) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  public createNewVersion(documentId: string, file: File): Promise<Document> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const originalDoc = this.documents.find(doc => doc.id === documentId);
        if (!originalDoc) throw new Error('Document not found');

        // Mark old version as not latest
        originalDoc.isLatest = false;

        const newVersion: Document = {
          ...originalDoc,
          id: Date.now().toString(),
          originalName: file.name,
          size: file.size,
          uploadDate: new Date(),
          version: originalDoc.version + 1,
          isLatest: true,
          parentId: originalDoc.parentId || originalDoc.id,
          metadata: {
            ...originalDoc.metadata,
            confidence: Math.floor(Math.random() * 20) + 80
          }
        };

        this.documents.unshift(newVersion);
        this.notifyListeners();
        resolve(newVersion);
      }, 1000);
    });
  }

  public getDocumentVersions(documentId: string): Document[] {
    const doc = this.documents.find(d => d.id === documentId);
    if (!doc) return [];

    const rootId = doc.parentId || doc.id;
    return this.documents
      .filter(d => d.id === rootId || d.parentId === rootId)
      .sort((a, b) => b.version - a.version);
  }

  public subscribe(callback: (documents: Document[]) => void): () => void {
    this.listeners.push(callback);
    callback(this.documents);

    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.documents));
  }

  public formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  public getAuditTrail(documentId: string): any[] {
    // Mock audit trail data
    return [
      {
        action: 'uploaded',
        timestamp: new Date('2024-03-15T08:00:00'),
        user: 'Field Hustle',
        details: 'Document uploaded and processed'
      },
      {
        action: 'processed',
        timestamp: new Date('2024-03-15T08:01:00'),
        user: 'Shear',
        details: 'Compliance scan completed - 98% confidence'
      },
      {
        action: 'tagged',
        timestamp: new Date('2024-03-15T08:02:00'),
        user: 'DemoScope',
        details: 'Auto-tagged: safety, inspection, compliance'
      }
    ];
  }
}

export const documentService = new DocumentService();