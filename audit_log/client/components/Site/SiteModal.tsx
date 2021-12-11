import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { ISite } from '../../interfaces/ISite';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

interface IProps {
  showModal: boolean;
  setShowModal: any;
}

const BasicModal: React.FC<IProps> = props => {
  return (
    <>
      <Modal open={props.showModal} onClose={() => props.setShowModal(false)}>
        <Box sx={style}>
          <Box>{props.children}</Box>
        </Box>
      </Modal>
    </>
  );
};

export default BasicModal;
