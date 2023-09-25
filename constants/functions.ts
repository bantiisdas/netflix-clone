export const formatDate = (inputDate?: string) => {
  if(!inputDate) return;

  const parts = inputDate.split("-");
  
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  
  return formattedDate;
}

export const formatDuration = (time: number) => {
  if(!time) return
  let formatedTime = '';
  if(time && time > 60){
    let hour = Math.floor(time / 60);
    let minute = Math.round(time % 60);
    formatedTime = `${hour}h ${minute}m`;
    return formatedTime;
  }
}