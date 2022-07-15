import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { privateRoutes, publicRoutes } from '../../router';
import { IStore } from '../../types/types';

const AppRouter: React.FC = (): ReactElement => {
    const { isAuth } = useSelector((store: IStore) => store);

    return (
        <>
            {isAuth ? (
                <Switch>
                    {privateRoutes.map((route) => (
                        <Route key={route.patch} component={route.component} path={route.patch} exact={route.exact} />
                    ))}
                    <Redirect to="/tasks" />
                </Switch>
            ) : (
                <Switch>
                    {publicRoutes.map((route) => (
                        <Route key={route.patch} component={route.component} path={route.patch} exact={route.exact} />
                    ))}
                    <Redirect to="/start" />
                </Switch>
            )}
        </>
    );
};

export default AppRouter;
