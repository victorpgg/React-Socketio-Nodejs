import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from './pages/Main';
import Id from './pages/Id';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path='/id' component={Id} />
            </Switch>
        </BrowserRouter>
    )
}