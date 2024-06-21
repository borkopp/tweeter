import { defineStore } from 'pinia'
import { ref }         from 'vue'

const StoreInitialize =
  defineStore
  ( 'initialize',
  
    () =>
    { const
        initializers =
          [],

        isInitialized =
          ref(false),

        addInitializer =
          p_initializer => 
          initializers.push(new Promise(resolve => p_initializer(resolve))),

        initialize = 
          () => Promise.all(initializers)
                       .then(() => isInitialized.value = true)
          
      return { addInitializer, initialize, isInitialized }
    }
  )

export default StoreInitialize
