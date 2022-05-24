import { Menu } from '@internship-skeleton/menu';
import { StoreSelection } from '@internship-skeleton/store-selection';
import { Tenants } from '@internship-skeleton/tenants';
import { ThemeProvider } from '@mui/material/styles';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from './theme';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="store-selection" element={<StoreSelection />} />
          <Route path="menu" element={<Menu />} />
          <Route path="tenants" element={<Tenants />} />
          <Route
            path="*"
            element={<Navigate to="/store-selection" replace />}
          />
        </Routes>
      </ThemeProvider>
    </StyledApp>
  );
}

export default App;
