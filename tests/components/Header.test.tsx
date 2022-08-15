import { render } from '@testing-library/react';
import { Header } from '../../src/components';

describe('Header', () => {

  it('should render Hacker News Text', () => {
    const { getByText } = render(<Header title="Hacker News" />);
    const header = getByText(/Hacker News/i);
    expect(header).toBeTruthy();
  });

});
