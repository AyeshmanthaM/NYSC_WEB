import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { translationApi } from '../services/translationApi';

interface ImportModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ onClose, onSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [importResults, setImportResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast.error('Please select a CSV file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size must be less than 5MB');
      return;
    }

    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setImportResults(null);

    try {
      const results = await translationApi.importTranslations(file);
      setImportResults(results.data);
      
      if (results.data.errors.length === 0) {
        toast.success(`Successfully imported ${results.data.success} translations`);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        toast.warning(`Import completed with ${results.data.errors.length} errors`);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Import failed';
      toast.error(errorMessage);
      console.error('Import error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const downloadTemplate = () => {
    translationApi.generateCSVTemplate();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Import Translations</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Import Instructions</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Upload a CSV file with columns: namespace, key, language, value</li>
              <li>• Maximum file size: 5MB</li>
              <li>• Supported languages: en, si, ta</li>
              <li>• Keys must start with a letter and contain only letters, numbers, and underscores</li>
            </ul>
          </div>

          {/* Template Download */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Need a template?</h4>
              <p className="text-sm text-gray-600">Download a sample CSV file to get started</p>
            </div>
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Template
            </button>
          </div>

          {/* File Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            {isUploading ? (
              <div className="space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-sm text-gray-600">Processing import...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Drop your CSV file here, or{' '}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs text-gray-500">CSV files up to 5MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Import Results */}
          {importResults && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Import Results</h3>
                {importResults.errors.length === 0 ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-900">Successful</p>
                      <p className="text-2xl font-bold text-green-600">{importResults.success}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-red-900">Errors</p>
                      <p className="text-2xl font-bold text-red-600">{importResults.errors.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Details */}
              {importResults.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg">
                  <div className="p-4 border-b border-red-200">
                    <h4 className="text-sm font-medium text-red-900">Import Errors</h4>
                  </div>
                  <div className="p-4 max-h-48 overflow-y-auto">
                    <div className="space-y-2">
                      {importResults.errors.slice(0, 10).map((error: any, index: number) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium text-red-800">
                            {error.row > 0 ? `Row ${error.row}:` : 'Data error:'}
                          </span>
                          <span className="text-red-700 ml-1">{error.error}</span>
                          {error.data && (
                            <div className="text-xs text-red-600 mt-1 pl-2">
                              {JSON.stringify(error.data)}
                            </div>
                          )}
                        </div>
                      ))}
                      {importResults.errors.length > 10 && (
                        <div className="text-sm text-red-600 italic">
                          ... and {importResults.errors.length - 10} more errors
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {importResults?.errors.length === 0 ? 'Done' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;