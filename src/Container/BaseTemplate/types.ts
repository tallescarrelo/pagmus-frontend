import { ReactNode } from "react";
import { DefaultTheme } from 'styled-components';

export interface PropsBaseTemplate {
  children?: ReactNode;
  value?: string;
  theme?: DefaultTheme;
  changeTheme?: () => void;
  hideStatus?: boolean;
  showIntegrationButtons?: boolean;
  showIntegrationsButtonsGroup?: false;
}
