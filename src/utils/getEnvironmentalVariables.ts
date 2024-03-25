export const getEnvironmentalVariables = () => {
  return {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  };
};

export const isUserAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  return !!token;
};
