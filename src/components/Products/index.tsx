import { useEffect, useState } from "react"

interface ProductProps {
  name: string,
  price: number,
  description: number,
  quant: number,
}

export function Products() {
  const [products, setProducts] = useState<ProductProps[]>([])

  useEffect(() => {
    fetch('/api/getProducts')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [products])

  return (
    <div className="flex p-5 justify-center">
      {
        products ? (
          products.map((product, index) => (
            <Product
              key={index}
              name={product.name}
              price={product.price}
              description={product.description}
              quant={product.quant}
            />
          ))
        ) : (<span>carregando</span>)
      }
    </div>
  )
}

function Product({ name, description, price, quant }: ProductProps) {

  return (
    <div className="w-[220px] border p-4 rounded-md shadow-sm m-3">

      <h3 className="font-bold uppercase text-center">{name}</h3>
      <p>{description}</p>

      <div className="">
        <span className="text-lg">R${price}</span>
        <span className="block mt-auto">estoque:{quant}</span>
      </div>

    </div>
  )
}