import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// Modal component
const InfoModal = ({ open, onClose, title, children }) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="modal-title">
    <DialogTitle id="modal-title">
      {title}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {children}
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

const Footer = () => {
  const [openModal, setOpenModal] = useState('');

  const handleOpen = (modalType) => () => setOpenModal(modalType);
  const handleClose = () => setOpenModal('');

  return (
    <footer className="appFooter">
      <div className="footer-content">
        <p>© 2024 E-Commerce, Inc. All rights reserved.</p>
        <div className="footer-links">
          <a href="#!" onClick={handleOpen('about')}>About Us</a>
          <a href="#!" onClick={handleOpen('contact')}>Contact</a>
          <a href="#!" onClick={handleOpen('privacy')}>Privacy Policy</a>
          <a href="#!" onClick={handleOpen('terms')}>Terms of Service</a>
        </div>
      </div>
      {/* Modals */}
      <InfoModal open={openModal === 'about'} onClose={handleClose} title="About Us">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </InfoModal>
      <InfoModal open={openModal === 'contact'} onClose={handleClose} title="Contact">
        For inquiries, please contact us at [email]...
      </InfoModal>
      <InfoModal open={openModal === 'privacy'} onClose={handleClose} title="Privacy Policy">
        Your privacy is important to us. According to GDPR...
      </InfoModal>
      <InfoModal open={openModal === 'terms'} onClose={handleClose} title="Terms of Service">
        By using our service, you agree to the terms outlined...
      </InfoModal>
    </footer>
  );
};

export default Footer;
