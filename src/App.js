import styles from './App.module.css';
import Layout from './components/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder/>
        <p>Test Layout</p>
      </Layout>
    </div>
  );
}

export default App;
