import { useEffect } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ image, tags, onClose }) => {
  useEffect(() => {
    const onCloseModalByEsc = e => e.code === 'Escape' && onClose();

    window.addEventListener('keydown', onCloseModalByEsc);

    return () => window.removeEventListener('keydown', onCloseModalByEsc);
  }, [onClose]);

  const onCloseModalByBackdrop = e => e.currentTarget === e.target && onClose();

  return createPortal(
    <Overlay onClick={onCloseModalByBackdrop}>
      <ModalStyled>
        <img src={image} alt={tags} />
      </ModalStyled>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { Modal };
