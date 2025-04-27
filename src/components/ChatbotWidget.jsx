import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react"; // Ako koristiš lucide, ili zameni sa <svg> ili emoji

const ChatbotWidget = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const containerRef = useRef(null);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [open, setOpen] = useState(true);

  const conversations = {
    sr: [
      { from: "bot", text: "Zdravo! Ja sam tvoj AI asistent. 😊" },
      { from: "user", text: "Mogu li da poručim iPhone 16?" },
      { from: "bot", text: "Naravno! 'iPhone 16' je dodat u vašu korpu. Želite li i AirPods uz to?" },
      { from: "user", text: "Da, dodaj i njih i završi kupovinu." },
      { from: "bot", text: "Sve je spremno! Porudžbina je uspešno kreirana na vašu adresu." },
      { from: "bot", text: "🛍️ Takođe, na osnovu vašeg interesovanja, preporučujemo pametne satove koji su sada na popustu!" }
    ],
    en: [
      { from: "bot", text: "Hi! I'm your AI assistant. 😊" },
      { from: "user", text: "Can I order an iPhone 16?" },
      { from: "bot", text: "Of course! 'iPhone 16' has been added to your cart. Would you also like AirPods?" },
      { from: "user", text: "Yes, add them as well and complete the purchase." },
      { from: "bot", text: "Everything is set! Your order has been successfully placed to your address." },
      { from: "bot", text: "🛍️ Based on your interest, we recommend our smartwatches currently on sale!" }
    ],
    fr: [
      { from: "bot", text: "Bonjour ! Je suis votre assistant IA. 😊" },
      { from: "user", text: "Puis-je commander un iPhone 16 ?" },
      { from: "bot", text: "Bien sûr ! 'iPhone 16' a été ajouté à votre panier. Souhaitez-vous aussi des AirPods ?" },
      { from: "user", text: "Oui, ajoute-les et finalise la commande." },
      { from: "bot", text: "Tout est prêt ! Votre commande a été passée avec succès." },
      { from: "bot", text: "🛍️ En fonction de vos intérêts, nous vous recommandons nos montres intelligentes en promotion !" }
    ],
    ru: [
      { from: "bot", text: "Привет! Я твой AI помощник. 😊" },
      { from: "user", text: "Могу ли я заказать iPhone 16?" },
      { from: "bot", text: "Конечно! 'iPhone 16' добавлен в вашу корзину. Хотите также AirPods?" },
      { from: "user", text: "Да, добавь и их и оформи заказ." },
      { from: "bot", text: "Готово! Заказ успешно оформлен и отправлен на ваш адрес." },
      { from: "bot", text: "🛍️ Также рекомендуем умные часы — сейчас на распродаже!" }
    ]
  };
  

  const allMessages = conversations[lang] || conversations["sr"];

  useEffect(() => {
    if (!open) return;

    setVisibleMessages([]);
    setIsTyping(false);
    let i = 0;

    const interval = setInterval(() => {
      const msg = allMessages[i];
      if (!msg) {
        clearInterval(interval);
        return;
      }

      if (msg.from === "bot") {
        setIsTyping(true);
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, msg]);
          setIsTyping(false);
        }, 1000);
      } else {
        setVisibleMessages((prev) => [...prev, msg]);
      }

      i++;
    }, 1800);

    return () => clearInterval(interval);
  }, [lang, open]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  if (!open) {
    return (
      <div
        className="fixed bottom-6 right-6 z-50 cursor-pointer animate-pulse"
        onClick={() => setOpen(true)}
      >
        <div className="bg-cyan-600 hover:bg-cyan-700 p-4 rounded-full shadow-lg text-white">
          <MessageCircle size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <div className="bg-gray-900 text-white p-4 rounded-xl shadow-xl w-80 text-sm relative">
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✖
        </button>

        <div className="font-bold mb-2 text-cyan-400">💬 MindLoop Bot</div>
        <div
          ref={containerRef}
          className="space-y-2 max-h-80 overflow-y-auto scroll-smooth pr-1"
        >
          {visibleMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-3 py-2 max-w-[70%] ${
                  msg.from === "user"
                    ? "bg-cyan-600 text-white"
                    : "bg-white/10 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 text-white px-3 py-2 rounded-lg animate-pulse">
                <span className="opacity-80">...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;
