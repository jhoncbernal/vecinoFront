
export default function handleProducts
    (property: string, operation: string,shoppingCart: any) {
      try {
        const productCart: any = {};
        const pendingShopingCar = shoppingCart;
        if (operation === "Add" && shoppingCart[`${property}`] >= 0) {
          productCart[`${property}`] = shoppingCart[`${property}`] + 1;
         return productCart;
        } else if (operation === "Less" && shoppingCart[`${property}`] > 0) {
          productCart[`${property}`] = shoppingCart[`${property}`] - 1;
          if (productCart[`${property}`] === 0) {
            delete pendingShopingCar[`${property}`];
            return pendingShopingCar;
          } else {
            return productCart;
          }
        } else if (operation !== "Less") {
          productCart[`${property}`] = 1;
          return productCart;
        }
      } catch (e) {
        console.error(e);
      }
    }
