import { Mail } from "lucide-react";

export default function Partners() {

    const logos = [
    "/king-faisal-hospital-kigali-logo.png",
    "/kipharma.png",
    "/minisante.png",
    "/rbc.png",
    "/CHUB.png",
  ];


  return (
    <section className="w-full py-24 flex flex-col items-center ">
      <div className="w-full flex flex-col items-center text-center">
        <div className="flex items-center justify-center mb-8 text-primary">
          <span className="font-semibold text-3xl md:text-4xl text-blue-600">Our Partners</span>
        </div>
       <div className="relative w-full overflow-hidden">
         <div className="flex whitespace-nowrap animate-scroll">
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  className="mx-4 sm:mx-6 lg:mx-10 h-12 sm:h-16 lg:h-20 w-auto object-contain animate-fade-in flex-shrink-0"
                  alt="partner logo"
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}
