import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey,green } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    primary:{
        main:grey[900]
    },
    secondary:{
        main:grey[700]
    },
    light:{
      main:"#fff"
    },
    grey:{
      main:grey[500]
    },
    green:{
      main:green[400]
    }
  },
  breakpoints: {
    values: {
      xs: 300,
      sm: 450,
      md: 770,
      lg: 1024,
      xl:1350,
    }
  }
});

function Darkmode({children}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Darkmode;
