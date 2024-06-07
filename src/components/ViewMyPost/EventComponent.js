import React, { useState } from "react";
import { eventInfoState } from "../atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WritePostModal from "../WritePostModal";

const Wrapper = styled.div`
  border: 2px solid blue;

  > img {
    width: 90px;
    height: 90px;
  }
`;

export default function EventComponent({ categoryId }) {
  const [eventInfo, setEventInfo] = useRecoilState(eventInfoState);
  const navigate = useNavigate();
  return (
    <>
      {eventInfo &&
        eventInfo.map((item) => (
          <Wrapper
            onDoubleClick={() =>
              navigate(
                `/AddFolderPage/${categoryId}/ViewMyPostPage/Detail/${item.id}`
              )
            }
          >
            <img src={item.imageUrl} alt="img" />
            <h3>{item.title}</h3>
            <p>{item.mainText}</p>
          </Wrapper>
        ))}
    </>
  );
}