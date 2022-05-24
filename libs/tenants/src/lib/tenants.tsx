import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TenantsProps {}

const StyledTenants = styled.div`
  color: red;
`;

export function Tenants(props: TenantsProps) {
  return (
    <StyledTenants>
      <h1>Welcome to Tenants!</h1>
    </StyledTenants>
  );
}

export default Tenants;
