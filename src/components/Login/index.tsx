import { signIn } from "next-auth/react"
import Image from "next/image"

export function LoginForm() {

  const loginUser = async () => {
    await signIn()
  }

  return (
    <button
      className="p-3 relative rounded-full flex items-center justify-between shadow-lg hover:shadow-sm transition-all duration-300 bg-white"
      onClick={() => loginUser()}
    >
      <div className="relative w-10 h-10 mr-3">
        <Image
          src="/google.svg"
          alt="Logo Google"
          fill
          objectFit="contain"
        />
      </div>
      <span>entrar com o Google</span>

    </button>
  )
}
