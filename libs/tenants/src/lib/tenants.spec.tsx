import { render } from '@testing-library/react';

import Tenants from './tenants';

describe('Tenants', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tenants />);
    expect(baseElement).toBeTruthy();
  });
});
