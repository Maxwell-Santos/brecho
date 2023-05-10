import { useContext, useMemo, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import { ClientContext } from "@/contexts/clientContext"
import clienteProps from "@/interfaces/clientProviderProps"
import { Cart } from "../Cart"
import { Favorites } from "../Favorites"

export function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { cart }: clienteProps = useContext(ClientContext)

  const logoutUser = async () => {
    const decision = confirm("Tem certeza que deseja sair?")

    if (decision) await signOut()
    else return
  }

  useMemo(() => {
    if (status == 'unauthenticated') router.push("/login")
  }, [session])


  const [openMoreInfo, setOpenMoreInfo] = useState(false)
  const [buys, setOpenBuys] = useState(false)

  return (
    <header id="dashboard" className="mb-5 cursor-pointer z-50 text-white">

      <div className="flex items-center gap-4 relative">
        <nav className="space-x-8 w-fit self-center hidden sm:block">
          <Link className="hover:text-title" href={"/products"}>Produtos</Link>
          <Link className="hover:text-title" href="/history">Compras recentes</Link>
          <Link className="hover:text-title" href={"/form-product"}>Formulário</Link>
        </nav>

        <div className="flex items-center ml-auto relative">

          <Favorites />

          <div className="mr-3">
            <h3
              className="hover:text-title transition-all text-end font-semibold"
              onClick={() => setOpenMoreInfo(!openMoreInfo)}
            >{session?.user?.name}</h3>

            <div className="relative">

              <button
                onClick={() => setOpenBuys(!buys)}
                className="group transition-all hover:text-title w-full flex items-center gap-2"
              >

                <span className="leading-3">meu pedido</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                </svg>

                <span className="absolute -bottom-4 p-1 right-0 z-50 bg-white rounded-full aspect-square text-xs">
                  {cart.items.length}
                </span>

              </button>
              {buys && <Cart open={setOpenBuys} />}
            </div>
          </div>

          <div className="relative w-12 h-16 rounded-lg overflow-hidden">
            {
              session?.user ? (
                <img
                  src={session?.user?.image || 'https://picsum.photos/id/237/200/300'}
                  alt="foto de perfil do usuário"
                />
              ) : (
                <img
                  src={'https://picsum.photos/id/237/200/300'}
                  alt="foto de perfil do usuário"
                />
              )
            }

          </div>

          <span>
            {
              openMoreInfo && (
                <button
                  onClick={() => logoutUser()}
                  className="border-2 rounded-md bg-red-300 border-red-600 hover:bg-red-700 transition-all px-2 text-white absolute -bottom-10 right-0 z-50 shadow-md"
                >
                  Sair
                </button>
              )
            }
          </span>
        </div>
      </div>
    </header>
  )
}
