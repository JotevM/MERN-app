export const checkToken = (context) => {
    if (
      Math.floor(new Date().getTime() / 1000) >=
      localStorage.getItem("tokenExpiration")
    ) {
      context.logout();
    }
  };