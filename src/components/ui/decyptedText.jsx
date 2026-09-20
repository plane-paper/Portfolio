import { useCallback, useEffect, useRef, useState } from "react"

export default function DecryptedText({
  text,
  speed = 50,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  encryptedClassName = "",
  parentClassName = "",
}) {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef(null)
  const isHoveringRef = useRef(false)

  const scramble = useCallback(() => {
    setDisplayText(
      text
        .split("")
        .map(char => {
          if (char === " ") return " "
          return characters[Math.floor(Math.random() * characters.length)]
        })
        .join("")
    )
  }, [characters, text])

  const startScrambling = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(scramble, speed)
  }, [scramble, speed])

  const stopScrambling = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setDisplayText(text)
  }, [text])

  useEffect(() => {
    startScrambling()
    return () => stopScrambling()
  }, [startScrambling, stopScrambling])

  return (
    <span
      className={`inline-block whitespace-pre ${parentClassName}`}
      onMouseEnter={() => {
        isHoveringRef.current = true
        stopScrambling()
      }}
      onMouseLeave={() => {
        isHoveringRef.current = false
        startScrambling()
      }}
    >
      {displayText.split("").map((char, index) => (
        <span
          key={index}
          className={displayText === text ? className : encryptedClassName}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
