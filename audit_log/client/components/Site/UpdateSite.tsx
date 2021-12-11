import React from 'react';
import SiteForm from './SiteForm';
import SiteModal from './SiteModal';
import { ISiteProps } from '../../interfaces/ISite';

interface IProps extends ISiteProps {
  showUpdateSite: boolean;
  setShowUpdateSite: any;
}

const UpdateSite: React.FC<IProps> = props => {
  const { siteInfo, isLoading, updateSiteFn } = props;

  return (
    <>
      <SiteModal
        setShowModal={props.setShowUpdateSite}
        showModal={props.showUpdateSite}
      >
        <SiteForm
          setShowModal={props.setShowUpdateSite}
          siteValues={siteInfo}
          isLoading={isLoading}
          updateSiteFn={updateSiteFn}
        />
      </SiteModal>
    </>
  );
};

export default UpdateSite;
