import TrendAnalysis from './components/TrendAnalysis';
import {Provider} from 'react-redux';
import store from './store/store'

function App() {
  return (
    <div>
      <Provider store={store}>
      <TrendAnalysis/>
      </Provider>
    </div>
  );
}

export default App;
