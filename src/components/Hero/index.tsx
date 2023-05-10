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
        <img src="https://cdn.pixabay.com/photo/2022/11/27/18/01/flower-7620426_960_720.jpg" alt="" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://cdn.pixabay.com/photo/2022/12/19/20/04/duck-7666456_960_720.jpg" alt="" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://cdn.pixabay.com/photo/2023/03/31/18/44/piano-7890735_960_720.jpg" alt="" />
      </SplideSlide>
    </Splide>
 )
}
