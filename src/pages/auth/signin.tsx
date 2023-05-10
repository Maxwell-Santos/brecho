import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"

export default function AuthSign() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const router = useRouter()

  const handleInput = (event) => {
    const {value, name} = event.target
    setCredentials({ ...credentials, [name]: value })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    
    signIn("credentials", credentials).then(data =>{
      router.push("/products")

      console.log(data)
    })
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          onChange={handleInput}
        />
        <input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          onChange={handleInput}
        />
        <button>logar</button>
      </form>
    </section>
  )
}
