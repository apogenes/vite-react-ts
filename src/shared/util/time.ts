import dayjs from 'dayjs';

type DateFormat = string | number | Date;

export const getAge = (
  birthDate: DateFormat | dayjs.Dayjs,
  minAge?: number,
) => {
  const FULL_YEAR_FORMAT = 'YYYYMMDD';
  const format = String(birthDate).length === 6 ? 'YYMMDD' : FULL_YEAR_FORMAT;
  const today = dayjs();
  const birthday = dayjs(birthDate, format);
  const age = today.diff(birthday, 'years');
  const diffDays = today.diff(birthday, 'days');

  if (format === FULL_YEAR_FORMAT) {
    if (diffDays < 0) {
      // 나이계산 불가
      return 0;
    }

    return age;
  }

  // 연도가 2자리일 경우에만 나이 보정함.
  if (minAge !== 0 || !minAge) {
    minAge = 15; // 나이 최소값 미설정일 때 기본 15세 (가맹점주 나이 기준)
  }

  if (diffDays >= 0 && age >= minAge) {
    return age;
  }

  return today.diff(birthday.subtract(100, 'years'), 'years');
};

export const formatTime = (time: number) => {
  if (time < 0) {
    return "00:00";
  }
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

