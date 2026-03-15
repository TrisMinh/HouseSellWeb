import { motion } from 'framer-motion';
import { Search, FileText, CalendarCheck } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: 'Search & Filter',
    description: 'Enter location, choose price range, number of rooms, and property type that suits your needs.',
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'View Details & Compare',
    description: 'View full information, real photos, and compare options to make the best decision.',
  },
  {
    icon: <CalendarCheck className="w-8 h-8" />,
    title: 'Contact & Schedule',
    description: 'Connect directly with trusted agents, schedule viewings, and receive comprehensive legal support.',
  },
];

export const HowItWorks = () => {
  return (
    <section className="section-padding bg-surface">
      <div className="max-w-content mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="mb-4">How Blue Sky Works</h2>
          <p className="text-muted-foreground text-lg">
            Find your perfect property in just 3 simple steps
          </p>
        </div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="relative text-center"
            >
              {/* Step Number */}


              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-6">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line - Hide on last item and mobile */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-accent/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
