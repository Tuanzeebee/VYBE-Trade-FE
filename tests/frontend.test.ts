import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageProvider } from '../src/context/LanguageContext';
import BuyerSellerDetail from '../src/components/BuyerSellerDetail';
import BuyerOnboarding from '../src/components/BuyerOnboarding';
import SellerOnboarding from '../src/components/SellerOnboarding';
import AuthPage from '../src/components/AuthPage';
import PricingPlans from '../src/components/PricingPlans';
import { DEMO_USERS } from '../src/lib/demoAuth';
import { SEARCH_PRODUCTS } from '../src/components/LiveSearchDropdown';
import { DIRECTORY_SUPPLIERS } from '../src/lib/suppliers';
import { filterSuppliers, matchSearch } from '../src/lib/supplierSearch';
import { getPlanPrice } from '../src/lib/pricing';
import { translateText } from '../src/i18n/translate';
import catalog from '../src/i18n/catalog.json';

assert.equal(DIRECTORY_SUPPLIERS.length, 8);
assert.equal(new Set(DIRECTORY_SUPPLIERS.map(supplier => supplier.id)).size, 8);
assert.equal(new Set(SEARCH_PRODUCTS.map(product => product.id)).size, SEARCH_PRODUCTS.length);
assert.ok(SEARCH_PRODUCTS.every(product => DIRECTORY_SUPPLIERS.some(supplier => supplier.id === product.supplierId && supplier.name === product.supplierName)));
assert.equal(matchSearch('Cà phê Đắk Lắk', 'ca phe dak lak'), true);
assert.equal(matchSearch('Cà phê', '  '), false);
assert.ok(filterSuppliers(DIRECTORY_SUPPLIERS, { query: 'tom', category: 'Thủy sản', market: 'Mỹ & Canada', level: 'L1' }).some(supplier => supplier.id === 'mekong'));
assert.equal(filterSuppliers(DIRECTORY_SUPPLIERS, { query: 'tom', category: 'Nông sản' }).length, 0);
assert.equal(filterSuppliers(DIRECTORY_SUPPLIERS, { query: 'no-such-mock-product' }).length, 0);
assert.equal(getPlanPrice('Member', 'monthly'), 990000);
assert.equal(getPlanPrice('Member', 'annual'), 9900000);
assert.equal(getPlanPrice('Premium', 'annual'), 29900000);
assert.equal(getPlanPrice('Free', 'annual'), 0);
assert.ok(Object.keys(catalog).length > 1400);
for (const [source, values] of Object.entries(catalog)) {
  assert.equal(values.length, 3, source);
  for (const value of values) {
    assert.ok(value.trim(), source);
    assert.deepEqual([...value.matchAll(/\{\d+\}/g)].map(match => match[0]).sort(), [...source.matchAll(/\{\d+\}/g)].map(match => match[0]).sort(), source);
  }
}
assert.equal(translateText('Đăng nhập', 'en'), 'Log in');
for (const language of ['en', 'fr', 'ja'] as const) {
  assert.notEqual(translateText('Thông tin công ty', language), 'Thông tin công ty');
  const product = SEARCH_PRODUCTS.find(product => product.name.includes('Tôm'))!;
  assert.ok(filterSuppliers(DIRECTORY_SUPPLIERS, { query: translateText(product.name, language) }).some(supplier => supplier.id === product.supplierId));
}
assert.equal(translateText('User-entered company 987', 'ja'), 'User-entered company 987');
assert.equal(translateText(123, 'fr'), 123);
const description = 'Nhà cung cấp demo tại Đắk Lắk, chuyên xuất khẩu Cà phê Robusta.';
assert.notEqual(translateText(description, 'en'), description);
assert.equal(translateText('Cà phê Robusta, Tôm thẻ chân trắng IQF', 'fr'), `${translateText('Cà phê Robusta', 'fr')}, ${translateText('Tôm thẻ chân trắng IQF', 'fr')}`);
const render = (children: ReturnType<typeof createElement>) => renderToStaticMarkup(createElement(LanguageProvider, { children }));
for (const language of ['vi', 'en', 'fr', 'ja'] as const) {
  localStorage.setItem('vybe_language', language);
  const buyer = render(createElement(BuyerOnboarding, { user: DEMO_USERS[0], onComplete() {}, onLogout() {} }));
  assert.ok(buyer.includes(translateText('Thông tin công ty', language)));
  assert.ok(buyer.includes('value="Châu Âu"'), 'Localized option must retain its canonical value');
  const seller = render(createElement(SellerOnboarding, { account: DEMO_USERS[1], initialStep: 1, onComplete() {}, onLogout() {}, onNavigateHome() {} }));
  assert.ok(seller.includes(translateText('Thông tin doanh nghiệp', language)));
  const header = seller.match(/<header[\s\S]*?<\/header>/)?.[0] || '';
  assert.ok(header && !header.includes('lucide-bell') && !header.includes('lucide-globe'));
  const login = render(createElement(AuthPage, { mode: 'login', onModeChange() {}, onAuthenticated() {}, onNavigateHome() {} }));
  assert.ok(login.includes(translateText('Đăng nhập', language)) && login.includes('buyer@vybe.demo'));
  const pricing = render(createElement(PricingPlans, { onNavigateHome() {}, onNavigateOnboarding() {} }));
  assert.ok(pricing.includes(translateText('Thanh toán theo năm', language)) && pricing.includes('aria-pressed="true"'));
}
localStorage.setItem('vybe_language', 'vi');
const supplier = DIRECTORY_SUPPLIERS.find(supplier => supplier.id === 'mekong')!;
const html = renderToStaticMarkup(createElement(LanguageProvider, { children: createElement(BuyerSellerDetail, { supplier, onNavigateHome() {}, onBackToDirectory() {}, openRfq: true }) }));
assert.ok(html.includes(supplier.name) && html.includes(supplier.badgeTitle));
assert.ok(html.includes('Gửi yêu cầu báo giá') || html.includes('Gửi RFQ'));
console.log('Frontend: PASS — mock linkage, accent/multilingual search, filters, billing, all locale catalog entries, profile/RFQ render');
