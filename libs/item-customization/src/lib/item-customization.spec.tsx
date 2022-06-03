import { render } from '@testing-library/react';

import ItemCustomization from './item-customization';

describe('ItemCustomization', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ItemCustomization />);
    expect(baseElement).toBeTruthy();
  });
});
