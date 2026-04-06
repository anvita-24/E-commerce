const initialState = {
    products: []
}

export const getProductsReducers = (state = initialState, action) => {
    switch(action.type) {
        case "SUCCESS_GET_PRODUCTS":
            return { ...state, products: action.payload }
        case "FAIL_GET_PRODUCTS":
            return { ...state, error: action.payload }
        default:
            return state
    }
}