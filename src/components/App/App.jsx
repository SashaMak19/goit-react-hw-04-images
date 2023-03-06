import { useState, useEffect } from 'react';
import { fetchData } from 'services/pixabay-API';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { LoadMore } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Container } from './App.styled';
import { animateScroll } from 'react-scroll';

export const App = () => {
  const [query, setQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    fetchData(query, page)
      .then(({ hits, totalHits }) => {
        setImages(prevState => [...prevState, ...hits]);
        setShowLoadMore(page < Math.ceil(totalHits / 12));
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, [page, query]);

  const getQueryValue = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  const onLoad = () => {
    setPage(prevState => prevState + 1);
    animateScroll.scrollMore(900, { duration: 1500, delay: 100, smooth: true });
  };

  return (
    <Container>
      <SearchBar onSubmit={getQueryValue} />
      <ImageGallery data={images} />
      {isLoading && <Loader />}
      {!isLoading && showLoadMore && <LoadMore onLoad={onLoad} />}
    </Container>
  );
};
