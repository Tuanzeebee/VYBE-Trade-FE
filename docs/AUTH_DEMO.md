# Login/register và onboarding demo

## Chạy

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

Mở `http://localhost:5173`, bấm **Đăng nhập** hoặc **Đăng ký** ở header. Trang login hiển thị các tài khoản dưới đây; bấm card để điền thông tin rồi bấm Đăng nhập.

| Role | Email | Mật khẩu |
| --- | --- | --- |
| Buyer | buyer@vybe.demo | VybeDemo123! |
| Seller | seller@vybe.demo | VybeDemo123! |
| Admin | admin@vybe.demo | VybeDemo123! |

Đăng ký mới chỉ cho chọn Buyer hoặc Seller, yêu cầu tên, doanh nghiệp, email, mật khẩu ít nhất 8 ký tự và xác nhận trùng khớp. Email được chuẩn hóa và kiểm tra trùng; không có đăng ký Admin công khai.

## Luồng

1. Buyer/Seller đăng nhập hoặc đăng ký thành công → nếu chưa hoàn tất Company Onboarding, mở wizard theo role tại bước 1.
2. Buyer dùng `BuyerOnboarding.tsx`: thông tin công ty (tên, quốc gia, khu vực, quy mô, liên hệ) → nhu cầu nguồn hàng (ngành, sản phẩm, khối lượng, tần suất, điểm đến, Incoterms) → tiêu chí xác minh (L1/L2/L3, chứng nhận, thẩm định, truy xuất) → xem lại và xác nhận.
3. Seller dùng **wizard có sẵn** `SellerOnboarding.tsx`: thông tin doanh nghiệp → sản phẩm & năng lực → giấy phép & chứng nhận → xem lại và hoàn tất.
4. Hoàn tất hợp lệ → lưu hồ sơ, `onboardingCompleted` và `onboardingVersion = 2` cho ID user. Buyer vào directory, Seller vào workspace.
5. Đăng xuất, đăng nhập lại hoặc reload → bỏ qua Company Onboarding đã hoàn tất. Nếu chưa hoàn tất thì mở lại wizard.
6. **Admin không có onboarding**, đăng nhập vào thẳng trang quản trị, kể cả khi cờ `onboardingCompleted` đang false.

Các tài khoản đã hoàn tất form ngắn ở phiên bản trước sẽ được yêu cầu bổ sung Company Onboarding 4 bước một lần. Không xóa tài khoản hoặc các dữ liệu đã lưu.

Đăng xuất trong quá trình onboarding không đánh dấu hoàn tất. Hoàn tất một tài khoản không ảnh hưởng tài khoản khác. Không cho bỏ qua bước thiết lập bằng CTA vào workspace. Trang quản trị chỉ có cho Admin; workspace/trình cập nhật hồ sơ xuất khẩu chỉ có cho Seller.

`SellerOnboarding.tsx` đồng thời phục vụ onboarding lần đầu (`initialStep=1`, có `onComplete`) và **trình cập nhật hồ sơ xuất khẩu** tại page `seller-profile` (mặc định bước 2). Trình cập nhật có thể mở lại từ workspace, không đặt lại cờ onboarding. Hồ sơ wizard lần đầu lưu thông tin công ty, metadata sản phẩm/chứng chỉ và cam kết vào localStorage; file/ảnh upload không được tải lên server. URL ảnh `blob:` được loại khỏi snapshot vì không tồn tại sau reload. Chỉnh sửa tại page `seller-profile` vẫn là flow mock riêng, chưa đồng bộ backend.

Workspace dùng tên doanh nghiệp, người đại diện, email, MST, năm thành lập, địa chỉ, website và thị trường từ hồ sơ tài khoản. Các sản phẩm/chứng chỉ hiển thị ở workspace, cấp độ xác minh và KPI vẫn là mẫu độc lập, không chứng minh user mới đã được xác minh. Tiêu chí xác minh Buyer là yêu cầu đối với nguồn cung, không phải huy hiệu cấp cho Buyer.

## Lưu trữ

| Key | Nội dung |
| --- | --- |
| `vybe_demo_users_v1` | Tài khoản cục bộ, hồ sơ onboarding, cờ hoàn tất; mật khẩu tài khoản mới lưu dưới dạng PBKDF2 hash kèm salt |
| `vybe_demo_session_v1` | ID tài khoản đang đăng nhập |
| `vybe_language` | Lựa chọn ngôn ngữ hiện có |

Đây là auth mô phỏng ở client, không phải đăng nhập production. Tài khoản mẫu có thông tin đăng nhập công khai. Chỉ dùng dữ liệu và mật khẩu thử nghiệm. Trình duyệt khác, chế độ ẩn danh, domain khác hoặc xóa localStorage sẽ có bộ dữ liệu mới; không thể bảo đảm onboarding một lần xuyên thiết bị nếu chưa có backend.

Dữ liệu JSON hỏng được báo lỗi, không bị tự ghi đè. Lỗi lưu trữ khi đăng nhập/hoàn tất hồ sơ được hiển thị để người dùng thử lại.

## Vercel demo

Ứng dụng vẫn là Vite SPA tĩnh, không cần server auth, database hoặc Gemini key cho flow này. Khi import repo để deploy, dùng build command `npm run build`, output directory `dist`. Chưa triển khai deployment trong thay đổi này.

Các màn hình được chuyển bằng state nên không có URL `/login` hay `/register` riêng. Session localStorage quyết định màn hình khi reload. Nếu bổ sung URL routing sau này, cần cấu hình fallback SPA tương ứng cho hosting.

## Kiểm tra

`npm test` kiểm tra cả 3 tài khoản mẫu, đăng ký Buyer/Seller, chặn đăng ký Admin, sai mật khẩu, email trùng, session/logout, đăng nhập sau hoàn tất, cô lập cờ theo user, lưu hash và dữ liệu lưu trữ không hợp lệ.

Kiểm tra UI thủ công trước buổi demo:

- Login Buyer/Seller: mở bước 1 của wizard tương ứng. Login Admin: vào thẳng quản trị, không có onboarding.
- Buyer hoàn tất đủ 4 bước, chọn nhiều chứng nhận và chỉnh sửa từ màn xem lại; Seller dùng wizard hiện có và hoàn tất hồ sơ.
- Logout/login lại và reload: không xuất hiện onboarding đã hoàn tất.
- Đăng ký email mới cho từng role, kiểm tra xác nhận mật khẩu và email trùng.
- Guest không vào workspace; Buyer/Seller không thấy trang quản trị.
- Kiểm tra mobile, bàn phím, hiển thị lỗi và form không tràn ngang.

Typecheck, kiểm tra logic auth và build đã chạy đạt. Chưa kiểm tra UI bằng browser vì không có browser khả dụng trong phiên công cụ.
