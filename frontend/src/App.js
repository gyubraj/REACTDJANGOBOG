import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Category from './components/Category';
import SearchBlog from './components/SearchBlog';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/blog/:id' component={BlogDetail} />
          <Route exact path='/category/:id' component={Category} />
          <Route exact path='/search/search_title=:id' component={SearchBlog} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
