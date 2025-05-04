function isReelPage() {
  try {
    // URL-based detection
    const urlMatch = window.location.pathname.includes('/reel/') || 
                    window.location.pathname.includes('/reels/');
    // DOM-based detection (looks for autoplaying video, common in Reels)
    const videoElement = document.querySelector('video[playsinline][autoplay]');
    return urlMatch || !!videoElement;
  } catch (e) {
    console.error('Error in isReelPage:', e);
    return false;
  }
}

function displayBlockCard() {
  try {
    // Find main content area (Instagram's main or role="main")
    let mainContainer = document.querySelector('main, [role="main"]') || document.body;
    if (!mainContainer) {
      console.warn('Main container not found, using body');
      mainContainer = document.body;
    }

    // Create block card
    const blockCard = document.createElement('div');
    blockCard.setAttribute('role', 'alert');
    blockCard.setAttribute('aria-live', 'assertive');
    blockCard.innerHTML = `
      <style>
        .block-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          padding: 40px;
          text-align: center;
          max-width: 500px;
          margin: 20px auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          transform-style: preserve-3d;
          animation: float 6s ease-in-out infinite;
          border: 2px solid #000; /* High contrast */
        }
        h1 {
          font-size: 2.5rem;
          margin: 0 0 20px;
          color: #405DE6;
          text-transform: uppercase;
          text-shadow: 3px 3px 0 #E1306C, 6px 6px 0 #833AB4;
        }
        p {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 30px;
          line-height: 1.6;
        }
        .hindi {
          font-size: 1.4rem;
          color: #E1306C;
          font-weight: bold;
          margin: 25px 0;
        }
        .back-btn {
          background: linear-gradient(to right, #405DE6, #833AB4);
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 1rem;
          border-radius: 50px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(64, 93, 230, 0.3);
        }
        .back-btn:hover, .back-btn:focus {
          transform: translateY(-3px);
          box-shadow: 0 7px 20px rgba(64, 93, 230, 0.4);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateY(5deg); }
        }
      </style>
      <div class="block-card">
        <h1>REELS BLOCKED</h1>
        <p>Please focus on work, not on reels</p>
        <p class="hindi">अप्सरा बाद में देख लेना, काम के बाद</p>
        <button class="back-btn" id="backButton" role="button" aria-label="Return to Instagram homepage">← Back to Instagram</button>
      </div>
    `;

    // Clear main container and append block card
    mainContainer.innerHTML = '';
    mainContainer.appendChild(blockCard);

    // Add event listener for back button
    const backButton = blockCard.querySelector('#backButton');
    backButton.addEventListener('click', () => {
      window.location.href = 'https://www.instagram.com/';
    });

    // Stop further page loading
    window.stop();
  } catch (e) {
    console.error('Error in displayBlockCard:', e);
  }
}

function checkAndBlockReels() {
  if (isReelPage()) {
    displayBlockCard();
  }
}

// Debounced MutationObserver to handle SPA navigation
let isProcessing = false;
function debouncedCheckAndBlockReels() {
  if (isProcessing) return;
  isProcessing = true;
  setTimeout(() => {
    checkAndBlockReels();
    isProcessing = false;
  }, 100);
}

// Run on initial load
function runCheck() {
  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAndBlockReels);
    } else {
      checkAndBlockReels();
    }
  } catch (e) {
    console.error('Error in runCheck:', e);
  }
}
runCheck();

// Observe DOM changes for SPA navigation
try {
  const target = document.body || document.documentElement;
  new MutationObserver(debouncedCheckAndBlockReels).observe(target, { subtree: true, childList: true });
} catch (e) {
  console.error('Error setting up MutationObserver:', e);
}