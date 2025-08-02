import { Star } from 'lucide-react';

const Testimonials = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-20 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Student Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how our students achieved their dream SAT scores and got into their top-choice colleges.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-8 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="text-gray-900 font-semibold">{testimonial.name}</h4>
                  <div className="flex items-center">
                    <span className="text-yellow-500 font-bold mr-2">SAT Score: {testimonial.score}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
