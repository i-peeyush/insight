export interface NavChildItem {
  label: string;
  path: string;
  description?: string;
}

export interface NavItem {
  label: string;
  path: string;
  children?: NavChildItem[];
}

export interface NavActionButton {
  label: string;
  path: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface FooterNavSection {
  label: string;
  path: string;
}

export interface NavigationConfig {
  mainNav: NavItem[];
  actionButtons: NavActionButton[];
  footerNav: {
    services: FooterNavSection[];
    pestLibrary: FooterNavSection[];
    company: FooterNavSection[];
    legal: FooterNavSection[];
  };
}
