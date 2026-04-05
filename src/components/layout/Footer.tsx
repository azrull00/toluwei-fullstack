import Link from "next/link";
import { Flame, Phone, MapPin, Heart, BookOpen } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111210] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main */}
        <div className="py-12 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="w-8 h-8 bg-[#B03A2E] rounded-lg flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white text-[17px] font-bold">{BRAND.name}</span>
            </Link>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
              {BRAND.tagline} di {BRAND.location}. Segar, higienis, dan penuh cita rasa autentik.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <div className="w-5 h-5 rounded-full bg-[#D4AC0D]/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#D4AC0D]" />
              </div>
              <span className="text-stone-500 text-xs">Buka Senin – Sabtu, 06.00–18.00 WITA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-5">Navigasi</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-stone-500 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    {link.href === "/katalog" && <BookOpen className="w-3.5 h-3.5 text-[#B03A2E]" />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-5">Produk</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/katalog" className="text-stone-500 hover:text-white transition-colors text-sm">
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link href="/katalog?filter=SEGAR" className="text-stone-500 hover:text-white transition-colors text-sm">
                  Daging Segar
                </Link>
              </li>
              <li>
                <Link href="/katalog?filter=OLAHAN" className="text-stone-500 hover:text-white transition-colors text-sm">
                  Produk Olahan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-5">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AC0D] mt-0.5 shrink-0" />
                <a href={`tel:${BRAND.phone}`} className="text-stone-500 hover:text-white transition-colors text-sm">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AC0D] mt-0.5 shrink-0" />
                <span className="text-stone-500 text-sm leading-relaxed">{BRAND.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-600 text-xs">© {year} {BRAND.name}. Hak Cipta Dilindungi.</p>
          <p className="text-stone-600 text-xs flex items-center gap-1.5">
            Dibuat dengan <Heart className="w-3 h-3 text-[#B03A2E] fill-[#B03A2E]" /> dari Sumba Timur, NTT
          </p>
        </div>
      </div>
    </footer>
  );
}
