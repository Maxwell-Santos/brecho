import { Splide, SplideSlide, Options } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export function Hero() {

  const optionsSlide: Options = {
    height: 400,
    width: '100%',
    rewind: true,
    type: "loop",
    pagination: false,
    arrows: false,
    autoplay: true,
  }
  return (
    <Splide className='w-full' options={optionsSlide}>
      <SplideSlide>
        <img src="https://images.unsplash.com/photo-1679678691010-894374986c54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80" alt="" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://images.unsplash.com/photo-1659482633347-e56ce63d147b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://images.unsplash.com/photo-1679694140422-aecfd3d5dd0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
      </SplideSlide>
    </Splide>
 )
}
