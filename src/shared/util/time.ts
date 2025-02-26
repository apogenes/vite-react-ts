
export const formatTime = (time: number) => {
  if (time < 0) {
    return "00:00";
  }
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

