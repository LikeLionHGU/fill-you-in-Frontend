export const GetFirstInfo = async () => {
  const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/categories";

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
    const variable = responseData.categories.map((item) => ({
      name: item.name,
      id: item.id,
      editing: false,
    }));
    return variable[0].id;
  } catch (error) {
    console.error("error", error);
  }
};
