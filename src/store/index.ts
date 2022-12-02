import { configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';

import _ from 'lodash';

import { batchedSubscribe } from 'redux-batched-subscribe';

import userReducer from './user';

const reducer = {
  user: userReducer,
};

const debounceNotify = _.debounce((notify) => notify());

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [batchedSubscribe(debounceNotify)],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
