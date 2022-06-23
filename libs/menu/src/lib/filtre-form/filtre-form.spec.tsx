import { render } from '@testing-library/react';

import FiltreForm from './filtre-form';

describe('FiltreForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FiltreForm />);
    expect(baseElement).toBeTruthy();
  });
});
