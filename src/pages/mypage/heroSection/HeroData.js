import mainImg from '../heroSection/resources/fail-logs.png';
import mylogImg from '../heroSection/resources/my-fail-log.png';
import likesImg from '../heroSection/resources/likes.png';
import guestbookImg from '../heroSection/resources/guestbook.png';
import profileImg from '../heroSection/resources/my-profile.png';

export const heroData = [
  { id: "info",
    path: "/my-page/profile",
    subTitle: "나를 위한 공간",
    title: "내 정보 관리",
    description: "내 정보를 확인하고 관리해보세요.",
    bgColor: "#EAE4FF",
    img: profileImg,
    align: "left",
    icon: { width: "140px", height: "160px", right: "0px", bottom: "0px" },
    other: {
      subTitle: (nickname) => `${nickname}님을 위한 공간`,
      title: (nickname) => `${nickname}님의 정보`,
      description: (nickname) => `${nickname}님의 프로필을 확인해보세요.`,
    }
  },

  { id: "my-fail-log",
    path: "/my-page/fail-logs",
    subTitle: "내가 작성한 로그를 보고 싶다면",
    title: "마이 페일로그",
    description: "내가 작성한 로그를 볼 수 있어요.",
    bgColor: "#DDE1FF",
    img: mylogImg,
    align: "left",
    icon: { width: "160px", height: "160px", right: "0px", bottom: "0px" },
    other: {
      subTitle: (nickname) => `${nickname}님의 로그를 보고 싶다면`,
      title: (nickname) => `${nickname}님의 페일로그`,
      description: (nickname) => `${nickname}님의 로그를 볼 수 있어요.`,
    }
  },

  { id: "likes",
    path: "/my-page/likes",
    subTitle: "참고하고 싶은 게시글을 모아둔",
    title: "좋아요 한 페일로그",
    description: "좋아요 한 게시글을 모아 볼 수 있어요.",
    bgColor: "#E9F0FF",
    img: likesImg,
    align: "right",
    icon: { width: "140px", height: "140px", right: "0px", bottom: "0px" } },

  { id: "guestbook",
    path: "/my-page/guestbook",
    subTitle: "다른 사람들과 소통하는",
    title: "페일로그 방명록",
    description: "내게 남긴 말을 확인해보세요.",
    bgColor: "#D9EFFF",
    img: guestbookImg,
    align: "left",
    icon: { width: "120px", height: "120px", right: "0px", bottom: "0px" },
    other: {
      subTitle: () => "소통의 흔적을 남겨보세요",
      title: (nickname) => `${nickname}님의 방명록`,
      description: (nickname) => `${nickname}님에게 메시지를 남겨보세요.`,
    }
   },

  { id: "fail-logs",
    path: "/fail-logs",
    subTitle: "페일로그를 작성해보고 싶다면",
    title: "페일로그 바로가기",
    description: "실패를 기록하고 성장의 발판으로 삼으세요.",
    bgColor: "#D7E0FF",
    img: mainImg,
    align: "left",
    icon: { width: "230px", height: "230px", right: "0px", bottom: "-65px" }
  }
];

export const getHeroContent = (pathname) => {
  // /my-page/:handle/section → /my-page/section (남의 페이지 경로 정규화)
  const normalized = pathname.replace(/^\/my-page\/[^/]+\//, '/my-page/');
  const mainContent = heroData.find(item => item.path === normalized) || heroData[0];
  const quickMenus = heroData.filter(item => item.id !== mainContent.id);
  return { mainContent, quickMenus };
};