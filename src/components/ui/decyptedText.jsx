import { useEffect, useRef, useState } from "react"

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

  const scramble = () => {
    setDisplayText(
      text
        .split("")
        .map(char => {
          if (char === " ") return " "
          return characters[Math.floor(Math.random() * characters.length)]
        })
        .join("")
    )
  }

  const startScrambling = () => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(scramble, speed)
  }

  const stopScrambling = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setDisplayText(text)
  }

  useEffect(() => {
    startScrambling()
    return () => stopScrambling()
  }, [text])

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
