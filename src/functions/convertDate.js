/* function for converting the nummber to date in a (dd/mm/yyy) format */
export const convertDate = (number) => {
  var myDate = new Date(number);
  return (
    myDate.getDate() + "/" + (myDate.getMonth() + 1)
  ); /* added 1 beacause the Feb is the 1st index month in js*/
};
