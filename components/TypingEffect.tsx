'use client'

import { useState, useEffect } from 'react'

export default function TypingEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typingSpeed = isDeleting ? 75 : 150
    const delayBeforeDelete = 2000
    const delayBeforeType = 500

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => {
        if (!isDeleting) {
          // Typing forward
          if (prev.length < text.length) {
            return text.slice(0, prev.length + 1)
          } else {
            // Reached the end, switch to deleting after a pause
            setTimeout(() => setIsDeleting(true), delayBeforeDelete)
            return prev
          }
        } else {
          // Deleting backward
          if (prev.length > 0) {
            return text.slice(0, prev.length - 1)
          } else {
            // Reached the start, switch to typing after a pause
            setTimeout(() => setIsDeleting(false), delayBeforeType)
            return prev
          }
        }
      })
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, text])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500) // blinking speed

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="mb-10 flex items-center font-mono text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100">
      <span className="text-primary-600 mr-2">$ </span>
      <span>{displayedText}</span>
      <span
        className={`bg-primary-500 ml-1 inline-block h-6 w-3 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
      ></span>
    </div>
  )
}
