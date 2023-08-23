import React, { useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';
import { Input, Button, Message } from 'semantic-ui-react';
import { ImageProps } from './components/Image';
import ImageResults from './components/ImageResults';

const unsplash = createApi({
  accessKey: process.env.REACT_APP_ACCESS_KEY as string
});

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<ImageProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearchAttempted(true);
    try {
      const response = await unsplash.search.getPhotos({ query: query });
      if (response.type === 'success') {
        setImages(response.response.results);
      } else {
        setError(response.errors[0] || 'An unknown error occured.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showResults = () => {
    return images.length > 0 ? (
      <ImageResults images={images} />
    ) : (
      <div className="flex justify-center items-center h-full my-8">
        <p className="text-md">No results</p>
      </div>
    )
  }

  return (
    <div className="left-0 right-0 z-10 p-3 bg-white">
      <div className="mx-auto my-5 w-full max-w-md justify-center flex items-center">
        <form onSubmit={handleSearch}>
        <Input 
            type="text"
            icon="search"
            loading={loading}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="mr-2"
        />
        <Button primary type="submit">Search</Button>
        </form>
    </div>

      {error && <p className="text-red-500 text-md">{error}</p>}

      {searchAttempted && !loading && showResults()}

    </div>
  );
}

export default App;
