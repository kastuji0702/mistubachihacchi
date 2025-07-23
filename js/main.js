document.addEventListener('DOMContentLoaded', () => {
  const slider = new Swiper('.slider1', {
    // 基本的な設定
  //スライドを無限にループさせる
  loop: true,
  //自動再生する
  autoplay:{
    display: 2000,
    disableOnInteraction: false, // ユーザー操作後も再開する
  },
  //スライドが切り替わるときのアニメーションの速度を2秒に指定
  speed: 2000,
  //fadeを設定
  effect: 'fade',

  });
});



