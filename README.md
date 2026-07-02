# 스물하나 동물병원 정적 랜딩 홈페이지

스물하나 동물병원의 이름과 철학을 빠르게 전달하고, 방문자가 네이버 플레이스, 블로그, 카카오톡 상담, 전화 문의로 이동하도록 만든 정적 홈페이지입니다.

백엔드, 데이터베이스, 로그인, 자체 예약 폼, 개인정보 수집 폼은 포함하지 않습니다. 순수 HTML, CSS, JavaScript만 사용하며 Cloudflare Pages 또는 Netlify에 바로 배포할 수 있습니다.

## 파일 구조

```text
.
├── index.html
├── care.html
├── team.html
├── philosophy.html
├── content.js
├── editor.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── images/
    └── icons/
```

## placeholder 교체 목록

배포 전 아래 값을 실제 정보로 교체하세요.

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

## 문구 수정 방법

홈페이지의 주요 문구는 `content.js`에 모아두었습니다. 코드를 직접 건드리지 않고 문구를 바꾸고 싶다면 아래 편집기를 사용하세요.

```text
http://127.0.0.1:8765/editor.html
```

사용 순서:

1. `editor.html`을 브라우저에서 엽니다.
2. 수정하고 싶은 문구를 입력창에서 바꿉니다.
3. `content.js 저장` 버튼을 누릅니다.
4. 저장한 파일을 이 폴더의 기존 `content.js`와 교체합니다.
5. `index.html`, `care.html`, `team.html`, `philosophy.html`을 새로고침해 변경 내용을 확인합니다.

Chrome 또는 Edge에서는 저장 창에서 기존 `content.js`를 선택해 덮어쓸 수 있습니다. 브라우저가 직접 저장을 지원하지 않으면 `content.js`가 다운로드되며, 다운로드된 파일을 이 폴더로 옮겨 기존 파일과 교체하면 됩니다.

의료진 소개의 경력/약력과 사진 파일 경로도 편집기에서 수정할 수 있습니다. 기본 프로필 사진 파일명은 `assets/images/director-profile2.png`(대표원장 허지성), `assets/images/director-profile1.png`(영상원장 김경은)입니다. 실제 사진을 같은 파일명으로 교체하면 별도 코드 수정 없이 반영됩니다.

## 링크 교체 방법

각 HTML 파일에서 placeholder 문자열을 검색한 뒤 실제 URL 또는 병원 정보로 바꾸면 됩니다.

- 네이버 플레이스: `{{NAVER_PLACE_URL}}`
- 네이버 블로그: `{{NAVER_BLOG_URL}}`
- 카카오톡 상담: `{{KAKAO_CHANNEL_URL}}`
- 전화: `{{PHONE_NUMBER}}`
- 진료비용 안내: `{{PRICE_NOTICE_URL}}`

전화 링크는 `href="tel:{{PHONE_NUMBER}}"` 형식입니다. 예: `href="tel:0212345678"`

## 진료비용 안내 주의사항

메인 페이지에는 `주요 진료비용 안내` 버튼이 포함되어 있습니다. 실제 배포 전 `{{PRICE_NOTICE_URL}}`을 병원의 실제 진료비용 안내 페이지, 네이버 플레이스 가격 정보, 또는 별도 정적 페이지 주소로 반드시 연결하세요.

## 수정해야 할 병원 정보

- 대표자명
- 사업자등록번호
- 주소
- 전화번호
- 진료시간
- 네이버 플레이스 URL
- 네이버 블로그 URL
- 카카오톡 채널 URL
- 진료비용 안내 URL
- canonical URL

## Cloudflare Pages 배포 방법

1. 이 폴더를 GitHub 저장소에 업로드합니다.
2. Cloudflare Dashboard에서 Pages를 선택합니다.
3. `Create a project`를 누르고 GitHub 저장소를 연결합니다.
4. Framework preset은 `None` 또는 정적 사이트 설정을 선택합니다.
5. Build command는 비워둡니다.
6. Build output directory는 `/` 또는 비워둡니다.
7. 배포 후 발급된 주소를 `{{CANONICAL_URL}}`에 반영합니다.

## Netlify 배포 방법

1. 이 폴더를 GitHub 저장소에 업로드합니다.
2. Netlify에서 `Add new site`를 선택합니다.
3. 저장소를 연결합니다.
4. Build command는 비워둡니다.
5. Publish directory는 `/`로 설정합니다.
6. 배포 후 발급된 주소를 `{{CANONICAL_URL}}`에 반영합니다.

## 로컬 확인

`index.html`을 브라우저에서 바로 열어 확인할 수 있습니다. 메뉴 이동까지 확인하려면 아래처럼 간단한 로컬 서버를 띄워 확인하는 것이 좋습니다.

```text
python3 -m http.server 8765
```

확인 주소:

```text
http://127.0.0.1:8765/index.html
http://127.0.0.1:8765/care.html
http://127.0.0.1:8765/team.html
http://127.0.0.1:8765/philosophy.html
```
