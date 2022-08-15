import { Home } from './pages';
import { Header } from './components';
import { Layout } from './components/Layout/Layout';

function App() {

  return (
    <>
      <Header title="Hacker News"/>
      <Layout>
        <Home />
      </Layout>
    </>
  );
}

export default App;
