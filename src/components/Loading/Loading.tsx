import './Loading.css';
import Illustration from './../../assets/undraw_loading.svg';

export const Loading = () => {
  return (
    <div className="loading">
      <img src={Illustration} alt="Loading Illustration" />
      <span>Loading...</span>
    </div>
  );
};
