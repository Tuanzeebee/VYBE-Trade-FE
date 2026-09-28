/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  Package, 
  Send, 
  Sparkles, 
  MapPin, 
  Sprout, 
  Fish, 
  UtensilsCrossed, 
  X, 
  CheckCircle2, 
  Filter,
  Building2,
  CreditCard
} from 'lucide-react';
import ProductVerification from './components/ProductVerification.tsx';
import ProductAiTrust from './components/ProductAiTrust.tsx';
import SellerOnboarding from './components/SellerOnboarding.tsx';
import SellerWorkspace from './components/SellerWorkspace.tsx';
import BuyerDirectory, { DIRECTORY_SUPPLIERS } from './components/BuyerDirectory.tsx';
import BuyerSellerDetail, { SupplierData, DEFAULT_SELLER_DETAIL } from './components/BuyerSellerDetail.tsx';
import PricingPlans from './components/PricingPlans.tsx';
import SolutionsPage from './components/SolutionsPage.tsx';
import AboutUsPage from './components/AboutUsPage.tsx';
import LiveSearchDropdown from './components/LiveSearchDropdown.tsx';
import { useLanguage, LANGUAGES, LanguageCode } from './context/LanguageContext.tsx';
import CountryFlag from './components/CountryFlag.tsx';
import LanguageSelectorModal from './components/LanguageSelectorModal.tsx';
import AuthPage from './components/AuthPage';
import BuyerOnboarding from './components/BuyerOnboarding';
import AdminDashboard from './components/AdminDashboard';
import { completeOnboarding, getSession, getUserPage, logout, ROLE_LABELS, type DemoUser } from './lib/demoAuth';

type Page = 'home' | 'product' | 'onboarding' | 'seller-profile' | 'workspace' | 'buyer-directory' | 'buyer-seller-detail' | 'pricing' | 'solutions' | 'about' | 'login' | 'register' | 'admin';

export default function App() {
  const { tr, language, setLanguage, currentLanguageOption, t } = useLanguage();
  const [user, setUser] = useState<DemoUser | null>(() => {
    try { return getSession(); } catch { return null; }
  });
  const [currentPage, setPage] = useState<Page>(() => user ? getUserPage(user) : 'home');
  const [directoryNav, setDirectoryNav] = useState<'suppliers' | 'buyer'>('suppliers');
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierData>(DEFAULT_SELLER_DETAIL);
  const [openSupplierRfq, setOpenSupplierRfq] = useState(false);
  const [headerProfileOpen, setHeaderProfileOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [workspaceTab, setWorkspaceTab] = useState<'verification' | 'profile' | 'overview' | 'products' | 'rfq' | 'notifications' | 'licenses'>('profile');
  const [productService, setProductService] = useState<'ai-trust' | 'verification'>('ai-trust');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLiveSearchOpen, setIsLiveSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<'category' | 'market' | 'trust' | null>(null);
  const [selectedMarket, setSelectedMarket] = useState('Tất cả thị trường');
  const [selectedTrust, setSelectedTrust] = useState('Tất cả cấp độ');
  const [activeSupplierModal, setActiveSupplierModal] = useState<any | null>(null);
  const [activeNavModal, setActiveNavModal] = useState<string | null>(null);

  function setCurrentPage(page: Page) {
    const protectedPage = ['workspace', 'onboarding', 'seller-profile', 'admin'].includes(page);
    if (protectedPage && !user) { setPage('login'); return; }
    if (user && getUserPage(user) === 'onboarding') { setPage('onboarding'); return; }
    if (user && (page === 'onboarding' ||
      (['workspace', 'seller-profile'].includes(page) && user.role !== 'seller') ||
      (page === 'admin' && user.role !== 'admin'))) {
      setPage(getUserPage(user)); return;
    }
    if (page === 'buyer-seller-detail') setOpenSupplierRfq(false);
    setPage(page);
  }

  function authenticated(nextUser: DemoUser) {
    setUser(nextUser);
    setHeaderProfileOpen(false);
    setWorkspaceTab('profile');
    setSearchTerm('');
    setDirectoryNav(nextUser.role === 'buyer' ? 'buyer' : 'suppliers');
    setPage(getUserPage(nextUser));
  }

  function handleLogout() {
    try {
      logout();
      setUser(null);
      setHeaderProfileOpen(false);
      setSelectedSupplier(DEFAULT_SELLER_DETAIL);
      setSearchTerm('');
      setPage('login');
    } catch { window.alert(tr('Không thể xóa phiên demo. Vui lòng cho phép lưu trữ trên trình duyệt.')); }
  }

  if (currentPage === 'login' || currentPage === 'register') {
    return <AuthPage key={currentPage} mode={currentPage} onModeChange={setCurrentPage} onAuthenticated={authenticated} onNavigateHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'onboarding' && user) {
    const onComplete = (profile: Record<string, string>) => authenticated(completeOnboarding(user.id, profile));
    if (user.role === 'buyer') return <BuyerOnboarding key={user.id} user={user} onComplete={onComplete} onLogout={handleLogout} />;
    if (user.role === 'seller') return <SellerOnboarding key={user.id} account={user} initialStep={1} onComplete={onComplete}
      onLogout={handleLogout} onNavigateHome={() => setCurrentPage('home')}
      onNavigateWorkspace={() => setCurrentPage('workspace')} />;
  }

  const POPULAR_TAGS = [
    'Cà phê',
    'Gạo',
    'Trái cây tươi',
    'Thủy sản',
    'Hạt điều',
    'Tiêu',
    'Rau củ quả'
  ];

  const SUPPLIERS = [
    {
      id: 'vietfarm',
      name: 'VietFarm Co., Ltd.',
      verifiedLevel: 'L2 Enhanced Verified',
      verifiedType: 'l2',
      category: 'Nông sản',
      categoryType: 'agriculture',
      location: 'Việt Nam',
      tags: ['Cà phê', 'Hồ tiêu', 'Trái cây'],
      description: 'Chuyên xuất khẩu cà phê Robusta & Arabica Đắk Lắk, hồ tiêu Gia Lai đạt chứng nhận Rainforest Alliance và hữu cơ USDA.',
      capacity: '15,000 tấn/năm',
      standards: 'ISO 22000, HACCP, USDA Organic',
      iconColor: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'mekong',
      name: 'Mekong Seafood',
      verifiedLevel: 'L1 Basic Verified',
      verifiedType: 'l1',
      category: 'Thủy sản',
      categoryType: 'seafood',
      location: 'Việt Nam',
      tags: ['Tôm', 'Cá tra', 'Cá ngừ'],
      description: 'Cung cấp tôm sú, tôm thẻ chân trắng đông lạnh và phi lê cá tra xuất khẩu thị trường EU, Nhật Bản và Bắc Mỹ.',
      capacity: '25,000 tấn/năm',
      standards: 'BAP 4-Star, ASC, GlobalGAP',
      iconColor: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'greenfields',
      name: 'GreenFields Export',
      verifiedLevel: 'L3 VYBE Certified',
      verifiedType: 'l3',
      category: 'Nông sản',
      categoryType: 'agriculture',
      location: 'Việt Nam',
      tags: ['Gạo', 'Rau củ quả', 'Gia vị'],
      description: 'Chuỗi cung ứng gạo thơm ST25, Jasmine đạt giải thế giới, rau củ quả chuẩn VietGAP xuất khẩu trực tiếp sang Châu Âu.',
      capacity: '50,000 tấn/năm',
      standards: 'BRCGS Food, IFS Food, Fairtrade',
      iconColor: 'bg-emerald-50 text-emerald-800',
    },
    {
      id: 'anphu',
      name: 'An Phu Food',
      verifiedLevel: 'L2 Enhanced Verified',
      verifiedType: 'l2',
      category: 'Thực phẩm',
      categoryType: 'food',
      location: 'Việt Nam',
      tags: ['Hạt điều', 'Trái cây sấy', 'Gia vị'],
      description: 'Nhà chế biến sâu hạt điều Bình Phước W240, W320 và trái cây sấy dẻo công nghệ sấy lạnh giữ nguyên hương vị tự nhiên.',
      capacity: '8,000 tấn/năm',
      standards: 'FSSC 22000, Halal, Kosher',
      iconColor: 'bg-amber-50 text-amber-600',
    }
  ];

  if (currentPage === 'workspace') {
    return (
      <SellerWorkspace 
        key={user?.id}
        account={user || undefined}
        onLogout={handleLogout}
        onNavigateHome={() => setCurrentPage('home')}
        onNavigateOnboarding={() => setCurrentPage('seller-profile')}
        onNavigateBuyerDetail={() => setCurrentPage('buyer-seller-detail')}
        initialTab={workspaceTab}
      />
    );
  }

  if (currentPage === 'seller-profile') {
    return (
      <SellerOnboarding 
        key={user?.id}
        account={user || undefined}
        onLogout={handleLogout}
        onNavigateHome={() => setCurrentPage('home')}
        onNavigateWorkspace={(tab) => {
          setWorkspaceTab(tab || 'profile');
          setCurrentPage('workspace');
        }}
      />
    );
  }

  const renderTopHeader = () => (
    <>
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 min-h-16 py-3 flex flex-wrap gap-3 items-center justify-between">
        
        {/* Brand Logo: Double Sprout Wing in Dark Teal + VYBE TRADE */}
        <div 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 flex items-center justify-center text-[#0b5e52]">
            <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 16 26 C 14 18 8 13 4 10 C 3 9 4 7 5 7 C 11 8 15 13 16 26 Z" fill="#0b5e52" />
              <path d="M 16 26 C 18 18 24 13 28 10 C 29 9 28 7 27 7 C 21 8 17 13 16 26 Z" fill="#0b5e52" />
            </svg>
          </div>
          <span className="text-[#0f172a] font-bold text-lg sm:text-[19px] tracking-wide uppercase">
            {tr("VYBE TRADE")}</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex flex-wrap items-center gap-4 xl:gap-6">
          {[
            { label: t.nav.solutions, id: 'solutions' },
            { label: t.nav.suppliers, id: 'suppliers' },
            { label: t.nav.buyer, id: 'buyer' },
            { label: t.nav.products, id: 'products' },
            { label: t.nav.pricing, id: 'pricing' },
            { label: t.nav.about, id: 'about' }
          ].map((link) => {
            const isBuyerActive = link.id === directoryNav && (currentPage === 'buyer-directory' || currentPage === 'buyer-seller-detail');
            const isProductActive = link.id === 'products' && currentPage === 'product';
            const isPricingActive = link.id === 'pricing' && currentPage === 'pricing';
            const isSolutionsActive = link.id === 'solutions' && currentPage === 'solutions';
            const isAboutActive = link.id === 'about' && currentPage === 'about';
            const isActive = isBuyerActive || isProductActive || isPricingActive || isSolutionsActive || isAboutActive;

            return (
              <button
                key={link.id}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => {
                  if (link.id === 'solutions') {
                    setCurrentPage('solutions');
                  } else if (link.id === 'about') {
                    setCurrentPage('about');
                  } else if (link.id === 'products') {
                    setCurrentPage('product');
                  } else if (link.id === 'pricing') {
                    setCurrentPage('pricing');
                  } else if (link.id === 'buyer' || link.id === 'suppliers') {
                    setDirectoryNav(link.id);
                    setCurrentPage('buyer-directory');
                  } else {
                    setCurrentPage('home');
                    setActiveNavModal(link.label);
                  }
                }}
                className={`text-sm transition-colors cursor-pointer ${
                  isActive
                    ? 'relative text-slate-950 font-bold pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0f172a]'
                    : 'text-slate-700 hover:text-slate-950 font-medium'
                }`}
              >
                {tr(link.label)}
              </button>
            );
          })}
        </nav>

        {/* Right: Language Selector Flag Pill + [TN] Công ty TNHH Nông Sản Việt */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          
          {/* Multi-Language Selector Dropdown with Flags */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-slate-700 hover:text-slate-900 transition-all rounded-full hover:bg-slate-100 border border-slate-200/90 cursor-pointer shadow-2xs group bg-white/80"
              title={tr(t.header.languageSelect)}
            >
              <div className="w-5 h-3.5 rounded-xs overflow-hidden border border-slate-200/60 shadow-2xs shrink-0 flex items-center justify-center">
                <CountryFlag code={language} className="w-full h-full" />
              </div>
              <span className="text-xs font-bold uppercase text-slate-800 tracking-wider">
                {tr(language)}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Quick Language Dropdown Menu */}
            {isLangMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
                <div className="px-3.5 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>{tr(t.header.languageSelect)}</span>
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                </div>
                {LANGUAGES.map((lang) => {
                  const isCurrent = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors cursor-pointer ${
                        isCurrent ? 'bg-blue-50/70 text-blue-900 font-bold' : 'text-slate-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-4 rounded-xs overflow-hidden border border-slate-200/60 shadow-2xs shrink-0 flex items-center justify-center">
                          <CountryFlag code={lang.code} className="w-full h-full" />
                        </div>
                        <div className="text-left">
                          <span className="block leading-tight">{lang.nativeName}</span>
                          <span className="text-[10px] text-slate-400 block">{tr(lang.country)}</span>
                        </div>
                      </div>
                      {isCurrent && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></div>
                      )}
                    </button>
                  );
                })}

                <div className="pt-2 mt-1 border-t border-slate-100 px-2">
                  <button
                    onClick={() => {
                      setIsLangMenuOpen(false);
                      setIsLangModalOpen(true);
                    }}
                    className="w-full py-1.5 px-2 rounded-xl text-[11px] text-blue-600 hover:bg-blue-50 font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>{tr(language === 'vi' ? 'Xem cờ & chi tiết ngôn ngữ' : language === 'fr' ? 'Détails des langues & drapeaux' : language === 'ja' ? '言語と国旗の詳細一覧' : 'View all flags & languages')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {user ? (
            <div className="relative">
              <button onClick={() => setHeaderProfileOpen(!headerProfileOpen)} aria-expanded={headerProfileOpen} className="flex items-center gap-2 rounded-full border border-slate-200 pl-1 pr-3 py-1 hover:bg-slate-50">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-900">{tr(user.name.slice(0, 2).toUpperCase())}</span>
                <span className="hidden max-w-32 truncate text-xs font-semibold xl:inline">{user.name}</span>
                <span className="hidden rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 sm:inline">{tr(ROLE_LABELS[user.role])}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
              </button>
              {headerProfileOpen && <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-slate-200 bg-white py-2 text-left text-sm shadow-xl">
                <div className="border-b border-slate-100 px-4 py-3"><p className="truncate font-bold">{user.company}</p><p className="mt-1 truncate text-xs text-slate-500">{user.email}</p><p className="mt-1 text-xs font-semibold text-teal-700">{tr(ROLE_LABELS[user.role])}</p></div>
                <button onClick={() => { setCurrentPage(getUserPage(user)); setHeaderProfileOpen(false); }} className="w-full px-4 py-3 text-left font-semibold text-teal-900 hover:bg-teal-50">{tr(user.role === 'seller' ? 'Workspace Seller' : user.role === 'admin' ? 'Quản trị hệ thống' : 'Tìm nhà cung cấp')}</button>
                {user.role === 'seller' && <button onClick={() => { setCurrentPage('seller-profile'); setHeaderProfileOpen(false); }} className="w-full px-4 py-3 text-left text-slate-600 hover:bg-slate-50">{tr("Cập nhật hồ sơ xuất khẩu")}</button>}
                <button onClick={handleLogout} className="w-full border-t border-slate-100 px-4 py-3 text-left font-semibold text-rose-600 hover:bg-rose-50">{tr("Đăng xuất")}</button>
              </div>}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage('login')} className="rounded-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 sm:text-sm">{tr("Đăng nhập")}</button>
              <button onClick={() => setCurrentPage('register')} className="hidden rounded-full bg-[#083832] px-3 py-2 text-xs font-semibold text-white hover:bg-[#062924] sm:inline-flex sm:px-4 sm:text-sm">{tr("Đăng ký")}</button>
            </div>
          )}
        </div>

      </div>
    </header>
    <LanguageSelectorModal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)} />
    </>
  );

  {/* =========================================================================
      PAGE DISPATCH: BUYER_SELLER DETAIL VIEW
     ========================================================================= */}
  if (currentPage === 'admin' && user?.role === 'admin') {
    return <div className="min-h-screen bg-[#f8fafc]">{renderTopHeader()}<AdminDashboard /></div>;
  }

  if (currentPage === 'buyer-seller-detail') {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <div>
          {renderTopHeader()}
          <BuyerSellerDetail 
            key={`${selectedSupplier.id}-${openSupplierRfq}`}
            openRfq={openSupplierRfq}
            supplier={selectedSupplier}
            onBackToDirectory={() => setCurrentPage('buyer-directory')}
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateWorkspace={() => {
              setWorkspaceTab('profile');
              setCurrentPage('workspace');
            }}
          />
        </div>
      </div>
    );
  }

  {/* =========================================================================
      PAGE DISPATCH: BUYER DIRECTORY (MATCHES USER SCREENSHOT)
     ========================================================================= */}
  if (currentPage === 'buyer-directory') {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <div>
          {renderTopHeader()}
          <BuyerDirectory 
            initialSearchTerm={searchTerm}
            initialCategory={selectedCategory}
            initialMarket={selectedMarket}
            initialLevel={selectedTrust.startsWith('L') ? selectedTrust.slice(0, 2) : 'all'}
            onSelectSupplier={(supp) => {
              setSelectedSupplier(supp);
              setCurrentPage('buyer-seller-detail');
            }}
            onNavigateHome={() => setCurrentPage('home')}
            onOpenRfqModal={(supplier) => {
              setSelectedSupplier(supplier);
              setOpenSupplierRfq(true);
              setPage('buyer-seller-detail');
            }}
          />
        </div>
      </div>
    );
  }

  {/* =========================================================================
      PAGE DISPATCH: PRICING PLANS VIEW (MATCHES USER SCREENSHOT)
     ========================================================================= */}
  if (currentPage === 'pricing') {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <div>
          {renderTopHeader()}
          <PricingPlans 
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateOnboarding={() => setCurrentPage('onboarding')}
            onNavigateWorkspace={() => {
              setWorkspaceTab('profile');
              setCurrentPage('workspace');
            }}
          />
        </div>
      </div>
    );
  }

  {/* =========================================================================
      PAGE DISPATCH: SOLUTIONS VIEW (MATCHES USER SCREENSHOT)
     ========================================================================= */}
  if (currentPage === 'solutions') {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <div>
          {renderTopHeader()}
          <SolutionsPage 
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateDirectory={() => setCurrentPage('buyer-directory')}
            onNavigatePricing={() => setCurrentPage('pricing')}
            onNavigateOnboarding={() => setCurrentPage('onboarding')}
            onNavigateWorkspace={() => {
              setWorkspaceTab('profile');
              setCurrentPage('workspace');
            }}
          />
        </div>
      </div>
    );
  }

  {/* =========================================================================
      PAGE DISPATCH: ABOUT US VIEW (MATCHES USER SCREENSHOT)
     ========================================================================= */}
  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <div>
          {renderTopHeader()}
          <AboutUsPage 
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateDirectory={() => setCurrentPage('buyer-directory')}
            onNavigateSolutions={() => setCurrentPage('solutions')}
            onNavigatePricing={() => setCurrentPage('pricing')}
            onNavigateOnboarding={() => setCurrentPage('onboarding')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      
      {/* =========================================================================
          1. HEADER / NAVIGATION BAR
         ========================================================================= */}
      {renderTopHeader()}

      {currentPage === 'product' ? (
        productService === 'ai-trust' ? (
          <ProductAiTrust 
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateNav={(nav) => setActiveNavModal(nav)}
            onSwitchToVerification={() => setProductService('verification')}
          />
        ) : (
          <ProductVerification 
            onNavigateHome={() => setCurrentPage('home')}
            onNavigateNav={(nav) => setActiveNavModal(nav)}
            onSwitchToAiTrust={() => setProductService('ai-trust')}
          />
        )
      ) : (
        <>
          {/* =========================================================================
              2. HERO SECTION WITH ILLUSTRATION
             ========================================================================= */}
          <section className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-8 sm:pt-12 pb-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Search */}
          <div className="lg:col-span-7 xl:col-span-7 z-10">
            
            {/* Kicker Badge: TRUSTED VIETNAMESE SUPPLIERS. GLOBAL OPPORTUNITIES. */}
            <div className="inline-flex items-center gap-2 mb-4 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]/20 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#0d9488] tracking-wider uppercase">
                {tr(t.hero.kicker)}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-slate-900 tracking-tight leading-[1.2] mb-4">
              {tr(t.hero.titlePre)}
              <span className="text-[#2563eb]">{tr(t.hero.titleHighlight)}</span>
              <br className="hidden sm:inline" />
              {tr(t.hero.titlePost)}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mb-8 font-normal">
              {tr(t.hero.subtitle)}
            </p>

            {/* Big Search Bar Pill Container */}
            <div className="relative bg-white rounded-full sm:rounded-2xl lg:rounded-full p-2 border border-slate-200/90 shadow-[0_6px_28px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
              
              {/* Search text input */}
              <div className="flex items-center gap-2.5 px-3 flex-1 w-full relative">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input 
                  type="text"
                  value={searchTerm}
                  onFocus={() => setIsLiveSearchOpen(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsLiveSearchOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsLiveSearchOpen(false);
                      setCurrentPage('buyer-directory');
                    } else if (e.key === 'Escape') {
                      setIsLiveSearchOpen(false);
                    }
                  }}
                  placeholder={tr(t.hero.searchPlaceholder)}
                  className="w-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent py-1.5 font-normal"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                    }}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                    title={tr("Xóa từ khóa")}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Dropdown 1: Ngành hàng */}
              <div className="relative border-t sm:border-t-0 sm:border-l border-slate-200 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(activeDropdown === 'category' ? null : 'category');
                    setIsLiveSearchOpen(false);
                  }}
                  className="w-full sm:w-auto px-4 py-1.5 text-xs sm:text-[13px] font-medium text-slate-700 hover:text-slate-900 flex items-center justify-between sm:justify-start gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>{tr(selectedCategory || t.hero.category)}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {activeDropdown === 'category' && (
                  <div className="absolute left-0 sm:left-auto top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-30">
                    {['Tất cả ngành', 'Nông sản', 'Thủy sản', 'Thực phẩm chế biến', 'Gia vị & Hương liệu'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat === 'Tất cả ngành' ? null : cat);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        {tr(cat)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown 2: Thị trường */}
              <div className="relative border-t sm:border-t-0 sm:border-l border-slate-200 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(activeDropdown === 'market' ? null : 'market');
                    setIsLiveSearchOpen(false);
                  }}
                  className="w-full sm:w-auto px-4 py-1.5 text-xs sm:text-[13px] font-medium text-slate-700 hover:text-slate-900 flex items-center justify-between sm:justify-start gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>{tr(selectedMarket === 'Tất cả thị trường' ? t.hero.market : selectedMarket)}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {activeDropdown === 'market' && (
                  <div className="absolute left-0 sm:left-auto top-full mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-30">
                    {['Tất cả thị trường', 'Châu Âu (EU)', 'Mỹ & Canada', 'Nhật Bản & Hàn Quốc', 'Trung Đông'].map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setSelectedMarket(m);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        {tr(m)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown 3: Trust Level */}
              <div className="relative border-t sm:border-t-0 sm:border-l border-slate-200 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(activeDropdown === 'trust' ? null : 'trust');
                    setIsLiveSearchOpen(false);
                  }}
                  className="w-full sm:w-auto px-4 py-1.5 text-xs sm:text-[13px] font-medium text-slate-700 hover:text-slate-900 flex items-center justify-between sm:justify-start gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>{tr(selectedTrust === 'Tất cả cấp độ' ? t.hero.trustLevel : selectedTrust)}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {activeDropdown === 'trust' && (
                  <div className="absolute left-0 sm:left-auto top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-30">
                    {['Tất cả cấp độ', 'L1 - Basic Verified', 'L2 - Enhanced Verified', 'L3 - VYBE Certified'].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setSelectedTrust(t);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        {tr(t)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Search Button (Dark slate circle/square) */}
              <button
                type="button"
                onClick={() => {
                  setIsLiveSearchOpen(false);
                  setCurrentPage('buyer-directory');
                }}
                className="w-full sm:w-11 h-11 bg-[#0f172a] hover:bg-slate-800 text-white rounded-full sm:rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-xs cursor-pointer"
                title={tr(t.hero.searchBtn)}
              >
                <Search className="w-4 h-4 stroke-[2.2]" />
              </button>

              {/* LIVE SEARCH RESULTS DROPDOWN */}
              <LiveSearchDropdown
                filters={{ category: selectedCategory, market: selectedMarket, level: selectedTrust.startsWith('L') ? selectedTrust.slice(0, 2) : 'all' }}
                query={searchTerm}
                isOpen={isLiveSearchOpen}
                onClose={() => setIsLiveSearchOpen(false)}
                onSelectSupplier={(supp) => {
                  setSelectedSupplier(supp);
                  setCurrentPage('buyer-seller-detail');
                  setIsLiveSearchOpen(false);
                }}
                onSelectProduct={(prod) => {
                  const matchedSupp = DIRECTORY_SUPPLIERS.find(s => s.id === prod.supplierId) || DEFAULT_SELLER_DETAIL;
                  setSelectedSupplier(matchedSupp);
                  setCurrentPage('buyer-seller-detail');
                  setIsLiveSearchOpen(false);
                }}
                onSelectKeyword={(kw) => {
                  setSearchTerm(kw);
                  setIsLiveSearchOpen(false);
                  setCurrentPage('buyer-directory');
                }}
                onViewAllResults={(q) => {
                  setSearchTerm(q);
                  setIsLiveSearchOpen(false);
                  setCurrentPage('buyer-directory');
                }}
              />

            </div>

            {/* Popular Search Tags Row: Tìm kiếm phổ biến: Cà phê, Gạo... */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-800 mr-1 select-none">
                {tr(t.hero.popularSearches)}
              </span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchTerm(tag);
                    setIsLiveSearchOpen(true);
                  }}
                  className={`text-xs px-3 py-1 rounded-full cursor-pointer transition-colors font-medium ${
                    searchTerm === tag 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {tr(tag)}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Global Logistics & Supply Chain Map Illustration */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center min-h-[340px] sm:min-h-[380px] pointer-events-none select-none">
            
            <svg 
              viewBox="0 0 540 420" 
              className="w-full h-full max-w-[520px]" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft Dotted / Contoured World Map Graphic */}
              <g opacity="0.35">
                {/* Europe outlines & dots */}
                <path d="M 60 70 Q 110 40 160 65 Q 180 90 140 110 Q 90 95 60 70 Z" fill="#cbd5e1" />
                <path d="M 170 80 Q 230 70 260 110 Q 220 140 180 120 Z" fill="#cbd5e1" />
                {/* Asia / Eurasia outlines */}
                <path d="M 270 90 Q 360 80 420 130 Q 380 190 300 170 Q 260 130 270 90 Z" fill="#cbd5e1" />
                {/* East Asia & Vietnam coast */}
                <path d="M 400 190 Q 430 230 410 280 Q 380 290 390 230 Z" fill="#94a3b8" />
              </g>

              {/* Curved Flight Path Arc: EU to Vietnam */}
              <path 
                d="M 120 90 C 220 60, 360 120, 420 220" 
                stroke="#3b82f6" 
                strokeWidth="2" 
                strokeDasharray="4 4" 
                fill="none"
              />

              {/* Animated Light Pulse traveling from VN to EU */}
              <circle cx="260" cy="98" r="3.5" fill="#2563eb" filter="drop-shadow(0 0 4px #60a5fa)" />

              {/* Europe Hub Marker (Blue pin & EU badge) */}
              <g transform="translate(105, 75)">
                {/* Blue Location Pin */}
                <circle cx="15" cy="15" r="14" fill="#3b82f6" fillOpacity="0.2" />
                <circle cx="15" cy="15" r="7" fill="#2563eb" />
                <circle cx="15" cy="15" r="2.5" fill="#ffffff" />
                
                {/* EU Badge */}
                <g transform="translate(30, 2)">
                  <rect width="36" height="22" rx="6" fill="#dbeafe" stroke="#bfdbfe" />
                  <text x="18" y="15" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="700" letterSpacing="0.5">
                    {tr("EU")}</text>
                </g>
              </g>

              {/* Floating Pill: Trusted Supply Chain */}
              <g transform="translate(200, 60)" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))">
                <rect width="160" height="34" rx="17" fill="#ffffff" stroke="#e2e8f0" />
                <text x="80" y="21" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="600">
                  {tr("Trusted Supply Chain")}</text>
              </g>

              {/* Isometric Ocean Grid / Hexagon Deck */}
              <g transform="translate(310, 160)" opacity="0.4">
                <line x1="0" y1="90" x2="160" y2="0" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="30" y1="120" x2="190" y2="30" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="40" x2="140" y2="120" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 3" />
              </g>

              {/* Isometric Shipping Container Stack & Cargo Vessel */}
              <g transform="translate(330, 150)">
                {/* Isometric Container Ship Hull */}
                <path d="M 10 70 L 60 40 L 160 90 L 120 125 L 30 110 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
                
                {/* Blue Shipping Containers (Loaded stacked blocks) */}
                {/* Container 1 (Top Blue) */}
                <path d="M 60 40 L 105 15 L 140 32 L 95 60 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
                <path d="M 60 40 L 95 60 L 95 85 L 60 65 Z" fill="#1d4ed8" />
                <path d="M 95 60 L 140 32 L 140 55 L 95 85 Z" fill="#3b82f6" />

                {/* Container 2 (Front Slate Container) */}
                <path d="M 30 75 L 75 50 L 110 68 L 65 95 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
                <path d="M 30 75 L 65 95 L 65 115 L 30 95 Z" fill="#0369a1" />
                <path d="M 65 95 L 110 68 L 110 88 L 65 115 Z" fill="#38bdf8" />

                {/* Cargo Boat Cabin & Wave Wake */}
                <path d="M 80 120 C 120 135 150 145 180 135" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                <path d="M 90 130 C 130 145 160 155 190 145" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              </g>

              {/* Vietnam Hub Marker (Green pin & VN badge) */}
              <g transform="translate(410, 195)">
                {/* Green Location Pin */}
                <circle cx="15" cy="15" r="14" fill="#10b981" fillOpacity="0.25" />
                <circle cx="15" cy="15" r="7" fill="#047857" />
                <circle cx="15" cy="15" r="2.5" fill="#ffffff" />
                
                {/* VN Badge */}
                <g transform="translate(25, -2)">
                  <rect width="28" height="20" rx="4" fill="#047857" />
                  <text x="14" y="14" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800" letterSpacing="0.5">
                    {tr("VN")}</text>
                </g>
              </g>

              {/* Stylized Green Agriculture & Coffee Leaves on Right Side */}
              <g transform="translate(450, 40)" opacity="0.9">
                {/* Branch Stem */}
                <path d="M 40 180 C 30 120 15 50 10 0" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Leaf 1 (Top Left) */}
                <path d="M 12 40 C -15 25 -25 60 10 70 C 25 55 20 45 12 40 Z" fill="#0d9488" fillOpacity="0.8" />
                
                {/* Leaf 2 (Mid Right) */}
                <path d="M 22 80 C 55 60 70 100 30 120 C 20 105 22 90 22 80 Z" fill="#10b981" fillOpacity="0.85" />
                
                {/* Leaf 3 (Bottom Left) */}
                <path d="M 28 135 C -5 125 -10 165 25 175 C 35 160 32 145 28 135 Z" fill="#047857" fillOpacity="0.8" />
                
                {/* Leaf 4 (Large Bottom Right) */}
                <path d="M 35 155 C 75 140 90 190 40 215 C 30 195 32 175 35 155 Z" fill="#0f766e" fillOpacity="0.85" />
              </g>

            </svg>

          </div>

        </div>

        {/* =========================================================================
            3. FOUR VALUE PROPOSITION FEATURE CARDS
           ========================================================================= */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Doanh nghiệp đã xác minh */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {tr(t.features.verified)}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                {tr(t.features.verifiedDesc)}
              </p>
            </div>
          </div>

          {/* Card 2: Sản phẩm đa dạng */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Package className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {tr(t.features.products)}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                {tr(t.features.productsDesc)}
              </p>
            </div>
          </div>

          {/* Card 3: Kết nối nhanh chóng */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Send className="w-5 h-5 stroke-[2.2] translate-x-0.5 -translate-y-0.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {tr(t.features.fast)}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                {tr(t.features.fastDesc)}
              </p>
            </div>
          </div>

          {/* Card 4: Hỗ trợ bởi AI */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Sparkles className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {tr(t.features.ai)}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                {tr(t.features.aiDesc)}
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          4. SECTION: DOANH NGHIỆP NỔI BẬT (FEATURED SUPPLIERS)
         ========================================================================= */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-16">
        
        {/* Section Header: Title + Subtitle + "Xem tất cả ->" */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight">
              {tr(t.featured.title)}
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-normal">
              {tr(t.featured.subtitle)}
            </p>
          </div>

          <button 
            onClick={() => setCurrentPage('buyer-directory')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>{tr(t.featured.viewAll)}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* 4 Featured Supplier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SUPPLIERS.map((supplier) => (
            <div
              key={supplier.id}
              onClick={() => setActiveSupplierModal(supplier)}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md hover:border-slate-200 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Icon + Name + Chevron */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    {/* Brand Icon Badge */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                      {supplier.id === 'vietfarm' && (
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                          <Sprout className="w-6 h-6 stroke-[2.2]" />
                        </div>
                      )}
                      {supplier.id === 'mekong' && (
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M 3 8 Q 8 4 12 8 Q 16 12 21 8" />
                            <path d="M 3 13 Q 8 9 12 13 Q 16 17 21 13" />
                            <path d="M 3 18 Q 8 14 12 18 Q 16 22 21 18" />
                          </svg>
                        </div>
                      )}
                      {supplier.id === 'greenfields' && (
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8 6 4 10 4 14C4 18.4 7.6 22 12 22C16.4 22 20 18.4 20 14C20 10 16 6 12 2ZM12 4.5C14.8 7.5 17.5 10.5 17.5 14C17.5 17 15 19.5 12 19.5C9 19.5 6.5 17 6.5 14C6.5 10.5 9.2 7.5 12 4.5Z" opacity="0.3"/>
                            <circle cx="12" cy="13" r="4"/>
                          </svg>
                        </div>
                      )}
                      {supplier.id === 'anphu' && (
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.2" />
                            <line x1="12" y1="2" x2="12" y2="4" />
                            <line x1="12" y1="20" x2="12" y2="22" />
                            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
                            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
                            <line x1="2" y1="12" x2="4" y2="12" />
                            <line x1="20" y1="12" x2="22" y2="12" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {tr(supplier.name)}
                      </h4>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 mt-1" />
                </div>

                {/* Trust Badge */}
                <div className="mb-4">
                  {supplier.verifiedType === 'l2' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{tr(supplier.verifiedLevel)}</span>
                    </span>
                  )}
                  {supplier.verifiedType === 'l1' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-semibold text-blue-700">
                      <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{tr(supplier.verifiedLevel)}</span>
                    </span>
                  )}
                  {supplier.verifiedType === 'l3' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[11px] font-semibold text-teal-800">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{tr(supplier.verifiedLevel)}</span>
                    </span>
                  )}
                </div>

                {/* Metadata Row: Category + Country */}
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-4">
                  <div className="flex items-center gap-1.5">
                    {supplier.categoryType === 'agriculture' && <Sprout className="w-3.5 h-3.5 text-slate-400" />}
                    {supplier.categoryType === 'seafood' && <Fish className="w-3.5 h-3.5 text-slate-400" />}
                    {supplier.categoryType === 'food' && <UtensilsCrossed className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{tr(supplier.category)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{tr(supplier.location)}</span>
                  </div>
                </div>
              </div>

              {/* Product Tags Row */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {supplier.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-md"
                  >
                    {tr(tag)}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </section>
        </>
      )}

      {/* =========================================================================
          5. INTERACTIVE MODAL (Zero Dead Clicks)
         ========================================================================= */}
      {activeSupplierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200 text-left">
            <button
              onClick={() => setActiveSupplierModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <Sprout className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{tr(activeSupplierModal.name)}</h3>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {tr(activeSupplierModal.verifiedLevel)}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {tr(activeSupplierModal.description)}
            </p>

            <div className="space-y-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500">{tr(t.modal.industry)}</span>
                <span className="font-semibold text-slate-800">{tr(activeSupplierModal.category)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{tr(t.modal.capacity)}</span>
                <span className="font-semibold text-slate-800">{tr(activeSupplierModal.capacity)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{tr(t.modal.standards)}</span>
                <span className="font-semibold text-slate-800">{tr(activeSupplierModal.standards)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const supplier = DIRECTORY_SUPPLIERS.find((item) => item.id === activeSupplierModal.id);
                  if (!supplier) return;
                  setSelectedSupplier(supplier);
                  setOpenSupplierRfq(true);
                  setActiveSupplierModal(null);
                  setPage('buyer-seller-detail');
                }}
                className="flex-1 py-2.5 rounded-full bg-[#0f172a] hover:bg-slate-800 text-white font-medium text-xs transition-colors cursor-pointer text-center"
              >
                {tr(t.modal.sendRfqBtn)}
              </button>
              <button
                onClick={() => setActiveSupplierModal(null)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {tr(t.common.close)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav/Generic Modal */}
      {activeNavModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-left">
            <button
              onClick={() => setActiveNavModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-2">{tr(activeNavModal)}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-5">
              {tr("Tính năng đang được kích hoạt trên hệ thống VYBE TRADE. Nền tảng kết nối trực tiếp doanh nghiệp xuất nhập khẩu Việt Nam với các đối tác toàn cầu.")}</p>

            <button
              onClick={() => setActiveNavModal(null)}
              className="w-full py-2.5 rounded-full bg-[#0f172a] text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {tr("Đồng ý")}</button>
          </div>
        </div>
      )}

    </div>
  );
}
