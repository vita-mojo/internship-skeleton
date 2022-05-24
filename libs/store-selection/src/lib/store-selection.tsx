import styled from 'styled-components';

/* eslint-disable-next-line */
export interface StoreSelectionProps {}

const StyledStoreSelection = styled.div`
  color: red;
`;

export function StoreSelection(props: StoreSelectionProps) {
  return (
    <StyledStoreSelection>
      <h1>Welcome to StoreSelection!</h1>
    </StyledStoreSelection>
  );
}

export default StoreSelection;
