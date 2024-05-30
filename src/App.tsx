import NavPanel from "./components/NavPanel/NavPanel";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import GodModePage from "./pages/GodMod/GodModPage";
import HomePage from "./pages/HomePage/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SensorsPage from "./pages/SensorsPage/SensorsPage";
import ScenariosPage from "./pages/ScenariosPage/ScenariosPage";
import GodModPage from "./pages/GodMod/GodModPage";

function App() {


    return (
    <div className="App">
        <BrowserRouter>
            <NavPanel links={['/home', '/scenarios', '/god']} titles={['Home', 'Scenarios', 'God mode']}/>
            <Routes>
                <Route path={"/"} element={<WelcomePage/>}/>
                <Route path={"/home"} element={<HomePage/>}/>
                <Route path={"/sensors"} element={<SensorsPage/>}/>
                <Route path={"/scenarios"} element={<ScenariosPage/>}/>
                <Route path={"/god"} element={<GodModPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
    );

}

export default App;
