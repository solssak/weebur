# 🔘 Weebur

## 🔘 프로젝트 소개

Weebur는 Next.js(App Router)와 TypeScript를 기반으로 한 웹 애플리케이션입니다.   
과제 요구사항에 따라 사용자 경험, 성능, 코드 품질을 고려하여 요구사항들을 모두 구현했습니다.

## 🔘 기술 스택

- Next.js 14
- TypeScript
- Tailwind CSS
- Pnpm

## 🔘 실행 방법

```bash
pnpm install
pnpm run dev
```

## 🔘 프로젝트 구조

```
src/
├── app/          # Next.js 13+ App Router 구조
├── features/     # 기능별 컴포넌트 및 로직
│   └── Product/
│       └── ...
├── hooks/        # 커스텀 React Hooks
├── types/        # TypeScript 타입 정의
├── ui/           # 재사용 가능한 UI 컴포넌트
└── utils/        # 유틸리티 함수

```

## 🔘 프로젝트 스크린샷

### 🔘 상품 리스트 페이지
|grid|list|
|----|----|
|<img width="952" alt="Screenshot 2025-05-15 at 06 40 28" src="https://github.com/user-attachments/assets/e66ff07b-1543-4198-a669-774f3f4ef06b" />|<img width="952" alt="Screenshot 2025-05-15 at 06 39 37" src="https://github.com/user-attachments/assets/7687ff68-5ea7-484a-9d2b-9223995e6448" />|

### 🔘 무한 스크롤
|grid|list|
|----|----|
|![Screen-Recording-2025-05-15-at-06 32 29](https://github.com/user-attachments/assets/8cbe7c1a-eae0-426e-bd22-f74485c41681)|![Screen-Recording-2025-05-15-at-06 34 30](https://github.com/user-attachments/assets/3ed8fcae-c291-4428-ad63-acd4b7724f85)|
- react-intersection-observer를 활용해 구현하였습니다.
  
### 🔘 검색 및 필터 기능
|grid|list|
|----|----|
|![Screen-Recording-2025-05-15-at-06 55 01_1](https://github.com/user-attachments/assets/72321bb6-c5b1-4d67-b1c9-8d2f9c81e550)|![Screen-Recording-2025-05-15-at-06 53 54_1](https://github.com/user-attachments/assets/b1963d36-9af7-49c0-8475-9c5040e5b3d2)|
