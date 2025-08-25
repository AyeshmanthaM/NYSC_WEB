import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Database, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle,
  Globe,
  Server,
  FileText
} from 'lucide-react';
import { getTranslationSource, recheckApiAvailability, reloadTranslationsFromApi } from '../../lib/i18n';
import { translationApi } from '../../lib/translationApi';

interface TranslationDebugPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface TranslationSourceInfo {
  apiAvailable: boolean;
  hasWebSocket: boolean;
  mode: string;
}

const TranslationDebugPanel: React.FC<TranslationDebugPanelProps> = ({ isOpen, onToggle }) => {
  const [sourceInfo, setSourceInfo] = useState<TranslationSourceInfo>({
    apiAvailable: false,
    hasWebSocket: false,
    mode: 'file-only'
  });
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const refreshInfo = async () => {
    setIsLoading(true);
    try {
      // Check API availability
      await recheckApiAvailability();
      
      // Get source info
      const info = getTranslationSource();
      setSourceInfo(info);
      
      // Get stats if API is available
      if (info.apiAvailable) {
        const apiStats = await translationApi.getStats();
        setStats(apiStats);
      }
      
      setLastChecked(new Date());
    } catch (error) {
      console.error('Error refreshing translation debug info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReloadFromApi = async () => {
    setIsLoading(true);
    try {
      await reloadTranslationsFromApi();
      await refreshInfo();
    } catch (error) {
      console.error('Error reloading from API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshInfo();
    }
  }, [isOpen]);

  useEffect(() => {
    // Auto-refresh every 30 seconds when panel is open
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(refreshInfo, 30000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Open Translation Debug Panel"
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center">
          <Globe className="w-4 h-4 mr-1" />
          Translation Debug
        </h3>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <div className="flex items-center">
            {sourceInfo.apiAvailable ? (
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
            )}
            <span className="text-sm font-medium">API Status</span>
          </div>
          <div className="flex items-center">
            {sourceInfo.apiAvailable ? (
              <span className="text-xs text-green-600">Connected</span>
            ) : (
              <span className="text-xs text-red-600">Disconnected</span>
            )}
          </div>
        </div>

        {/* WebSocket Status */}
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <div className="flex items-center">
            {sourceInfo.hasWebSocket ? (
              <Wifi className="w-4 h-4 text-blue-500 mr-2" />
            ) : (
              <WifiOff className="w-4 h-4 text-gray-400 mr-2" />
            )}
            <span className="text-sm font-medium">Real-time</span>
          </div>
          <div className="flex items-center">
            {sourceInfo.hasWebSocket ? (
              <span className="text-xs text-blue-600">Active</span>
            ) : (
              <span className="text-xs text-gray-500">Inactive</span>
            )}
          </div>
        </div>

        {/* Translation Mode */}
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <div className="flex items-center">
            {sourceInfo.mode === 'api-primary' ? (
              <Server className="w-4 h-4 text-green-500 mr-2" />
            ) : (
              <FileText className="w-4 h-4 text-yellow-500 mr-2" />
            )}
            <span className="text-sm font-medium">Source</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-600">
              {sourceInfo.mode === 'api-primary' ? 'API Primary' : 'Files Only'}
            </span>
          </div>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="p-2 bg-blue-50 rounded">
            <h4 className="text-xs font-medium text-blue-900 mb-2">Translation Stats</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-blue-600">Total:</span>
                <span className="font-medium ml-1">{stats.total}</span>
              </div>
              <div>
                <span className="text-blue-600">Recent:</span>
                <span className="font-medium ml-1">{stats.recentlyUpdated}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-blue-600 text-xs">Languages:</span>
              <div className="flex gap-1 mt-1">
                {stats.byLanguage?.map((lang: any) => (
                  <span
                    key={lang.language}
                    className="text-xs bg-blue-100 px-1 rounded"
                  >
                    {lang.language.toUpperCase()}: {lang.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={refreshInfo}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          {sourceInfo.apiAvailable && (
            <button
              onClick={handleReloadFromApi}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded disabled:opacity-50"
            >
              <Database className="w-3 h-3 mr-1" />
              Reload API
            </button>
          )}
        </div>

        {/* Last Checked */}
        {lastChecked && (
          <div className="text-xs text-gray-500 text-center">
            Last checked: {lastChecked.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationDebugPanel;