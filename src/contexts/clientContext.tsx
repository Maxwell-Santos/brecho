import CartProps from "@/interfaces/cartProps";
import ProductToBuyProps from "@/interfaces/ProductStockProps";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useMemo, useState } from "react";

export const ClientContext = createContext<any>({})

type typeChildren = {
  children: ReactNode
}

export function ClientContextProvider({ children }: typeChildren) {
  const [cart, setCart] = useState<CartProps>(
    {
      date: "",
      items: [],
      total: 0,
    }
  )

  let ITEMS: ProductToBuyProps[] = cart.items

  const [total, setTotal] = useState<number>()

  const addProductToCard = (newProduct: ProductToBuyProps) => {
    const productHasAdd = cart?.items.some(item => item?._id === newProduct._id)
    const localDate = new Date()
    ITEMS = [...ITEMS, newProduct]

    if (!productHasAdd) {
      setCart(prev => {
        return {
          date: localDate.toLocaleString(), //data e hora
          items: [...prev.items, newProduct],
          total: total
        }
      })
      console.log(cart)
    }
    else return false
  }

  const removeProductFromCard = (productId: string) => {
    if (cart?.items.length == 0) return "Carrinho vazio"

    cart?.items.map((product, index) => {
      if (product?._id == productId) {
        const remove = confirm(`Tirar ${product?.name} do carrinho ?`)

        if (remove) {
          cart?.items.splice(index, 1)
          updateTotal()
        }
        else return
      }
    })
  }

  //finalizar a compra
  const checkout = (user: any) => {

    fetch("/api/setNewBuy", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user, cart})
    })
  }

  const updateTotal = () => {
    const prices = cart?.items.map(item => item?.price)

    const TOTAL = prices?.reduce((prev, curr) => prev + curr, 0)

    setTotal(TOTAL)
  }

  useMemo(() => updateTotal(), [cart?.items.length])

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