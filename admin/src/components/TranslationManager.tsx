import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Upload, 
  RefreshCw, 
  Save,
  X,
  Check,
  AlertCircle,
  Filter,
  Globe
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { translationApi } from '../services/translationApi';
import { Translation, TranslationFilter } from '../types/translation';
import TranslationForm from './TranslationForm';
import ImportModal from './ImportModal';
import ExportModal from './ExportModal';

const TranslationManager: React.FC = () => {
  const [filters, setFilters] = useState<TranslationFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTranslations, setSelectedTranslations] = useState<string[]>([]);
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const queryClient = useQueryClient();

  // Fetch translations
  const { data: translations, isLoading, error } = useQuery({
    queryKey: ['translations', filters, searchTerm],
    queryFn: () => translationApi.getTranslations({
      ...filters,
      search: searchTerm || undefined
    }),
    staleTime: 30000, // 30 seconds
  });

  // Fetch statistics
  const { data: stats } = useQuery({
    queryKey: ['translation-stats'],
    queryFn: translationApi.getStats,
    staleTime: 60000, // 1 minute
  });

  // Update translation mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, value }: { id: string; value: string }) =>
      translationApi.updateTranslation(id, { value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      queryClient.invalidateQueries({ queryKey: ['translation-stats'] });
      toast.success('Translation updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update translation');
      console.error(error);
    },
  });

  // Delete translation mutation
  const deleteMutation = useMutation({
    mutationFn: translationApi.deleteTranslation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      queryClient.invalidateQueries({ queryKey: ['translation-stats'] });
      toast.success('Translation deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete translation');
      console.error(error);
    },
  });

  // Bulk update mutation
  const bulkUpdateMutation = useMutation({
    mutationFn: translationApi.bulkUpdateTranslations,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      queryClient.invalidateQueries({ queryKey: ['translation-stats'] });
      toast.success(`Bulk update completed: ${result.summary.successful} successful, ${result.summary.errors} errors`);
      setSelectedTranslations([]);
    },
    onError: (error) => {
      toast.error('Failed to bulk update translations');
      console.error(error);
    },
  });

  // Sync to files mutation
  const syncMutation = useMutation({
    mutationFn: translationApi.syncToFiles,
    onSuccess: () => {
      toast.success('All translations synced to files successfully');
    },
    onError: (error) => {
      toast.error('Failed to sync translations to files');
      console.error(error);
    },
  });

  const handleUpdateTranslation = (id: string, value: string) => {
    updateMutation.mutate({ id, value });
  };

  const handleDeleteTranslation = (id: string) => {
    if (window.confirm('Are you sure you want to delete this translation?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedTranslations.length === 0) {
      toast.error('No translations selected');
      return;
    }

    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedTranslations.length} translations?`)) {
          // Implement bulk delete
          Promise.all(selectedTranslations.map(id => translationApi.deleteTranslation(id)))
            .then(() => {
              queryClient.invalidateQueries({ queryKey: ['translations'] });
              toast.success(`${selectedTranslations.length} translations deleted`);
              setSelectedTranslations([]);
            })
            .catch(() => toast.error('Failed to delete some translations'));
        }
        break;
      default:
        toast.error('Unknown bulk action');
    }
  };

  const toggleTranslationSelection = (id: string) => {
    setSelectedTranslations(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAllTranslations = () => {
    if (translations?.data) {
      setSelectedTranslations(
        selectedTranslations.length === translations.data.length
          ? []
          : translations.data.map(t => t.id)
      );
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading translations</h3>
          <p className="mt-1 text-sm text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Translation Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage translations across all languages and namespaces
          </p>
        </div>
        <div className="mt-4 flex space-x-2 sm:mt-0">
          <button
            onClick={() => setIsImportOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="h-4 w-4 mr-1" />
            Import
          </button>
          <button
            onClick={() => setIsExportOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
          <button
            onClick={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
            Sync Files
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Translation
          </button>
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Globe className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Translations</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.total}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          {stats.byLanguage.map((lang) => (
            <div key={lang.language} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {lang.language.toUpperCase()}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">{lang.count}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search translations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md ${
                showFilters ? 'text-blue-700 bg-blue-50 border-blue-300' : 'text-gray-700 bg-white hover:bg-gray-50'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 border-t pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select
                  value={filters.language || ''}
                  onChange={(e) => setFilters({ ...filters, language: e.target.value || undefined })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">All Languages</option>
                  <option value="en">English</option>
                  <option value="si">Sinhala</option>
                  <option value="ta">Tamil</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Namespace</label>
                <select
                  value={filters.namespace || ''}
                  onChange={(e) => setFilters({ ...filters, namespace: e.target.value || undefined })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">All Namespaces</option>
                  <option value="common">Common</option>
                  <option value="header">Header</option>
                  <option value="footer">Footer</option>
                  <option value="home">Home</option>
                  <option value="services">Services</option>
                  <option value="courses">Courses</option>
                  <option value="testimonials">Testimonials</option>
                  <option value="newsevents">News & Events</option>
                  <option value="dropdown">Dropdown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={filters.isActive !== undefined ? filters.isActive.toString() : ''}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    isActive: e.target.value === '' ? undefined : e.target.value === 'true' 
                  })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">All</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTranslations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-blue-800">
                {selectedTranslations.length} translation(s) selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction('delete')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedTranslations([])}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Translations Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedTranslations.length === (translations?.data?.length || 0) && translations?.data?.length > 0}
                      onChange={selectAllTranslations}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Namespace
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Key
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {translations?.data?.map((translation) => (
                  <TranslationRow
                    key={translation.id}
                    translation={translation}
                    isSelected={selectedTranslations.includes(translation.id)}
                    onToggleSelect={toggleTranslationSelection}
                    onUpdate={handleUpdateTranslation}
                    onDelete={handleDeleteTranslation}
                    onEdit={setEditingTranslation}
                    isUpdating={updateMutation.isPending}
                  />
                )) || []}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {isFormOpen && (
        <TranslationForm
          translation={editingTranslation}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTranslation(null);
          }}
          onSuccess={() => {
            setIsFormOpen(false);
            setEditingTranslation(null);
            queryClient.invalidateQueries({ queryKey: ['translations'] });
            queryClient.invalidateQueries({ queryKey: ['translation-stats'] });
          }}
        />
      )}

      {isImportOpen && (
        <ImportModal
          onClose={() => setIsImportOpen(false)}
          onSuccess={() => {
            setIsImportOpen(false);
            queryClient.invalidateQueries({ queryKey: ['translations'] });
            queryClient.invalidateQueries({ queryKey: ['translation-stats'] });
          }}
        />
      )}

      {isExportOpen && (
        <ExportModal
          onClose={() => setIsExportOpen(false)}
          currentFilters={filters}
        />
      )}
    </div>
  );
};

// Translation Row Component
interface TranslationRowProps {
  translation: Translation;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onUpdate: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  onEdit: (translation: Translation) => void;
  isUpdating: boolean;
}

const TranslationRow: React.FC<TranslationRowProps> = ({
  translation,
  isSelected,
  onToggleSelect,
  onUpdate,
  onDelete,
  onEdit,
  isUpdating
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(translation.value);

  const handleSave = () => {
    if (editValue !== translation.value) {
      onUpdate(translation.id, editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(translation.value);
    setIsEditing(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <tr className={isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(translation.id)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {translation.namespace}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <code className="bg-gray-100 px-2 py-1 rounded text-xs">{translation.key}</code>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          translation.language === 'en' ? 'bg-blue-100 text-blue-800' :
          translation.language === 'si' ? 'bg-green-100 text-green-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {translation.language.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="inline-flex items-center p-1 text-green-600 hover:text-green-700 disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center p-1 text-gray-600 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div 
            className="truncate cursor-pointer hover:text-blue-600"
            onClick={() => setIsEditing(true)}
            title={translation.value}
          >
            {translation.value}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(translation.updatedAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700"
            title="Edit"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(translation.id)}
            className="text-red-600 hover:text-red-700"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TranslationManager;