import { render } from '@testing-library/react';

import PaginationTab from './pagination-tab';

describe('PaginationTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaginationTab />);
    expect(baseElement).toBeTruthy();
  });
});
