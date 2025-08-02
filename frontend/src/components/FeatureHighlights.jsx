import { User, FileText, HelpCircle, BarChart2, ClipboardList } from 'lucide-react';

const features = [
  {
    icon: <User className="w-5 h-5" />,
    title: "1-on-1 Live Coaching",
    description: "Personalized sessions with expert tutors tailored to your learning style",
    bg: "bg-blue-600",
    border: "border-blue-100",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "100+ Full-Length Mock Tests",
    description: "Comprehensive test bank to simulate real exam conditions",
    bg: "bg-green-600",
    border: "border-green-100",
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    title: "24/7 Doubt Support",
    description: "Instant access to instructors for real-time clarification",
    bg: "bg-yellow-600",
    border: "border-green-100",
  },
  {
    icon: <BarChart2 className="w-5 h-5" />,
    title: "Advanced Analytics Dashboard",
    description: "Data-driven insights to track and optimize your performance",
    bg: "bg-purple-600",
    border: "border-purple-100",
  },
  {
    icon: <ClipboardList className="w-5 h-5" />,
    title: "Personalized Study Plan",
    description: "AI-powered roadmap adapted to your strengths and weaknesses",
    bg: "bg-red-600",
    border: "border-red-100",
  },
   {
    icon: <BarChart2 className="w-5 h-5" />,
    title: "Advanced Analytics Dashboard",
    description: "Data-driven insights to track and optimize your performance",
    bg: "bg-purple-600",
    border: "border-purple-100",
  },
];

const FeatureHighlights = ({setIsRegisterOpen})=> {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Premium Learning Experience
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to achieve your academic goals
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex flex-col p-6 rounded-xl border ${feature.border} bg-white hover:shadow-lg transition-all duration-300`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg ${feature.bg}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button 
          onClick={() => setIsRegisterOpen(true)}
          className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeatureHighlights;