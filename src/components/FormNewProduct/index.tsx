import { useForm } from "react-hook-form"

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
        <label htmlFor="title_product">Título do produto</label>
        <input
          {...register("name", {
            required: true
          })}
          type="text"
          id="title_product"
        />
        <label htmlFor="price">Preço</label>
        <input
          {...register("price", {
            required: true
          })}
          type="number"
          id="price"
        />
        <label htmlFor="desc">Descrição do produto</label>
        <input
          {...register("description", {
            required: true
          })}
          type="text"
          id="desc"
        />
        <label htmlFor="quantity">Quantidade no estoque</label>
        <input
          {...register("quant", {
            required: true
          })}
          type="number"
          id="quantity"
        />

        <button className="p-3 bg-green-700 hover:bg-green-800 transition-all text-white rounded-full" type="submit">Enviar</button>
      </form>
    </div>
  )
}
