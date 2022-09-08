export const convertDateFormat = (date) => {
  let convertedDate = new Date(date);
  let yy = convertedDate.getFullYear().toString().substring(2, 4);
  let mm = convertedDate.getMonth() + 1;
  let dd = convertedDate.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  convertedDate = yy + "/" + mm + "/" + dd;

  return convertedDate;
};
