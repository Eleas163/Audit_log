import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import UpdateSite from './UpdateSite';
import { ISiteProps } from '../../interfaces/ISite';

const SiteCard: React.FC<ISiteProps> = ({
  siteInfo,
  updateSiteFn,
  isLoading
}) => {
  const [showUpdateSite, setShowUpdateSite] = useState<boolean>(false);
  return (
    <>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {siteInfo.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {siteInfo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          onClick={() => {
            setShowUpdateSite(true);
          }}
          size="small"
        >
          Edit
        </Button>
      </CardActions>
      {showUpdateSite && (
        <UpdateSite
          showUpdateSite={showUpdateSite}
          setShowUpdateSite={setShowUpdateSite}
          siteInfo={siteInfo}
          isLoading={isLoading}
          updateSiteFn={updateSiteFn}
        />
      )}
    </>
  );
};

export default SiteCard;
