import React from 'react'
import About from "./Screens/About";
import Home from "./Screens/Home";
import SortingAlgorithms from "./Screens/Sorting-Algorithms";
import Trees from "./Screens/Trees";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

class App extends React.Component {
    //input-area could be it's own component, it probably will end up being one
    render() {
        return (
            <div>
                <div className="visualize-it">
                    <Router basename={"/tm-repo-se-team-3-visualize-it"}>
                        <Switch>
                            <Route path={'/About'}>
                                <About/>
                            </Route>
                            <Route path={'/Sorting-Algorithms'}>
                                <SortingAlgorithms/>
                            </Route>
                            <Route path={'/Trees'}>
                                <Trees/>
                            </Route>
                            <Route path={'/'}>
                                <Home/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
                <div id={"not-supported"}>
                    <h1>We're sorry, we do not support screen sizes this small</h1>
                </div>
            </div>
        );
    }
}

export default App