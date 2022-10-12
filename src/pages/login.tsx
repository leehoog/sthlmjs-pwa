import React, {FC, Ref, useEffect, useRef} from 'react';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Auth, GoogleAuthProvider } from 'firebase/auth'

interface Props {
  auth: Auth,
  setUser: (user: User | null) => void,
  user: User | null
}


export const LoginPage: FC<Props> = ({ auth, setUser, user }) => {
  const elementRef = useRef<Element>(null);

  useEffect(() => {
    const uiConfig = {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'popup',
      signInSuccessUrl: '/',
    }

    const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    if (uiConfig.signInFlow === 'popup')
      firebaseUiWidget.reset();

    const unregisterAuthObserver = onAuthStateChanged(auth as any, (authUser) => {
      if (!authUser && user)
        firebaseUiWidget.reset();
      setUser(authUser);
    });

    // Trigger the callback if any was set.
    // if (uiCallback)
    //   uiCallback(firebaseUiWidget);

    firebaseUiWidget.start(elementRef.current as Element, uiConfig);

    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
  }, [user, auth, setUser]);

  return <div className={'#firebase-ui'} ref={elementRef as Ref<any>} />;
}
