import { call, put, takeEvery } from "redux-saga/effects";
import { AnalysisData, Data, Result } from "../interface/ApiData.interface";
import { fetchDataFailure, fetchDataSuccess } from "../store/GraphDataSlice";

function* getGraphDataSaga(action: any): Generator<any, void, any> {
  try {
    const API_ID = process.env.REACT_APP_API_CLIENT_ID;
    const API_SECRET = process.env.REACT_APP_API_CLIENT_SECRET;
    const api_url: string = "/v1/datalab/shopping/category/keyword/age";
    const formData = action.payload;
    const request_body = formData;
    const headers = {
      "Content-Type": "application/json",
      "X-Naver-Client-Id": API_ID as string,
      "X-Naver-Client-Secret": API_SECRET as string,
    };
    const fetchOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(request_body),
    };

    const response = yield call(() => fetch(api_url, fetchOptions));
    const responseData: AnalysisData = yield response.json();
    const forGraphData: Data[] = responseData.results[0].data;
    yield put(fetchDataSuccess(forGraphData));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

export function* watchSaga() {
  yield takeEvery("graphData/fetchDataRequest", getGraphDataSaga);
}
