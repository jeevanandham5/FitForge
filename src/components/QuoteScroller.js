import { useState, useEffect } from "react";

const quotes = [
  "Every rep brings you closer to your goal. Let's crush it together!",
  "Progress is built one step at a time. Keep going, you've got this!",
  "Your only limit is you. Push past it today!",
  "Transform your effort into results. Your journey starts now!",
];

const TypewriterQuoteScroller = () => {
  const [currentQuote, setCurrentQuote] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      const quote = quotes[quoteIndex];
      const typingInterval = setInterval(() => {
        setCurrentQuote((prevQuote) => {
          if (prevQuote.length >= quote.length) {
            clearInterval(typingInterval);
            setIsTyping(false);
            return prevQuote;
          }
          return quote.slice(0, prevQuote.length + 1);
        });
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [quoteIndex, isTyping]);

  useEffect(() => {
    if (!isTyping) {
      const switchQuoteTimeout = setTimeout(() => {
        setCurrentQuote("");
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setIsTyping(true);
      }, 4000);

      return () => clearTimeout(switchQuoteTimeout);
    }
  }, [isTyping]);

  return (
    <div className="flex justify-center items-center h-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <p className="text-lg font-semibold text-center sm:text-sm">
        {currentQuote}
      </p>
    </div>
  );
};

export default TypewriterQuoteScroller;
