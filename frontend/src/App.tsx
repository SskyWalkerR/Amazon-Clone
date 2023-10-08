import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./context/theme";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AppThemeProvider>
        <CssBaseline />
        <AppRoutes />
      </AppThemeProvider>
    </BrowserRouter>
  );
}

export default App;
