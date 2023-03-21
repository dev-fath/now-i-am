# now-i-am

### 내 위치 기반 일상 기록 앱
- 하이브리드 웹 앱
- 서버리스로 개발하는 것을 목표로 함
- 기획문서 : https://dev-fath.notion.site/549685079ff94b95988b91558e0fecdf

## 기술스택
1. React 
1. Typescript
1. ionic
1. capacitor
1. GCP firebase store
1. GCP fire storage

## 기술 스택 버전
1. React 18
1. Typescript 4.7
1. ionic 6
1. capacitor 4

## 실행방법

```
  yarn start // 웹서버 실행
  yarn start:ios // ios 시뮬레이터에 앱 빌드 및 실행
  yarn start:android  // 안드로이드 시뮬레이터에 앱 빌드 및 실행
  yarn sync // 앱 네이티브 기능 라이브러리 싱크
  yarn sync:ios // ios 라이브러리 싱크
  yarn sync:android // 안드로이드 라이브러리 싱크
  yarn gradle:clean // 안드로이드 그래들 클린
  yarn open:ios // xcode 실행
  yarn open:android // 안드로이드 스튜디오 실행
  yarn build // js build 실행 
  yarn manifest // manifest 
  yarn deploy // 앱 빌드 전 스크립트 파일 배포

```
