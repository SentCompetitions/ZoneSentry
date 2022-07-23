import {useEffect, useState} from "react";

export default function (): [("tenant" | "owner"), React.Dispatch<React.SetStateAction<"tenant" | "owner">>] {
    const [mode, setMode] = useState<"tenant" | "owner">(localStorage.getItem("mode") as any ?? "tenant")
    
    const onStorage = () => {
        setMode(localStorage.getItem("mode") as any ?? "tenant")
    }

    useEffect(() => {
        localStorage.setItem("mode", mode)
        window.addEventListener("storage", onStorage)
        return () => window.removeEventListener("storage", onStorage)
    }, [mode])

    return [mode, setMode]
}