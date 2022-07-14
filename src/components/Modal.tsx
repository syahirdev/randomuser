import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { closeModal } from "../redux/features/modalSlice";
import { Calendar, Cancel, Mail, Phone, PinAlt } from "iconoir-react";
import Image from "next/image";
import moment from "moment";

export default function Modal() {
  // REFS
  let closeButtonRef = useRef(null);

  // HOOKS
  const dispatch = useAppDispatch();
  const { isOpen, user } = useAppSelector((state) => state.modal);

  // VIEWS
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog initialFocus={closeButtonRef} onClose={() => dispatch(closeModal())}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="flex min-h-full items-center justify-center">
              <Dialog.Panel className="relative w-full max-w-sm rounded-lg bg-white p-6 space-y-2">
                <button
                  onClick={() => dispatch(closeModal())}
                  className="absolute top-2 right-2 text-slate-400"
                  ref={closeButtonRef}>
                  <Cancel/>
                </button>
                <Dialog.Title as="section">
                  <div className="flex flex-col justify-center items-center gap-y-2">
                    {user && (
                      <div
                        className="relative h-28 w-28 rounded-full overflow-hidden outline outline-2 outline-offset-2 outline-slate-400/70 duration-200">
                        <Image
                          src={user.picture.large}
                          alt={user.name.first + " " + user.name.last}
                          layout="fill"/>
                      </div>
                    )}
                    <p className="font-medium text-xl">{user?.name.first + " " + user?.name.last}</p>
                  </div>
                </Dialog.Title>
                <Dialog.Description as="section">
                  <div className="flex flex-col gap-y-1">
                    {user && (
                      <ul className="text-sm text-slate-400 space-y-2">
                        <li>
                          <div className="font-medium">Email</div>
                          <div className="flex gap-x-1.5">
                            <Mail fontSize="12"/>
                            <div>{user.email}</div>
                          </div>
                        </li>
                        <li>
                          <p className="font-medium">Phone Number</p>
                          <div className="flex gap-x-1.5">
                            <Phone fontSize="12"/>
                            <p>{user.phone}</p>
                          </div>
                        </li>
                        <li>
                          <p className="font-medium">Address</p>
                          <div className="flex gap-x-1.5">
                            <PinAlt fontSize="12"/>
                            <p>{user.location.city}, {user.location.state}</p>
                          </div>
                        </li>
                        <li>
                          <p className="font-medium">Date of Birth</p>
                          <div className="flex gap-x-1.5">
                            <Calendar fontSize="12"/>
                            <p>
                              {moment(new Date(user.dob.date)).utc().format("DD/MM/YYYY")}{" "}
                              ({user.dob.age} years old)
                            </p>
                          </div>
                        </li>
                      </ul>
                    )}
                  </div>
                </Dialog.Description>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
