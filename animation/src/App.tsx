import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
// import { useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  /* background-color: rgba(255, 255, 255, 0.2); */
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.2);
`;

// const Circle = styled(motion.div)`
//   background-color: white;
//   height: 70px;
//   width: 70px;
//   place-self: center;
//   border-radius: 35px;
//   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.2);
// `;

// const boxVariants = {
//   start: {
//     opacity: 0,
//     scale: 0.5,
//   },
//   end: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       type: "spring",
//       duration: 0.5,
//       bounce: 0.5,
//       delayChildren: 0.5, // 0.5초 뒤에 자식 애니메이션 시작
//       staggerChildren: 0.2, // 각 자식들 delay 순차적 지정
//     },
//   },
// };

// const circleVariants = {
//   start: {
//     opacity: 0,
//     y: 10, // 위에서 아래로 내려오는 효과
//   },
//   end: {
//     opacity: 1,
//     y: 0,
//   },
// };

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { borderRadius: "100px", scale: 1 },
  drag: {
    backgroundColor: "rgba(46, 204, 113)",
    transition: {
      duration: 10,
    },
  }, // 색상 값을 넣어줄때는 반드시 rgb, rgba를 넣어줘야함
};

function App() {
  // const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const background = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(87, 83, 187), rgb(17, 72, 199))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(158, 236, 98), rgb(53, 174, 73))",
    ]
  );
  const { scrollY, scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  return (
    <Wrapper style={{ background }}>
      <Box drag="x" style={{ x, rotateZ, scale }} />
      {/* <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragConstraints={biggerBoxRef}
          dragElastic={1}
          dragSnapToOrigin
          // dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
          whileDrag="drag"
        > */}
      {/* 기본적으로 motion은 부모의 initial, animate값을 상속 */}
      {/* <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
          <Circle variants={circleVariants} />
        </Box>
      </BiggerBox> */}
    </Wrapper>
  );
}

export default App;
