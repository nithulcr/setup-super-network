import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Contact Info */}
          <div className="space-y-12">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Get in <span className="text-blue-500">Touch</span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-lg">
                Have a project in mind or need expert technical assistance? 
                Our team at Setup Super Network is ready to help you scale your infrastructure.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email Us</h3>
                  <p className="text-zinc-400 mt-1">contact@setupsupernetwork.com</p>
                  <p className="text-zinc-500 text-sm mt-1">Average response time: 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Call Us</h3>
                  <p className="text-zinc-400 mt-1">+1 (555) 123-4567</p>
                  <p className="text-zinc-500 text-sm mt-1">Mon - Fri, 9am - 6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Our Office</h3>
                  <p className="text-zinc-400 mt-1">123 Tech Avenue, Silicon Valley</p>
                  <p className="text-zinc-500 text-sm mt-1">California, USA</p>
                </div>
              </div>
            </div>

            {/* Social or additional info placeholder */}
            <div className="pt-8 border-t border-white/5 max-w-sm">
              <p className="text-zinc-500 text-sm">
                Looking for technical documentation? <a href="#" className="text-blue-500 hover:underline">Visit our docs</a>.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="fixed top-0 right-0 -z-10 h-[600px] w-[600px] bg-blue-500/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
    </main>
  );
}
