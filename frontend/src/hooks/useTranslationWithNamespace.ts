import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageLoader } from '../contexts/ModernLanguageContext';
import { Namespace } from '../lib/i18n';

/**
 * Hook that ensures a namespace is loaded before using translations from it
 * @param namespace - The namespace to load
 * @returns Translation function and loading state
 */
export const useTranslationWithNamespace = (namespace: Namespace) => {
  const { t, ready } = useTranslation(namespace);
  const { ensureNamespaceLoaded, isNamespaceLoaded } = useLanguageLoader();

  useEffect(() => {
    if (!isNamespaceLoaded(namespace)) {
      ensureNamespaceLoaded(namespace);
    }
  }, [namespace, ensureNamespaceLoaded, isNamespaceLoaded]);

  return {
    t,
    ready: ready && isNamespaceLoaded(namespace)
  };
};

/**
 * Hook for components that need multiple namespaces
 * @param namespaces - Array of namespaces to load
 * @returns Translation function and loading state
 */
export const useMultipleNamespaces = (namespaces: Namespace[]) => {
  const { t, ready } = useTranslation(namespaces);
  const { ensureNamespaceLoaded, isNamespaceLoaded } = useLanguageLoader();

  useEffect(() => {
    const loadNamespaces = async () => {
      for (const namespace of namespaces) {
        if (!isNamespaceLoaded(namespace)) {
          await ensureNamespaceLoaded(namespace);
        }
      }
    };
    
    loadNamespaces();
  }, [namespaces, ensureNamespaceLoaded, isNamespaceLoaded]);

  const allLoaded = namespaces.every(ns => isNamespaceLoaded(ns));

  return {
    t,
    ready: ready && allLoaded
  };
};