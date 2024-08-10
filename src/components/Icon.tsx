import styled from "styled-components";

type IconProps = {
  src: string;
  position?: string;
  alt: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  $transitionDuration?: string;
  scale?: number;
  width?: string;
  height?: string;
  $mediaWidth?: string;
  $mediaHeight?: string;
};

const IconWrapper = styled.img<IconProps>`
  position: ${(props) => (props.position ? props.position : "relative")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: cover;
  top: ${(props) => (props.top ? props.top : "0px")};
  left: ${(props) => (props.left ? props.left : "0px")};
  bottom: ${(props) => (props.bottom ? props.bottom : "0px")};
  right: ${(props) => (props.right ? props.right : "0px")};
  transition-duration: ${(props) =>
    props.$transitionDuration ? props.$transitionDuration : "none"};
  transform: scale(${(props) => (props.scale ? props.scale : 0)});
  @media (max-width: 400px) {
    width: ${(props) => (props.$mediaWidth ? props.$mediaWidth : props.width)};
    height: ${(props) =>
      props.$mediaHeight ? props.$mediaHeight : props.height};
  }
`;

const Icon = ({
  src,
  position,
  alt,
  top,
  left,
  bottom,
  right,
  $transitionDuration,
  scale,
  width,
  height,
  $mediaHeight,
  $mediaWidth,
}: IconProps) => {
  return (
    <IconWrapper
      src={src}
      position={position}
      alt={alt}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      $transitionDuration={$transitionDuration}
      scale={scale}
      width={width}
      height={height}
      $mediaHeight={$mediaHeight}
      $mediaWidth={$mediaWidth}
    />
  );
};

export default Icon;
