import { render } from '@testing-library/react';

import PageButtons from './page-buttons';

describe('PageButtons', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageButtons />);
    expect(baseElement).toBeTruthy();
  });
});
