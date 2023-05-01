export const getCart = () => {
    if (typeof window !== "undefined") {
        const cart = localStorage.getItem('cart')
        return cart ? JSON.parse(cart) : []
    }
  }
  
  export const addToCart = (product) => {
    if (typeof window !== "undefined") {
        const cart = getCart()
        const existingProduct = cart.find(p => p._id === product._id)
    
        if (existingProduct) {
        existingProduct.quantity += product.quantity
        } else {
        cart.push(product)
        }
    
        localStorage.setItem('cart', JSON.stringify(cart))
    }
  }
  
  export const updateCartItem = (productId, newQuantity) => {
    if (typeof window !== "undefined") {
        const cart = getCart()
        const existingProduct = cart.find(p => p._id === productId)
    
        if (existingProduct) {
        existingProduct.quantity = newQuantity
        localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
  }
  
  export const removeCartItem = (productId) => {
    if (typeof window !== "undefined") {
        const cart = getCart()
        const newCart = cart.filter(p => p._id !== productId)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  export const addCartItem = (product) => {
    if (typeof window !== "undefined") {
      const cart = getCart();
      const existingProduct = cart.find((p) => p._id === product._id);
  
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cart.push(product);
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };