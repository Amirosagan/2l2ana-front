import { Lock, Brain, BadgeCheck, Headphones, Users, ShieldCheck, TimerIcon } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const features = [
  {
    icon: Users,
    index: 0,
  },
  {
    icon: ShieldCheck,
    index: 1,
  },
  {
    icon: Brain,
    index: 2,
  },
  {
    icon: TimerIcon,
    index: 3,
  },
];

const WhyChooseUs = () => {
  const t = useTranslations("WhyCard");
  const locale = useLocale();
  const isRTL = locale !== "en";

  const Card = ({ children, className }) => (
    <div
      className={`rounded-xl border shadow-sm bg-white text-black ${className || ""}`}
    >
      {children}
    </div>
  );

  const CardContent = ({ children, className }) => (
    <div className={`p-6 ${className || ""}`}>{children}</div>
  );

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="py-20 px-4 bg-neutral-100">
      <div className="w-full lg:w-[85%] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl tajawal-bold text-foreground mb-4">
            {t("headline")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, index }) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl tajawal-bold text-card-foreground mb-3">
                  {t(`cards.${index}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`cards.${index}.paragraph`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
