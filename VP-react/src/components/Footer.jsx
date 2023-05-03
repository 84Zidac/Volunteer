import { BottomNavigation } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#204051',// color of the footer should be changed here
          position: 'fixed', // currently fixes the position to the bottom of the page always
          bottom: 0,
          left: 0,
          right: 0, 
        },
      },
    },
  },
});

export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <BottomNavigation>
        <h4 className='bottom-footer'>VolunteerCompass 2023</h4>
      </BottomNavigation>
    </ThemeProvider>
  )
}