import NavPanel from "./components/NavPanel/NavPanel";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import HomePage from "./pages/HomePage/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SensorsPage from "./pages/SensorsPage/SensorsPage";

function App() {


    return (
    <div className="App">
        <BrowserRouter>
            <NavPanel links={['/home', '/aboutUs', '']} titles={['Home', 'About Us', 'Hehe']}/>
            <Routes>
                <Route path={"/"} element={<WelcomePage/>}/>
                <Route path={"/home"} element={<HomePage/>}/>
                <Route path={"/sensors"} element={<SensorsPage/>}/>
                <Route path={"/about"} element={<AboutUsPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
    );

}

export default App;
