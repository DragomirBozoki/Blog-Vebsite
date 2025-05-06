import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { Zap, BrainCircuit, Wrench, Play, Pause } from "lucide-react";

// Inline Dropdown komponenta
const DropdownMenu = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="text-white hover:text-cyan-300 font-medium">
        {title} ▾
      </button>
      {open && (
        <div className="absolute left-0 mt-2 flex flex-col bg-gray-900 border border-white/10 rounded shadow-lg min-w-[180px] z-50">
          {items.map((item, index) =>
            item.to ? (
              <Link
                key={index}
                to={item.to}
                className="px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={index}
                className="px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
              >
                {item.label}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
};

const Landing = () => {
  const { t, i18n } = useTranslation();
  const [animate, setAnimate] = useState(false);
  const [siteType, setSiteType] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
          setIsPlaying(true);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timeout);
  }, [i18n.language]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 pt-20 pb-16 flex flex-col items-center font-sans">
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-lg border-b border-white/10 z-50 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src="/mindloop_logo.png" alt="MindLoop AI Logo" className="h-16" />
          </div>

          {/* Dropdown Menus */}
          <DropdownMenu
            title="CopyBot"
            items={[
              { to: "/VKCopyBot", label: "VK CopyBot" },
              { to: "/CopyBot", label: "CopyBot Overview" },
            ]}
          />
          <DropdownMenu
            title="AI Assistants"
            items={[
              { to: "/ChatBot", label: "AI ChatBot" },
              { label: "SaaS Generator (Coming soon)" },
            ]}
          />
          <Link
            to="/about"
            className="text-white hover:text-cyan-300 font-medium"
          >
            About Us
          </Link>

        </div>

        {/* Language Selector */}
        <div>
          <select
            className="bg-gray-900 border border-white/20 px-2 py-1 rounded text-white text-sm"
            defaultValue={i18n.language}
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              setAnimate(false);
            }}
          >
            <option value="en">🇬🇧 ENG</option>
            <option value="fr">🇫🇷 FRA</option>
            <option value="sr">🇷🇸 SRB</option>
            <option value="ru">🇷🇺 RUS</option>
          </select>
        </div>
      </div>



      {/* HERO */}
      <div
        className={`transform transition-all duration-700 ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } bg-gradient-to-br from-cyan-700/10 to-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-12 shadow-2xl max-w-3xl text-center mt-10`}
      >
        {/* Logo u krugu */}
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-white/10 border border-cyan-400 mx-auto flex items-center justify-center shadow-md">
            <img
              src="/mindloop_logo_rb.png"
              alt="MindLoop AI Logo"
              //className="w-12 h-12 object-contain"
            />
          </div>
        </div>
        {/* Title & Subtitle */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-cyan-400 mb-6">
          {t("title")}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          {t("subtitle")}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() =>
              document.getElementById("get-started-section")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-6 py-3 rounded-full transition duration-300 shadow-lg"
          >
            {t("getStarted", { defaultValue: "Get Started" })}
          </button>
        </div>

        {/* Optional Lottie Animation */}
        {/* 
        <div className="mt-8">
          <Lottie
            animationData={animationData}
            loop
            className="w-64 h-64 mx-auto"
          />
        </div> 
        */}
      </div>

     {/* BENEFITS */}
      <div
        className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full transition-all duration-700 ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {[
          {
            icon: <Zap className="w-8 h-8 text-cyan-400" />,
            title: t("benefits.instant"),
            desc: t("benefits.instantDesc"),
          },
          {
            icon: <BrainCircuit className="w-8 h-8 text-cyan-400" />,
            title: t("benefits.smart"),
            desc: t("benefits.smartDesc"),
          },
          {
            icon: <Wrench className="w-8 h-8 text-cyan-400" />,
            title: t("benefits.easy"),
            desc: t("benefits.easyDesc"),
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="mb-3 flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>


     {/* FEATURES AND COPYBOT STORY */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-cyan-400">{t("featuresTitle")}</h3>
          <ul className="space-y-3 text-white text-sm">
            {t("features", { returnObjects: true }).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-green-400 mr-2">✔</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-md text-white text-sm leading-relaxed transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
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
            <div
              key={i}
              className="bg-black/10 rounded p-2 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              {sector}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-10">
      {/* Video */}
      <div
        id="video-demo-section"
        className="relative w-[280px] sm:w-[300px] rounded-xl overflow-hidden border border-white/10 shadow-xl bg-black/30 cursor-pointer"
        onClick={togglePlay}
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
      >
        <video
          ref={videoRef}
          className="w-full h-auto"
          src="/videos/copybot-demo.mp4"
          muted
          playsInline
        />
        {/* Play/Pause Icon */}
        {showIcon && (
          <div className="absolute bottom-2 left-2 bg-black/60 p-2 rounded-full text-white">
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="text-white max-w-xl">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">
          {t("videoSectionTitle")}
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          {t("videoSectionText")}
        </p>
      </div>
    </div>


      {/* GET STARTED SECTION */}
      <div
        id="get-started-section"
        className="mt-24 w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-cyan-400 text-center">
          {t("getStartedTitle", { defaultValue: "Let's bring your idea to life!" })}
        </h2>

        {formSubmitted && (
          <div className="mb-4 p-4 bg-emerald-500 text-white rounded-md text-center shadow-lg transition duration-300">
            ✅ {t("formSuccess", { defaultValue: "Message sent successfully!" })}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const siteType = e.target.siteType.value;
            const customType = e.target.customType?.value || "";
            const message = e.target.message.value;
            const selectedType = siteType === "other" ? customType : siteType;
            

            // zameni fetch sa pravim backendom
            
            fetch("http://localhost:4000/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, selectedType, message })
            })
              .then((res) => {
                if (res.ok) {
                  setFormSubmitted(true);
                  setTimeout(() => setFormSubmitted(false), 4000);
                } else {
                  alert("Something went wrong!");
                }
              })
              .catch((err) => {
                console.error("Error sending form:", err);
                alert("Failed to send message.");
              });
            
            setFormSubmitted(true);
            setTimeout(() => setFormSubmitted(false), 4000); // automatski nestane za 4 sekunde

          }}
          className="space-y-6"
        >
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              {t("email", { defaultValue: "Your Email" })}
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="you@example.com"
            />
          </div>

          {/* Site type */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              {t("siteType", { defaultValue: "Type of Your Website" })}
            </label>
            <select
              name="siteType"
              required
              onChange={(e) => setSiteType(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">{t("select", { defaultValue: "Select..." })}</option>
              <option value="tourism">{t("tourism", { defaultValue: "Tourism" })}</option>
              <option value="rentacar">{t("rentacar", { defaultValue: "Rent-a-Car" })}</option>
              <option value="ecommerce">{t("ecommerce", { defaultValue: "E-commerce" })}</option>
              <option value="education">{t("education", { defaultValue: "Delivery" })}</option>
              <option value="other">{t("other", { defaultValue: "Other" })}</option>
            </select>
          </div>

          {/* Custom site type if "Other" selected */}
          {siteType === "other" && (
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                {t("customType", { defaultValue: "Please specify your website type" })}
              </label>
              <input
                name="customType"
                type="text"
                required
                className="w-full px-4 py-2 rounded bg-gray-800 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder={t("customPlaceholder", { defaultValue: "e.g. Blog, SaaS..." })}
              />
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              {t("message", { defaultValue: "Your Request" })}
            </label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder={t("messagePlaceholder", {
                defaultValue: "Tell us what you're looking for...",
              })}
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-lg"
            >
              {t("send", { defaultValue: "Send" })}
            </button>
          </div>
        </form>
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
