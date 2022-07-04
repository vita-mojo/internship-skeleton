import { render } from '@testing-library/react';

import VariablesInterfaces from './variables-interfaces';

describe('VariablesInterfaces', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VariablesInterfaces />);
    expect(baseElement).toBeTruthy();
  });
});
