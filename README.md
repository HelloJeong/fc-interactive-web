# Interactive-Web

_Fastcampus 인터랙티브 웹 개발 강의 내용을 정리해둔 자료입니다._

# basic

## 404 page

### cubic bezier [참고](https://cubic-bezier.com/)

<img src="./imgs/cubic-bezier-curve.png" style="background:#fff;"/>

> cubic-bezier(P1.x, P1.y, P3.x, P3.y);

- P0과 P2가 고정이고 P1과 P3의 x, y좌표만 잡아주면 됨

```css
animation-timing-function: cubic-bezier(0.35, 0.28, 0.82, 0.87);
```

## firewatch [참고](https://www.firewatchgame.com/)

### parallax Scrolling

- 레이어별 스크롤 속도를 다르게 하여 입체감을 주는 디자인 기법
- 모바일에서는 권장하지 않는 기법 중 하나임
  - `성능` : 저성능 기기에서는 느린 스크롤 등 성능 저하를 야기할 수 있음
  - `입력 방식 차이` : PC의 경우 마우스 또는 트랙패드로 스크롤을 하지만, 모바일은 주로 터치스크린이라 스크롤 속도와 방향 조절을 어렵게 만들 수 있음
  - `화면 방향 전환이 가능` : 모바일 장치는 보통 화면 방향이 자유 자재로 변환한다. 즉, 화면 사이즈, 스크롤 높이 등이 쉽게 바뀔 수 있어 의도대로 동작하지 않을 수 있음
  - `유저 경험` : 위의 사유들이 궁극적으로 유저 경험을 해칠 수 있음

| js                                                                 | css                                         |
| ------------------------------------------------------------------ | ------------------------------------------- |
| 움직임 등에 대해 보다 직접적인 통제가 가능. 즉, 구현 자유도가 높음 | 가볍고 효율적                               |
| 사용자 인풋에 따르는 등 복잡한 인터랙션, 애니메이션도 구현 가능    | 직접 조작 가능한 인터랙티브 요소가 제한적   |
| 하고자 하는 인터랙션 요소에 따라 웹 성능에 지장을 줄 수 있음       | `비교적 간단한 인터랙티브 요소 적용에 적합` |
| `유저 인풋 등과 관계된 인터랙티브가 필요한 경우에 적합`            |

### CSS property

#### CSS perspective

- 해당 요소의 z = 0 평면과 사용자 사이의 거리를 정의
- transform 효과를 주고자 하는 부모 요소에 적용
- 값이 클수록(거리가 멀수록) 변형 효과가 적음
- 값이 작을수록(거리가 가까울수록) 변형 효과가 큼

### layer transform

- 스크롤의 속도와 비슷하면 덜 움직이는 것처럼 보임

### viewport width

```js
const viewportWidth = document.documentElement.clientWidth;
```

- document.documentElement : 웹 페이지의 root 요소(보통 \<html\>)

- document.documentElement.clientWidth : 웹 페이지 root 요소의 너비, 즉 HTML 문서의 너비(border, margin, scrollbar 너비 제외)
