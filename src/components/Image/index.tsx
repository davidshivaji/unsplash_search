import React from 'react';

export interface ImageProps {
    id: string;
    urls: {
        small: string;
        [key: string]: string;
    };
    user: {
        username: string;
        links: {
            html: string;
        }
    }
    links: {
        html: string;
    }
}

const Image: React.FC<ImageProps> = ({ id, urls, user, links }) => {
    return (
        <div key={id} className="rounded overflow-hidden shadow-md">
            <a href={links?.html}>
                <img src={urls?.small} alt={id} className="w-full"/>
            </a>
            <div className="p-4">
                <a href={user?.links?.html}>
                    <h5 className="font-bold text-sm">{user?.username}</h5>
                </a>
            </div>
        </div>
    );
}

export default Image;
