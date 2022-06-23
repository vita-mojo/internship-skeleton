import { render } from '@testing-library/react';

import FilterMenus from './filter-menus';

describe('FilterMenus', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterMenus />);
    expect(baseElement).toBeTruthy();
  });
});
