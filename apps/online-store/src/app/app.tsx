import '../styles.css';

import { Header } from '@internship-skeleton/header';
import { ItemCustomization } from '@internship-skeleton/item-customization';
import { Menu } from '@internship-skeleton/menu';
import { StoreSelection } from '@internship-skeleton/store-selection';
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
        <Header />
        <Routes>
          <Route path="store-selection" element={<StoreSelection />} />
          <Route path="menu/:menuId/:pageNumber/*" element={<Menu />} />
          <Route path="menu/:menuId/*" element={<Menu />} />
          <Route
            path="item-customization/:id"
            element={<ItemCustomization />}
          />
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
