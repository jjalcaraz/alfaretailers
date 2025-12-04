'use client'

import { motion } from 'framer-motion'

// Fade in animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Slide up animation variants
export const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Slide in from left
export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Slide in from right
export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Scale animation
export const scale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Stagger animation for lists
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Stagger item
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// Animated Section wrapper
interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scale'
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  animation = 'fadeIn'
}: AnimatedSectionProps) {
  const variants = {
    fadeIn,
    slideUp,
    slideInLeft,
    slideInRight,
    scale
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants[animation]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// Animated Container for staggered children
interface AnimatedContainerProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedContainer({ children, className = '' }: AnimatedContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}

// Animated Item for staggered animations
interface AnimatedItemProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedItem({ children, className = '' }: AnimatedItemProps) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}

// Hover scale animation for buttons and cards
export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
}

// Animated Button wrapper
interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedButton({ children, className = '' }: AnimatedButtonProps) {
  return (
    <motion.div
      className={className}
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}