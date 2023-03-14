import ProductProps from "@/interfaces/ProductProps";
import { createContext, ReactNode, useMemo, useState } from "react";

export const ClientContext = createContext<any>({})

type typeChildren = {
  children: ReactNode
}

export function ClientContextProvider({children}: typeChildren){
  const [cart, setCart] = useState<ProductProps[]>([])
  const [total, setTotal] = useState<number>()

  const addProductToCard = (newProduct: ProductProps) => {

    const productHasAdd = cart.some(item => item._id === newProduct._id)

    if(!productHasAdd) {
      setCart(products => [...products, newProduct])
      console.log(cart)
    }
    else return false
  }

  const removeProductFromCard = (productId: string) => {
    if(cart.length == 0) return "Carrinho vazio"

    cart.map((product, index) => {
      if(product._id == productId){
        const remove = confirm(`Tirar ${product.name} do carrinho ?`)
      
        if(remove) {
          cart.splice(index, 1)
          updateTotal()
        }
        else return
      }
    })
  }

  //finalizar a compra
  const checkout = () => {
    
  }

  const updateTotal = () => {
    const prices = cart.map(item => item.price )

    const TOTAL = prices.reduce((prev, curr) => prev + curr ,0)

    setTotal(TOTAL)
  }

  useMemo(() => updateTotal(), [cart.length])

  return (
    <ClientContext.Provider value={{
      cart,
      total,

      addProductToCard,
      removeProductFromCard,
      checkout
    }}>
      {children}
    </ClientContext.Provider>
  )
}