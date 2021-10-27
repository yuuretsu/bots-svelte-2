// function myStore(value) {
//   let subscribers = [];
//   let state = value;
//   return {
//     subscribe(listener) {
//       subscribers.push(listener);
//       return () => {
//         const index = subscribers.indexOf(subscriber);
//         if (index !== -1) {
//           subscribers.splice(index, 1);
//         }
//       };
//     },
//     set(newValue) {
//       if (state !== newValue) state = newValue;
//       if (subscribers.length > 0) {
//         subscribers.forEach((s) => s(state));
//       }
//     },
//   };
// }

// export const state = myStore(false);

export class Store<T> {
  private _state: T;
  private _subscribers = new Set<(state: T) => any>();
  constructor(state: T) {
    this._state = state;
  }
  get state() {
    return this._state;
  }
  set state(state: T) {
    this._state = state;
    this._subscribers.forEach(listener => listener(this.state));
  }
  get $() {
    return this.state;
  }
  set $(state: T) {
    this.state = state;
  }
  subscribe(listener: (state: T) => any) {
    this._subscribers.add(listener);
    listener(this.state);
    return () => this._subscribers.delete(listener);
  }
  set(newState: T) {
    this.state = newState;
  }
}