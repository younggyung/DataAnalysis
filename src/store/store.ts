import { configureStore } from "@reduxjs/toolkit";
import graphDataSlice from "./GraphDataSlice";
import createSagaMiddleware from 'redux-saga';
import { watchSaga } from "../saga/graphDataSaga";

const mySaga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    graphData: graphDataSlice,
  },
  middleware:[mySaga]
});

mySaga.run(watchSaga);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
