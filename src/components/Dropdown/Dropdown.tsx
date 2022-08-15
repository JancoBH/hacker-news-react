import './Dropdown.css';
import { ReactNode, useEffect, useState } from 'react';

interface DropdownProps {
  selectedValue: string;
  className?: string;
  children: ReactNode;
}

export const Dropdown = ({selectedValue = '', className = '', children}: DropdownProps) => {

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(!isActive);
  } ,[selectedValue]);

  return (
    <div className={`dropdown ${className}`}>
      <div onClick={() => setIsActive(!isActive)} className="dropdown__btn">
        {selectedValue}
        {isActive ? <i className='bx bx-chevron-up bx-sm' /> : <i className='bx bx-chevron-down bx-sm' />}
      </div>

      <div className="dropdown__content" style={{ display: isActive ? 'block' : 'none' }}>
        {children}
      </div>

    </div>
  );

};
