import { setNewFavoriteProduct } from "@/database/controllers/favoriteProductController";
import CartProps from "@/interfaces/CartProps";
import ProductToBuyProps from "@/interfaces/ProductStockProps";
import ProductProps from "@/interfaces/ProductToBuyProps";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

export const ClientContext = createContext<any>({})

type typeChildren = {
  children: ReactNode
}

export function ClientContextProvider({ children }: typeChildren) {
  const [total, setTotal] = useState<number>()

  const [cart, setCart] = useState<CartProps>(
    {
      date: "",
      items: [],
      total: total,
    }
  )

  const { data: session } = useSession()


  const addProductToCart = (newProduct: ProductProps) => {
    //verdadeiro ou falso, para saber se o produto ja existe
    const productHasAdd = cart.items.some(item => item?._id === newProduct._id)
    const localDate = new Date()

    if (!productHasAdd) {
      setCart(prev => {
        return {
          date: localDate.toLocaleString(), //data e hora
          items: [...prev.items, newProduct],
          total: updateTotal(),
        }
      })
    }
    else return false
  }

  const removeProductFromCart = (productId: string) => {
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

  const [favorites, setFavorites] = useState<ProductToBuyProps[]>([])

  const productIsFavorite = (productId: string) => {
    return favorites.some(item => item._id == productId)
  }

  const addProductFavorite = async (productId: string) => {

    const email = session?.user?.email

    try {
      // se o produto ainda não for favorito, ele adiciona
      const response = await fetch(`/api/getSingleProduct/${productId}`)
      const product = await response.json()

      fetch("/api/favoriteActions/addProduct", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          product
        })
      })
      
    } catch (error) {
      console.error(error)
    }

    return productId
  }

  const removeProductFavorite = async (productId: string) => {

    const email = session?.user?.email

    try {
      const response = await fetch(`/api/getSingleProduct/${productId}`)
      const { _id } = await response.json()

      fetch("/api/favoriteActions/removeProduct", {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          productId: _id
        })
      })
    } catch (error) {
      console.error(error)
    }

    favorites.map((product, index) => {

      if (product._id == productId) favorites.splice(index, 1)
    })
  }

  const updateQuantityProduct = (id: string, newQuantity: number) => {
    const productToUpdate = cart.items.find((product) => product._id == id)

    if (productToUpdate) productToUpdate.quantity = newQuantity
    updateTotal()
  }

  //finalizar a compra
  const checkout = async (user: any) => {
    let resp = null

    await fetch("/api/setNewBuy", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, cart, favorites })
    })
      .then(data => data.json())
      .then(response => {
        resp = response
      })
      .catch(err => console.error(err))

    if (resp) {
      alert("Sua compra foi feita com sucesso 😍")
      cleanCart(true)
    }

    return resp
  }

  // se não tiver esse atributo, o valor dele será falso por padrão
  //serve para não precisar mostrar o alert de limpar carrinho, caso a função cleanCart seja chamada do checkout
  const cleanCart = (purchasedProducts = false) => {

    if (purchasedProducts) {
      cart.items = []
      updateTotal()

    } else {
      const known = confirm("Tem certeza que deseja limpar o carrinho? Essa ação não tem volta!")

      if (known) {
        cart.items = []
        updateTotal()
        alert("Carrinho limpo")
      }
    }
  }

  const updateTotal = () => {
    const prices: number[] = []

    cart.items.forEach(item => {
      const total = item.price * item.quantity
      prices.push(total)
    })

    const TOTAL = prices.reduce((prev, curr) => prev + curr, 0)
    setTotal(TOTAL)

    setCart({
      ...cart,
      total: Number(TOTAL.toFixed(2))
    })
    return TOTAL
  }

  useMemo(() => updateTotal(), [cart.items.length])

  return (
    <ClientContext.Provider value={{
      cart,
      total,
      favorites,

      addProductToCart,
      removeProductFromCart,
      productIsFavorite,

      removeProductFavorite,
      addProductFavorite,

      updateQuantityProduct,
      checkout,
      cleanCart,
    }}>
      {children}
    </ClientContext.Provider>
  )
}