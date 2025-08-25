import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { translationApi } from '../services/translationApi';
import { Translation } from '../types/translation';

const translationSchema = z.object({
  namespace: z.string().min(1, 'Namespace is required').max(50, 'Namespace too long'),
  key: z.string().min(1, 'Key is required').max(100, 'Key too long')
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'Key must start with letter and contain only letters, numbers, underscores'),
  language: z.enum(['en', 'si', 'ta'], { required_error: 'Language is required' }),
  value: z.string().min(1, 'Value is required')
});

type TranslationFormData = z.infer<typeof translationSchema>;

interface TranslationFormProps {
  translation?: Translation | null;
  onClose: () => void;
  onSuccess: () => void;
}

const TranslationForm: React.FC<TranslationFormProps> = ({
  translation,
  onClose,
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingUniqueness, setIsCheckingUniqueness] = useState(false);
  const isEdit = !!translation;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<TranslationFormData>({
    resolver: zodResolver(translationSchema),
    defaultValues: {
      namespace: translation?.namespace || 'common',
      key: translation?.key || '',
      language: translation?.language as 'en' | 'si' | 'ta' || 'en',
      value: translation?.value || ''
    }
  });

  const watchedNamespace = watch('namespace');
  const watchedKey = watch('key');
  const watchedLanguage = watch('language');

  // Check uniqueness for new translations
  useEffect(() => {
    if (!isEdit && watchedNamespace && watchedKey && watchedLanguage) {
      const timeoutId = setTimeout(async () => {
        setIsCheckingUniqueness(true);
        try {
          const isUnique = await translationApi.checkKeyUniqueness(
            watchedNamespace,
            watchedKey,
            watchedLanguage
          );
          if (!isUnique) {
            toast.error('This translation key already exists for this namespace and language');
          }
        } catch (error) {
          console.error('Error checking uniqueness:', error);
        } finally {
          setIsCheckingUniqueness(false);
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [watchedNamespace, watchedKey, watchedLanguage, isEdit]);

  const onSubmit = async (data: TranslationFormData) => {
    setIsSubmitting(true);
    try {
      if (isEdit && translation) {
        await translationApi.updateTranslation(translation.id, { value: data.value });
        toast.success('Translation updated successfully');
      } else {
        await translationApi.createTranslation(data);
        toast.success('Translation created successfully');
      }
      onSuccess();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEdit ? 'Edit Translation' : 'Add New Translation'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Namespace */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Namespace
            </label>
            <select
              {...register('namespace')}
              disabled={isEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              {namespaces.map((ns) => (
                <option key={ns.value} value={ns.value}>
                  {ns.label}
                </option>
              ))}
            </select>
            {errors.namespace && (
              <p className="mt-1 text-sm text-red-600">{errors.namespace.message}</p>
            )}
          </div>

          {/* Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key
            </label>
            <input
              type="text"
              {...register('key')}
              disabled={isEdit}
              placeholder="e.g., welcomeMessage"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {errors.key && (
              <p className="mt-1 text-sm text-red-600">{errors.key.message}</p>
            )}
            {isCheckingUniqueness && (
              <p className="mt-1 text-sm text-blue-600">Checking availability...</p>
            )}
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              {...register('language')}
              disabled={isEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            {errors.language && (
              <p className="mt-1 text-sm text-red-600">{errors.language.message}</p>
            )}
          </div>

          {/* Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Translation Value
            </label>
            <textarea
              {...register('value')}
              rows={3}
              placeholder="Enter the translated text..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
            {errors.value && (
              <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isCheckingUniqueness}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEdit ? 'Update' : 'Create'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TranslationForm;