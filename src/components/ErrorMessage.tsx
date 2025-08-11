import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export const ErrorMessage = ({ children } : ErrorMessageProps) => {
  return (
    <div className="bg-red-100 text-red-600 text-center uppercase font-bold p-2">
        {children}
    </div>
  )
}
