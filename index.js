gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector("#scroll-container");

// 1. 브라우저의 기본 스크롤 높이를 컨텐츠 높이와 맞추기
document.body.style.height = container.scrollHeight + "px";

// 2. 부드러운 스크롤 애니메이션
gsap.to(container, {
    y: () => -(container.scrollHeight - window.innerHeight),
    ease: "none",
    scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // 이 숫자가 클수록 더 부드럽고 쫀득하게 움직입니다
        invalidateOnRefresh: true,
    }
});

// 리사이즈 대응
window.addEventListener("resize", () => {
    document.body.style.height = container.scrollHeight + "px";
});



let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const currentScrollY = window.scrollY;

    // 1. 스크롤이 조금이라도 내려가면 얇은 헤더(scrolled)로 변신
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // 2. 내릴 때(Down) 보이고, 올릴 때(Up) 사라지는 로직
    if (currentScrollY > lastScrollY && currentScrollY > 350) {
        // 아래로 스크롤 중 + 인트로 영역을 벗어났을 때 -> 숨김
        header.style.top = "-350px"; 
    } else {
        // 위로 스크롤 중이거나 맨 위일 때 -> 보여줌
        header.style.top = "0";
    }

    lastScrollY = currentScrollY; // 현재 위치를 이전 위치로 저장
});



document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.intro, .page1, .text-zone, .page7, .page8');
  const page5 = document.querySelector('.page5'); // page5만 따로 선택

  const commonObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  targets.forEach(target => commonObserver.observe(target));

  // --- page5 전용 옵저버 ---
  const page5Observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.6 
  });

  if (page5) page5Observer.observe(page5);
});




const navs = document.querySelectorAll('.nav1, .nav2, .nav3');

navs.forEach(nav => {
  const dot = nav.querySelector('.dot');
  const items = nav.querySelectorAll('li');

  // 👉 nav 들어오면
  nav.addEventListener('mouseenter', () => {
    dot.style.opacity = 1;
  });

  // 👉 nav 나가면
  nav.addEventListener('mouseleave', () => {
    dot.style.opacity = 0;
    dot.style.transform = 'scale(0.4)';
  });

  // 👉 각 메뉴 hover
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const offset = item.offsetTop + item.offsetHeight / 2;

      dot.style.transform = `translateY(${offset}px) translateY(-50%) scale(1)`;
    });
  });
});




const footerTop = document.querySelector("footer .contents-top");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    
    if (entry.intersectionRatio > 0.4) {
      footerTop.classList.add("active");
    } else {
      footerTop.classList.remove("active");
    }

  });
}, {
  threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],

  rootMargin: "0px 0px -20% 0px"
});

observer.observe(footerTop);