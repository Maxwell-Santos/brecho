import Head from "next/head"
import { useContext, useEffect, useMemo, useState } from "react"
import { ClientContext } from "@/contexts/clientContext"
import { useRouter } from "next/router"
import { Dashboard } from "@/components/Dashboard"
import Link from "next/link"
import useSwr from 'swr'

import clienteProps from "@/interfaces/clientProviderProps"
import ProductProps from "@/interfaces/ProductStockProps"
import ProductToBuyProps from "@/interfaces/ProductToBuyProps"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function InfoProduct() {
  const { query } = useRouter()
  const { productId } = query
  const { addProductToCard, cart, total }: clienteProps = useContext(ClientContext)

  const [productStatus, setProductStatus] = useState(false)

  function checkStatusProduct() {
    // se já existir no carrinho a função retorna falso, logo 
    const status = addProductToCard(productToBuy)
    if (!status) setProductStatus(true)
  }

  const [quantity, setQuantity] = useState(1)

  const { data, error, isLoading } = useSwr(`/api/getSingleProduct/${productId}`, fetcher)

  //se passar todos os ifs, ele vai armazenar o data dentro desse product
  const product: ProductProps = data

  const productToBuy: ProductToBuyProps = {
    name: product?.name,
    price: product?.price,
    _id: product?._id,
    quantity,
  }

  function searchID() {
    if (product) {
      const statusProduct = cart?.items.some((item: ProductToBuyProps) => item._id === product._id)
      statusProduct ? setProductStatus(true) : setProductStatus(false)
    }
  }

  useEffect(() => searchID(), [product])

  useMemo(() => searchID(), [total])

  if (error) return <div>Não foi possível carregar o produto</div>
  if (isLoading) return <div>Carregando...</div>
  if (!data) return null

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Dashboard />

      <section className="flex flex-col lg:flex-row justify-center items-center min-h-[calc(100vh-96px)] gap-14 max-w-[1200px] mx-auto p-5">

        <Link href="/products" className="fixed left-6 top-6 sm:top-20" title="voltar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
          </svg>

        </Link>

        <div className="bg-gray-200 flex-1 h-[500px] rounded-lg grid place-items-center">
          image
        </div>

        <div id="content" className="flex-1">
          <h1 className="text-[2.52rem] leading-[calc(2.52rem+10px)] uppercase font-bold text-title mb-4">{product?.name}</h1>

          <p className="mb-10">
            {product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ab corporis reprehenderit vitae tempora, sint dignissimos magnam sequi sed cupiditate laudantium dolorem animi saepe itaque. Dolor minus vero impedit odit.
          </p>

          <span className="block my-2 font-bold">Estoque: {product.quant}</span>

          <div className="flex flex-wrap items-center gap-6 mt-9">

            <div className="flex items-center justify-between w-2/3 sm:w-[120px]">
              <button className="plus-less-btn sm:w-full w-fit" onClick={() => setQuantity(prev => prev != 1 ? prev - 1 : prev)}>-</button>

              <span className="px-3">{quantity}</span>

              <button className="plus-less-btn sm:w-full w-fit" onClick={() => setQuantity(prev => prev >= 1 ? prev + 1 : prev)}>+</button>
            </div>

            <button
              className={`button-primary-style flex justify-center gap-5
              ${productStatus && "bg-transparent pointer-events-none text-gray-800"}`
              }
              onClick={() => checkStatusProduct()}
              disabled={productStatus}
            >
              {
                productStatus ? "Produto adicionado!" : (
                  <>
                    <span>Adicionar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                    </svg>
                  </>
                )
              }

            </button>

          </div>
        </div>
      </section>
    </>

  )
}
