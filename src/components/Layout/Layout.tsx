import './Layout.css';
import { ReactNode } from 'react';

export const Layout = ({ children }: {children: ReactNode}) => {
  return (
    <div className="layout">
      {children}
      <small>Developed by Janco Boscan</small>
    </div>
  );
};
