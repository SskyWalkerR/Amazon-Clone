import CssBaseline from "@mui/material/CssBaseline";
import { AppThemeProvider } from "./context/theme";
import AppRoutes from "./routes";

function App() {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <AppRoutes />
    </AppThemeProvider>
  );
}

export default App;
