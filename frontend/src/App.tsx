import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { theme } from "./shared/utils/theme";

function App() {
  const [count, setCount] = useState(0);

  return <ThemeProvider theme={theme}>HI</ThemeProvider>;
}

export default App;
