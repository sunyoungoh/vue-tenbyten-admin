export const getItemName = itemId => {
  if (typeof itemId == 'string') {
    itemId = Number(itemId);
  }
  switch (itemId) {
    case 5033569:
      return '2023 심플 플래너';
    case 5033568:
      return '2023 모던 플래너';
    case 5033567:
      return '2023 타임라인 플래너';
    case 5033566:
      return '2023 먼슬리&데일리 플래너';
    case 5033565:
      return '세로형 31DAYS 플래너';
    case 5183538:
      return '가로형 31DAYS 플래너';
    case 5033562:
      return '3년 5년 다이어리';
    case 5033564:
      return '세로형 인덱스 노트';
    case 5033563:
      return '가로형 인덱스 노트';
    case 5033560:
      return '독서노트';
    case 5033558:
      return '영화(드라마)노트';
    case 5261964:
      return '강의노트';
    case 5033557:
      return '먼슬리 트래커북';
    case 5033561:
      return '180 베이직 노트';
    case 5033559:
      return '180 체커보드 노트';
    case 5068583:
      return '레시피북';
    case 5161944:
      return '교환일기';
    case 5161943:
      return '네컷 프레임 스티커';
    case 5234189:
      return '디데이,타임스탬프 스티커';
    case 5413246:
      return '5분 저널';
    default:
      return '';
  }
};
