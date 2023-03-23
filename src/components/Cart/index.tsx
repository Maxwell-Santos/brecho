import { ClientContext } from "@/contexts/clientContext";
import clienteProps from "@/interfaces/clientProviderProps";
import ProductProps from "@/interfaces/ProductToBuyProps";
import { useSession } from "next-auth/react";
import { useContext } from "react";

interface CartProps {
  open?: any;
}
export function Cart({ open }: CartProps) {
  const { cart, total, checkout, cleanCart }: clienteProps = useContext(ClientContext)
  const { data: session } = useSession()

  function buy() {
    checkout(session?.user).then((data: any) => {
      if (data == null) alert("ocorreu algum problema")
      else console.log(data)
    })
  }

  return (
    <div className="fixed right-6 top-24 pt-8 border-t bg-white p-4 min-w-[300px] shadow-md rounded-lg text-gray-800 z-50">

      <button
        className="absolute top-3 right-3 hover:bg-gray-200 transition-all duration-300 rounded-full p-1"
        onClick={() => open(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-600">
          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>

      </button>
      {
        cart?.items.length > 0 ? (
          <>
            <ul>
              {
                cart?.items.map((item: ProductProps) => (
                  <div key={item._id}>
                    <CartItems name={item?.name} price={item?.price} id={item?._id} quantity={item?.quantity} />
                  </div>
                ))
              }
            </ul>
            <div className="py-2 text-end">
              <span className="font-semibold uppercase text-sm">Total:</span> R$ {total.toFixed(2)}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  cleanCart()
                  open(false)
                }}
                className="text-red-600 p-2 px-4 hover:bg-red-600/20 transition-all duration-300 rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>

              </button>
              <button
                className="button-primary-style p-2 lowercase rounded-md w-full flex justify-between items-center"
                onClick={() => buy()}
              >
                <span className="text-base">comprar</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </button>
            </div>

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
  quantity: number;
}

function CartItems({
  image,
  name,
  price,
  id,
  quantity
}: CartItemsProps) {

  const { removeProductFromCard }: clienteProps = useContext(ClientContext)

  return (
    <li className="w-full flex items-center gap-4 border-b p-2 mb-3">
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

      <div className="ml-auto flex items-center">

        <span className="text-gray-600 mr-3">{quantity}x</span>
        <button
          className="ml-auto"
          onClick={() => removeProductFromCard(id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-700">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </li>
  )
}