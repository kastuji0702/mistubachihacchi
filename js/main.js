document.addEventListener("DOMContentLoaded", () => {
    // maskの起動処理
    $(".toggle_btn").on("click", function () {
        $(".mask").toggleClass("active");
    });

    const slider = new Swiper(".slider1", {
        // 基本的な設定
        //スライドを無限にループさせる
        loop: true,
        //自動再生する
        autoplay: {
            display: 2000,
            disableOnInteraction: false, // ユーザー操作後も再開する
        },
        //スライドが切り替わるときのアニメーションの速度を2秒に指定
        speed: 2000,
        //fadeを設定
        effect: "fade",
    });

    // 既存のtoggle_btnクリック処理の下に追加
    $(".mask").on("click", function (e) {
        // メニュー本体以外（黒い部分）をクリックしたら閉じる
        if ($(e.target).hasClass("mask")) {
            $(this).removeClass("active");
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  // 新しいクラス名 .faq__item を使って全てのアコーディオン項目を取得
  const allDetails = document.querySelectorAll('.faq__item');

  allDetails.forEach(details => {
    // 各項目内の要素を新しいクラス名で取得
    const summary = details.querySelector('.faq__summary');
    const answer = details.querySelector('.faq__answer');
    const answerContent = answer.querySelector('.faq__answer-content');

    // 必要な要素が見つからない場合は、エラーを防ぐために処理をスキップ
    if (!summary || !answer || !answerContent) {
      console.error('Accordion structure is missing elements for:', details);
      return;
    }

    summary.addEventListener('click', (event) => {
      // detailsタグのデフォルトの挙動（瞬時に開閉する）をキャンセル
      event.preventDefault();

      // detailsのopen属性で現在の状態をチェック
      if (details.open) {
        // --- 閉じる時のアニメーション ---
        answer.style.height = '0px';
        answer.style.opacity = '0';
        answer.style.paddingTop = '0';
        answer.style.paddingBottom = '0';

        // CSSのtransitionの時間（0.4秒）が経過した後にopen属性を削除
        setTimeout(() => {
          details.open = false;
        }, 400);

      } else {
        // --- 開く時のアニメーション ---
        details.open = true; // 先にopen属性をセット
        
        // コンテンツの実際の高さを取得して適用
        const contentHeight = answerContent.offsetHeight;
        answer.style.height = contentHeight + 'px';
        answer.style.opacity = '1';
        answer.style.paddingTop = '0.3em';
        answer.style.paddingBottom = '1.5em';
      }
    });
  });
});

// 吹き出し部分
$(function () {
  $(window).scroll(function () {

    $(".chat-item").each(function () {
      var scroll = $(window).scrollTop();

      var target = $(this).offset().top;

      var windowHeight = $(window).height();

      if (scroll > target - windowHeight + $(this).outerHeight()) {
        $(this).addClass("speech");
      }
    });

    
  });
});
