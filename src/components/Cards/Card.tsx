import './Card.css';
import { useDateAgo } from '../../hooks';
import { MouseEvent, useMemo, useState } from 'react';
import { INews } from '../../models';

interface CardProps {
  news: INews;
  favoriteNews: INews[];
  actionClick?: (value: any) => void;
}

export const Card = ({ news, favoriteNews, actionClick }: CardProps) => {

  const { story_title: title, author, created_at: createdAt, objectID } = news;

  const isFavoriteNews = useMemo(
    () => favoriteNews.find( news => news.objectID === objectID),
    [favoriteNews, objectID]);

  const agoTime = useDateAgo(createdAt);
  const [isFavorite, setIsFavorite] = useState(!!isFavoriteNews);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      <div className="card__content">
        <div className="card__content--header">
          <i className='bx bx-time' />
          <span>{agoTime} by {author}</span>
        </div>
        <p className="card__content--body">{title}</p>
      </div>
      <div className="card__action" title={`${isFavorite ? 'Remove Favorite' : 'Add to Favorite'}`}
        onClick={ (e) => {handleClick(e); actionClick && actionClick({id: objectID, isFav: !isFavorite});} }
      >
        {
          isFavorite
            ? <i className='bx bxs-heart bx-sm'/>
            : <i className='bx bx-heart bx-sm'/>
        }
      </div>
    </div>
  );
};
