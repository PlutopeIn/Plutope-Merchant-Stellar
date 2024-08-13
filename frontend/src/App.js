import Routes from './routes/Routes'
import './assets/style/style.css';
import './assets/style/global.css'
import './assets/style/global.responsive.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: "400",
        lineHeight: "normal",
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ToastContainer />
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;
