import { categoryConstants } from "../action/constants";

const initialState = {
  category: [],
  loading: false,
};

// const buildNewCategories = (id, Categories, category) => {
//   let myCategories = [];

//   for (let cat of Categories) {
//     if (cat.parentId && cat.parentId == id) {
//       myCategories.push({
//         ...cat,
//         children:
//           cat.children && cat.children.length > 0
//             ? buildNewCategories(
//                 id,
//                 [
//                   ...cat.children,
//                   {
//                     _id: category._id,
//                     name: category.name,
//                     parentId: category.parentId,
//                     children: category.children,
//                   },
//                 ],
//                 category
//               )
//             : [],
//       });
//     } else {
//       myCategories.push({
//         ...cat,
//         children:
//           cat.children && cat.children.length > 0
//             ? buildNewCategories(id, cat.children, category)
//             : [],
//       });
//     }
//   }
//   return myCategories;
// };

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.GET_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case categoryConstants.GET_CATEGORY_REQUEST_SUCCESS:
      state = {
        ...state,
        category: action.payload,
        loading: false,
      };
      break;
    case categoryConstants.GET_CATEGORY_REQUEST_FAILURE:
      state = {
        ...initialState,
      };
      break;
    case categoryConstants.ADD_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_CATEGORY_REQUEST_SUCCESS:
      // const updatedCategories = buildNewCategories(
      //     state.category,
      //     action.payload.category
      //   ),
      state = {
        ...state,
        category: action.payload.category,
        loading: false,
      };
      break;
    case categoryConstants.ADD_CATEGORY_REQUEST_FAILURE:
      state = {
        ...initialState,
      };
      break;
  }
  return state;
};
