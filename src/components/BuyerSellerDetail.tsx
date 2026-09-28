/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Package, 
  Mail, 
  Phone, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  Star, 
  Download, 
  Share2, 
  Heart, 
  MessageSquare, 
  Send, 
  Clock, 
  Calendar, 
  Check, 
  X, 
  ChevronRight, 
  FileText, 
  Lock, 
  Eye, 
  Sparkles, 
  ArrowLeft,
  Factory,
  Boxes,
  Truck,
  FileCheck,
  Scale
} from 'lucide-react';

export interface SupplierData {
  id: string;
  name: string;
  tradeName: string;
  taxCode: string;
  badgeLevel: 'L3' | 'L2' | 'L1';
  badgeTitle: string;
  logo: string;
  coverImage: string;
  location: string;
  address: string;
  factoryAddress: string;
  foundedYear: string;
  employees: string;
  factorySize: string;
  capacity: string;
  monthlyCapacity: string;
  responseTime: string;
  responseRate: string;
  rating: number;
  reviewCount: number;
  escrowLimit: string;
  mainMarkets: string[];
  description: string;
  tags: string[];
  pucCode: string;
  phcCode: string;
  products: {
    id: string;
    name: string;
    category: string;
    image: string;
    moq: string;
    capacity: string;
    packaging: string;
    priceRange: string;
    specs: string[];
    isMain?: boolean;
  }[];
  certificates: {
    id: string;
    title: string;
    issuer: string;
    certNumber: string;
    date: string;
    status: string;
    fileName: string;
    fileSize: string;
    isMandatory?: boolean;
    category: string;
  }[];
  factoryPhotos: {
    title: string;
    description: string;
    image: string;
  }[];
  reviews: {
    buyerName: string;
    buyerCountry: string;
    buyerRole: string;
    date: string;
    rating: number;
    comment: string;
    productPurchased: string;
    volume: string;
  }[];
}

export const DEFAULT_SELLER_DETAIL: SupplierData = {
  id: 'viet-agri',
  name: 'Công ty TNHH Nông Sản Việt',
  tradeName: 'VIET AGRI EXPORT CO., LTD',
  taxCode: '0314892345',
  badgeLevel: 'L3',
  badgeTitle: 'L3 VYBE Certified',
  logo: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&auto=format&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop&q=80',
  location: 'Đắk Lắk, Việt Nam',
  address: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
  factoryAddress: 'Km 19, Quốc lộ 26, Xã Ea Knuếc, Huyện Krông Pắc, Tỉnh Đắk Lắk (Diện tích 25,000 m²)',
  foundedYear: '2018 (6 năm kinh nghiệm xuất khẩu)',
  employees: '250+ nhân sự vận hành & kỹ sư nông học',
  factorySize: '25,000 m² nhà máy + 1,200 ha vùng trồng liên kết',
  capacity: '15,000 tấn/năm',
  monthlyCapacity: '500+ tấn/tháng',
  responseTime: '< 2 giờ',
  responseRate: '99.2%',
  rating: 4.95,
  reviewCount: 48,
  escrowLimit: '$500,000 USD',
  mainMarkets: ['EU (Đức, Hà Lan, Ý)', 'Hoa Kỳ', 'Nhật Bản', 'Hàn Quốc', 'Trung Quốc'],
  description: 'Công ty TNHH Nông Sản Việt là đơn vị xuất khẩu nông sản hàng đầu Việt Nam, chuyên cung ứng Cà phê nhân xanh Robusta Grade 1 Sàng 18, Hạt điều nhân xuất khẩu AFI W240/W320 và Hồ tiêu đen Chư Sê. Sở hữu chuỗi cung ứng khép kín từ 1,200 ha vùng nguyên liệu liên kết bền vững tại Tây Nguyên đến nhà máy sơ chế công nghệ phân loại màu Sortex quang học và hệ thống kho lạnh tiêu chuẩn quốc tế. Doanh nghiệp đã được VYBE Trade thẩm định thực địa đạt chuẩn L3 VYBE Certified, sẵn sàng tiếp nhận các hợp đồng B2B xuất khẩu container lớn với chính sách thanh toán Escrow bảo lãnh an toàn.',
  tags: ['Cà phê', 'Hạt điều', 'Hạt tiêu', 'HACCP', 'ISO 22000', 'GlobalG.A.P.', 'Nhà sản xuất trực tiếp', 'Bảo lãnh Escrow'],
  pucCode: 'VN-DL-0489 (Mã vùng trồng cấp bởi Cục BVTV)',
  phcCode: 'PHC-VN-102 (Mã cơ sở đóng gói đạt chuẩn EU & US)',
  products: [
    {
      id: 'p-1',
      name: 'Cà phê nhân xanh Robusta Đắk Lắk (Grade 1 - Sàng 18)',
      category: 'Cà phê & sản phẩm từ cà phê',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80',
      moq: '1 container 20ft (19.2 tấn)',
      capacity: '1,000 tấn/tháng',
      packaging: 'Bao đay 60kg lót túi GrainPro hút ẩm chuẩn xuất khẩu',
      priceRange: '$2,450 - $2,650 / Tấn (FOB Cát Lái)',
      isMain: true,
      specs: [
        'Độ ẩm (Moisture): Tối đa 12.5%',
        'Tỷ lệ tạp chất (Foreign matter): Tối đa 0.5%',
        'Tỷ lệ hạt đen vỡ (Black & Broken): Tối đa 0.5%',
        'Kích cỡ hạt (Screen size): Sàng 18 (7.1mm) đạt 90%',
        'Phương pháp sơ chế: Chế biến ướt (Wet Polished)'
      ]
    },
    {
      id: 'p-2',
      name: 'Hạt điều nhân xuất khẩu W240 & W320',
      category: 'Hạt dinh dưỡng & Nông sản chế biến',
      image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80',
      moq: '5 tấn',
      capacity: '350 tấn/tháng',
      packaging: 'Hút chân không túi thiếc 25 lbs (11.34 kg) x 2 / thùng carton',
      priceRange: '$6,800 - $7,200 / Tấn (FOB Cát Lái)',
      isMain: false,
      specs: [
        'Phân loại chất lượng: W240 (220-240 hạt/lb) & W320 (300-320 hạt/lb)',
        'Độ ẩm: < 5.0%',
        'Tỷ lệ hạt bể vỡ: < 1.0%',
        'Tiêu chuẩn: AFI Standard Class 1 xuất khẩu US/EU',
        'Khí bảo quản: Bơm Nitơ bảo quản 24 tháng'
      ]
    },
    {
      id: 'p-3',
      name: 'Thanh long ruột đỏ xuất khẩu GlobalG.A.P.',
      category: 'Trái cây tươi xuất khẩu',
      image: 'https://images.unsplash.com/photo-1527324688151-0e627063f2b1?w=800&auto=format&fit=crop&q=80',
      moq: '1 container lạnh 40ft (20 tấn)',
      capacity: '800 tấn/tháng',
      packaging: 'Thùng carton 9kg chuyên dụng bảo quản cont lạnh +3°C',
      priceRange: '$1,800 - $2,200 / Tấn (FOB TP.HCM)',
      isMain: false,
      specs: [
        'Kích cỡ (Weight): 450g - 650g/trái',
        'Độ ngọt (Brix): > 14%',
        'Chứng nhận: GlobalG.A.P. IFA Version 5.4',
        'Mã PUC & PHC: Đã được cơ quan kiểm dịch cấp',
        'Nhiệt độ bảo quản: +3°C đến +5°C'
      ]
    },
    {
      id: 'p-4',
      name: 'Hồ tiêu đen Chư Sê sạch xuất khẩu (550g/l - 580g/l)',
      category: 'Hồ tiêu & Gia vị nhiệt đới',
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=80',
      moq: '1 container 20ft (15 tấn)',
      capacity: '400 tấn/tháng',
      packaging: 'Bao PP dệt 25kg hoặc 50kg có lót PE chống ẩm',
      priceRange: '$4,100 - $4,350 / Tấn (FOB Cát Lái)',
      isMain: false,
      specs: [
        'Dung trọng (Density): 550g/l - 580g/l',
        'Độ ẩm: Tối đa 12.0%',
        'Tạp chất: Tối đa 0.2%',
        'Khử trùng: Xử lý nhiệt hơi nước Steam Sterilized',
        'Kiểm nghiệm ETO: Không phát hiện (Non-ETO)'
      ]
    }
  ],
  certificates: [
    {
      id: 'c-1',
      title: 'Giấy chứng nhận Đăng ký Doanh nghiệp (ERC)',
      issuer: 'Sở Kế hoạch & Đầu tư TP. Hồ Chí Minh',
      certNumber: '0314892345',
      date: '15/03/2018 (Đăng ký thay đổi lần 4: 2023)',
      status: 'Đã xác thực OCR đối soát Sở KH&ĐT',
      fileName: 'DKKD_VietAgri_2023_BanSao.pdf',
      fileSize: '3.2 MB',
      isMandatory: true,
      category: 'Pháp lý doanh nghiệp'
    },
    {
      id: 'c-2',
      title: 'HACCP Codex Alimentarius (CXC 1-1969)',
      issuer: 'SGS Vietnam Co., Ltd.',
      certNumber: 'VN22/00481-HACCP',
      date: '15/12/2023 - 14/12/2026',
      status: 'Đã thẩm định quốc tế (Còn 2 năm hiệu lực)',
      fileName: 'HACCP_Codex_SGS_VietAgri.pdf',
      fileSize: '2.8 MB',
      isMandatory: false,
      category: 'An toàn thực phẩm'
    },
    {
      id: 'c-3',
      title: 'ISO 22000:2018 Hệ thống Quản lý An toàn Thực phẩm',
      issuer: 'TÜV Rheinland Vietnam',
      certNumber: '01 153 2100842',
      date: '10/08/2023 - 09/08/2026',
      status: 'Đã thẩm định quốc tế (Còn 2 năm hiệu lực)',
      fileName: 'ISO22000_2018_TUV_Rheinland.pdf',
      fileSize: '1.9 MB',
      isMandatory: false,
      category: 'Tiêu chuẩn quốc tế'
    },
    {
      id: 'c-4',
      title: 'GlobalG.A.P. IFA Version 5.4 - Trồng trọt bền vững',
      issuer: 'Control Union Certifications B.V.',
      certNumber: 'GGN-40598839210',
      date: '20/11/2023 - 19/11/2025',
      status: 'Đã thẩm định mã GGN vùng trồng liên kết',
      fileName: 'GlobalGAP_ControlUnion_2023.pdf',
      fileSize: '4.1 MB',
      isMandatory: false,
      category: 'Nông nghiệp bền vững'
    }
  ],
  factoryPhotos: [
    {
      title: 'Dây chuyền phân loại màu quang học Sortex',
      description: 'Hệ thống camera đa quang phổ phân loại và loại bỏ 100% hạt đen, vỡ và dị tật tự động.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Hệ thống kho lạnh bảo quản sâu tiêu chuẩn EU',
      description: 'Dung lượng lưu trữ 5,000 tấn nông sản, kiểm soát nhiệt độ +18°C và độ ẩm < 60% liên tục.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Khu vực đóng gói và xếp hàng container xuất khẩu',
      description: 'Đóng gói bao đay GrainPro và hút chân không thùng thiếc trong môi trường phòng sạch vô trùng.',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Vùng trồng nguyên liệu liên kết đạt chuẩn GlobalGAP',
      description: '1,200 hecta cà phê và hồ tiêu tại Đắk Lắk thực hành canh tác hữu cơ bền vững.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'
    }
  ],
  reviews: [
    {
      buyerName: 'Heinrich Becker',
      buyerCountry: 'Đức (Germany)',
      buyerRole: 'Head of Green Coffee Sourcing - EuroAgri Hamburg',
      date: '12/08/2024',
      rating: 5,
      comment: 'Chúng tôi đã nhập khẩu 4 container cà phê Robusta Sàng 18 của Nông Sản Việt. Chất lượng hạt rất đồng đều, tỷ lệ hạt đen vỡ thực tế dưới 0.3%, kiểm định SGS tại cảng Cát Lái khớp 100% với mẫu ban đầu. Rất hài lòng với dịch vụ bảo lãnh Escrow qua sàn VYBE.',
      productPurchased: 'Cà phê Robusta Grade 1 Sàng 18',
      volume: '4x20ft Container (76.8 tấn)'
    },
    {
      buyerName: 'Kenji Takahashi',
      buyerCountry: 'Nhật Bản (Japan)',
      buyerRole: 'Procurement Director - Tokyo Nuts & Confectionery',
      date: '28/06/2024',
      rating: 5,
      comment: 'Hạt điều W240 đóng túi thiếc hút chân không đạt tiêu chuẩn vệ sinh an toàn thực phẩm khắt khe của Nhật Bản. Hàng giao đúng hạn tại cảng Yokohama. Nhà cung cấp phản hồi thông tin rất nhanh và chuyên nghiệp.',
      productPurchased: 'Hạt điều nhân W240 AFI Class 1',
      volume: '15 Tấn'
    },
    {
      buyerName: 'David Miller',
      buyerCountry: 'Hoa Kỳ (USA)',
      buyerRole: 'VP Global Supply Chain - Pacific Spice Partners LLC',
      date: '15/04/2024',
      rating: 4.9,
      comment: 'Hồ tiêu đen Chư Sê khử trùng hơi nước đáp ứng tuyệt đối tiêu chuẩn ASTA và Non-ETO của thị trường Mỹ. Cung cấp đầy đủ chứng thư kiểm dịch và xuất xứ nhanh chóng.',
      productPurchased: 'Hồ tiêu đen Chư Sê 550g/l',
      volume: '2x20ft Container (30 tấn)'
    }
  ]
};

interface BuyerSellerDetailProps {
  supplier?: SupplierData;
  onBackToDirectory: () => void;
  onNavigateHome: () => void;
  onNavigateWorkspace?: () => void;
}

export default function BuyerSellerDetail({
  supplier = DEFAULT_SELLER_DETAIL,
  onBackToDirectory,
  onNavigateHome,
  onNavigateWorkspace
}: BuyerSellerDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'factory' | 'certificates' | 'reviews'>('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [activeModal, setActiveModal] = useState<'rfq' | 'chat' | 'doc-preview' | 'success' | null>(null);
  const [selectedProductForRfq, setSelectedProductForRfq] = useState<string>(supplier.products[0]?.name || '');
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  // RFQ Form state
  const [rfqForm, setRfqForm] = useState({
    product: supplier.products[0]?.name || '',
    volume: '20',
    unit: 'Tấn',
    incoterm: 'FOB Cát Lái (TP.HCM)',
    destinationPort: 'Hamburg, Germany',
    targetDate: '2024-11-15',
    packaging: 'Bao đay 60kg lót GrainPro hút ẩm',
    notes: 'Yêu cầu kiểm nghiệm SGS độc lập tại cảng xuất. Cần báo giá chi tiết và điều khoản thanh toán bảo lãnh qua VYBE Escrow.'
  });

  // Chat message state
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'seller',
      time: '10:15',
      text: 'Xin chào Quý khách! Tôi là Nguyễn Văn Trí - Trưởng bộ phận Xuất khẩu của Nông Sản Việt. Quý đối tác đang quan tâm đến sản phẩm Cà phê Robusta hay Hạt điều xuất khẩu ạ?'
    }
  ]);
  const [newChatMessage, setNewChatMessage] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;
    const msg = {
      sender: 'buyer',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newChatMessage.trim()
    };
    setChatMessages([...chatMessages, msg]);
    setNewChatMessage('');
    
    // Simulate auto reply after 1.5s
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'seller',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Cảm ơn Quý Buyer! Chúng tôi đã ghi nhận yêu cầu và sẽ gửi bảng thông số kỹ thuật (Spec Sheet) cùng báo giá FOB Cát Lái tốt nhất qua email và phòng làm việc này ngay!'
        }
      ]);
    }, 1200);
  };

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveModal('success');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-600 selection:text-white">
      
      {/* =========================================================================
          1. TOP NAVIGATION / BREADCRUMB BAR
         ========================================================================= */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          
          {/* Breadcrumb Left */}
          <div className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-500 overflow-x-auto whitespace-nowrap py-1">
            <button 
              onClick={onNavigateHome}
              className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
            >
              Trang chủ
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button 
              onClick={onBackToDirectory}
              className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
            >
              Tìm nhà cung cấp
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-teal-900 font-bold truncate max-w-[200px] sm:max-w-xs">
              {supplier.name}
            </span>
          </div>

          {/* Back button & Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onBackToDirectory}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Quay lại danh sách</span>
            </button>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSaved 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
              title={isSaved ? 'Đã lưu vào danh sách yêu thích' : 'Lưu nhà cung cấp'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={() => {
                setSelectedProductForRfq(supplier.products[0]?.name || '');
                setActiveModal('rfq');
              }}
              className="px-4 py-2 rounded-xl bg-[#083832] hover:bg-[#062924] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-teal-300" />
              <span>Gửi RFQ</span>
            </button>
          </div>

        </div>
      </div>

      {/* Trust Notice Bar */}
      <div className="bg-[#0b5e52]/10 border-b border-[#0b5e52]/20 py-2.5 px-4 sm:px-6 text-center text-xs text-teal-950 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-[#0b5e52] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3" />
            L3 VYBE Certified
          </span>
          <span>
            Hồ sơ doanh nghiệp đã được VYBE Trade thẩm định độc quyền: Kiểm tra thực địa nhà máy, pháp lý ERC và chứng nhận ATTP quốc tế.
          </span>
          <span className="text-teal-800 underline font-semibold cursor-pointer ml-1" onClick={() => setActiveTab('certificates')}>
            Xem Evidence Record →
          </span>
        </div>
      </div>

      {/* =========================================================================
          2. HERO SECTION & SUPPLIER IDENTITY BANNER
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        
        {/* Banner Container */}
        <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
          
          {/* Cover Photo */}
          <div className="relative h-48 sm:h-64 lg:h-72 w-full bg-slate-900 overflow-hidden">
            <img 
              src={supplier.coverImage} 
              alt={supplier.name} 
              className="w-full h-full object-cover opacity-85 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            {/* Top Right Badges on Cover */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-black/50 backdrop-blur-md text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-teal-300" />
                <span>Xuất khẩu toàn cầu</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 shadow-md">
                <Lock className="w-3.5 h-3.5" />
                <span>Bảo lãnh Escrow {supplier.escrowLimit}</span>
              </span>
            </div>
          </div>

          {/* Profile Header Bar */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 -mt-16 sm:-mt-20">
              
              {/* Left: Avatar + Title + Badges */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 z-10 min-w-0">
                
                {/* Sprout Logo Avatar */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center p-2 shrink-0 overflow-hidden">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center text-[#0b5e52]">
                    <svg viewBox="0 0 32 32" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 16 26 C 14 18 8 13 4 10 C 3 9 4 7 5 7 C 11 8 15 13 16 26 Z" fill="#0b5e52" />
                      <path d="M 16 26 C 18 18 24 13 28 10 C 29 9 28 7 27 7 C 21 8 17 13 16 26 Z" fill="#0b5e52" />
                    </svg>
                  </div>
                </div>

                {/* Company Name & Metadata */}
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {supplier.name}
                    </h1>
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs" title="Doanh nghiệp đã xác minh">
                      ✓
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide">
                    {supplier.tradeName} • MST: {supplier.taxCode}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap pt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      {supplier.location}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {supplier.rating} ({supplier.reviewCount} đánh giá Buyer quốc tế)
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">
                      Thành lập: <strong>{supplier.foundedYear}</strong>
                    </span>
                  </div>
                </div>

              </div>

              {/* Right: Key Action CTAs */}
              <div className="flex items-center gap-2.5 w-full lg:w-auto shrink-0 z-10">
                <button
                  onClick={() => setActiveModal('chat')}
                  className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl border border-slate-200 hover:border-teal-700 bg-white hover:bg-teal-50 text-slate-800 text-xs sm:text-[13px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-teal-700" />
                  <span>Chat với Seller</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedProductForRfq(supplier.products[0]?.name || '');
                    setActiveModal('rfq');
                  }}
                  className="flex-1 lg:flex-none px-6 py-2.5 rounded-xl bg-[#083832] hover:bg-[#062924] text-white text-xs sm:text-[13px] font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4 text-teal-300" />
                  <span>Gửi RFQ / Yêu cầu báo giá</span>
                </button>
              </div>

            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">Năng lực cung ứng</span>
                <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{supplier.monthlyCapacity}</p>
                <span className="text-[10px] text-slate-400">~{supplier.capacity}</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">Thời gian phản hồi</span>
                <p className="text-sm sm:text-base font-bold text-teal-900 mt-0.5">{supplier.responseTime}</p>
                <span className="text-[10px] text-emerald-700 font-semibold">Tỷ lệ {supplier.responseRate}</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">Thị trường xuất khẩu</span>
                <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">EU, US, Nhật, Hàn</p>
                <span className="text-[10px] text-slate-400">Có mã PUC & PHC</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">Hạn mức Escrow bảo lãnh</span>
                <p className="text-sm sm:text-base font-bold text-emerald-700 mt-0.5">{supplier.escrowLimit}</p>
                <span className="text-[10px] text-slate-400">An toàn giao dịch quốc tế</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* =========================================================================
          3. TAB NAVIGATION (TỔNG QUAN, SẢN PHẨM, NHÀ MÁY, CHỨNG CHỈ, ĐÁNH GIÁ)
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 flex items-center gap-1 sm:gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Tổng quan & Hồ sơ', icon: Building2 },
            { id: 'products', label: `Sản phẩm xuất khẩu (${supplier.products.length})`, icon: Package },
            { id: 'factory', label: 'Nhà máy & Cơ sở vật chất', icon: Factory },
            { id: 'certificates', label: `Chứng chỉ đã thẩm định (${supplier.certificates.length})`, icon: Award },
            { id: 'reviews', label: `Đánh giá của Buyer (${supplier.reviewCount})`, icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-3.5 sm:px-5 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'border-[#083832] text-[#083832]'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#083832]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          4. TAB CONTENT
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ----------------- TAB: TỔNG QUAN (OVERVIEW) ----------------- */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: About, Commitments & Facility Details */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Giới thiệu doanh nghiệp */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-800" />
                  <span>Giới thiệu năng lực doanh nghiệp</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {supplier.description}
                </p>

                {/* Key Commitments Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  <div className="p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-teal-950">Bảo lãnh chất lượng & Giám định</h4>
                      <p className="text-[11px] text-teal-800 mt-0.5">Sẵn sàng nghiệm thu SGS / Vinacontrol tại cảng Cát Lái trước khi xếp cont.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-950">Bảo lãnh thanh toán Escrow</h4>
                      <p className="text-[11px] text-emerald-800 mt-0.5">Tiền gửi vào tài khoản ký quỹ trung gian, chỉ giải ngân khi đủ B/L và CO hợp lệ.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông tin pháp lý & Nhà máy */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Factory className="w-5 h-5 text-teal-800" />
                  <span>Cơ sở hạ tầng & Pháp lý xuất khẩu</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-slate-500 font-medium">Trụ sở giao dịch:</span>
                    <p className="font-bold text-slate-900 leading-snug">{supplier.address}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-slate-500 font-medium">Nhà máy & Kho bảo quản:</span>
                    <p className="font-bold text-slate-900 leading-snug">{supplier.factoryAddress}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-slate-500 font-medium">Mã vùng trồng xuất khẩu (PUC):</span>
                    <p className="font-mono font-bold text-teal-800">{supplier.pucCode}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-slate-500 font-medium">Mã cơ sở đóng gói (PHC):</span>
                    <p className="font-mono font-bold text-teal-800">{supplier.phcCode}</p>
                  </div>
                </div>
              </div>

              {/* Sản phẩm chủ lực xem nhanh */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-teal-800" />
                    <span>Sản phẩm xuất khẩu chủ lực</span>
                  </h3>
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
                  >
                    Xem tất cả ({supplier.products.length}) →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {supplier.products.slice(0, 2).map((product) => (
                    <div 
                      key={product.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex gap-3.5 group hover:border-teal-700 transition-colors"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-teal-900">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-teal-800 font-semibold mt-0.5">
                            {product.priceRange}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1">
                            MOQ: {product.moq}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedProductForRfq(product.name);
                            setActiveModal('rfq');
                          }}
                          className="mt-2 text-[11px] font-bold text-[#083832] hover:underline text-left cursor-pointer"
                        >
                          Gửi RFQ sản phẩm này →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Trust & Contact Card */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Trust Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#083832] to-[#0d594f] text-white shadow-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200">Xác thực uy tín</span>
                    <h4 className="text-lg font-extrabold">{supplier.badgeTitle}</h4>
                  </div>
                </div>

                <p className="text-xs text-teal-100 leading-relaxed">
                  Doanh nghiệp đạt cấp độ đối tác chiến lược cao nhất của VYBE Trade với bảo lãnh Escrow an toàn tuyệt đối.
                </p>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-200">Đăng ký kinh doanh:</span>
                    <span className="font-semibold">Đã xác thực</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-200">Thẩm định thực địa:</span>
                    <span className="font-semibold">Đạt chuẩn L3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-200">Chứng nhận ATTP:</span>
                    <span className="font-semibold">HACCP, ISO 22000</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedProductForRfq(supplier.products[0]?.name || '');
                    setActiveModal('rfq');
                  }}
                  className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md text-center block mt-3"
                >
                  Yêu cầu báo giá trực tiếp
                </button>
              </div>

              {/* Verified Certificates Quick List */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-teal-700" />
                    <span>Chứng nhận xuất khẩu</span>
                  </h4>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                    Evidence Record
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {supplier.certificates.map((c) => (
                    <div 
                      key={c.id} 
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-teal-50/50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedDoc(c);
                        setActiveModal('doc-preview');
                      }}
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-slate-800 truncate">{c.title}</p>
                        <p className="text-[10px] text-slate-500">{c.issuer}</p>
                      </div>
                      <Eye className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Seller Contact Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3 text-xs">
                <h4 className="text-sm font-bold text-slate-900">Liên hệ đại diện xuất khẩu</h4>
                <div className="space-y-2 text-slate-600">
                  <p><strong>Người liên hệ:</strong> Nguyễn Văn Trí (Giám đốc)</p>
                  <p><strong>Ngôn ngữ hỗ trợ:</strong> Tiếng Anh, Tiếng Việt, Tiếng Trung</p>
                  <p><strong>Email đối soát:</strong> export@vietagri.com</p>
                  <p><strong>Phản hồi trung bình:</strong> Dưới 2 giờ làm việc</p>
                </div>
                <button
                  onClick={() => setActiveModal('chat')}
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold transition-colors cursor-pointer text-center block mt-2"
                >
                  Nhắn tin với Mr. Trí
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ----------------- TAB: SẢN PHẨM XUẤT KHẨU (PRODUCTS) ----------------- */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Danh mục sản phẩm xuất khẩu ({supplier.products.length})</h3>
                <p className="text-xs text-slate-500 mt-0.5">Sản phẩm sản xuất trực tiếp tại nhà máy, có sẵn năng lực cung ứng theo hợp đồng cont</p>
              </div>

              <button
                onClick={() => {
                  setSelectedProductForRfq('Tất cả sản phẩm');
                  setActiveModal('rfq');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#083832] text-white text-xs font-bold hover:bg-[#062924] transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                Gửi yêu cầu chào giá chung (Bulk RFQ)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supplier.products.map((product) => (
                <div 
                  key={product.id}
                  className="rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Product Image */}
                    <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                        {product.category}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        {product.name}
                      </h4>

                      <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100">
                        <span className="text-[10px] text-teal-800 font-bold uppercase tracking-wider block">Báo giá ước tính:</span>
                        <p className="text-base font-extrabold text-[#083832] mt-0.5">
                          {product.priceRange}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                        <div>
                          <span className="text-slate-400">MOQ tối thiểu:</span>
                          <p className="font-semibold text-slate-800">{product.moq}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Năng lực cung ứng:</span>
                          <p className="font-semibold text-slate-800">{product.capacity}</p>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600">
                        <span className="text-slate-400">Quy cách đóng gói:</span>
                        <p className="font-semibold text-slate-800 mt-0.5">{product.packaging}</p>
                      </div>

                      {/* Specs */}
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-700 block mb-1.5">Thông số kỹ thuật (Spec Sheet):</span>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {product.specs.map((spec, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 sm:p-6 pt-0 flex gap-2.5">
                    <button
                      onClick={() => {
                        setSelectedProductForRfq(product.name);
                        setActiveModal('rfq');
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-[#083832] hover:bg-[#062924] text-white text-xs font-bold transition-colors cursor-pointer text-center"
                    >
                      Báo giá sản phẩm này
                    </button>
                    <button
                      onClick={() => {
                        setNewChatMessage(`Chào Nông Sản Việt, chúng tôi muốn xin gửi mẫu thử nghiệm (Sample) cho sản phẩm ${product.name}.`);
                        setActiveModal('chat');
                      }}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                      title="Yêu cầu gửi mẫu thử nghiệm"
                    >
                      Yêu cầu mẫu (Sample)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB: NHÀ MÁY & CƠ SỞ VẬT CHẤT (FACTORY) ----------------- */}
        {activeTab === 'factory' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Hình ảnh thực tế nhà máy & Quy trình sản xuất</h3>
              <p className="text-xs text-slate-500 mt-0.5">Hình ảnh thực tế đã được chuyên viên kiểm định VYBE Trade xác minh tại hiện trường</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {supplier.factoryPhotos.map((photo, idx) => (
                <div key={idx} className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
                  <div className="h-60 w-full bg-slate-900 overflow-hidden">
                    <img 
                      src={photo.image} 
                      alt={photo.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-900">{photo.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{photo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB: CHỨNG CHỈ ĐÃ THẨM ĐỊNH (CERTIFICATES) ----------------- */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-teal-50/60 border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-teal-950">Lưu trữ bằng chứng đối soát bất biến (Evidence Record)</h4>
                  <p className="text-xs text-teal-800 mt-0.5">Tất cả tài liệu dưới đây đã được đối soát OCR trực tiếp với tổ chức cấp chứng nhận và cơ quan quản lý nhà nước.</p>
                </div>
              </div>

              <span className="px-3.5 py-1.5 rounded-xl bg-teal-800 text-white text-xs font-bold whitespace-nowrap shadow-xs">
                100% Khớp dữ liệu
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supplier.certificates.map((cert) => (
                <div 
                  key={cert.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between gap-4 hover:border-teal-700 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{cert.title}</h4>
                        {cert.isMandatory && (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                            Bắt buộc
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600">Cơ quan cấp: <strong>{cert.issuer}</strong></p>
                      <p className="text-xs text-slate-500">Mã tra cứu: <strong className="font-mono text-slate-800">{cert.certNumber}</strong></p>
                      <p className="text-xs text-slate-500">Thời hạn: {cert.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {cert.status}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedDoc(cert);
                        setActiveModal('doc-preview');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-900 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-teal-700" />
                      <span>Xem bản scan</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB: ĐÁNH GIÁ CỦA BUYER (REVIEWS) ----------------- */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="text-center">
                  <span className="text-4xl font-black text-slate-900 leading-none">{supplier.rating}</span>
                  <div className="flex items-center justify-center gap-0.5 mt-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">48 đánh giá</span>
                </div>

                <div className="h-12 w-px bg-slate-200" />

                <div className="space-y-1 text-xs text-slate-600">
                  <p>✓ <strong>100%</strong> giao hàng đúng hạn hợp đồng</p>
                  <p>✓ <strong>100%</strong> hàng hóa đúng thông số kiểm nghiệm</p>
                  <p>✓ <strong>100%</strong> giao dịch hoàn tất bảo lãnh Escrow an toàn</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedProductForRfq(supplier.products[0]?.name || '');
                  setActiveModal('rfq');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#083832] text-white text-xs font-bold hover:bg-[#062924] transition-colors cursor-pointer shrink-0"
              >
                Gửi yêu cầu kết nối ngay
              </button>
            </div>

            <div className="space-y-4">
              {supplier.reviews.map((rev, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{rev.buyerName}</h4>
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {rev.buyerCountry}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{rev.buyerRole}</p>
                    </div>

                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    "{rev.comment}"
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Sản phẩm giao thương: <strong>{rev.productPurchased}</strong></span>
                    <span>Quy mô: <strong>{rev.volume}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          5. MODALS (RFQ INQUIRY, CHAT, DOC PREVIEW, SUCCESS)
         ========================================================================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-left max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal: Gửi yêu cầu báo giá RFQ */}
            {activeModal === 'rfq' && (
              <form onSubmit={handleRfqSubmit} className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 shrink-0">
                    <Mail className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Gửi yêu cầu báo giá B2B (RFQ)</h3>
                    <p className="text-xs text-slate-500">Gửi trực tiếp đến bộ phận xuất khẩu của {supplier.name}</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Sản phẩm quan tâm <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={selectedProductForRfq}
                      onChange={(e) => setSelectedProductForRfq(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-700 bg-white"
                    >
                      {supplier.products.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} ({p.priceRange})
                        </option>
                      ))}
                      <option value="Tất cả sản phẩm">Yêu cầu chào giá tổng hợp nhiều sản phẩm</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Khối lượng dự kiến <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex">
                        <input 
                          type="number"
                          required
                          value={rfqForm.volume}
                          onChange={(e) => setRfqForm({ ...rfqForm, volume: e.target.value })}
                          className="w-full px-3 py-2 rounded-l-xl border border-r-0 border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-700"
                        />
                        <select 
                          value={rfqForm.unit}
                          onChange={(e) => setRfqForm({ ...rfqForm, unit: e.target.value })}
                          className="px-3 py-2 rounded-r-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none"
                        >
                          <option value="Tấn">Tấn</option>
                          <option value="Container 20ft">Cont 20ft</option>
                          <option value="Container 40ft">Cont 40ft</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Điều kiện giao hàng (Incoterms) <span className="text-rose-500">*</span>
                      </label>
                      <select 
                        value={rfqForm.incoterm}
                        onChange={(e) => setRfqForm({ ...rfqForm, incoterm: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-700 bg-white"
                      >
                        <option value="FOB Cát Lái (TP.HCM)">FOB Cát Lái (TP.HCM)</option>
                        <option value="CIF Hamburg (Germany)">CIF Hamburg (Germany)</option>
                        <option value="CIF Rotterdam (Netherlands)">CIF Rotterdam (Netherlands)</option>
                        <option value="CIF Los Angeles (USA)">CIF Los Angeles (USA)</option>
                        <option value="CFR Tokyo (Japan)">CFR Tokyo (Japan)</option>
                        <option value="EXW Tại nhà máy">EXW Tại nhà máy (Tây Ninh/Đắk Lắk)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Cảng dỡ hàng / Điểm đến
                      </label>
                      <input 
                        type="text"
                        value={rfqForm.destinationPort}
                        onChange={(e) => setRfqForm({ ...rfqForm, destinationPort: e.target.value })}
                        placeholder="Ví dụ: Hamburg Port, Germany..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-700"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Ngày dự kiến nhận hàng
                      </label>
                      <input 
                        type="date"
                        value={rfqForm.targetDate}
                        onChange={(e) => setRfqForm({ ...rfqForm, targetDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Yêu cầu kỹ thuật & Ghi chú đơn hàng
                    </label>
                    <textarea 
                      rows={3}
                      value={rfqForm.notes}
                      onChange={(e) => setRfqForm({ ...rfqForm, notes: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-700 resize-none"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button 
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#083832] hover:bg-[#062924] text-white text-xs font-bold transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-teal-300" />
                    <span>Gửi yêu cầu báo giá</span>
                  </button>
                </div>
              </form>
            )}

            {/* Modal: Chat trực tiếp */}
            {activeModal === 'chat' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-2xl bg-teal-800 text-white flex items-center justify-center font-bold text-xs">
                    TRÍ
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">Mr. Nguyễn Văn Trí</h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs text-slate-500">Giám đốc Xuất khẩu • {supplier.name} (Đang trực tuyến)</p>
                  </div>
                </div>

                {/* Message stream */}
                <div className="h-64 overflow-y-auto p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex flex-col ${msg.sender === 'buyer' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                        msg.sender === 'buyer' 
                          ? 'bg-[#083832] text-white rounded-tr-xs' 
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-2xs'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {/* Send Input */}
                <form onSubmit={handleSendChat} className="flex gap-2">
                  <input 
                    type="text"
                    value={newChatMessage}
                    onChange={(e) => setNewChatMessage(e.target.value)}
                    placeholder="Nhập nội dung trao đổi..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-700"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#083832] hover:bg-[#062924] text-white text-xs font-bold cursor-pointer"
                  >
                    Gửi
                  </button>
                </form>
              </div>
            )}

            {/* Modal: Xem bản scan chứng chỉ */}
            {activeModal === 'doc-preview' && selectedDoc && (
              <div>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{selectedDoc.title}</h3>
                    <p className="text-xs text-slate-500">Cơ quan cấp: {selectedDoc.issuer} • Số hiệu: {selectedDoc.certNumber}</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-100/70 border border-slate-200/80 mb-5 text-center font-sans space-y-3">
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-slate-200/60 text-center font-sans space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                    </p>
                    <p className="text-[9px] font-semibold text-slate-500">
                      Độc lập - Tự do - Hạnh phúc
                    </p>
                    <div className="w-20 h-0.5 bg-slate-300 mx-auto" />
                    
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 uppercase mt-4">
                      {selectedDoc.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">Mã tra cứu: {selectedDoc.certNumber}</p>

                    <div className="pt-4 text-left text-xs space-y-2 text-slate-700 border-t border-slate-100">
                      <p><strong>Doanh nghiệp thụ hưởng:</strong> {supplier.name}</p>
                      <p><strong>Mã số doanh nghiệp:</strong> {supplier.taxCode}</p>
                      <p><strong>Tổ chức chứng nhận:</strong> {selectedDoc.issuer}</p>
                      <p><strong>Thời hạn hiệu lực:</strong> {selectedDoc.date}</p>
                      <p><strong>Phạm vi chứng nhận:</strong> Sản xuất, chế biến và đóng gói nông sản xuất khẩu</p>
                    </div>

                    <div className="pt-6 flex justify-between items-center text-[10px] text-slate-400">
                      <div>
                        <span>Chứng thư đối soát điện tử bởi:</span>
                        <div className="font-bold text-teal-800">VYBE VERIFICATION ENGINE</div>
                      </div>
                      <div className="w-16 h-16 rounded-full border-2 border-rose-600 text-rose-600 flex flex-col items-center justify-center -rotate-12 select-none">
                        <span className="text-[6px] font-bold">ACCREDITED</span>
                        <span className="text-[10px]">★</span>
                        <span className="text-[6px] font-bold">ĐÃ ĐỐI SOÁT</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 rounded-xl bg-[#083832] text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Đóng bản xem
                  </button>
                </div>
              </div>
            )}

            {/* Modal: RFQ Thành công */}
            {activeModal === 'success' && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Gửi RFQ thành công!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Yêu cầu chào giá cho đơn hàng <strong>{selectedProductForRfq}</strong> ({rfqForm.volume} {rfqForm.unit}) đã được chuyển giao an toàn đến ban giám đốc <strong>{supplier.name}</strong>.
                </p>
                <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900 text-left space-y-1">
                  <p>✓ Nhân viên phụ trách sẽ gửi báo giá FOB/CIF trong vòng <strong>2 giờ</strong>.</p>
                  <p>✓ Hợp đồng có thể ký điện tử và kích hoạt bảo lãnh Escrow $500,000 trên sàn VYBE.</p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#083832] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Xác nhận và đóng
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
