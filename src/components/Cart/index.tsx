import { ClientContext } from "@/contexts/clientContext";
import clienteProps from "@/interfaces/clientProviderProps";
import ProductToBuyProps from "@/interfaces/ProductStockProps";
import { useSession } from "next-auth/react";
import { useContext } from "react";

interface CartProps {
  open?: any;
}
export function Cart({ open }: CartProps) {
  const { cart, total, checkout }: clienteProps = useContext(ClientContext)
  const {data: session} = useSession()

  console.log(cart)

  return (
    <div className="fixed right-6 top-24 pt-8 border-t bg-white p-4 min-w-[300px] shadow-md rounded-lg text-gray-800">

      <button
        className="absolute top-3 right-3"
        onClick={() => open(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600">
          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>

      </button>
      {
        cart?.items.length > 0 ? (
          <>
            <ul>
              {
                cart?.items.map((item: ProductToBuyProps) => (

                  <CartItems name={item?.name} price={item?.price} id={item?._id} />
                ))
              }
            </ul>
            <div className="py-2 text-center">
              <span className="font-semibold uppercase text-sm">Total:</span> {total}
            </div>
            <button
              className="button-primary-style p-2 lowercase rounded-md w-full flex justify-between items-center"
              onClick={() => checkout(session?.user)}
            >
              <span className="text-base">comprar</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
            </button>
          </>
        ) : (
          <div>Carrinho vazio</div>
        )
      }
    </div>
  )
}

interface CartItemsProps {
  name: string;
  price: number;
  image?: string;
  id: string;
}

function CartItems({
  image,
  name,
  price,
  id,
}: CartItemsProps) {

  const { removeProductFromCard }: clienteProps = useContext(ClientContext)

  return (
    <li className="w-full flex items-center gap-4 border-b p-2 mb-3">
      <div className="w-9 h-9 bg-gray-200 rounded-sm inline-block">
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

      <button
        className="ml-auto"
        onClick={() => removeProductFromCard(id)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-700">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clipRule="evenodd" />
        </svg>
      </button>
    </li>
  )
}