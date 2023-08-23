import React from 'react';
import Image, { ImageProps } from '../Image';

interface ImageResultsProps {
    images: ImageProps[];
}

const ImageResults: React.FC<ImageResultsProps> = ({images}) => {
    return (
        <div className="masonry my-8 mx-8">
            {images.map(image => (
                <div key={image.id} className="masonry-item">
                    <Image {...image} />
                </div>
            ))}
        </div>
    );
}

export default ImageResults;
