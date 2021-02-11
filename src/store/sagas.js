import { call, put, take } from "./saga-core";
import { getData } from "./api";
import { reset, onDataLoadEnd, onDataLoadStart } from ".";

export function* getDataSaga() {
  yield put(onDataLoadStart());
  yield call(getData, 123);
  yield put(onDataLoadEnd());
}

export function* rootSaga() {
  while (true) {
    yield take(reset());
    yield* getDataSaga();
  }
}
