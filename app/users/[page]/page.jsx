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
  const { users, isLoading: reduxLoading, error: reduxError } = useSelector((state) => state.users);

  const { data: queryData, isLoading: queryLoading, error: queryError } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(config.url || 'https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = response.json();
      dispatch(setUsers(data))
      return data;
    },
    retry: 1,
  });

  const usersToRender = users?.length > 0 ? users : queryData;

  if (queryLoading || reduxLoading) return <Spinner />;
  if (queryError || reduxError) return `An error has occurred: ${reduxError || queryError.message}`;

  return usersToRender ? <UsersClient users={usersToRender} /> : null;
};
