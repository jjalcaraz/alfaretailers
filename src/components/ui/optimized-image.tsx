'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  wrapperClassName?: string
  enableBlur?: boolean
  enableFadeIn?: boolean
  lazy?: boolean
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  className,
  wrapperClassName,
  enableBlur = true,
  enableFadeIn = true,
  lazy = true,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={cn(
      'relative overflow-hidden',
      enableFadeIn && 'transition-opacity duration-300',
      isLoading ? 'opacity-0' : 'opacity-100',
      wrapperClassName
    )}>
      {enableBlur && isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
        </div>
      )}

      <Image
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          'transition-transform duration-300 group-hover:scale-105',
          className
        )}
        loading={lazy && !priority ? 'lazy' : 'eager'}
        priority={priority}
        placeholder={enableBlur ? 'blur' : 'empty'}
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
        {...props}
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <div className="text-center p-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  )
}