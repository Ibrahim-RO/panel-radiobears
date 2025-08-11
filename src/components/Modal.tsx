import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Fragment, type ReactNode } from 'react'
import type { JSX } from 'react/jsx-runtime'
import type { EventType } from '../schemas/eventSchema'

type ModalProps = {
    children: ReactNode
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    icon: JSX.Element
    color: string
    id?: EventType['id']
}

export function Modal({ show, setShow, children, title, icon, color, id} : ModalProps) {

    const queryClient = useQueryClient()

    const closeModal = () => {
        setShow(false)
        queryClient.invalidateQueries({queryKey: ["event", id]})
    }

    return (
        <>
            <button
                onClick={() => setShow(true)}
                className={`${color} transition-colors flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer`}
            >
                {icon}
                {title}
            </button>

            <Transition appear show={show} as={Fragment}>
                <Dialog as='div' className="relative z-50" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="bg-black/70 fixed inset-0 flex w-screen items-center justify-center p-4" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-5">
                                    
                                    {children}

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
