import { render } from '@testing-library/react';

import ProductSide from './product-side';

describe('ProductSide', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProductSide />);
    expect(baseElement).toBeTruthy();
  });
});
