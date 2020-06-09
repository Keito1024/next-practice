import React, { useContext } from 'react';

import { currentUserContext } from '../context/User';

const Greeting = () => {
  const currentUser = useContext(currentUserContext)
  return (
    <div>
      Hello {currentUser.userId}
    </div>
  )
}

export default Greeting
