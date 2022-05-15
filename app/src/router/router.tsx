import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import ExploreRafflesScreen from '../pages/ExploreRafflesScreen';
import RaffleDetailsScreen from './raffleDetails';
import AdminHomeScreen from '../pages/admin/AdminHomeScreen';
import AdminRaffleScreen from '../pages/admin/AdminRaffleScreen';
import AdminRoute from '../components/AdminRoute';

export const Router: FC = () => (
  <Switch>
    <Route path={`${routes.RAFFLES}/:id`} component={RaffleDetailsScreen} />
    <Route path={routes.RAFFLES} exact component={ExploreRafflesScreen} />
    <AdminRoute>
      <Route path={routes.ADMIN.HOME} exact component={AdminHomeScreen} />
      <Route
        path={`${routes.ADMIN.RAFFLES}/:id`}
        exact
        component={AdminRaffleScreen}
      />
    </AdminRoute>
  </Switch>
);
