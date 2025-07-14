import { useState } from "react"


function useLocalStorage<T>(key:string, initialvalue:T) : [val:T,(val:T)=> void]{

    const [value,setValue] = useState<T>(function():T{
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored): initialvalue
    });

    return [value,setValue]
 
}

export default useLocalStorage
