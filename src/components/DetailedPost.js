import React from "react";
import WhiteNavBtns from "./WhiteNavBtns";
import ArchiveTimelineSidebar from "./ArchiveTimelineSidebar";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const DetailBodyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* border: 2px solid red; */
  flex-direction: row;
  > div {
    /* border: 2px solid green; */
  }
`;
const DetialContent = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid black; */
  width: 100%;
`;
const ContentHead = styled.div`
  display: flex;
  /* border: 2px solid green; */
  /* cursor: pointer; */
  align-items: center;
  /* width: 100%; */
  height: 7%;
  padding-left: 4%;
`;
const BackButton = styled.div`
  // 뒤로가기 버튼
  display: flex;
  align-items: center;
  /* border: 2px solid gold; */
  cursor: pointer;

  font-size: 23px;
  /* font-size: 1.5vw; */

  /* width: 50px;
  height: 50px; */
`;
const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid blue; */
  height: 100%;
  margin-left: 8%;
  margin-right: 14%;
`;
const PostHead = styled.div`
  display: flex;
  /* border: 2px solid black; */
  width: 100%;
  height: 9%;
  align-items: center;
  justify-content: space-between;
  color: #04b1b1;
  .folder-title {
    display: flex;
    margin-left: 10px;
    font-weight: bold;
    /* color: blue; */

    font-size: 25px;
    /* font-size: 1.3vw; */
  }
  .folder-date {
    display: flex;
    /* color: gold; */
    font-weight: bold;
    /* font-size: 1vw; */
    font-size: 15px;
    margin-right: 10px;
  }
`;

const SettingDots = styled.div`
  display: flex;
  width: 100%;
  height: 3%;
  align-items: center;
  justify-content: end;

  > svg {
    /* border: 2px solid red; */
    /* font-size: 1.5vw; */
    font-size: 23px;
    margin-right: 10px;
    cursor: pointer;
    padding: 2px 2px;
  }
  > svg:hover {
    color: gray;
  }
`;
const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* border: 2px solid orange; */
`;
const PostTitle = styled.div`
  display: flex;
  width: 100%;
  height: 9%;
  /* border: 2px solid purple; */
  align-items: center;
  /* padding-left: 10px; */

  > .post-title {
    // 포스트 제목
    font-weight: bolder;
    font-size: 25px;
    margin-left: 10px;
  }
`;

const PostContent = styled.div`
  display: flex;
  /* border: 2px solid pink; */
  /* width: 100%; */
  height: 100%;
  padding: 10px;
`;

function DetailedPost() {
  return (
    <div>
      <WhiteNavBtns />
      <DetailBodyContainer>
        <ArchiveTimelineSidebar />
        <DetialContent>
          <ContentHead>
            <BackButton>
              <FaChevronLeft />
            </BackButton>
          </ContentHead>
          {/* DetailedPost */}
          <ContentBody>
            <PostHead>
              {/* <PostHeadTitle> */}
              <div className="folder-title">멋쟁이사자처럼_방학 프로젝트</div>
              <div className="folder-date">24.01~ 24.02</div>
              {/* </PostHeadTitle> */}
            </PostHead>
            <SettingDots>
              <HiOutlineDotsHorizontal />
            </SettingDots>
            <PostBody>
              <PostTitle>
                <div className="post-title">첫 해커톤</div>
              </PostTitle>
              <PostContent>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam vitae semper nisi, eu pulvinar massa. Donec lobortis
                  pulvinar egestas. Duis eu felis efficitur, tempus felis eget,
                  gravida orci. Sed finibus neque vel ipsum laoreet, eget
                  vulputate lorem ultrices. Fusce efficitur neque et convallis
                  vehicula. <br /> <br /> Fusce at dictum lacus. Nullam nunc
                  dui, faucibus at volutpat in, ullamcorper eget orci. Nullam
                  volutpat sem ac turpis consectetur pulvinar ut non elit.
                  Curabitur nunc lectus, auctor ac ligula id, porttitor
                  hendrerit nunc. In tempor pretium volutpat. Integer congue
                  rhoncus risus, in tincidunt nisi fringilla id. Donec faucibus
                  pellentesque eros sit amet hendrerit. Sed pellentesque libero
                  gravida purus mattis blandit. Quisque blandit dolor vel
                  dignissim sollicitudin. <br /> <br />
                  Ut sodales lobortis cursus. Suspendisse potenti. Aenean
                  egestas eu dui non dictum. Donec metus metus, tristique at
                  pharetra faucibus, eleifend ac turpis. Integer a egestas
                  ligula. Donec sit amet vulputate tellus. Fusce id egestas
                  ligula. Suspendisse eu quam nulla. Aliquam ac risus libero.{" "}
                  <br /> <br />
                  Quisque vehicula tincidunt massa a interdum. Vestibulum ante
                  ipsum primis in faucibus orci luctus et ultrices posuere
                  cubilia curae; Nullam velit lectus, elementum eu est in,
                  bibendum ultricies augue.
                </div>
              </PostContent>
            </PostBody>
          </ContentBody>
        </DetialContent>
      </DetailBodyContainer>
    </div>
  );
}

export default DetailedPost;
