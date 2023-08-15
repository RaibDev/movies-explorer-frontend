export default function getConverterTime(time) {
  
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (hours !== 0) {
    return `${hours}ч${minutes > 0 ? ` ${minutes}м` : ''}`;
  } else {
    return `${minutes > 0 ? ` ${minutes}м` : ''}`;
  }
}