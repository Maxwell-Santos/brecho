import { ClientContext } from "@/contexts/clientContext"
import clienteProps from "@/interfaces/clientProviderProps"
import Link from "next/link"
import { useContext } from "react"

interface CartItemsProps {
  name: string;
  price: number;
  image?: string;
  id: string;
  quantity: number;
}

export function CartItem({ image, name, price, id, quantity }: CartItemsProps) {

  const { removeProductFromCart }: clienteProps = useContext(ClientContext)

  return (
    <div className="w-full flex items-center gap-4 border-b p-2 mb-3">
      <Link 
      href={`/products/${id}`}
      className="flex items-center p-2"
      >
        <div className="w-9 h-9 bg-gray-200 rounded-sm mr-3">
          {image}
        </div>

        <div className="flex flex-col">
          <span id="name_product" className="text-sm leading-5 font-semibold uppercase">
            {name}
          </span>
          <span className="text-sm">
            R$ {price}
          </span>
        </div>
      </Link>

      <div className="ml-auto flex items-center">

        <span className="text-gray-600 mr-3">{quantity}x</span>
        <button
          className="ml-auto"
          onClick={() => removeProductFromCart(id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-700">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}