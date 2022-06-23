import { createPortal } from 'react-dom';

import Modal from '../modal/modal';

export const Portal = () => {
  return createPortal(
    <Modal />,
    document.getElementById('root-modal') as HTMLElement
  );
};

export default Portal;
