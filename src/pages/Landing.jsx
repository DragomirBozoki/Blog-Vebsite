import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LandingChatbot from "../components/LandingChatbot";
import { Zap, BrainCircuit, Wrench } from "lucide-react";

const Landing = () => {
  const { t, i18n } = useTranslation();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timeout);
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 pt-20 pb-16 flex flex-col items-center font-sans">
      
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-lg border-b border-white/10 z-50 px-6 py-3 flex justify-between items-center">
        <div className="text-white font-bold text-lg">MindLoop AI Co.</div>
        <select
          className="bg-gray-800 border border-white/20 px-2 py-1 rounded text-white text-sm"
          defaultValue={i18n.language}
          onChange={(e) => {
            i18n.changeLanguage(e.target.value);
            setAnimate(false);
          }}
        >
          <option value="sr">🇷🇸 SR</option>
          <option value="en">🇬🇧 EN</option>
          <option value="fr">🇫🇷 FR</option>
          <option value="ru">🇷🇺 RU</option>
        </select>
      </div>

      {/* HERO */}
      <div className={`transform transition-all duration-700 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl max-w-2xl text-center mt-4`}>
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">{t("title")}</h1>
        <p className="text-lg mb-6 text-gray-300">{t("subtitle")}</p>
      </div>

      {/* Chatbot Simulation */}
      <div className="mt-10 w-full max-w-2xl">
        <LandingChatbot />
      </div>

      {/* BENEFITS */}
      <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full transition-all duration-700 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        {[
          { icon: <Zap className="w-8 h-8 text-cyan-400" />, title: t("benefits.instant"), desc: t("benefits.instantDesc") },
          { icon: <BrainCircuit className="w-8 h-8 text-cyan-400" />, title: t("benefits.smart"), desc: t("benefits.smartDesc") },
          { icon: <Wrench className="w-8 h-8 text-cyan-400" />, title: t("benefits.easy"), desc: t("benefits.easyDesc") }
        ].map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center shadow-md">
            <div className="mb-3 flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* FEATURES AND COPYBOT STORY */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 text-cyan-400">{t("featuresTitle")}</h3>
          <ul className="space-y-3 text-white text-sm">
            {t("features", { returnObjects: true }).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-green-400 mr-2">✔</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-md text-white text-sm leading-relaxed">
          <h3 className="text-xl font-bold mb-4 text-cyan-400">{t("aiAssistantTitle")}</h3>
          <ul className="space-y-3">
            {t("aiAssistantBullets", { returnObjects: true }).map((bullet, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-400 mr-2">✔</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FOR WHOM */}
      <div className="mt-20 max-w-4xl text-center bg-white/5 border border-white/10 rounded-2xl p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">{t("forWhom")}</h2>
        <p className="text-gray-300 text-lg mb-6">{t("sectors")}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-white font-medium text-sm">
          {t("sectorsList", { returnObjects: true }).map((sector, i) => (
            <div key={i} className="bg-black/10 rounded p-2 border border-white/10">{sector}</div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer id="kontakt" className="mt-24 text-center text-sm text-gray-500">
        <p>
          {t("footerEmail")}: <a href="mailto:mindloop.ai.contact@gmail.com" className="underline">mindloop.ai.contact@gmail.com</a>
        </p>
        <p>{t("footerPhone")}: +30 694 831 3741</p>
        <p className="mt-4">© {new Date().getFullYear()} MindLoop AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
