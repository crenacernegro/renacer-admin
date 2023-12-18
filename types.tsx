export type SideNavItem = {
  label: string;
  href: string;
  icon?: JSX.Element;
  active: boolean;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};
