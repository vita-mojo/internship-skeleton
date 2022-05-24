import styled from 'styled-components';

/* eslint-disable-next-line */
export interface MenuProps {}

const StyledMenu = styled.div`
  color: red;
`;

export function Menu(props: MenuProps) {
  return (
    <StyledMenu>
      <h1>Welcome to Menu!</h1>
    </StyledMenu>
  );
}

export default Menu;
