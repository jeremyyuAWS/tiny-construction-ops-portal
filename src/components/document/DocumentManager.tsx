import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Download, 
  Search, 
  Filter, 
  FolderOpen, 
  File, 
  FileText, 
  Image, 
  FileAudio, 
  FileVideo,
  Plus,
  MoreVertical,
  Eye,
  History,
  Tag,
  MapPin,
  Clock,
  User,
  CheckCircle,
  AlertTriangle,
  X
} from 'lucide-react';
import { Document, documentService } from '../../services/documentService';

interface DocumentManagerProps {
  onClose?: () => void;
}

const DocumentManager: React.FC<DocumentManagerProps> = ({ onClose }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');
  const [view, setView] = useState<'list' | 'grid' | 'folders'>('list');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const unsubscribe = documentService.subscribe((docs) => {
      setDocuments(docs);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    let filtered = documents;

    if (searchTerm) {
      filtered = documentService.searchDocuments(searchTerm);
    }

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(doc => doc.type === selectedFilter);
    }

    if (selectedProject !== 'all') {
      filtered = filtered.filter(doc => doc.project === selectedProject);
    }

    setFilteredDocuments(filtered);
  }, [documents, searchTerm, selectedFilter, selectedProject]);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'photo':
        return <Image size={20} className="text-blue-600" />;
      case 'call_log':
        return <FileAudio size={20} className="text-green-600" />;
      case 'field_data':
        return <FileText size={20} className="text-purple-600" />;
      case 'bid_proposal':
        return <File size={20} className="text-orange-600" />;
      default:
        return <FileText size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-600';
    if (confidence >= 95) return 'text-green-600';
    if (confidence >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleFileUpload = async (files: FileList) => {
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await documentService.uploadDocument(file, {
          uploadedBy: 'Manual Upload',
          tags: ['uploaded'],
          project: selectedProject !== 'all' ? selectedProject : undefined
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setShowUploadModal(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const projects = ['all', '615 Main', '450 Commerce', 'Riverside Office'];
  const documentTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'bid_proposal', label: 'Bid Proposals' },
    { value: 'call_log', label: 'Call Logs' },
    { value: 'field_data', label: 'Field Data' },
    { value: 'photo', label: 'Photos' },
    { value: 'contract', label: 'Contracts' },
    { value: 'permit', label: 'Permits' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Document Management</h2>
            <p className="text-sm text-gray-600">Organized file storage with automated naming and compliance scanning</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {documentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              {projects.map(project => (
                <option key={project} value={project}>
                  {project === 'all' ? 'All Projects' : project}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found
          </p>
          <div className="text-xs text-gray-500">
            Total size: {documentService.formatFileSize(
              filteredDocuments.reduce((total, doc) => total + doc.size, 0)
            )}
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                onClick={() => setSelectedDocument(doc)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getDocumentIcon(doc.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{doc.generatedName}</h3>
                        {doc.version > 1 && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            v{doc.version}
                          </span>
                        )}
                        {doc.metadata.confidence && (
                          <span className={`text-xs ${getStatusColor(doc.metadata.confidence)}`}>
                            {doc.metadata.confidence}%
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{doc.originalName}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <User size={12} className="mr-1" />
                          {doc.uploadedBy}
                        </div>
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {formatDate(doc.uploadDate)}
                        </div>
                        <div>{documentService.formatFileSize(doc.size)}</div>
                        <div className="flex items-center">
                          {doc.metadata.gpsCoordinates && (
                            <>
                              <MapPin size={12} className="mr-1 text-green-600" />
                              GPS Verified
                            </>
                          )}
                        </div>
                      </div>
                      
                      {doc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {doc.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {doc.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{doc.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download size={16} className="text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-16">
            <File size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg mb-2">No documents found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Upload Documents</h3>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
              >
                <Upload size={32} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-2">Drop files here or</p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  Choose Files
                </label>
              </div>
              
              {uploading && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-sm text-gray-600">Uploading and processing...</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Detail Modal */}
      <AnimatePresence>
        {selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDocument(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{selectedDocument.generatedName}</h3>
                    <p className="text-sm text-gray-600">{selectedDocument.originalName}</p>
                  </div>
                  <button
                    onClick={() => setSelectedDocument(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-96">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-3">Document Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span>{selectedDocument.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span>{documentService.formatFileSize(selectedDocument.size)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Version:</span>
                        <span>v{selectedDocument.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Project:</span>
                        <span>{selectedDocument.project || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Processing Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uploaded by:</span>
                        <span>{selectedDocument.uploadedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processed by:</span>
                        <span>{selectedDocument.metadata.processingAgent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Confidence:</span>
                        <span className={getStatusColor(selectedDocument.metadata.confidence)}>
                          {selectedDocument.metadata.confidence}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Upload Date:</span>
                        <span>{formatDate(selectedDocument.uploadDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedDocument.metadata.extractedData && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Extracted Data</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-sm text-gray-700">
                        {JSON.stringify(selectedDocument.metadata.extractedData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDocument.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <History size={16} className="mr-2" />
                  View History
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download size={16} className="mr-2" />
                  Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentManager;