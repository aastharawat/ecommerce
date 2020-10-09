// import { authConstants } from "../action/constants";

// const initialState = {
//   token: null,
//   user: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     profile: "",
//   },
//   authenticate: false,
//   authenticating: false,
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case authConstants.LOGIN_REQUEST:
//       state = {
//         ...state,
//         authenticating: true,
//       };
//       break;

//     case authConstants.LOGIN_SUCCESS:
//       state = {
//         ...state,
//         user: action.payload.user,
//         token: action.payload.token,
//         authenticate: true,
//         authenticating: false,
//       };
//       break;
//     case authConstants.LOGOUT_REQUEST:
//       state = {
//         ...initialState,
//       };
//       break;
//   }
//   return state;
// };
