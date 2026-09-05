import { useState, useEffect } from 'react';
import { CompanyConfig } from '../types/company';
import companyData from '../../MockDirectory/company/company.json';
import { getStoredCompanyConfig } from '../utils/dataStore';

// Initial mutable company config instance
export const companyConfig: CompanyConfig = (typeof window !== 'undefined' 
  ? getStoredCompanyConfig() 
  : companyData) as CompanyConfig;

// React hook to ensure real-time re-rendering across components when settings change
export function useCompanyConfig(): CompanyConfig {
  const [config, setConfig] = useState<CompanyConfig>(() => {
    return typeof window !== 'undefined' ? getStoredCompanyConfig() : (companyData as CompanyConfig);
  });

  useEffect(() => {
    const handleDataChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === 'insight_company_config') {
        const latest = getStoredCompanyConfig();
        Object.assign(companyConfig, latest);
        setConfig(latest);
      }
    };

    window.addEventListener('insight_data_change', handleDataChange);
    return () => window.removeEventListener('insight_data_change', handleDataChange);
  }, []);

  return config;
}
