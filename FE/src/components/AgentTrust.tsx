import { motion } from 'framer-motion';
import { Star, MapPin, Shield, FileCheck, Calculator, ChevronRight } from 'lucide-react';
import avatar1 from '@/assets/images/avatar1.jpg';

const agents = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    avatar: avatar1,
    rating: 4.9,
    reviews: 128,
    areas: ['District 2', 'District 7', 'Binh Thanh'],
    verified: true,
  },
  {
    id: 2,
    name: 'Trần Thị Mai',
    avatar: avatar1,
    rating: 4.8,
    reviews: 95,
    areas: ['District 1', 'District 3', 'Phu Nhuan'],
    verified: true,
  },
  {
    id: 3,
    name: 'Lê Minh Tuấn',
    avatar: avatar1,
    rating: 4.7,
    reviews: 82,
    areas: ['Thu Duc City', 'District 9', 'Di An'],
    verified: true,
  },
  {
    id: 4,
    name: 'Phạm Hoàng Linh',
    avatar: avatar1,
    rating: 4.9,
    reviews: 156,
    areas: ['Ba Dinh', 'Cau Giay', 'Dong Da'],
    verified: true,
  },
];

const trustFeatures = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Legal Support',
    description: 'Free consultation on contracts and procedures',
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: 'Planning Check',
    description: 'Verify accurate planning information',
  },
  {
    icon: <Calculator className="w-6 h-6" />,
    title: 'Valuation',
    description: 'Objective real estate valuation',
  },
];

export const AgentTrust = () => {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-content mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <h2 className="mb-2">Trusted Agents</h2>
            <p className="text-muted-foreground">
              Professional agents, verified by us
            </p>
          </div>
          <a href="#" className="text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>

        {/* Agents Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="card-elevated card-hover p-5 text-center cursor-pointer group"
            >
              {/* Avatar */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-full h-full rounded-full object-cover"
                />
                {agent.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                {agent.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-3">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium text-foreground">{agent.rating}</span>
                <span className="text-muted-foreground text-sm">({agent.reviews})</span>
              </div>

              {/* Areas */}
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{agent.areas.join(', ')}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Banner */}
        <motion.div
          className="bg-primary rounded-2xl p-8 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-accent flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
