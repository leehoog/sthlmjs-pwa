import React, {FC, Ref, useEffect, useRef} from 'react';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import {onAuthStateChanged, User} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth'
import {auth} from "../firebase";

interface Props {
  setUser: (user: User | null) => void,
  user: User | null
}

export const LoginPage: FC<Props> = ({ setUser, user }) => {
  const elementRef = useRef<Element>(null)

  useEffect(() => {

    const uiConfig = {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'popup',
      signInSuccessUrl: '/',
    }

    const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
    if (uiConfig.signInFlow === 'popup')
      firebaseUiWidget.reset()

    const unregisterAuthObserver = onAuthStateChanged(auth, (authUser) => {
      if (!authUser && user)
        firebaseUiWidget.reset()
      setUser(authUser)
    })

    firebaseUiWidget.start(elementRef.current as Element, uiConfig)

    return () => {
      unregisterAuthObserver()
      firebaseUiWidget.reset()
    };
  }, [user, setUser])

  return (
    <div>
      <h3>Login</h3>
      <div ref={elementRef as Ref<any>} />
    </div>
  )
}
