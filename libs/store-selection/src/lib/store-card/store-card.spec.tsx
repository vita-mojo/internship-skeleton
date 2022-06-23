import { render } from '@testing-library/react';

import StoreCard from './store-card';

describe('StoreCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StoreCard />);
    expect(baseElement).toBeTruthy();
  });
});
