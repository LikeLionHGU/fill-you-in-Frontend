import styles from "../MainPage.module.css";
import styled from "styled-components";
import profileSample from "../../img/profileSample.png";

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    margin-bottom: 0px;
  }
`;

const ProfilePicture = ({ src }) => {
  return (
    <>
      <img src={src} alt="profImg" />
    </>
  );
};
export function ProfileComponent({ post }) {
  return (
    <div className={styles.profile}>
      <>
        <>
          {(!post?.profileImageUrl && post?.profileImageUrl === null) ||
          post?.profileImageUrl === undefined ? (
            <>
              {console.log("no profile", post?.profileImageUrl)}
              <ProfilePicture src={profileSample} />
            </>
          ) : (
            <>
              <ProfilePicture src={post?.profileImageUrl} />
            </>
          )}
        </>
      </>
      <TextWrapper>
        <p className={styles.name}>
          {post.firstName} {post.lastName}
        </p>
        {/* <Wrapper> */}
        <p className={styles.academicInfo1}>
          한동대학교 {post.department} {post.semester}학기
        </p>
        <p className={styles.academicInfo}>{post.email}</p>
        {/* </Wrapper> */}
      </TextWrapper>
    </div>
  );
}
