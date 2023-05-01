const CART_KEY = "cart";

export const saveCart = (cartItems) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }
};

export const loadCart = () => {
    if (typeof window !== "undefined") {
      const cartItems = localStorage.getItem(CART_KEY);
      if (cartItems) {
        const items = JSON.parse(cartItems);
        const groupedItems = items.reduce((acc, curr) => {
          const item = acc.find((item) => item.id === curr.id);
          if (item) {
            item.quantity++;
          } else {
            acc.push({ ...curr, quantity: 1 });
          }
          return acc;
        }, []);
        return groupedItems;
      }
    }
    return [];
  };

  export const addItemToCart = (product) => {
    if (typeof window !== "undefined") {
      const cartItems = loadCart();
      const item = cartItems.find((item) => item.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        cartItems.push({ ...product, quantity: 1 });
      }
      saveCart(cartItems);
    }
  };
  
export const clearCart = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_KEY);
  }
};