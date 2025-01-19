'use client'
import { useState, useEffect } from 'react'

export const useWindowResize = (
    breakpoint = 767,
    isLessThan = false
): boolean => {
    const [showArrows, setShowArrows] = useState<boolean>(true)

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth
            if (isLessThan) {
                setShowArrows(screenWidth < breakpoint)
            } else {
                setShowArrows(screenWidth > breakpoint)
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [breakpoint, isLessThan])

    return showArrows
}
