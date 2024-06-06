import React, { useEffect } from "react";
import "../../src/font/font.module.css";
import WhiteNavBtns from "../components/WhiteNavBtns";
import ArchiveTimelineSidebar from "../components/ArchiveTimelineSidebar";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { eventInfoState } from "../components/atom";
import EventComponent from "../components/ViewMyPost/EventComponent";

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const Nav = styled.div`
  margin: 30px 50px 50px;
  padding-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid black;

  > h3 {
    font-family: "Pretendard-SemiBold";
  }
`;
export default function ViewMyPostPage() {
  const [eventInfo, setEventInfo] = useRecoilState(eventInfoState);
  const { id } = useParams();

  const getEventInfo = async () => {
    const url =
      process.env.REACT_APP_BACK_URL + `/api/fillyouin/folders/${id}/events`;

    try {
      const response = await fetch(url, {
        method: "GET", //(+ GET인지 POST인지 명세 확인)
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      const variable = responseData.events.map((item) => ({
        id: item.id,
        title: item.title,
        createdDate: item.createdDate,
        mainText: item.mainText,
        imageUrl: item.imageUrl,
      }));
      setEventInfo(variable);
      console.log(variable);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getEventInfo();
  }, []);
  return (
    <>
      <WhiteNavBtns img="blue" />
      <Wrapper>
        <ArchiveTimelineSidebar />
        <Nav>
          <button>뒤로가기</button>
          <h3>멋쟁이 사자처럼</h3>
          <button>추가하기</button>
        </Nav>
        <EventComponent />
      </Wrapper>
    </>
  );
}
