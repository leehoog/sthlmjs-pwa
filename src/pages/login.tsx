import React, {FC, Ref, useEffect, useRef} from 'react';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import {onAuthStateChanged} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth'
import {auth} from "../firebase";

interface Props {
  setIsLoggedIn: (value: boolean) => void,
  isLoggedIn: boolean
}

export const LoginPage: FC<Props> = ({ isLoggedIn, setIsLoggedIn }) => {
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
      if (!authUser && isLoggedIn)
        firebaseUiWidget.reset()
      setIsLoggedIn(!!authUser)
    })

    firebaseUiWidget.start(elementRef.current as Element, uiConfig)

    return () => {
      unregisterAuthObserver()
      firebaseUiWidget.reset()
    };
  }, [isLoggedIn, setIsLoggedIn])

  return (
    <div>
      <h3>Login</h3>
      <div ref={elementRef as Ref<any>} />
    </div>
  )
}
