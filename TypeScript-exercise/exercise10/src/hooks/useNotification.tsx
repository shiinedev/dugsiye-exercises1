import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react"

interface Notification{
    language:string,
    notifications:boolean
}

function useNotification (key:string, initialvalue:Notification) :[val:Notification, (val:Notification) => void] {
  
    const [value,setValue] = useState<Notification>(function ():Notification{
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialvalue
    });

    return [value,setValue]
}

export default useNotification
