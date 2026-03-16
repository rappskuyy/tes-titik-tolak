import { useSearchParams } from "react-router-dom";
import { Check, ArrowLeft, CreditCard, Wallet, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const plansData: Record<string, { name: string; price: string; period: string; features: string[] }> = {
    basic: {
        name: "Basic",
        price: "Rp 499.000",
        period: "/bulan",
        features: ["Akses 50+ kursus dasar", "Sertifikat digital", "Forum komunitas", "Email support"],
    },
    pro: {
        name: "Pro",
        price: "Rp 999.000",
        period: "/bulan",
        features: ["Akses semua kursus premium", "Mentoring 1-on-1 bulanan", "Sertifikat profesional", "Priority support 24/7", "Akses tools eksklusif", "Networking events"],
    },
    enterprise: {
        name: "Enterprise",
        price: "Custom",
        period: "",
        features: ["Unlimited users", "Custom curriculum", "Dedicated account manager", "Advanced analytics", "API integration", "SLA guarantee"],
    },
};

const paymentMethods = [
    { id: "cc", label: "Kartu Kredit / Debit", icon: CreditCard },
    { id: "wallet", label: "E-Wallet (OVO, GoPay, Dana)", icon: Wallet },
    { id: "bank", label: "Transfer Bank", icon: Building2 },
];

const Payment = () => {
    const [searchParams] = useSearchParams();
    const planKey = (searchParams.get("plan") ?? "basic").toLowerCase();
    const plan = plansData[planKey] ?? plansData.basic;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto px-6 flex items-center h-[70px] gap-4">
                    <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft size={18} />
                        <span className="text-sm font-medium">Kembali</span>
                    </Link>
                    <span className="text-foreground font-semibold text-lg">Pembayaran</span>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-start">
                {/* Order Summary */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-foreground mb-6">Ringkasan Pesanan</h2>

                    <div className="mb-6 p-4 bg-secondary/30 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Paket yang dipilih</p>
                        <p className="text-2xl font-bold text-foreground">{plan.name}</p>
                        <p className="text-lg font-semibold text-primary mt-1">
                            {plan.price}
                            <span className="text-sm text-muted-foreground font-normal">{plan.period}</span>
                        </p>
                    </div>

                    <ul className="space-y-3">
                        {plan.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                {f}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 border-t border-border pt-6 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total</span>
                        <span className="text-xl font-bold text-foreground">{plan.price}</span>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-foreground mb-6">Detail Pembayaran</h2>

                    {/* Personal Info */}
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Nama Lengkap</label>
                            <input
                                type="text"
                                placeholder="Masukkan nama lengkap"
                                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                            <input
                                type="email"
                                placeholder="email@contoh.com"
                                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Nomor HP</label>
                            <input
                                type="tel"
                                placeholder="08xxxxxxxxxx"
                                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-6">
                        <p className="text-sm font-medium text-foreground mb-3">Metode Pembayaran</p>
                        <div className="space-y-2">
                            {paymentMethods.map((method) => (
                                <label
                                    key={method.id}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-secondary/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-secondary/40"
                                >
                                    <input type="radio" name="payment" value={method.id} className="accent-primary" defaultChecked={method.id === "cc"} />
                                    <method.icon size={18} className="text-muted-foreground" />
                                    <span className="text-sm text-foreground">{method.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-primary text-primary-foreground py-3 rounded-full text-sm font-semibold hover:opacity-90 transition shadow-md"
                    >
                        Bayar Sekarang
                    </button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                        Dengan melanjutkan, kamu menyetujui{" "}
                        <a href="#" className="underline hover:text-foreground">Syarat & Ketentuan</a>{" "}
                        TitikTolak.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Payment;
