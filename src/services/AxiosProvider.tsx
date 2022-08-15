import axios from 'axios';
import { API_URL, INews } from '../models';
import { useEffect } from 'react';

export const AxiosProvider = ({ children }: any) => {

  // using interceptors only to force their implementation in news data modification (I could implement it inside extrareducer).
  axios.defaults.baseURL = API_URL;

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        if (response.data.hits) {
          const { hits: newsList } = response.data;

          // remove data from array if author, story_title, story_url, created_at is not presented
          response.data.hits = newsList.filter((news: Partial<INews>) =>
            news.author && news.story_title && news.story_url && news.created_at
          );

          return response;
        }

        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
  } , []);

  return children;
};
