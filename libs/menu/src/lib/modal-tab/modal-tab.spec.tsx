import { render } from '@testing-library/react';

import ModalTab from './modal-tab';

describe('ModalTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModalTab />);
    expect(baseElement).toBeTruthy();
  });
});
