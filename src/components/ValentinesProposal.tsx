import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

// 18 images (we only have 18 unique images)
const images = [
  "/game-photos/1.jpg",
  "/game-photos/2.jpg",
  "/game-photos/3.jpg",
  "/game-photos/4.jpg",
  "/game-photos/5.jpg",
  "/game-photos/6.jpg",
  "/game-photos/7.jpg",
  "/game-photos/8.jpg",
  "/game-photos/9.jpg",
  "/game-photos/10.jpg",
  "/game-photos/11.jpg",
  "/game-photos/12.jpg",
  "/game-photos/13.jpg",
  "/game-photos/14.jpg",
  "/game-photos/15.jpg",
  "/game-photos/16.jpg",
  "/game-photos/17.jpg",
  "/game-photos/18.jpg",
];

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 80;
    const randomLeft = Math.random() * 80;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  useEffect(() => {
    if (step < 2 || step === 3) {
      // Change step after 5 seconds (including step 3 to show final message)
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(3);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h2
            key="step-0"
            className={`text-4xl font-semibold mb-4 bg-red-600 text-white p-8 rounded-2xl ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Congratulations! You have completed the game.
          </motion.h2>
        )}
        {step === 1 && (
          <motion.h2
            key="step-1"
            className={`text-4xl font-semibold mb-4 bg-red-600 text-white p-8 rounded-2xl ${playfairDisplay.className}`}
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            I have a surprise for you!
          </motion.h2>
        )}
        {step === 2 && (
          <motion.div
            key="step-2"
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            {/* Image Grid Background */}
            <div className="absolute inset-0 grid grid-cols-6 opacity-10">
              {images.slice(0, 18).map((src, index) => (
                <div key={index} className="relative h-full">
                  <Image
                    src={src}
                    alt={`Memory ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <h2
              className={`text-5xl font-semibold mb-8 ${playfairDisplay.className}`}
            >
              Will you be my Valentine?
            </h2>
            <Image
              src="/sad_hamster.png"
              alt="Sad Hamster"
              width={200}
              height={200}
            />
            <div className="flex space-x-4 mt-10">
              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleYesClick}
              >
                Yes, I will! 🥰
              </button>
              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-95 transition-all duration-300 shadow-lg"
                style={
                  position
                    ? {
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                      }
                    : {}
                }
                onMouseEnter={() => setPosition(getRandomPosition())}
                onClick={() => setPosition(getRandomPosition())}
              >
                No, I won&apos;t 😢
              </button>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step-3"
            className={`text-4xl font-semibold mb-4 flex flex-col justify-center items-center bg-red-600 text-white p-8 rounded-2xl ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Thank you for accepting, I love you! 💕
            <Image
              src="/hamster_jumping.gif"
              alt="Hamster Feliz"
              width={200}
              height={200}
              unoptimized
              className="mt-4"
            />
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="step-4"
            className="w-full max-w-md"
            transition={{ duration: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              animation: "float 4s ease-in-out infinite",
            }}
          >
            <style jsx>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
              }
              @keyframes heartbeat {
                0% { transform: scale(1); }
                25% { transform: scale(1.15); }
                40% { transform: scale(1); }
                60% { transform: scale(1.15); }
                100% { transform: scale(1); }
              }
            `}</style>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="w-full h-96 relative bg-gray-100">
                <Image
                  src="/special-image.jpg"
                  alt="Our Love"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-7">
                <h1 className={`text-pink-600 mb-4 text-3xl ${playfairDisplay.className}`}>
                  Happy Valentines Day My Love
                </h1>
                <p className="text-gray-700 text-base leading-relaxed">
                  My love, on this beautiful day of Valentine's, my heart finds no words grand enough to measure what you are to me, yet still it tries.
                  If love were the stars, you would be the whole night sky. If love were the sun, you would be its eternal dawn.
                  <br/><br/>
                  From the hour fate first crossed our paths, you have been the gentle light that guides my wandering soul.
                  Your kindness heals, your laughter warms, and your love, so pure, so quiet, so boundless, has become the very breath within my chest.
                  <br/><br/>
                  In a world of countless souls, mine shall always seek yours. In joy or storm, in triumph or trial, I am forever yours.
                </p>
                <div
                  className="text-4xl mt-4 text-center"
                  style={{ animation: "heartbeat 1.5s infinite", color: "#ef4444" }}
                >
                  ❤
                </div>
              </div>
            </div>
            <audio autoPlay loop>
              <source src="/romantic-music.wav" type="audio/wav" />
            </audio>
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="absolute w-full h-full overflow-hidden pointer-events-none">
          <style jsx>{`
            @keyframes floatUp {
              0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
              }
            }
          `}</style>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-50px',
                animation: `floatUp ${5 + Math.random() * 5}s linear infinite`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${20 + Math.random() * 30}px`,
              }}
            >
              {['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
