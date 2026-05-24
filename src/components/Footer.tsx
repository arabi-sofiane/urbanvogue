type FooterProps = {
  setActiveTab: (tab: string) => void;
};

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-10 md:space-y-0 text-gray-500 text-sm">
          
          <div className="max-w-sm space-y-4">
            <h3 className="text-xl font-serif text-black font-semibold uppercase tracking-wider">Urban Vogue</h3>
            <p className="leading-relaxed text-gray-400">
              Defining the intersection of architectural minimalism and modern streetwear.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 w-full md:w-auto">
            <div className="space-y-3.5">
              <h4 className="text-xs uppercase tracking-widest text-black font-semibold">Customer Care</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-black transition">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-black transition">Size Guide</a></li>
                <li><a href="#" className="hover:text-black transition">FAQ</a></li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h4 className="text-xs uppercase tracking-widest text-black font-semibold">Company</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-black transition">Sustainability</a></li>
                <li><a href="#" className="hover:text-black transition">About Us</a></li>
                <li><button onClick={() => setActiveTab("contact")} className="hover:text-black transition cursor-pointer text-left">Contact</button></li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h4 className="text-xs uppercase tracking-widest text-black font-semibold">Legal</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-black transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-black transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 space-y-4 sm:space-y-0">
          <p>© 2026 Urban Vogue. All rights reserved.</p>
          <p className="tracking-widest capitalize">Designed for the minimal citizen</p>
        </div>
      </div>
    </footer>
  );
}
