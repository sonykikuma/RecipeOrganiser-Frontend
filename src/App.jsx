import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header";
import Recipes from "./components/Recipes";
function App() {
  return (
    <>
      <Header />
      <main>
        <Recipes />{" "}
      </main>
    </>
  );
}

export default App;
