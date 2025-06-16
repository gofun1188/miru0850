// 頁面載入後執行所有初始化
document.addEventListener('DOMContentLoaded', function() {
  // 初始化所有功能
  initParticles();
  initMascotAnimations();
  initModalHandlers();
  initButtonEffects();
});

// 粒子效果初始化
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;
  const colors = ['#00e2ff', '#00ccff', '#00fff2', '#00acff'];

  // 創建粒子
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';

    // 隨機大小和位置
    const size = Math.random() * 4 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';

    // 設置不同顏色
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    // 動畫效果
    const duration = Math.random() * 15 + 10;
    particle.style.animation = `float ${duration}s linear infinite`;
    particle.style.opacity = Math.random() * 0.3 + 0.2;

    particlesContainer.appendChild(particle);
  }
}

// 吉祥物動畫初始化 - 修改版本
function initMascotAnimations() {
  const mascot = document.getElementById('mascotButton');
  
  // 確保初始位置（很重要）
  mascot.style.position = 'fixed';
  mascot.style.bottom = '20px';
  mascot.style.right = '15px';
  mascot.style.zIndex = '1000';
  mascot.style.width = '150px';
  mascot.style.height = 'auto';

  // 設置偶爾動畫的間隔（每5-15秒）
  function scheduleNextAnimation() {
    const delay = 5000 + Math.random() * 10000; // 5-15秒之間
    setTimeout(() => {
      occasionalAnimation();
      scheduleNextAnimation(); // 安排下一次
    }, delay);
  }

  // 偶爾動畫函數
  function occasionalAnimation() {
    // 隨機觸發特殊動畫的機會
    if (Math.random() < 0.3) { // 30%的機會
      // 保存當前位置和樣式
      const currentRight = mascot.style.right;
      const currentBottom = mascot.style.bottom;
      
      // 選擇一個隨機動畫
      const animationChoice = Math.floor(Math.random() * 3);

      switch (animationChoice) {
        case 0:
          // 彈跳動畫
          mascot.style.animation = 'none';
          void mascot.offsetWidth; // 強制重新計算
          mascot.style.animation = 'mascotBounceFixed 1s ease-in-out';
          break;
        case 1:
          // 發光脈衝
          createGlowPulse();
          break;
        case 2:
          // 搖晃動畫
          mascot.style.animation = 'none';
          void mascot.offsetWidth; // 強制重新計算
          mascot.style.animation = 'mascotShakeFixed 0.8s ease-in-out';
          break;
      }

      // 特殊動畫後重設為閒置動畫
      setTimeout(() => {
        // 先停止動畫
        mascot.style.animation = 'none';
        
        // 強制重新計算
        void mascot.offsetWidth;
        
        // 恢復原來的位置
        mascot.style.right = currentRight;
        mascot.style.bottom = currentBottom;
        
        // 應用新動畫
        mascot.style.animation = 'mascotIdleFixed 12s ease-in-out infinite';
      }, 1500);
    }
  }

  // 創建發光脈衝效果的函數
  function createGlowPulse() {
    const glowOverlay = document.createElement('div');
    glowOverlay.style.position = 'absolute'; // 使用絕對定位，相對於吉祥物
    glowOverlay.style.top = '0';
    glowOverlay.style.left = '0';
    glowOverlay.style.width = '100%';
    glowOverlay.style.height = '100%';
    glowOverlay.style.borderRadius = '50%';
    glowOverlay.style.boxShadow = '0 0 30px 10px rgba(0, 230, 255, 0.8)';
    glowOverlay.style.opacity = '0';
    glowOverlay.style.transition = 'opacity 1s ease-in-out';
    glowOverlay.style.pointerEvents = 'none';
    glowOverlay.style.zIndex = '1'; // 確保在吉祥物上方

    // 添加到吉祥物 - 關鍵修改：保持固定定位而不是改為相對定位
    mascot.style.position = 'fixed';  // 確保仍然是固定定位
    mascot.style.right = '15px';  // 確保位置
    mascot.style.bottom = '20px'; // 確保位置
    mascot.appendChild(glowOverlay);

    // 動畫
    setTimeout(() => {
      glowOverlay.style.opacity = '0.8';

      setTimeout(() => {
        glowOverlay.style.opacity = '0';

        // 淡出後移除
        setTimeout(() => {
          if (mascot.contains(glowOverlay)) {
            mascot.removeChild(glowOverlay);
          }
        }, 1000);
      }, 1000);
    }, 100);
  }

  // 開始偶爾的動畫
  scheduleNextAnimation();
  
  // 監聽視窗大小變化，確保位置正確
  window.addEventListener('resize', function() {
    // 重置吉祥物位置
    mascot.style.position = 'fixed';
    mascot.style.bottom = '20px';
    mascot.style.right = '15px';
  });
}

// 初始化模態框處理 - 修改為直接跳轉LINE
function initModalHandlers() {
  const mascot = document.getElementById('mascotButton');
  const modal = document.getElementById('contactModal');
  const closeModal = document.querySelector('.close-modal');
  const contactOptions = document.querySelectorAll('.contact-option');
  const registerButton = document.querySelector('.register-button');

  // 修改吉祥物點擊事件 - 直接跳轉到LINE
  mascot.addEventListener('click', function(event) {
    event.preventDefault();

    // 在吉祥物位置創建爆炸效果
    const rect = mascot.getBoundingClientRect();
    const explosionX = rect.left + rect.width / 2;
    const explosionY = rect.top + rect.height / 2;
    createExplosion(explosionX, explosionY);

    // 延遲後直接跳轉到LINE
    setTimeout(() => {
      window.open('https://line.me/ti/p/3GZRYvdqaA', '_blank');
    }, 300);
  });

  // 保留原有的模態框功能，以防需要其他地方調用
  function openModal() {
    modal.style.display = 'block';
    // 強制重繪以確保過渡效果生效
    void modal.offsetWidth;
    // 添加活動類以啟動動畫
    modal.classList.add('modal-active');

    // 添加模態框內部粒子效果
    createModalParticles();

    // 設置連續粒子效果間隔
    const particlesInterval = setInterval(createModalParticles, 5000);
    modal.dataset.particlesInterval = particlesInterval;

    // 防止頁面滾動
    document.body.style.overflow = 'hidden';
  }

  function closeModalFunc() {
    // 清除粒子效果間隔
    clearInterval(parseInt(modal.dataset.particlesInterval || '0'));

    // 移除活動類
    modal.classList.remove('modal-active');

    // 動畫結束後隱藏模態框
    setTimeout(() => {
      modal.style.display = 'none';

      // 移除剩餘粒子元素
      const particlesContainer = modal.querySelector('.modal-particles');
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }

      // 恢復頁面滾動
      document.body.style.overflow = '';
    }, 500);
  }

  // 關閉模態框 - 增強點擊處理
  if (closeModal) {
    closeModal.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      closeModalFunc();
    });
  }

  // 點擊模態框外部區域關閉 - 優化移動裝置上的表現
  if (modal) {
    modal.addEventListener('click', function(event) {
      // 如果點擊的是模態框背景（不是內容）
      if (event.target === modal) {
        closeModalFunc();
      }
    });
  }

  // 聯絡選項點擊處理
  contactOptions.forEach(option => {
    option.addEventListener('click', function() {
      // 獲取連結
      const link = this.getAttribute('data-link');

      // 創建波紋效果
      const ripple = document.createElement('div');
      ripple.className = 'contact-ripple';
      ripple.style.position = 'absolute';
      ripple.style.width = '100%';
      ripple.style.height = '100%';
      ripple.style.top = '0';
      ripple.style.left = '0';
      ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)';
      ripple.style.borderRadius = '15px';
      ripple.style.transform = 'scale(0)';
      ripple.style.opacity = '1';
      ripple.style.transition = 'all 0.5s ease-out';

      this.appendChild(ripple);

      // 動畫效果
      setTimeout(() => {
        ripple.style.transform = 'scale(3)';
        ripple.style.opacity = '0';
      }, 10);

      // 動畫結束後跳轉
      setTimeout(() => {
        window.open(link, '_blank');
        if (this.contains(ripple)) {
          this.removeChild(ripple);
        }
      }, 400);
    });
  });

  // 註冊轉跳處理
  if (registerButton) {
    registerButton.addEventListener('click', function(event) {
      // 創建波紋效果
      const ripple = document.createElement('div');
      ripple.className = 'register-ripple';
      ripple.style.position = 'absolute';
      ripple.style.width = '100%';
      ripple.style.height = '100%';
      ripple.style.top = '0';
      ripple.style.left = '0';
      ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)';
      ripple.style.borderRadius = '50px';
      ripple.style.transform = 'scale(0)';
      ripple.style.opacity = '1';
      ripple.style.transition = 'all 0.5s ease-out';
      ripple.style.zIndex = '0';

      this.appendChild(ripple);

      // 動畫效果
      setTimeout(() => {
        ripple.style.transform = 'scale(3)';
        ripple.style.opacity = '0';
      }, 10);
    });
  }

  // 創建模態框內粒子效果
  function createModalParticles() {
    let particlesContainer = modal.querySelector('.modal-particles');

    if (!particlesContainer) {
      particlesContainer = document.createElement('div');
      particlesContainer.className = 'modal-particles';
      modal.appendChild(particlesContainer);
    }

    const particleCount = 30;
    const colors = ['#00e2ff', '#00ccff', '#00fff2', '#4c00ff', '#8c52ff'];

    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement('span');
        particle.className = 'modal-particle';

        // 隨機大小和位置
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '-10px';

        // 設置顏色
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        // 設置動畫
        const duration = Math.random() * 8 + 4;
        particle.style.animation = `modalFloat ${duration}s ease-out forwards`;

        particlesContainer.appendChild(particle);

        // 動畫結束後移除粒子
        setTimeout(() => {
          if (particlesContainer && particlesContainer.contains(particle)) {
            particlesContainer.removeChild(particle);
          }
        }, duration * 1000);
      }, i * 300); // 粒子創建間隔
    }
  }
}

// 創建爆炸粒子效果
function createExplosion(x, y) {
  const particleCount = 30;
  const colors = ['#00e2ff', '#4c00ff', '#8c52ff', '#ffffff'];
  const container = document.body;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'explosion';

    const size = Math.random() * 15 + 5;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const duration = Math.random() * 0.8 + 0.6;

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // 設置粒子初始位置
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    // 添加到文檔
    container.appendChild(particle);

    // 向外擴散動畫
    setTimeout(() => {
      particle.style.transition = `all ${duration}s cubic-bezier(0.1, 0.5, 0.1, 1)`;
      particle.style.left = (x + Math.cos(angle) * distance) + 'px';
      particle.style.top = (y + Math.sin(angle) * distance) + 'px';
      particle.style.opacity = '1';

      // 隨機縮放和旋轉
      const scale = Math.random() * 2 + 0.5;
      const rotate = Math.random() * 360;
      particle.style.transform = `scale(${scale}) rotate(${rotate}deg)`;

      // 動畫結束後移除粒子
      setTimeout(() => {
        particle.style.opacity = '0';
        setTimeout(() => {
          if (container.contains(particle)) {
            container.removeChild(particle);
          }
        }, 300);
      }, duration * 800);
    }, 10);
  }
}

// 初始化按鈕波紋效果
function initButtonEffects() {
  const buttons = document.querySelectorAll('.icon-btn');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.position = 'absolute';
      ripple.style.width = '100%';
      ripple.style.height = '100%';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      ripple.style.transform = 'scale(0)';
      ripple.style.transition = 'transform 0.5s ease-out';

      this.appendChild(ripple);

      // 延遲執行讓CSS認到新元素
      setTimeout(() => {
        ripple.style.transform = 'scale(1)';
      }, 10);

      setTimeout(() => {
        if (this.contains(ripple)) {
          this.removeChild(ripple);
        }
      }, 500);
    });
  });
}