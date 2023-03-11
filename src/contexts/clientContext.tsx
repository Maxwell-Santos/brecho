import ProductProps from "@/interfaces/ProductProps";
import { createContext, ReactNode, useState } from "react";

const ClientContext = createContext({})

type typeChildren = {
  children: ReactNode
}

export function ClientContextProvider({children}: typeChildren){
  const [cart, setCart] = useState<ProductProps[]>([])

  const addProductToCard = (newProduct: ProductProps) => {
    //ainda falta atualizar a quantidade no estoque do produto
    setCart(products => [...products, newProduct])
  }

  const removeProductFromCard = (productId: string) => {
    if(cart.length == 0) return "Carrinho vazio"

    cart.map((product, index) => {
      if(product._id == productId){
        cart.splice(index, 1)
      }
    })
  }

  //finalizar a compra
  const checkout = () => {
    
  }

  return (
    <ClientContext.Provider value={{
      cart,
      setCart,

      addProductToCard,
      removeProductFromCard
    }}>
      {children}
    </ClientContext.Provider>
  )
}