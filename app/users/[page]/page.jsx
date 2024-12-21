"use client";

import { Spinner } from "@/components/ui/spinner";
import UsersClient from "./UsersClient";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, persistor } from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { setUsers, setError } from '../../redux/slices/userSlice';
import { config } from "@/config"

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <UsersPage />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.users);

  const { data, isLoading: queryLoading, error: queryError } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      if (!users || users.length === 0) {
        try {
          const response = await fetch(config.url || 'https://jsonplaceholder.typicode.com/users');
          const data = await response.json();
          dispatch(setUsers(data));
        } catch (error) {
          dispatch(setError(error.message));
        }
        return data;
      }
      return users;
    },
    enabled: !users || users.length === 0,
  });

  if (queryLoading || isLoading) return <Spinner />;
  if (error) return 'An error has occurred: ' + (error);

  return <UsersClient />;
};
