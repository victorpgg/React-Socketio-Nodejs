import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from './pages/Main';
import Id from './pages/Id';
import Search from './pages/Search';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path='/id' component={Id} />
                <Route path='/search' component={Search} />
            </Switch>
        </BrowserRouter>
    )
}