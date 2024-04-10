import NavPanel from "./components/navPanel/NavPanel";
import WelcomePage from "./pages/welcomePage/WelcomePage";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/homePage/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {


    return (
    <div className="App">
        <BrowserRouter>
            <NavPanel links={['/home', '/aboutUs', '']} titles={['Home', 'About Us', 'Hehe']}/>
            <Routes>
                <Route path={"/"} element={<WelcomePage/>}/>
                <Route path={"/home"} element={<HomePage/>}/>
                <Route path={"/about"} element={<AboutUsPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
    );

}

export default App;
