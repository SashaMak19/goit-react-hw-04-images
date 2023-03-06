import { useState } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, tags, largeImageURL }) => {
  const [isModalOpen, setToggle] = useState(false);

  const onToggleModal = () => {
    setToggle(prevState => !prevState);
  };

  return (
    <Item>
      <Image src={image} alt={tags} onClick={onToggleModal} />
      {isModalOpen && (
        <Modal image={largeImageURL} tags={tags} onClose={onToggleModal} />
      )}
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export { ImageGalleryItem };
