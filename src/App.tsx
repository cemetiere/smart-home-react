import React, {useState} from 'react';
import NavPanel from "./components/navPanel/NavPanel";

import WelcomePage from "./pages/welcomePage/WelcomePage";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/homePage/HomePage";

function App() {
    const [selected, setSelected] = useState(new Array(5).fill(false))


    return (
    <div className="App">
        <NavPanel links={['/home', '/aboutUs', '']} titles={['Home', 'About Us', 'Hehe']} selected={selected} setSelected={setSelected}/>
        {getPage()}
    </div>
    );

    function getPage(){
        if(selected.reduce((acc, el)=>acc||el, false)===false){
            return <WelcomePage key={Math.random()*100}/>
        } else {
            selected.map((el,i)=> {
                if(selected[i]){
                    switch (i){
                        case 0:
                            if(el===true) {
                                console.log('home')
                                return <HomePage key={i*Math.random()*100}/>
                            }
                            break;
                        case 1:
                            if(el===true) return <AboutUsPage key={i*Math.random()*100}/>
                            break;
                    }
                }


            }
        )}
    }
}

export default App;
