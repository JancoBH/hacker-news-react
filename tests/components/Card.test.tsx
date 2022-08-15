import { fireEvent, render } from '@testing-library/react';
import { Card } from '../../src/components';
import { INews } from '../../src/models';

const news: INews = {
  objectID: 1,
  story_id: 1,
  author: 'Juan',
  created_at: '2022-08-15T18:45:04.000Z',
  story_title: 'Title 1',
  story_url: 'https://www.google.com'
};

let favoriteNews: INews[] = [];

describe('Card', () => {

  const renderedCard = render(<Card news={news} favoriteNews={favoriteNews} actionClick={value => handleFavoriteNews(value)} />);

  const handleFavoriteNews = (value: any) => {
    if (value.isFav) {
      const favNews = [news].find( news => news.objectID === value.id);
      // @ts-ignore
      favoriteNews.push(favNews);
    } else {
      favoriteNews = favoriteNews.filter(news => news.objectID !== value.id);
    }
  };

  it('Should add news to favorite list', () => {
    const { getByTitle } = renderedCard;
    const unFavedAction = getByTitle('Add to Favorite');
    fireEvent.click(unFavedAction);
    const favedAction = getByTitle('Remove Favorite');
    expect(favedAction).toBeTruthy();
  });

});
