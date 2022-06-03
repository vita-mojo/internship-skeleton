import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ItemCustomizationProps {}

const StyledItemCustomization = styled.div`
  color: red;
`;

export function ItemCustomization(props: ItemCustomizationProps) {
  return (
    <StyledItemCustomization>
      <h1>Welcome to ItemCustomization!</h1>
    </StyledItemCustomization>
  );
}

export default ItemCustomization;
