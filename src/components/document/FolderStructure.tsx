import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  FolderOpen, 
  File, 
  ChevronRight, 
  ChevronDown, 
  Upload,
  MoreVertical,
  Plus,
  Search
} from 'lucide-react';
import { FolderStructure as FolderType, documentService } from '../../services/documentService';

interface FolderStructureProps {
  onFolderSelect?: (path: string) => void;
  onUploadToFolder?: (path: string) => void;
}

const FolderStructure: React.FC<FolderStructureProps> = ({ 
  onFolderSelect, 
  onUploadToFolder 
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/', '01-PreCon', '3.0-Field Data']));
  const [selectedFolder, setSelectedFolder] = useState<string>('/');
  const [folderStructure] = useState<FolderType>(documentService.getFolderStructure());

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const selectFolder = (path: string) => {
    setSelectedFolder(path);
    if (onFolderSelect) {
      onFolderSelect(path);
    }
  };

  const renderFolder = (folder: FolderType, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.path);
    const isSelected = selectedFolder === folder.path;
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <div key={folder.path}>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex items-center space-x-2 py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
            isSelected ? 'bg-blue-50 border border-blue-200' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onClick={() => selectFolder(folder.path)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder.path);
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {isExpanded ? (
                <ChevronDown size={14} className="text-gray-600" />
              ) : (
                <ChevronRight size={14} className="text-gray-600" />
              )}
            </button>
          )}
          
          {!hasChildren && <div className="w-6" />}
          
          <div className="flex items-center space-x-2 flex-1">
            {hasChildren ? (
              isExpanded ? (
                <FolderOpen size={16} className="text-blue-600" />
              ) : (
                <Folder size={16} className="text-blue-600" />
              )
            ) : (
              <File size={16} className="text-gray-600" />
            )}
            
            <span className={`text-sm ${isSelected ? 'font-medium' : ''}`}>
              {folder.name}
            </span>
            
            {folder.documentCount !== undefined && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {folder.documentCount}
              </span>
            )}
          </div>
          
          {isSelected && (
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onUploadToFolder) {
                    onUploadToFolder(folder.path);
                  }
                }}
                className="p-1 hover:bg-gray-200 rounded text-gray-600"
                title="Upload to this folder"
              >
                <Upload size={14} />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-1 hover:bg-gray-200 rounded text-gray-600"
              >
                <MoreVertical size={14} />
              </button>
            </div>
          )}
        </motion.div>
        
        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {folder.children!.map((child) => renderFolder(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 h-full overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Folder Structure</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
          <Plus size={16} />
        </button>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search folders..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="space-y-1">
        {renderFolder(folderStructure)}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>Total Documents:</span>
            <span className="font-medium">
              {folderStructure.children?.reduce((total, folder) => 
                total + (folder.documentCount || 0), 0
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total Size:</span>
            <span className="font-medium">
              {documentService.formatFileSize(
                folderStructure.children?.reduce((total, folder) => 
                  total + (folder.totalSize || 0), 0
                ) || 0
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderStructure;