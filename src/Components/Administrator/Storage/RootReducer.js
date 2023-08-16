const initialState = {
  product: {},
  booking: {},
  userDetails: {},
  address: {},
  bill: {},
  coupon: {},
  order: {},
  pincode: "",
};
export default function RootReducer(state = initialState, actions) {
  switch (actions.type) {
    case "ADD_PRODUCT":
      state.product[actions.payload[0]] = actions.payload[1];
      return { ...state, product: state.product };

    case "ADD_BOOKING":
      state.booking = actions.payload;
      return { ...state, product: state.product, booking: state.booking };

    case "REMOVE_PRODUCT":
      delete state.product[actions.payload];
      return { ...state, product: state.product };

    case "ADD_USER":
      state.userDetails = actions.payload;
      return { ...state, userDetails: state.userDetails };

    case "ADD_ADDRESS":
     
      state.address = actions.payload;
      return { ...state, address: state.address };

    case "ADD_BILL":
      state.bill = actions.payload;
      return { ...state, bill: state.bill };

    case "ADD_COUPON":
      state.coupon = actions.payload;
      return { ...state, coupon: state.coupon };

    case "ADD_ORDER":
      state.order = actions.payload;
      return { ...state, order: state.order };

    case "ADD_PINCODE":
      state.pincode = actions.payload;
      return { ...state, pincode: state.pincode };

    case "DELETE_PINCODE":
      state.pincode = "";
      return { ...state, pincode: state.pincode };

    case "DELETE_USER":
      state.userDetails = {};
      return { ...state, userDetails: state.userDetails };

    case "DELETE_PRODUCT":
      state.product = {};
      return { ...state, product: state.product };

    case "DELETE_COUPON":
      state.coupon = {};
      return { ...state, coupon: state.coupon };

    case "DELETE_ADDRESS":
      state.address = {};
      return { ...state, address: state.address };

    default:
      return state;
  }
}
