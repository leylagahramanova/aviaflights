import React,{ useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    IconButton,
  } from '@mui/material';
  import { Brightness4, Brightness7, } from '@mui/icons-material';

  export const DarkTheme=()=>{
    const [dark, setDark] = useState(true);

    const darkTheme = useMemo(
      () =>
        createTheme({
          palette: {
            mode: dark ? 'dark' : 'light',
          },
        }),
      [dark]
    );
    return (
           
        <ThemeProvider theme={darkTheme}>
        <IconButton onClick={() => setDark(!dark)}>
        {dark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      </ThemeProvider>
    )
  }
  export default DarkTheme