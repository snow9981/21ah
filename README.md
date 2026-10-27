# 스물하나 동물병원 홈페이지

정식 홈페이지: https://snow9981.github.io/21ah/

## 운영 구조

- 저장소 루트: GitHub Pages에 게시하는 정적 HTML, CSS, JavaScript와 이미지.
- `mobile-renewal/build.cjs`: 문구와 페이지 구성 원본.
- `mobile-renewal/site/styles.css`, `mobile-renewal/site/script.js`: 디자인과 동작 원본.
- `mobile-renewal/price-content.json`: 진료비 항목, 금액 및 적용 기준.
- `mobile-renewal/publication.json`: 정식 주소와 후기 게시 설정.
- 같은 설정의 `googleSiteVerification`: Google Search Console 인증값. 인증을 유지하려면 삭제하지 않습니다.
- `mobile-renewal/site/`: 검색 제외 미리보기. 원본 디자인 확인용이며 정식 대표 주소가 아닙니다.

## 수정 및 배포

1. 원본 문구, 스타일 또는 진료비 자료를 수정합니다.
2. `node mobile-renewal/publish.cjs`를 실행합니다. 이 PC에서는 Codex에 포함된 Node.js 실행 파일을 사용합니다.
3. 생성된 루트 파일과 원본 변경사항을 검토한 뒤 커밋하고 `main`에 푸시합니다.
4. GitHub Pages 배포 완료 후 정식 주소에서 확인합니다.

정식 페이지는 검색 허용이며 실제 대표 주소, 공유 정보 및 `sitemap.xml`을 포함합니다. 구글 Search Console에서 URL 접두사 `https://snow9981.github.io/21ah/`를 인증하고 사이트맵을 제출합니다. 검색 포함과 순위는 보장되지 않습니다.

## 이전 홈페이지 보관

이전 홈페이지의 파일 및 이미지 백업은 `local-backups/prelaunch-2026-10-27/`에 있습니다. 이 폴더는 Git에서 제외됩니다. 원본 Git 커밋은 `8434929`입니다.

기존 의료진·오시는 길·시설·장비 주소는 새 홈페이지의 관련 위치로 이동합니다. 이전 `editor.html` 및 `content.js`는 새 홈페이지의 문구 편집에 사용하지 않습니다.

원본 사진, 검토용 캡처 및 첨부문서는 게시 대상이 아닙니다. 세부 운영 안내는 `mobile-renewal/README.md`를 참고하세요.
