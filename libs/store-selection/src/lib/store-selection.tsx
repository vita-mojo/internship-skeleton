import { useEffect } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../apps/online-store/src/utils/APIrequest';
/* eslint-disable-next-line */
export interface StoreSelectionProps {}

const StyledStoreSelection = styled.div`
  color: red;
`;

export function StoreSelection(props: StoreSelectionProps) {
  useEffect(() => {
    getData(`/api/stores/${1}`);
  }, []);

  return (
    <StyledStoreSelection>
      <h1>Welcome to StoreSelection!</h1>
    </StyledStoreSelection>
  );
}
