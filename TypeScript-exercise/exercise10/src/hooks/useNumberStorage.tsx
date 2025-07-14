import { useState } from "react"


function useNumberStorage(key:string,initialvalue:number): [val:number, (val:number)=> void] {
  
    const [value,setValue] = useState<number>( function():number{
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialvalue
    });


    return [value,setValue]
    
}

export default useNumberStorage
