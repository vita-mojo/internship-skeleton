import { render } from '@testing-library/react';

import CategoryModifierSide from './category-modifier-side';

describe('CategoryModifierSide', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CategoryModifierSide />);
    expect(baseElement).toBeTruthy();
  });
});
