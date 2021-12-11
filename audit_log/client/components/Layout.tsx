import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

interface IProps {}

const Layout: React.FC<IProps> = props => {
  const { isLoading, logoutFn, currentUser } = useAuth();

  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              onClick={() => router.push('/')}
              className="cursor-pointer"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              AUDIT LOGGER
            </Typography>
            {!currentUser ? (
              <Box>
                <Button
                  onClick={() => router.push('/login')}
                  sx={{ marginRight: 2 }}
                  color="inherit"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push('/signup')}
                  variant="contained"
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  Signup
                </Button>
              </Box>
            ) : (
              <>
                <Typography
                  variant="body1"
                  component="div"
                  className="mr-6 font-bold"
                >
                  Hi, {currentUser.nickname}
                </Typography>
                <Button
                  onClick={() => logoutFn()}
                  variant="contained"
                  color="error"
                >
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Container>{props.children}</Container>
    </Box>
  );
};

export default Layout;
