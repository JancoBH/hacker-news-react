import { fireEvent, render, RenderResult } from '@testing-library/react';
import { Home } from '../../src/pages';
import { store } from '../../src/redux/store';
import { Provider } from 'react-redux';

describe('Home', () => {

  const toggleOptions = ['All', 'My Faves'];
  let renderHome: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement>;

  beforeEach(() => {
    store.dispatch = jest.fn();
    // redux provided to the component
    renderHome = render(<Provider store={store}><Home /></Provider>);
  });

  it('should show All and My Faves ButtonToggle Options', () => {
    const { getByText } = renderHome;
    const buttonToggleOption1 = getByText(toggleOptions[0]);
    const buttonToggleOption2 = getByText(toggleOptions[1]);
    expect(buttonToggleOption1).toBeTruthy();
    expect(buttonToggleOption2).toBeTruthy();
  });

  it('should show AllNews component by default and show dropdown default value', () => {
    const { getByText } = renderHome;
    const defaultAllNewsDropdownText = getByText('Select your news');
    expect(defaultAllNewsDropdownText).toBeTruthy();
  });

  it('should click MyFaves option and show empty faves', () => {
    const { getByText } = renderHome;
    const buttonToggleOption = getByText(toggleOptions[1]);
    fireEvent.click( buttonToggleOption );
    const emptyFaves = getByText('You have no favorite news');
    expect(emptyFaves).toBeTruthy();
  });

});
