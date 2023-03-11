import { Dashboard } from "@/components/Dashboard"
import ProductProps from "@/interfaces/ProductProps"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import useSwr from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function InfoProduct() {
  const { query } = useRouter()
  const { productId } = query

  const [quantity, setQuantity] = useState(1)

  const { data, error, isLoading } = useSwr(`/api/getSingleProduct/${productId}`, fetcher)

  if (error) return <div>Não foi possível carregar o produto</div>
  if (isLoading) return <div>Carregando...</div>
  if (!data) return null

  //se passar todos os ifs, ele vai armazenar o data dentro desse product
  const product: ProductProps = data

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Dashboard />

      <section className="flex justify-center items-center min-h-[calc(100vh-98px)] gap-14 max-w-[1200px] mx-auto p-5">

        <Link href="/products" className="fixed top-[110px] left-[40px]">voltar</Link>

        <div className="bg-gray-200 flex-1 h-[300px] rounded-lg grid place-items-center">
          image
        </div>

        <div id="content" className="flex-1">
          <h1 className="text-[2.52rem] leading-[calc(2.52rem+10px)] uppercase font-bold text-[#34BE82] mb-4">{product?.name}</h1>

          <p className="mb-10">
          {product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ab corporis reprehenderit vitae tempora, sint dignissimos magnam sequi sed cupiditate laudantium dolorem animi saepe itaque. Dolor minus vero impedit odit.
          </p>

            <span className="block my-2 font-bold">Estoque: {product.quant}</span>

            <label htmlFor="cep" className="block">Frete:</label>
            <input type="text" name="cep" className="border-2 p-2"/>

          <div className="flex items-center gap-6 mt-9">

            <div className="flex items-center justify-between w-[120px]">
              <button className="plus-less-btn" onClick={() => setQuantity(prev => prev != 1 ? prev - 1 : prev)}>-</button>

              <span>{quantity}</span>

              <button className="plus-less-btn" onClick={() => setQuantity(prev => prev >= 1 ? prev + 1 : prev)}>+</button>
            </div>

          <button className="button-primary-style">
            Adicionar
          </button>

          </div>
        </div>
      </section>
    </>

  )
}
