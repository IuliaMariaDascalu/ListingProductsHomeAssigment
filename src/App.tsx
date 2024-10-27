import './App.css';
import { Provider } from 'react-redux';
import ProductList from './pages/ProductsListing';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Provider store={store}>
      <ProductList/>
    </Provider>
  );
}

export default App;
