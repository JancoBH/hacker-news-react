import './News.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useEffect, useState } from 'react';
import { getFavoriteNews, removeFavoriteNews } from '../../../redux/slices/news-slice';
import { Loading } from '../../../components/Loading/Loading';
import { Card, Pagination } from '../../../components';

const favoriteNewsPerPage = 10;

export const FavesNews = () => {

  const dispatch = useAppDispatch();
  const {favoriteNews, loading, msg} = useAppSelector( state => state.news);

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect( () => {
    dispatch(getFavoriteNews());
  }, []);

  const handleFavoriteNews = (value: any) => {
    if (!value.isFav) {
      dispatch(removeFavoriteNews(value.id));
      if (favoriteNews.length <= (favoriteNewsPerPage + 1)) {
        setCurrentPage(1);
      }
    }
  };

  return (
    <>
      {/* Cards section */}
      <section className="news__card-container">
        {
          loading && !msg
            ?
            <Loading />
            :
            favoriteNews.slice( (favoriteNewsPerPage * currentPage) - favoriteNewsPerPage, currentPage * favoriteNewsPerPage).map(news => (
              <a href={news.story_url} key={news.objectID} target="_blank" rel="noopener noreferrer">
                <Card news={news} favoriteNews={favoriteNews} actionClick={value => handleFavoriteNews(value)} />
              </a>
            ))
        }
        {
          favoriteNews.length === 0 && !loading && !msg && <h3 className="empty">You have no favorite news</h3>
        }
        {
          msg && !loading && <div>{msg}</div>
        }
      </section>

      {/* Pagination section */}
      <section className="news__pagination-container">
        <Pagination
          className="news__pagination"
          currentPage={currentPage}
          totalCount={favoriteNews.length}
          pageSize={favoriteNewsPerPage}
          onPageChange={page => setCurrentPage(page)}
        />
      </section>
    </>
  );
};
