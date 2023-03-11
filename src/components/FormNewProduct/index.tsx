import { useForm } from "react-hook-form"
import { NumberFormatBase } from 'react-number-format'

export function FormNewProduct() {
  const { register, handleSubmit, reset } = useForm()

  function setNewProduct(data: any) {
    fetch('/api/setProduct', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(data => alert("Novo Produto cadastrado"))

    reset()
  }

  return (
    <div className="p-5 container-form">
      <form className="flex flex-col" onSubmit={handleSubmit(data => setNewProduct(data))}>

        <div className="flex gap-4 items-end">
          <div className="flex-[1.4]">
            <label htmlFor="title_product">Título do produto</label>
            <input
              {...register("name", {
                required: true
              })}
              type="text"
              id="title_product"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="price">Preço</label>
            <input
              {...register("price", {
                required: true,
              })}
              type="text"
              id="price"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="quantity">Quantidade no estoque</label>
            <input
              {...register("quant", {
                required: true
              })}
              type="number"
              id="quantity"
            />
          </div>
        </div>

        {/* <InputCurrencyNumberFormat placeholder="R$ 99,99" /> */}

        <label htmlFor="desc">Descrição do produto</label>
        <textarea
          {...register("description", {
            required: true
          })}
          id="desc"
        ></textarea>

        <button className="button-primary-style mt-10" type="submit">Enviar</button>
      </form>
    </div>
  )
}


function InputCurrencyNumberFormat(props: any) {
  const format = (numStr: any) => {
    if (numStr === '') return ''

    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(numStr)
  }

  return <NumberFormatBase {...props} format={format} />
}