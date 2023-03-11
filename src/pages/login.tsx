import { LoginForm } from "@/components/Login"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Login() {
  const { status, data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status == 'authenticated') router.push("/products")
    // else router.push("/form-product")
  }, [status])
  console.log(data)

  return (
    <>
    <Head>
      <title>Login</title>
    </Head>
      <div className="mx-auto h-screen grid place-items-center bg-[url(/bg-login.jpg)] bg-no-repeat bg-cover bg-blend-darken">
        {
          status != 'authenticated' && <LoginForm />
        }
      </div>
    </>
  )
}