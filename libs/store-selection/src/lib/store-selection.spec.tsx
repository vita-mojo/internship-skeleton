import { render } from '@testing-library/react';

import { StoreSelection } from './store-selection';

describe('StoreSelection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StoreSelection />);
    expect(baseElement).toBeTruthy();
  });
});
