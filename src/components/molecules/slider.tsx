import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

type Props = {
  autoPlay?: boolean;
  interval?: number;
  children: React.ReactNode;
  bullets?: boolean;
};

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const Slider = ({
  autoPlay = false,
  interval = 5000,
  children,
  bullets = false,
}: Props) => {
  return (
    <AutoplaySlider
      play={autoPlay}
      cancelOnInteraction={false}
      interval={interval}
      bullets={bullets}
    >
      {children}
    </AutoplaySlider>
  );
};
