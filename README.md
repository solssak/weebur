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

## 🔘 프로젝트 구조 및 핵심 파일 정리

```
src/
├── app/                     # Next.js 13+ App Router 구조
├── features/                # 기능별 컴포넌트 및 로직
│   └── Product/
│       └── ProductItems.tsx # 상품 목록 페이지 핵심 컴포넌트
├── hooks/        
│   └── useProduct.ts        # 상품 데이터를 관리하는 커스텀 훅
├── types/                   # TypeScript 타입 정의
├── ui/                      # 재사용 가능한 UI 컴포넌트
└── utils/                   # 유틸리티 함수

```

### 🔘 ProductItems.tsx
상품 목록 페이지의 UI와 상호작용을 담당하는 핵심 컴포넌트입니다.   
- 검색, 정렬, 뷰 모드 전환 등 상품 리스트와 관련된 모든 UI 요소를 관리합니다.
- 사용자가 스크롤을 내릴 때 자동으로 추가 상품을 불러오는 무한 스크롤 기능을 구현합니다.
- 검색어 입력, 정렬 방식 변경 등 사용자의 입력을 받아서 상품 데이터를 갱신합니다.
- 상품 리스트를 그리드/리스트 뷰로 전환할 수 있습니다. (localStroage 활용)
- 실제 데이터 처리(검색, 정렬, 페이징 등)는 모두 커스텀 훅(useProducts)에 위임하고, UI와 사용자 이벤트 처리에 집중합니다.

### 🔘 useProduct.tsx
이 파일은 상품 데이터를 관리하는 커스텀 훅입니다.
- 상품 데이터의 페이징, 검색, 정렬 등 비즈니스 로직을 모두 추상화하여 관리합니다.
- 현재 페이지, 상품 목록, 로딩 상태, 더 불러올 데이터가 있는지 여부 등 상태를 관리합니다.
- 검색어와 정렬 조건을 localStorage에 저장/불러와서 새로고침 후에도 상태가 유지되도록 합니다.
- loadMore 함수로 다음 페이지의 상품을 불러오고,
- search 함수로 검색어에 맞는 상품을 새로 불러오며,
- sort 함수로 정렬 조건에 맞게 상품을 다시 불러옵니다.
- 실제 데이터 요청은 fetchProducts 유틸 함수를 통해 이루어집니다.

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
