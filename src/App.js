import Menu from "./components/MenuComponent";
import {Navbar,NavbarBrand} from "reactstrap"
import './App.css';

function App() {
  return (
    <div >

        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu/>
      </div>
  );
}

export default App;