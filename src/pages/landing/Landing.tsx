// ================================
// path: src/pages/public/LandingPage.tsx
// ================================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Truck,
  Scale,
  Recycle,
  Shield,
  ClipboardList,
  Barcode,
  Camera,
  MapPin,
  Coins,
  TrendingUp,
  BarChart3,
  Users,
  ChevronRight,
  Settings,
  FileText,
  Package,
} from "lucide-react";
import { ResponsiveContainer, XAxis, YAxis, Area, AreaChart } from "recharts";

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const throughput = [
    { name: "Sty", value: 180 },
    { name: "Lut", value: 210 },
    { name: "Mar", value: 230 },
    { name: "Kwi", value: 260 },
    { name: "Maj", value: 275 },
    { name: "Cze", value: 310 },
  ];

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-cyan-700 rounded-xl flex items-center justify-center">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ScrapMaster</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#moduly" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Moduły
              </a>
              <a href="#dla-kogo" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Dla kogo
              </a>
              <a href="#cennik" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Cennik
              </a>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white text-sm px-6" onClick={() => navigate("/login")}>
                Zaloguj się
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-8">
                <Scale className="w-4 h-4 text-emerald-700" />
                <span className="text-sm font-medium text-emerald-700">System zarządzania złomowiskiem</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Operacje, które{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-700">
                  ważą się same
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Kompletny system do obsługi skupu i sprzedaży złomu: waga samochodowa, przyjęcia/wywozy, cenniki frakcji,
                ewidencja dokumentów i rozliczenia — w jednym miejscu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8" onClick={() => navigate("/login")}>
                  Wypróbuj teraz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-gray-300">
                  Zobacz demo
                </Button>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <div className="text-2xl font-bold">310 t</div>
                  <div className="text-sm text-gray-500">średnio / m-c</div>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold">-32%</div>
                  <div className="text-sm text-gray-500">mniej błędów w ważeniu</div>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold">2 min</div>
                  <div className="text-sm text-gray-500">czas odprawy auta</div>
                </div>
              </div>
            </div>

            {/* Right: product preview */}
            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600/5 to-cyan-700/5 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-cyan-700 rounded-lg flex items-center justify-center">
                          <Scale className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Panel operacyjny</span>
                      </div>
                      <Badge className="bg-green-50 text-green-700 border-green-200">Połączono z wagą</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Truck className="w-5 h-5 text-emerald-700" />
                          <span className="text-xs text-gray-500">+18</span>
                        </div>
                        <div className="text-2xl font-bold">142</div>
                        <div className="text-xs text-gray-500">Wjazdy dzisiaj</div>
                      </div>

                      <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Coins className="w-5 h-5 text-cyan-700" />
                          <span className="text-xs text-gray-500">PLN</span>
                        </div>
                        <div className="text-2xl font-bold">4,21</div>
                        <div className="text-xs text-gray-500">Śr. cena/kg (mix)</div>
                      </div>

                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Shield className="w-5 h-5 text-amber-700" />
                          <span className="text-xs text-gray-500">0</span>
                        </div>
                        <div className="text-2xl font-bold">Alarmy</div>
                        <div className="text-xs text-gray-500">Zgodność / limity</div>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium">Przerób (t/m-c)</span>
                        <span className="text-xs text-gray-500">Ostatnie 6 miesięcy</span>
                      </div>
                      <ResponsiveContainer width="100%" height={120}>
                        <AreaChart data={throughput}>
                          <defs>
                            <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} fill="url(#colorThroughput)" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                          <YAxis hide />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Active flows */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Aktywne zlecenia</span>
                        <a href="#" className="text-emerald-700 hover:underline">
                          Zobacz wszystkie
                        </a>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-cyan-700 rounded-lg flex items-center justify-center">
                              <ClipboardList className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Przyjęcie: Złom stalowy (St3)</div>
                              <div className="text-xs text-gray-500">Dostawca: Metal-Pol • Brama 2</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-sky-600 rounded-lg flex items-center justify-center">
                              <Truck className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Wywóz: Miedź cięta</div>
                              <div className="text-xs text-gray-500">Odbiorca: CopperTrade • 12:45</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="moduly" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Moduły, które{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-700">upraszczają operacje</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Od wagi po fakturę — pełen przepływ materiału z kontrolą jakości i zgodnością.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Scale,
                title: "Waga i bilety",
                desc: "Dwuważenie, auto-pobór z wagi, bilety przyjęcia/wywozu, tary z historii.",
                grad: "from-emerald-600 to-cyan-700",
              },
              {
                icon: Barcode,
                title: "Magazyn frakcji",
                desc: "Stany w czasie rzeczywistym, frakcje/klasy, partie i numeracja dostaw.",
                grad: "from-cyan-700 to-sky-500",
              },
              {
                icon: Settings,
                title: "Cenniki i reguły",
                desc: "Ceny wg frakcji, wilgotności, jakości; indeksy rynkowe i marże.",
                grad: "from-amber-500 to-yellow-500",
              },
              {
                icon: Camera,
                title: "Kontrola jakości",
                desc: "Zdjęcia z kamer przy wadze, notatki jakościowe, blokady i odrzuty.",
                grad: "from-violet-600 to-fuchsia-600",
              },
              {
                icon: FileText,
                title: "Dokumenty i zgodność",
                desc: "KPO/BDO, WZ/PZ, JPK, rejestry kierowców i kontrahentów, audyty.",
                grad: "from-slate-700 to-slate-500",
              },
              {
                icon: BarChart3,
                title: "Analityka",
                desc: "Marża/kg, straty technologiczne, rotacja frakcji, KPI bram i wag.",
                grad: "from-teal-600 to-emerald-600",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.grad}/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-br ${f.grad} rounded-2xl flex items-center justify-center mb-6`}>
                    <f.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-gray-600 mb-4">{f.desc}</p>
                  <div className="flex items-center text-sm text-emerald-700 font-medium">
                    Dowiedz się więcej
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white" id="dla-kogo">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Jak to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-700">działa</span>
            </h2>
            <p className="text-lg text-gray-600">Cztery kroki od wjazdu do rozliczenia</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-12">
                {[
                  {
                    number: "01",
                    title: "Wjazd i rejestracja",
                    description: "Skan rejestracji, wybór kontrahenta, zlecenie i frakcja.",
                    icon: Truck,
                    color: "from-emerald-600 to-cyan-700",
                  },
                  {
                    number: "02",
                    title: "Ważenie i kontrola",
                    description: "Auto-odczyt z wagi, zdjęcia z kamer, notatki jakościowe.",
                    icon: Scale,
                    color: "from-cyan-700 to-sky-500",
                  },
                  {
                    number: "03",
                    title: "Magazyn i dokumenty",
                    description: "PZ/WZ, KPO/BDO, przyjęcie na partię i aktualizacja stanów.",
                    icon: Package,
                    color: "from-amber-500 to-yellow-500",
                  },
                  {
                    number: "04",
                    title: "Rozliczenie i analityka",
                    description: "Cenniki, faktury/kwity kasowe, raporty marży i KPI.",
                    icon: Coins,
                    color: "from-teal-600 to-emerald-600",
                  },
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                      <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                        <div className={`inline-flex items-center gap-4 mb-2 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}>
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                          <span className="text-4xl font-bold text-gray-200">{step.number}</span>
                        </div>
                        <p className="text-gray-600 text-lg">{step.description}</p>
                      </div>
                      <div className="w-2/12 flex justify-center">
                        <div className={`relative z-10 w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="w-5/12" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800" id="cennik">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "99,95%", label: "Dostępność", icon: Shield },
              { value: "<2 min", label: "Odprawa auta", icon: Truck },
              { value: "0,1 kg", label: "Dokładność zapisu", icon: Scale },
              { value: "4.9/5", label: "Ocena użytkowników", icon: Users },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-white/60" />
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Gotowy na{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-700">
                pełną kontrolę
              </span>
              ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Uporządkuj ważenia, dokumenty i rozliczenia. Pierwsze 30 dni gratis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Input
                type="email"
                placeholder="twoj@email.pl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-xs h-12"
              />
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-cyan-700 hover:opacity-90 text-white px-8 h-12"
                onClick={() => navigate("/login")}
              >
                Zarejestruj konto
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-gray-500">Bez karty • Anuluj w każdej chwili • Pełny dostęp</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Recycle className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold">ScrapMaster</span>
            </div>
            <div className="text-sm text-white/60">© 2025 ScrapMaster. Wszystkie prawa zastrzeżone.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
