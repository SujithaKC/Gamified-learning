import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

// Define types for our game state
interface GameState {
  velocity: number;
  mass: number;
  ke: number;
  tutorialShown: boolean;
  currentLanguage: string;
}

// Language translations
const translations = {
  en: {
    tutorialTitle: "Kinetic Energy Learning Game",
    tutorialDesc: "Kinetic Energy is the energy of motion. It depends on:",
    tutorialMass: "MASS: How heavy something is",
    tutorialVelocity: "VELOCITY: How fast it moves",
    tutorialFormula: "Formula: KE = ½ × mass × velocity²",
    tutorialControlsTitle: "Controls:",
    tutorialControls: "➡️/⬅️ Change velocity<br>⬆️/⬇️ Change mass<br>SPACE/LAUNCH to throw the ball",
    startButton: "START LEARNING",
    velocityText: "Velocity: ",
    massText: "Mass: ",
    keText: "K.E: ",
    concept1: "⚡ The ball is very fast! Because velocity is squared in the formula, KE grows a lot when speed increases.",
    concept2: "💪 The ball is heavy now. Even at the same speed, a heavier ball has more kinetic energy.",
    concept3: "🔎 Try changing mass and velocity. Notice how the KE number changes when you launch the ball!",
    launchText: "LAUNCH"
  },
  hi: {
    tutorialTitle: "गतिज ऊर्जा सीखने का खेल",
    tutorialDesc: "गतिज ऊर्जा गति की ऊर्जा है। यह निर्भर करती है:",
    tutorialMass: "द्रव्यमान: कोई चीज कितनी भारी है",
    tutorialVelocity: "वेग: यह कितनी तेजी से चलती है",
    tutorialFormula: "सूत्र: KE = ½ × द्रव्यमान × वेग²",
    tutorialControlsTitle: "नियंत्रण:",
    tutorialControls: "➡️/⬅️ वेग बदलें<br>⬆️/⬇️ द्रव्यमान बदलें<br>SPACE/LAUNCH गेंद को फेंकने के लिए",
    startButton: "सीखना शुरू करें",
    velocityText: "वेग: ",
    massText: "द्रव्यमान: ",
    keText: "गतिज ऊर्जा: ",
    concept1: "⚡ गेंद बहुत तेज है! क्योंकि सूत्र में वेग वर्गित है, गति बढ़ने पर गतिज ऊर्जा बहुत बढ़ जाती है.",
    concept2: "💪 गेंद अब भारी है। एक ही गति पर भी, भारी गेंद में अधिक गतिज ऊर्जा होती है.",
    concept3: "🔎 द्रव्यमान और वेग बदलने का प्रयास करें। ध्यान दें कि गेंद लॉन्च करने पर KE संख्या कैसे बदलती है!",
    launchText: "लॉन्च"
  },
  or: {
    tutorialTitle: "କାଇନେଟିକ୍ ଏନର୍ଜି ଶିକ୍ଷା ଖେଳ",
    tutorialDesc: "କାଇନେଟିକ୍ ଏନର୍ଜି ହେଉଛି ଗତିର ଶକ୍ତି। ଏହା ଉପରେ ନିର୍ଭର କରେ:",
    tutorialMass: "ବସ୍ତୁତ୍ଵ: କିଛି କିଭଳି ଭାରୀ ଅଟେ",
    tutorialVelocity: "ବେଗ: ଏହା କେତେ ଶୀଘ୍ର ଗତି କରେ",
    tutorialFormula: "ସୂତ୍ର: KE = ½ × ବସ୍ତୁତ୍ଵ × ବେଗ²",
    tutorialControlsTitle: "ନିୟନ୍ତ୍ରଣ:",
    tutorialControls: "➡️/⬅️ ବେଗ ବଦଳାନ୍ତୁ<br>⬆️/⬇️ ବସ୍ତୁତ୍ଵ ବଦଳାନ୍ତୁ<br>SPACE/LAUNCH ବବଲ୍ ଫୋପାଡ଼ିବା ପାଇଁ",
    startButton: "ଶିଖା ଆରମ୍ଭ କରନ୍ତୁ",
    velocityText: "ବେଗ: ",
    massText: "ବସ୍ତୁତ୍ଵ: ",
    keText: "କାଇନେଟିକ୍ ଏନର୍ଜି: ",
    concept1: "⚡ ବଲ୍ ଟି ବହୁତ ଶୀଘ୍ର ଅଛି! ଯେହେତୁ ସୂତ୍ରରେ ବେଗ ବର୍ଗିତ ହୋଇଛି, ଗତି ବଢ଼ିବା ସହିତ KE ବହୁତ ବଢ଼େ।",
    concept2: "💪 ବଲ୍ ଟି ବର୍ତ୍ତମାନ ଭାରୀ ଅଛି। ସମାନ ଗତିରେ ମଧ୍ୟ, ଏକ ଭାରୀ ବଲ୍ ର ଅଧି�क ଗତିଜ ଶକ୍ତି ଅଛି।",
    concept3: "🔎 ବସ୍ତୁତ୍ଵ ଏବଂ ବେଗ ବଦଳାଇବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ। ଧ୍ୟାନ ଦିଅନ୍ତୁ ଯେତେବେଳେ ଆପଣ ବଲ୍ ଲଞ୍ଚ କରନ୍ତି KE ସଂଖ୍ୟା କିପରି ବଦଳେ!",
    launchText: "ଲଞ୍ଚ"
  }
};

// Detect mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const KineticEnergyGame: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstance = useRef<Phaser.Game | null>(null);
  
  const [gameState, setGameState] = useState<GameState>({
    velocity: 200,
    mass: 2,
    ke: 0,
    tutorialShown: false,
    currentLanguage: 'en'
  });

  // Update info display
  const updateInfoDisplay = () => {
    setGameState(prev => ({ ...prev }));
  };

  // Update language
  const updateLanguage = (lang: string) => {
    setGameState(prev => ({ ...prev, currentLanguage: lang }));
  };

  // Set up touch controls
  const setupTouchControls = (scene: Phaser.Scene) => {
    // This would be implemented with actual DOM elements in React
  };

  // Phaser game configuration
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600
    },
    backgroundColor: '#87ceeb',
    physics: {
      default: 'arcade',
      arcade: { 
        gravity: { x: 0, y: isMobile ? 400 : 300 },
        debug: false 
      }
    },
    scene: {
      preload: function (this: Phaser.Scene) {
        this.load.image('ball', 'https://labs.phaser.io/assets/sprites/shinyball.png');
        this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
      },
      create: function (this: Phaser.Scene) {
        const ground = this.add.tileSprite(400, 550, 800, 50, 'ground');
        this.physics.add.existing(ground, true);

        // Create the ball sprite
        const ball = this.add.sprite(400, 100, 'ball');
        this.physics.add.existing(ball);

        // Set ball properties
        const ballBody = ball.body as Phaser.Physics.Arcade.Body;
        ballBody.setBounce(0.6);
        ballBody.setCollideWorldBounds(true);
        ballBody.setCircle(25);

        // Add collision between ball and ground
        this.physics.add.collider(ball, ground);

        // Store references for update
        (this as any).ball = ball;
        (this as any).ground = ground;
      },
      update: function (this: Phaser.Scene) {
        const ball = (this as any).ball as Phaser.GameObjects.Sprite;
        const ballBody = ball.body as Phaser.Physics.Arcade.Body;

        // Update ball velocity based on game state
        if (gameState.velocity && !ballBody.velocity.x) {
          ballBody.setVelocityX(gameState.velocity);
        }

        // Update mass (scale) of the ball
        ball.setScale(Math.sqrt(gameState.mass) * 0.5);

        // Calculate and update kinetic energy
        const velocity = Math.sqrt(Math.pow(ballBody.velocity.x, 2) + Math.pow(ballBody.velocity.y, 2));
        const ke = 0.5 * gameState.mass * Math.pow(velocity, 2) / 1000; // Divide by 1000 to make numbers more manageable
        setGameState(prev => ({ ...prev, ke }));
      }
    }
  };

  // Initialize Phaser game
  useEffect(() => {
    if (gameRef.current && !gameInstance.current) {
      gameInstance.current = new Phaser.Game(config);
    }

    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy(true);
        gameInstance.current = null;
      }
    };
  }, []);

  // Handle control buttons
  const handleLeft = () => {
    setGameState(prev => ({
      ...prev,
      velocity: Math.max(0, prev.velocity - 50)
    }));
    
    if (gameInstance.current) {
      const scene = gameInstance.current.scene.scenes[0];
      const ball = (scene as any).ball;
      if (ball && ball.body) {
        (ball.body as Phaser.Physics.Arcade.Body).setVelocityX(Math.max(0, gameState.velocity - 50));
      }
    }
  };

  const handleRight = () => {
    setGameState(prev => ({
      ...prev,
      velocity: prev.velocity + 50
    }));
    
    if (gameInstance.current) {
      const scene = gameInstance.current.scene.scenes[0];
      const ball = (scene as any).ball;
      if (ball && ball.body) {
        (ball.body as Phaser.Physics.Arcade.Body).setVelocityX(gameState.velocity + 50);
      }
    }
  };

  const handleUp = () => {
    setGameState(prev => ({
      ...prev,
      mass: prev.mass + 0.5
    }));
  };

  const handleDown = () => {
    setGameState(prev => ({
      ...prev,
      mass: Math.max(0.5, prev.mass - 0.5)
    }));
  };

  const handleLaunch = () => {
    if (gameInstance.current) {
      const scene = gameInstance.current.scene.scenes[0];
      const ball = (scene as any).ball;
      if (ball && ball.body) {
        (ball.body as Phaser.Physics.Arcade.Body).setVelocityX(gameState.velocity);
        (ball.body as Phaser.Physics.Arcade.Body).setVelocityY(-300);
      }
    }
  };

  const handleStart = () => {
    setGameState(prev => ({
      ...prev,
      tutorialShown: true
    }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateLanguage(e.target.value);
  };

  const currentTranslations = translations[gameState.currentLanguage as keyof typeof translations];

  return (
    <div className="game-wrapper">
      <div id="game-container" ref={gameRef} style={{ width: '100%', height: '100%' }} />
      
      {/* Tutorial Panel */}
      {!gameState.tutorialShown && (
        <div className="tutorial-panel">
          <h2 className="tutorial-title">{currentTranslations.tutorialTitle}</h2>
          <div className="tutorial-content">
            <p>{currentTranslations.tutorialDesc}</p>
            <ul>
              <li>{currentTranslations.tutorialMass}</li>
              <li>{currentTranslations.tutorialVelocity}</li>
            </ul>
            <p>{currentTranslations.tutorialFormula}</p>
            <p><strong>{currentTranslations.tutorialControlsTitle}</strong></p>
            <p dangerouslySetInnerHTML={{ __html: currentTranslations.tutorialControls }} />
          </div>
          <button className="start-btn" onClick={handleStart}>
            {currentTranslations.startButton}
          </button>
        </div>
      )}

      {/* Language Selector */}
      <div className="language-selector">
        <select 
          id="language-select" 
          value={gameState.currentLanguage} 
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="or">ଓଡ଼ିଆ (Odia)</option>
        </select>
      </div>

      {/* Concept Panel */}
      {gameState.tutorialShown && (
        <div className="concept-panel">
          {currentTranslations.concept3}
        </div>
      )}

      {/* Info Panel */}
      <div className="info-panel">
        <div className="info-text">
          {currentTranslations.velocityText}{gameState.velocity}
        </div>
        <div className="info-text">
          {currentTranslations.massText}{gameState.mass}
        </div>
        <div className="info-text">
          {currentTranslations.keText}{gameState.ke.toFixed(2)} J
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button className="control-btn" onClick={handleLeft}>←</button>
        <button className="control-btn" onClick={handleDown}>−</button>
        <button className="control-btn launch" onClick={handleLaunch}>
          {currentTranslations.launchText}
        </button>
        <button className="control-btn" onClick={handleUp}>+</button>
        <button className="control-btn" onClick={handleRight}>→</button>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          touch-action: manipulation;
        }
        
        .game-wrapper {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: #87ceeb;
          font-family: 'Arial Rounded MT Bold', 'Arial', sans-serif;
          overflow: hidden;
          color: #333;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        #game-container {
          position: absolute;
          width: 100%;
          height: 100%;
          max-width: 1200px;
          max-height: 800px;
        }
        
        #game-container canvas {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
        
        .controls {
          position: absolute;
          bottom: 20px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          width: 100%;
          max-width: 500px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }
        
        .control-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(145deg, #6c5ce7, #a29bfe);
          border: none;
          color: white;
          font-size: 24px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.2s ease;
        }
        
        .control-btn:active {
          transform: scale(0.95);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .control-btn.launch {
          background: linear-gradient(145deg, #e74c3c, #e67e22);
          width: 70px;
          height: 70px;
          font-size: 14px;
          font-weight: bold;
        }
        
        .info-panel {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(255, 255, 255, 0.9);
          padding: 12px 16px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(5px);
          z-index: 10;
          max-width: 45%;
        }
        
        .info-text {
          font-size: 14px;
          margin-bottom: 5px;
          color: #2d3436;
        }
        
        .tutorial-panel {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.95);
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          z-index: 20;
          width: 90%;
          max-width: 500px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        
        .tutorial-title {
          font-size: 22px;
          margin-bottom: 15px;
          color: #6c5ce7;
          font-weight: bold;
        }
        
        .tutorial-content {
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 20px;
          text-align: left;
        }
        
        .start-btn {
          background: linear-gradient(145deg, #00b894, #00cec9);
          border: none;
          padding: 12px 24px;
          border-radius: 50px;
          color: white;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        
        .start-btn:active {
          transform: scale(0.95);
        }
        
        .concept-panel {
          position: absolute;
          top: 120px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.9);
          padding: 12px 16px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 10;
          width: 90%;
          max-width: 500px;
          text-align: center;
          backdrop-filter: blur(5px);
          max-height: 20vh;
          overflow-y: auto;
          font-size: 16px;
          line-height: 1.4;
        }
        
        .language-selector {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.9);
          padding: 8px 12px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(5px);
          z-index: 10;
        }
        
        .language-selector select {
          border: none;
          background: transparent;
          font-size: 14px;
          color: #2d3436;
          outline: none;
        }
        
        @media (max-width: 768px) {
          #game-container {
            max-width: 100%;
            max-height: 100%;
          }
          
          #game-container canvas {
            border-radius: 0;
          }
          
          .info-panel {
            max-width: 60%;
            padding: 10px;
            top: 10px;
            left: 10px;
          }
          
          .info-text {
            font-size: 12px;
          }
          
          .concept-panel {
            top: 100px;
            width: 95%;
            max-height: 15vh;
            font-size: 14px;
            padding: 10px;
          }
          
          .language-selector {
            top: 10px;
            right: 10px;
            padding: 6px 10px;
          }
          
          .control-btn {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
          
          .control-btn.launch {
            width: 60px;
            height: 60px;
          }
        }
        
        @media (max-width: 480px) {
          .info-panel {
            max-width: 65%;
            padding: 8px;
          }
          
          .info-text {
            font-size: 11px;
          }
          
          .controls {
            bottom: 10px;
          }
          
          .control-btn {
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
          
          .control-btn.launch {
            width: 55px;
            height: 55px;
            font-size: 12px;
          }
          
          .tutorial-panel {
            width: 95%;
            padding: 15px;
          }
          
          .tutorial-title {
            font-size: 20px;
          }
          
          .tutorial-content {
            font-size: 14px;
          }
          
          .concept-panel {
            top: 90px;
            width: 92%;
            max-height: 12vh;
            font-size: 13px;
            padding: 8px;
            line-height: 1.3;
          }
          
          .language-selector {
            padding: 5px 8px;
          }
          
          .language-selector select {
            font-size: 12px;
          }
        }
        
        @media (max-height: 600px) {
          .info-panel {
            top: 5px;
            left: 5px;
            padding: 6px;
          }
          
          .concept-panel {
            top: 60px;
            left: 5px;
            width: calc(100% - 10px);
            max-height: 12vh;
            padding: 5px 8px;
            font-size: 11px;
          }
          
          .language-selector {
            top: 5px;
            right: 5px;
            padding: 4px 6px;
          }
          
          .controls {
            bottom: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default KineticEnergyGame;