import { Provider } from 'react-redux';
import './build/style.css';
import { Layout } from './components/layout/Layout';
import store from "../src/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
