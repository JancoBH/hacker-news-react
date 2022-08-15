import { ButtonToggle } from '../../components';
import { AllNews, FavesNews } from './components';
import { ChangeEvent, useState } from 'react';

const toggleOptions = ['All', 'My Faves'];

export default function Home() {

  const [selectedView, setSelectedView] = useState(toggleOptions[0]);

  const handleToggleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedView(e.target.value);
  };

  return (
    <>
      <ButtonToggle options={toggleOptions} onChange={(e) => handleToggleChange(e)}/>
      {selectedView === 'All' && <AllNews />}
      {selectedView === 'My Faves' && <FavesNews />}
    </>
  );
}
