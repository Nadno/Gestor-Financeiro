import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Info from './pages/Info';
import Item from './pages/Item';
import NewItem from './pages/NewItem';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/info" component={Info} />
                <Route path="/item/:id" component={Item} />
                <Route path="/newitem" component={NewItem} />
            </Switch>
        </BrowserRouter>
    );
}