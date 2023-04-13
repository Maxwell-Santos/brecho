import { ClientContext } from "@/contexts/clientContext"
import clienteProps from "@/interfaces/clientProviderProps"
import { useContext, useState } from "react"

interface ActionsProps {
  productId: string;
}

export function Actions({ productId }: ActionsProps) {

  const { addProductFavorite, removeProductFavorite, productIsFavorite }: clienteProps = useContext(ClientContext)

  const [toggleFavoriteColor, setToggleFavoriteColor] = useState(productIsFavorite(productId))

  function setFavorite() {
    if (!productIsFavorite(productId)) {
      addProductFavorite(productId)
      setToggleFavoriteColor(true)
    }
    else {
      const saber = confirm("Produto já adicionado, deseja retirar da lista ?")
      if(saber) {
        removeProductFavorite(productId)
        setToggleFavoriteColor(false)
      }
    }
  }

  return (

    <aside className="flex translate-x-full group-hover:translate-x-0 transition-all duration-500 flex-col gap-3 absolute right-0 top-0 p-4 z-50">

      <button
        className={`aspect-square ${toggleFavoriteColor ? 'bg-red-500 hover:bg-red-400' : 'bg-white/50 hover:bg-red-300 backdrop-blur-sm'} transition-all grid place-items-center rounded-md p-1 cursor-pointer`}
        onClick={() => setFavorite()}
      >

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
    </aside>
  )
}
