# 스물하나 동물병원 홈페이지 작업 정리

작성일: 2026-05-23

## 프로젝트 개요

스물하나 동물병원의 1페이지 정적 랜딩 홈페이지를 제작했다.

목표는 일반적인 병원 소개형 홈페이지가 아니라, 방문자가 짧은 시간 안에 병원의 이름, 철학, 핵심 강점, 신뢰 포인트를 이해하고 네이버 플레이스, 카카오톡 상담, 블로그, 전화 문의로 이동할 수 있게 만드는 것이다.

현재 구조는 순수 HTML, CSS, JavaScript 기반이며 React, Next.js, Vue, Bootstrap, Tailwind, 외부 라이브러리는 사용하지 않는다.

## 현재 파일 구조

```text
index.html
styles.css
script.js
content.js
editor.html
README.md
upnote-work-summary.md
assets/
  images/
  icons/
pc-reference-homepage/
```

## 핵심 반영 사항

- 메인 히어로의 깨지던 `20 + 1 = 21` 그래픽은 제거했다.
- 나중에 이미지 파일로 대체할 수 있도록 방향을 남겼다.
- 병원 외관 이미지를 홈페이지 상단에 배치했다.
- PC와 모바일 모두 반응형으로 동작하도록 구성했다.
- 모바일/PC 별도 페이지를 만들지 않고 하나의 반응형 페이지로 유지한다.
- 네이버 예약은 아직 받지 않으므로 모든 예약 버튼과 예약 문구를 제거했다.
- 모바일 하단 고정 CTA는 `네이버 플레이스 / 카카오톡 상담`으로 변경했다.
- 진료비용 안내 링크 영역은 유지했다.

## 브랜드와 문구 방향

핵심 슬로건:

```text
스무 살을 넘어, 스물하나까지.
```

보조 메시지:

```text
스무 살의 바램에
한 살을 더합니다.
```

푸터 메시지:

```text
스물하나 동물병원은 아이들에게 ‘내일’을 한 번 더 선물하고 싶은 마음으로 진료합니다.
```

전체 톤은 따뜻하지만 가볍지 않고, 전문적이지만 어렵지 않게 유지했다.

과장 표현은 피하고 아래 방향의 표현을 사용했다.

- 더 신중하게 판단합니다.
- 보호자가 이해할 수 있도록 설명합니다.
- 검사 전 이유와 선택지를 설명합니다.
- 필요한 진료의 우선순위를 함께 정합니다.
- 아이에게 필요한 만큼, 보호자가 납득할 수 있는 만큼.

## 주요 섹션

현재 홈페이지는 아래 흐름으로 구성되어 있다.

```text
상단 병원 외관 이미지
Hero
Brand Story
Philosophy
Collaboration / 의료진 소개
Focus Care
Trust
사진 섹션
CTA
진료비용 안내
Footer
```

## 이미지 작업

모든 홈페이지 이미지 자산은 SVG가 아니라 PNG로 정리했다.

현재 사용 중인 주요 이미지:

```text
assets/images/hospital-exterior.png
assets/images/director-profile1.png
assets/images/director-profile2.png
assets/images/doctor-consultation.png
assets/images/ultrasound-room.png
assets/images/reception-space.png
```

의료진 프로필 기준:

```text
왼쪽: 대표원장 허지성
이미지: assets/images/director-profile2.png

오른쪽: 영상원장 김경은
이미지: assets/images/director-profile1.png
```

상단 외관 사진은 PC에서 1층 간판과 입구가 더 보이도록 기준점을 아래로 조정했다.

모바일에서는 기존처럼 보기 좋은 4:3 중심 구도를 유지했다.

## 의료진 소개 섹션

의료진 소개는 단순 카드에서 프로필형 구성으로 확장했다.

각 카드에는 다음 요소가 있다.

- 세로형 프로필 사진 영역
- 작은 라벨
- 이름/직책
- 역할/진료 분야
- 짧은 소개 문장
- 경력/약력 리스트

경력/약력 리스트에는 점과 구분선을 넣어 읽기 쉽게 만들었다.

## 텍스트 편집기

`editor.html`을 만들어 코드 수정 없이 주요 문구를 수정할 수 있게 했다.

접속 주소:

```text
http://127.0.0.1:8765/editor.html
```

편집 가능한 내용:

- SEO 제목/설명
- 브랜드명
- 메뉴 문구
- 히어로 문구
- 각 섹션 제목/본문
- 의료진 소개 문구
- 의료진 사진 경로
- 의료진 사진 alt 설명
- 의료진 경력/약력 항목
- 버튼 문구
- 푸터 문구

편집 후 `content.js`로 저장하면 홈페이지에 반영된다.

캐시 문제를 줄이기 위해 `content.js`, `script.js`, `styles.css`는 새로고침 때 최신 파일을 불러오도록 처리했다.

## 네이버 예약 제거

네이버 예약은 아직 운영하지 않는다고 해서 관련 내용을 모두 제거했다.

제거한 항목:

- 헤더 예약 버튼
- 모바일 메뉴 예약 링크
- 빠른 이동 카드의 예약 항목
- 마지막 CTA 예약 버튼
- 모바일 하단 고정 예약 버튼
- README의 네이버 예약 placeholder 안내

모바일 하단 고정 버튼은 현재 다음 두 개다.

```text
네이버 플레이스
카카오톡 상담
```

## 배포 관련

정적 사이트이므로 Cloudflare Pages, Netlify, GitHub Pages, Vercel 등에 올릴 수 있다.

테스트용으로 가장 간단한 배포는 Netlify 드래그 앤 드롭 방식이 좋다.

실제 배포 전 교체해야 할 placeholder:

```text
{{NAVER_PLACE_URL}}
{{NAVER_BLOG_URL}}
{{KAKAO_CHANNEL_URL}}
{{PHONE_NUMBER}}
{{PRICE_NOTICE_URL}}
{{OWNER_NAME}}
{{BUSINESS_NUMBER}}
{{ADDRESS}}
{{OPENING_HOURS}}
{{CANONICAL_URL}}
```

진료비용 안내 링크는 동물병원 홈페이지에서 중요하므로 반드시 실제 URL로 연결해야 한다.

## 로컬 확인 방법

PC에서 서버 실행:

```text
python -m http.server 8765 --bind 0.0.0.0
```

PC에서는:

```text
http://127.0.0.1:8765/index.html
```

휴대폰에서는 같은 와이파이에서 PC의 IPv4 주소를 사용한다.

```text
http://PC의IPv4주소:8765/index.html
```

캐시가 남아 있으면 주소 뒤에 숫자를 붙여 새로 불러온다.

```text
http://PC의IPv4주소:8765/index.html?v=1234
```

## 현재 남은 작업 후보

- 실제 네이버 플레이스 URL 연결
- 실제 카카오톡 채널 URL 연결
- 실제 블로그 URL 연결
- 전화번호 연결
- 진료비용 안내 URL 연결
- 대표자명, 사업자등록번호, 주소, 진료시간 입력
- 의료진 경력/약력 실제 문구 확정
- 병원 내부 사진이 준비되면 `doctor-consultation.png`, `ultrasound-room.png`, `reception-space.png` 교체
- 배포 후 canonical URL 반영

## 현재 디자인 방향

- 따뜻한 아이보리/오프화이트 배경
- 딥그린과 차분한 골드 포인트
- 병원 외관 사진을 첫 화면에서 빠르게 보여줌
- 의료 브랜드 느낌을 유지하되 너무 딱딱하지 않게 구성
- 360px 모바일에서도 깨지지 않도록 반응형 처리
- PC에서는 섹션 폭과 문단 폭이 과하게 넓어지지 않도록 조정

