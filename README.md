# CloneCoding2

HTML, CSS, JavaScript로 만든 케이벨로 클론 코딩 프로젝트입니다.

## Vercel 배포

- GitHub 저장소: https://github.com/aego12/CloneCoding2
- Vercel에서 Add New → Project → 위 저장소 Import
- Project Name: `clon`
- Framework Preset: Other
- Root Directory: `./`
- Build Command: 비워 두기
- Output Directory: `.`
- Production Branch: `main`

배포 후 main 브랜치에 push하면 Vercel이 자동으로 다시 배포합니다.

`vercel.json`은 기존 정적 파일을 먼저 제공하고, 그 외 주소는
`index.html`로 연결합니다. 하위 주소를 새로고침해도 홈 화면이 열립니다.
`index.html`의 base 경로는 `/`로 지정하여 하위 주소에서도 정적 파일을 불러옵니다.
별도 하위 페이지 화면은 구현되어 있지 않습니다.
