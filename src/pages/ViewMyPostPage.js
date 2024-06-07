import React, { useEffect, useState } from "react";
import "../../src/font/font.module.css";
import WhiteNavBtns from "../components/WhiteNavBtns";
import ArchiveTimelineSidebar from "../components/ArchiveTimelineSidebar";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { eventInfoState } from "../components/atom";
import EventComponent from "../components/ViewMyPost/EventComponent";
import WritePostModal from "../components/WritePostModal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import imgSample from "../img/profile_rock.png";

const Post = ({ title, createdDate, mainText, imageUrl }) => {
  const sanitizeHtml = require("sanitize-html");

  function stripHTML(html) {
    return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
  }

  const htmlString = mainText;
  let textString = stripHTML(htmlString);
  // console.log(textString);
  if (textString.length > 50) textString = textString.substring(0, 50) + "...";

  return (
    <PostContainer>
      <PostThumbnail>
        {(!imageUrl && imageUrl === null) || imageUrl === undefined ? (
          <>
            {console.log("no profile", imageUrl)}
            <img src={imgSample} alt="thumbnail" />
          </>
        ) : (
          <>
            <img src={imageUrl} alt="thumbnail" />
          </>
        )}

        {/* <img src={imageUrl} alt="thumbnail" /> */}
      </PostThumbnail>
      <PostTextsBox>
        <PostTitle>{title}</PostTitle>
        <PostContent>{textString}</PostContent>
        <PostDate>{createdDate}</PostDate>
      </PostTextsBox>
    </PostContainer>
  );
};

export default function ViewMyPostPage() {
  const [eventInfo, setEventInfo] = useRecoilState(eventInfoState);
  const { id } = useParams();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const [folderName, setFolderName] = useState(null);

  console.log(categoryId);
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
      setFolderName(responseData.folderName);
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
        <Sidebar>
          <ArchiveTimelineSidebar />
        </Sidebar>
        <ViewListContainer>
          <Nav>
            {modalOpen && <WritePostModal setModalOpen={setModalOpen} />}
            <div
              onClick={() => navigate(`/AddFolderPage?${categoryId}`)}
              className="button-go-back"
            >
              <ArrowBackIosIcon />
            </div>
            <p className="folder-title">{folderName}</p>
            <div onClick={showModal} className="button-add-post">
              <AddCircleOutlinedIcon />
            </div>
          </Nav>
          {/* <EventComponent categoryId={categoryId} /> */}
          <ListWrapper>
            {/* {eventInfo.map((event) => ( */}
            {Array.isArray(eventInfo) &&
              eventInfo.map((event) => (
                <div
                  onClick={() =>
                    navigate(
                      `/AddFolderPage/${categoryId}/ViewMyPostPage/Detail/${event.id}`
                    )
                  }
                >
                  <Post
                    key={event.id}
                    title={event.title}
                    createdDate={event.createdDate}
                    mainText={event.mainText}
                    imageUrl={event.imageUrl}
                  />
                </div>
              ))}
          </ListWrapper>
        </ViewListContainer>
      </Wrapper>
    </>
  );
}

const Sidebar = styled.div`
  display: flex;
  /* border: 2px solid purple; */
`;

const ViewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* border: 2px solid pink; */
  padding-left: 5%;
  padding-right: 5%;
`;
const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  /* border: 2px solid green; */
  /* > div {
    cursor: pointer;
  } */
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  /* border: 2px solid red; */
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid black;
  /* border: 2px solid blue; */

  > .folder-title {
    font-family: "Pretendard";
    font-weight: 500;
  }
  .button-go-back {
    /* border: 2px solid red; */
    cursor: pointer;
    transition: 0.5s;
    > svg {
      /* border: 2px solid red; */
      margin-bottom: -10px;
      transform: scale(1.1);
      color: black;
      font-size: medium;
    }
  }
  .button-add-post {
    /* border: 2px solid red; */
    transform: scale(0.9);
    cursor: pointer;
    transition: 0.5s;
    > svg {
      transform: scale(1.7);
      color: #04b1b1;
      &:hover {
        transform: scale(1.9);
      }
    }
  }
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  /* width: 47%; */
  width: 500px;
  /* border: 2px solid gold; */
  border-bottom: 2px solid lightgray;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const PostThumbnail = styled.div`
  display: flex;
  width: 90px;
  height: 90px;
  padding: 5px 5px;
  /* border: 2px solid gray; */
  > img {
    width: 100%;
  }
`;
const PostTextsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  cursor: pointer;
  /* border: 2px solid red; */
  margin-top: 6px;
`;
const PostTitle = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 14px;
  height: 22%;
  /* border: 2px solid orange; */
`;
const PostContent = styled.div`
  display: flex;
  align-items: center;
  color: gray;
  font-size: 13px;
  height: 60%;
  /* border: 2px solid cyan; */
`;
const PostDate = styled.div`
  display: flex;
  align-items: end;
  color: gray;
  font-size: 12px;
  height: 19%;
  margin-bottom: 0px;

  /* border: 1px solid black; */
`;
