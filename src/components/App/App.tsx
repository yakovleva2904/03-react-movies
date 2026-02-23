import SearchBar from '../SearchBar/SearchBar.tsx';
import css from './App.module.css';
import searchFunc from '../../services/movieService.ts'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import type { Movie } from '../../types/movie.ts';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import MovieModal from '../MovieModal/MovieModal.tsx';


export default function App() {

  const [films, setFilms] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };

  const submitHandle = async (name: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await searchFunc(name);
      if (data.length === 0) {
      toast.error("No movies found for your request.");
    };
    setFilms(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className={css.App}>
        <SearchBar onSubmit={submitHandle} />
        <MovieGrid movies={films} onSelect={handleSelect}/>
        <Toaster />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {isModalOpen && <MovieModal movie={selectedMovie} onClose={closeModal}/>}
      </div>
    </>
  )
};