import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'sr',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      sr: {
        translation: {
          title: "MindLoop AI Widget za vaš sajt",
          subtitle: "Automatizujte komunikaciju sa klijentima uz AI asistenta i CopyBot koji rade 24/7.",
          tryDemo: "Isprobaj demo odmah",
          free: "besplatno",
          navKontakt: "Kontakt",
          benefits: {
            instant: "Brzi odgovori i postovi",
            smart: "Pametno razumevanje i automatizacija",
            easy: "Lako povezivanje i integracija",
            instantDesc: "Chatbot pruža brze odgovore, a CopyBot automatski objavljuje sadržaj između VK i Telegrama.",
            smartDesc: "Naš AI razume korisnička pitanja i zna kada i šta da objavi bez vaše intervencije.",
            easyDesc: "Jednostavno povežite VK, Telegram i integrišite Chatbot na vaš sajt — bez komplikacija.",
          },
          featuresTitle: "Prednosti AI asistenta",
          features: [
            "Instant odgovori na najčešća pitanja",
            "Automatsko kopiranje i objavljivanje sadržaja",
            "Pametne preporuke proizvoda i usluga",
            "Bez potrebe za dodatnim softverom ili kodiranjem",
            "Laka integracija na bilo koji sajt",
            "Radi 24/7 i štedi vaše vreme"
          ],
          aiAssistantTitle: "Zašto CopyBot?",
          aiAssistantBullets: [
            "Sve više ljudi prelazi iz VK u Telegram, pa za zadržavanje klijenata treba voditi dve mreže paralelno. CopyBot rešava ovu rutinsku muku!",
            "Više nema ručnog kopiranja – bot sam objavljuje postove, povećava dohvat i angažovanje!",
            "Potpuna kontrola – uvek možete isključiti autoposting ili dodati nove kanale!",
            "Podržava sve vrste sadržaja – fotografije, video, tekst, ankete, klipove – u bilo kojoj kombinaciji!",
            "Štedi vreme i novac – znatno je jeftinije nego angažovati osobu, a CopyBot delimično radi posao SMM stručnjaka!",
            "Isprobajte CopyBot potpuno besplatno tokom jedne nedelje ➔ @vkcopybot"
          ],
          forWhom: "Za koga je MindLoop AI?",
          sectors: "Savršeno rešenje za sve sektore sa čestim pitanjima korisnika.",
          sectorsList: [
            "Turizam", "Rent-a-car", "Edukacija", "E-commerce", "Dostava", "IT servisi"
          ],
          footerEmail: "Email",
          footerPhone: "Telefon",
        },
      },
      en: {
        translation: {
          title: "MindLoop AI Widget for Your Website",
          subtitle: "Automate client communication with an AI Assistant and CopyBot working 24/7.",
          tryDemo: "Try the demo now",
          free: "free",
          navKontakt: "Contact",
          benefits: {
            instant: "Fast replies and posts",
            smart: "Smart understanding and automation",
            easy: "Easy connection and integration",
            instantDesc: "The Chatbot delivers instant replies, while CopyBot automatically shares content between VK and Telegram.",
            smartDesc: "Our AI understands user questions and knows what and when to post without your input.",
            easyDesc: "Easily connect VK, Telegram, and integrate the Chatbot into your website — no hassle.",
          },
          featuresTitle: "Benefits of AI Assistant",
          features: [
            "Instant answers to frequent questions",
            "Automatic content reposting",
            "Smart product and service recommendations",
            "No extra software or coding required",
            "Easy integration with any website",
            "Works 24/7 to save your time"
          ],
          aiAssistantTitle: "Why CopyBot?",
          aiAssistantBullets: [
            "More people are moving from VK to Telegram, and managing two networks creates a lot of repetitive work. CopyBot solves this!",
            "No more manual copying – the bot automatically publishes posts, boosting reach and engagement!",
            "Full control – you can disable autoposting or add new channels anytime!",
            "Supports all types of content – photos, videos, texts, polls, clips – in any combination!",
            "Saves time and money – cheaper than hiring someone and partially replaces an SMM specialist!",
            "Try CopyBot free for one week ➔ @vkcopybot"
          ],
          forWhom: "Who is MindLoop AI for?",
          sectors: "Perfect for any sector with frequent customer questions.",
          sectorsList: [
            "Tourism", "Car rental", "Education", "E-commerce", "Delivery", "IT services"
          ],
          footerEmail: "Email",
          footerPhone: "Phone",
        },
      },
      fr: {
        translation: {
          title: "Widget MindLoop AI pour votre site",
          subtitle: "Automatisez la communication client avec l'Assistant IA et CopyBot 24h/24.",
          tryDemo: "Essayez la démo",
          free: "gratuit",
          navKontakt: "Contact",
          benefits: {
            instant: "Réponses et publications rapides",
            smart: "Compréhension intelligente et automatisation",
            easy: "Connexion et intégration faciles",
            instantDesc: "Le Chatbot fournit des réponses instantanées, tandis que CopyBot publie automatiquement le contenu entre VK et Telegram.",
            smartDesc: "Notre IA comprend les questions et sait quoi et quand publier sans votre intervention.",
            easyDesc: "Connectez facilement VK, Telegram et intégrez le Chatbot sur votre site — sans difficulté.",
          },
          featuresTitle: "Avantages de l'Assistant IA",
          features: [
            "Réponses instantanées aux questions fréquentes",
            "Republication automatique de contenu",
            "Recommandations intelligentes de produits et services",
            "Aucun logiciel ou codage supplémentaire requis",
            "Intégration facile sur tout site web",
            "Fonctionne 24h/24 pour économiser votre temps"
          ],
          aiAssistantTitle: "Pourquoi CopyBot?",
          aiAssistantBullets: [
            "De plus en plus de personnes passent de VK à Telegram, ce qui crée beaucoup de travail répétitif. CopyBot résout ce problème !",
            "Plus besoin de copier manuellement – le bot publie automatiquement les posts en augmentant la portée et l'engagement !",
            "Contrôle total – vous pouvez désactiver l'autoposting ou ajouter de nouveaux canaux à tout moment !",
            "Prend en charge tous les types de contenus – photos, vidéos, textes, sondages, clips – en toute combinaison !",
            "Économise du temps et de l'argent – remplace partiellement un spécialiste SMM !",
            "Essayez CopyBot gratuitement pendant une semaine ➔ @vkcopybot"
          ],
          forWhom: "À qui s'adresse MindLoop AI ?",
          sectors: "Parfait pour tous les secteurs avec des questions fréquentes.",
          sectorsList: [
            "Tourisme", "Location de voiture", "Éducation", "E-commerce", "Livraison", "Services informatiques"
          ],
          footerEmail: "Email",
          footerPhone: "Téléphone",
        },
      },
      ru: {
        translation: {
          title: "Виджет MindLoop AI для вашего сайта",
          subtitle: "Автоматизируйте общение с клиентами с помощью AI-ассистента и CopyBot 24/7.",
          tryDemo: "Попробовать демо",
          free: "бесплатно",
          navKontakt: "Контакт",
          benefits: {
            instant: "Быстрые ответы и публикации",
            smart: "Умное понимание и автоматизация",
            easy: "Лёгкое подключение и интеграция",
            instantDesc: "Чатбот мгновенно отвечает на вопросы, а CopyBot автоматически публикует контент между VK и Telegram.",
            smartDesc: "Наш ИИ понимает вопросы пользователей и знает, что и когда публиковать без вашего участия.",
            easyDesc: "Легко подключите VK, Telegram и интегрируйте Чатбот на ваш сайт — без сложностей.",
          },
          featuresTitle: "Преимущества AI-ассистента",
          features: [
            "Мгновенные ответы на частые вопросы",
            "Автоматическая публикация контента",
            "Умные рекомендации товаров и услуг",
            "Не требует дополнительного ПО или кода",
            "Лёгкая интеграция на любой сайт",
            "Работает 24/7 и экономит ваше время"
          ],
          aiAssistantTitle: "Почему CopyBot?",
          aiAssistantBullets: [
            "Всё больше людей переходит из VK в Telegram, что создаёт много рутинной работы. CopyBot решает эту проблему!",
            "Больше никакого ручного копирования – бот сам публикует посты, увеличивая охваты и вовлечённость!",
            "Полный контроль – можно отключить автопостинг или добавить новые каналы в любой момент!",
            "Поддержка любого контента – фото, видео, тексты, опросы, клипы — в любых комбинациях!",
            "Экономия времени и денег – бот выполняет часть работы SMM-специалиста!",
            "Попробуйте CopyBot бесплатно в течение недели ➔ @vkcopybot"
          ],
          forWhom: "Кому подходит MindLoop AI?",
          sectors: "Отличное решение для отраслей с частыми вопросами пользователей.",
          sectorsList: [
            "Туризм", "Аренда авто", "Образование", "Электронная коммерция", "Доставка", "IT-услуги"
          ],
          footerEmail: "Эл. почта",
          footerPhone: "Телефон",
        },
      },
    },
  });

export default i18n;
