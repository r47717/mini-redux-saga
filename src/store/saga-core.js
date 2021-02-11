let dispatch = null;
let blocked = null;

export function getSagaMiddleware() {
  return sagaMiddleware;
}

function sagaMiddleware(store) {
  dispatch = store.dispatch;

  return (next) => (action) => {
    const { type } = action;

    if (blocked && (blocked.pattern === "*" || blocked.pattern === type)) {
      const { callback } = blocked;
      blocked = null;
      callback();
    }

    return next(action);
  };
}

sagaMiddleware.run = async (rootSaga) => {
  const gen = rootSaga();

  async function step() {
    const { value: effect, done } = gen.next();

    if (!done) {
      const { type, params } = effect;

      switch (type) {
        case "CALL": {
          const [callable, ...args] = params;
          await callable.apply(null, args);
          step();
          break;
        }
        case "PUT":
          dispatch(params);
          step();
          break;
        case "TAKE":
          blocked = {
            pattern: params.type,
            callback: step,
          };
          break;
        default:
          break;
      }
    }
  }

  step();
};

// effects

function effect(type, params) {
  return {
    type,
    params,
  };
}

export function take(pattern) {
  return effect("TAKE", pattern);
}

export function call(...params) {
  return effect("CALL", params);
}

export function put(params) {
  return effect("PUT", params);
}
