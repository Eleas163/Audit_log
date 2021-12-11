import type { NextPage } from 'next';
import useAuth from '../hooks/useAuth';
import useSite from '../hooks/useSite';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import SiteCard from '../components/Site/SiteCard';

const HomePage: NextPage = () => {
  const { currentUser, isLoading } = useAuth();
  const { siteInfo, isLoading: isSiteLoading, updateSiteFn } = useSite();

  let renderedCard;
  if (isLoading && !siteInfo) renderedCard = <p>Loading...</p>;
  if (siteInfo)
    renderedCard = (
      <SiteCard
        siteInfo={siteInfo}
        isLoading={isSiteLoading}
        updateSiteFn={updateSiteFn}
      />
    );

  return (
    <>
      <Box
        className="flex justify-center items-center"
        sx={{ height: '100vh' }}
      >
        <Card className="max-w-72 max-h-72">
          {!currentUser ? (
            <Typography
              className="m-1"
              gutterBottom
              variant="body1"
              component="h6"
            >
              Please Login or Signup to see site list
            </Typography>
          ) : (
            renderedCard
          )}
        </Card>
      </Box>
    </>
  );
};

export default HomePage;
