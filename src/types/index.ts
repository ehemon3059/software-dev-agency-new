export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeaderProps {
  scrollY: number;
  activeSection: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}