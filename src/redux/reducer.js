const initialState = {
    data: [{
        id: null,
        title: ''
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CERTAIN_CATEGORY_DATA":
            return { data: action.data }
        default:
            return state
    }
}

const emailInitialState = {
    email: ''
}

const emailReducer = (state = emailInitialState, action) => {
    switch (action.type) {
        case "CREATE_USER":
            return { email: action.email }
        default:
            return state
    }
}

const searchInitialState = {
    searched: []
}

const searchedReducer = (state = searchInitialState, action) => {
    switch (action.type) {
        case "SEARCHED_PRODUCTS":
            return { searched: action.data }
        default:
            return state
    }
}


const basketInitialState = {
    baskets: []
}


const basketReducer = (state = basketInitialState, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET_LIST":
            return {
                baskets: [...state.baskets, action.basket]
            }

        case "REMOVE_FROM_BASKET_LIST":
            const indexOfDeleteProduct = state.baskets.findIndex(p => p.id === action.id);
            state.baskets.splice(indexOfDeleteProduct, 1);
            return {
                baskets: [...state.baskets]
            }
        default:
            return state
    }
}

const wishlistInitialState = {
    likedProducts: []
}

const wishlistReducer = (state = wishlistInitialState, action) => {
    switch (action.type) {
        case "ADD_TO_WISHLIST":
            return {
                likedProducts: [...state.likedProducts, action.product]
            }
        case "REMOVE_FROM_WISHLIST":
            const indexOfDeleteProduct = state.likedProducts.findIndex(p => p.id === action.id);
            state.likedProducts.splice(indexOfDeleteProduct, 1);
            return {
                likedProducts: [...state.likedProducts]
            }
        default:
            return state
    }
}

export { reducer, emailReducer, searchedReducer, basketReducer, wishlistReducer }