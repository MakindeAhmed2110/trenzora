'use client'

import { Provider, useDispatch } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'

// Wallet slice
const walletSlice = createSlice({
  name: 'wallet',
  initialState: { connected: false, address: null },
  reducers: {
    connect: (state, action) => {
      state.connected = true
      state.address = action.payload
    },
    disconnect: (state) => {
      state.connected = false
      state.address = null
    },
  },
})

export const { connect, disconnect } = walletSlice.actions

export const makeStore = () =>
  configureStore({
    reducer: {
      wallet: walletSlice.reducer,
    },
  })

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>

// Component to sync Privy state with Redux
function PrivyReduxSync() {
  const { authenticated, user } = usePrivy()
  const dispatch = useDispatch()

  useEffect(() => {
    if (authenticated && user) {
      dispatch(connect(user.wallet?.address || null))
    } else {
      dispatch(disconnect())
    }
  }, [authenticated, user, dispatch])

  // Disconnect on page reload
  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(disconnect())
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [dispatch])

  return null
}

export default function CustomReduxProvider({ children }: { children: React.ReactNode }) {
  const store = React.useMemo(() => makeStore(), [])
  return (
    <Provider store={store}>
      <PrivyReduxSync />
      {children}
    </Provider>
  )
}

