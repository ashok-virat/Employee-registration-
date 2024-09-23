import { ThemeProvider } from '@mui/material/styles'
import RouteComponent from './Router/route';
import theme from './theme.js'

function App() {
  return (
    <ThemeProvider theme={theme}> <RouteComponent></RouteComponent> </ThemeProvider>
  );
}

export default App;
