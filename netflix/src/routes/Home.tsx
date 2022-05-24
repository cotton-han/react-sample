import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";

import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;

  // 양쪽 끝에 위치한 박스가 scale up 되면서 잘리지 않게 하기 위함
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5, // 다음 슬라이더 시작과의 Gap을 위해
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5, // 다음 슬라이더 시작과의 Gap을 위해
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

function Home() {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("movies/:id");

  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);

  const [index, setIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  const { scrollY } = useViewportScroll(); // 스크롤이 된 상태에서도 화면 중간에 보여지기 위함

  const clickedMovie =
    bigMovieMatch?.params.id && data?.results.find((movie) => String(movie.id) === bigMovieMatch.params.id);

  const incraseIndex = () => {
    if (data) {
      if (isLeaving) return;
      toggleIsLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleIsLeaving = () => setIsLeaving((prev) => !prev);

  const handleBoxClicked = (movieId: number) => navigate(`/movies/${movieId}`);

  const handleOverlayClick = () => navigate("/");

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner onClick={incraseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleIsLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }} // 튕기는 효과 없애기 위해(linear)
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      layoutId={movie.id + ""}
                      onClick={() => handleBoxClicked(movie.id)}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      {/* 이미지를 넣어주고 싶다면 형제 컴포넌트로 넣는 걸 권장(CSS 이슈 때문에) */}
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch && (
              <>
                <Overlay onClick={handleOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
                <BigMovie style={{ top: scrollY.get() + 100 }} layoutId={bigMovieMatch.params.id}>
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
