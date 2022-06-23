import { useEffect } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getData } from '../../../../apps/online-store/src/utils/APIrequest';

/* eslint-disable-next-line */
export interface MenuProps {}

const StyledMenu = styled.div`
  color: red;
`;

export function Menu(props: MenuProps) {
  useEffect(() => {
    getData('menu/products/1/1');
  }, []);
  return (
    <StyledMenu>
      <h1>Welcome to Menu!</h1>
    </StyledMenu>
  );
}

export default Menu;
