import './News.css';
import angularLogo from './../../../assets/angular.svg';
import reactLogo from './../../../assets/react.svg';
import vueLogo from './../../../assets/vue.svg';
import { Card, Dropdown, DropdownItem, Pagination } from '../../../components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getHackerNews } from '../../../services/hacker-news';
import { Loading } from '../../../components/Loading/Loading';
import { addFavoriteNews, getFavoriteNews, removeFavoriteNews } from '../../../redux/slices/news-slice';

const selectedFilterOptions = ['Angular', 'React', 'Vue'];

export const AllNews = () => {

  const dispatch = useAppDispatch();
  const {actualNews, favoriteNews, loading, msg} = useAppSelector( state => state.news);
  const {nbPages, hitsPerPage, hits: newsList = []} = actualNews;

  const [selectedFilter, setSelectedFilter] = useState(localStorage.getItem('selectedFilter') || null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect( () => {
    const args = {
      query: selectedFilter,
      page: currentPage,
    };
    dispatch(getHackerNews(args));
  }, [currentPage, selectedFilter]);

  useEffect( () => {
    dispatch(getFavoriteNews());
  }, []);

  const handleFilterSelection = (filter: string) => {
    localStorage.setItem('selectedFilter', filter);
    setSelectedFilter(filter);
  };

  const handleFavoriteNews = (value: any) => {
    if (value.isFav) {
      const favNews = newsList.find( news => news.objectID === value.id);
      dispatch(addFavoriteNews(favNews));
    } else {
      dispatch(removeFavoriteNews(value.id));
    }
  };

  return (
    <>
      {/* Dropdown section */}
      <section className="news__dropdown-container">
        <Dropdown selectedValue={selectedFilter ?? 'Select your news'} className="news__dropdown-container--large">
          {
            selectedFilterOptions.map(filter =>
              <DropdownItem key={filter} value={filter} current={selectedFilter} onItemClick={() => handleFilterSelection(filter)}>
                <img src={filter === 'Angular' ? angularLogo : filter === 'React' ? reactLogo : vueLogo} alt={filter}/>
                {filter}
              </DropdownItem>
            )
          }
        </Dropdown>
      </section>

      {/* Cards section */}
      <section className="news__card-container">
        {
          loading && !msg
            ?
            <Loading />
            :
            newsList.map(news => (
              <a href={news.story_url} key={news.objectID} target="_blank" rel="noopener noreferrer">
                <Card news={news} favoriteNews={favoriteNews} actionClick={value => handleFavoriteNews(value)} />
              </a>
            ))
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
          totalCount={nbPages * hitsPerPage}
          pageSize={nbPages}
          onPageChange={page => setCurrentPage(page)}
        />
      </section>
    </>
  );
};
