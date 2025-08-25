import React, { useState } from 'react';
import { X, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { translationApi } from '../services/translationApi';
import { TranslationFilter } from '../types/translation';

interface ExportModalProps {
  onClose: () => void;
  currentFilters?: TranslationFilter;
}

const ExportModal: React.FC<ExportModalProps> = ({ onClose, currentFilters = {} }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFilters, setExportFilters] = useState<TranslationFilter>(currentFilters);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await translationApi.exportTranslations(exportFilters);
      toast.success('Export completed successfully');
      onClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Export failed';
      toast.error(errorMessage);
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const namespaces = [
    { value: 'common', label: 'Common' },
    { value: 'header', label: 'Header' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'home', label: 'Home' },
    { value: 'services', label: 'Services' },
    { value: 'courses', label: 'Courses' },
    { value: 'testimonials', label: 'Testimonials' },
    { value: 'newsevents', label: 'News & Events' },
    { value: 'footer', label: 'Footer' }
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'si', label: 'Sinhala (සිංහල)' },
    { value: 'ta', label: 'Tamil (தமிழ்)' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Export Translations</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Export Filters */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language (optional)
              </label>
              <select
                value={exportFilters.language || ''}
                onChange={(e) => setExportFilters({
                  ...exportFilters,
                  language: e.target.value || undefined
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Namespace (optional)
              </label>
              <select
                value={exportFilters.namespace || ''}
                onChange={(e) => setExportFilters({
                  ...exportFilters,
                  namespace: e.target.value || undefined
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Namespaces</option>
                {namespaces.map((ns) => (
                  <option key={ns.value} value={ns.value}>
                    {ns.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={exportFilters.isActive !== undefined ? exportFilters.isActive.toString() : 'true'}
                onChange={(e) => setExportFilters({
                  ...exportFilters,
                  isActive: e.target.value === 'all' ? undefined : e.target.value === 'true'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="true">Active Only</option>
                <option value="false">Inactive Only</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          {/* Export Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Export Information</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• CSV format with columns: namespace, key, language, value, version, updatedAt</li>
              <li>• Only active translations will be exported by default</li>
              <li>• File will be automatically downloaded when ready</li>
              <li>• Export includes current filters and settings</li>
            </ul>
          </div>

          {/* Current Filters Summary */}
          {(exportFilters.language || exportFilters.namespace) && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Export Filters</h4>
              <div className="flex flex-wrap gap-2">
                {exportFilters.language && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Language: {exportFilters.language.toUpperCase()}
                  </span>
                )}
                {exportFilters.namespace && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Namespace: {exportFilters.namespace}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;