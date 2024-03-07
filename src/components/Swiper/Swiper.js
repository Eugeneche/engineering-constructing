import React, { useEffect, useRef } from 'react'
import { register } from 'swiper/element/bundle'

export function Swiper(props) {

  const swiperRef = useRef(null)
  const {
    children,
    ...rest
  } = props

  useEffect(() => {
    // Register Swiper web component
    register()

    // pass component props to parameters
    const params = {
        ...rest,
        injectStyles: [
          `

            .swiper-pagination {
              position: static;
            }
            .swiper-button-next,
            .swiper-button-prev {
              color: #02ff00;
            }
            .swiper-button-next {
              right: 0;
            }
            .swiper-button-prev {
              left: 0;
            }
        `,
        ],
      }

    // Assign it to swiper element
    Object.assign(swiperRef.current, params)

    // initialize swiper
    swiperRef.current.initialize()
  }, [])

  return (
    <swiper-container init="false" ref={swiperRef}>
      {children}
    </swiper-container>
  )
}
export function SwiperSlide(props) {
  const {
    children,
    ...rest
  } = props

  return (
    <swiper-slide {...rest}>
      {children}
    </swiper-slide>
  )
}