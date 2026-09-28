import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import BuyerOnboarding from '../src/components/BuyerOnboarding';
import SellerOnboarding from '../src/components/SellerOnboarding';
import { completeOnboarding, DEMO_PASSWORD, DEMO_USERS, getSession, getUserPage, getUsers, login, logout, register } from '../src/lib/demoAuth';

const storage = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', { value: {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
} });
Object.defineProperty(globalThis, 'crypto', { value: webcrypto });

function profileFor(role: 'buyer' | 'seller'): Record<string, string> {
  return { companyName: 'Demo Company', country: role === 'buyer' ? 'Germany' : 'Việt Nam',
    contactEmail: 'contact@example.com', interest: 'Coffee', agreeCommitment: 'true',
    ...(role === 'buyer' ? { region: 'Châu Âu', companySize: '11–50 nhân sự', contactName: 'Buyer Contact',
      quantity: '20', frequency: 'Hàng tháng', minTrustLevel: 'L2', requiredCertificates: 'HACCP, ISO 22000' }
      : { taxCode: '0314892345', products: JSON.stringify([{ name: 'Robusta Coffee' }]) }) };
}

for (const demo of DEMO_USERS) {
  const user = await login(` ${demo.email.toUpperCase()} `, DEMO_PASSWORD);
  assert.equal(user.role, demo.role);
  if (user.role === 'admin') {
    assert.equal(getUserPage(user), 'admin');
    assert.throws(() => completeOnboarding(user.id, {}), /Admin không có/);
    logout();
    assert.equal(getUserPage(await login(user.email, DEMO_PASSWORD)), 'admin');
    logout();
    continue;
  }
  assert.equal(getUserPage(user), 'onboarding');
  assert.throws(() => completeOnboarding(user.id, { country: ' ', interest: 'Coffee' }));
  const profile = profileFor(user.role);
  assert.throws(() => completeOnboarding(user.id, { ...profile, agreeCommitment: 'false' }));
  if (user.role === 'buyer') {
    assert.throws(() => completeOnboarding(user.id, { ...profile, quantity: '0' }));
    assert.throws(() => completeOnboarding(user.id, { ...profile, minTrustLevel: 'L9' }));
    assert.throws(() => completeOnboarding(user.id, { ...profile, region: '' }));
  } else {
    assert.throws(() => completeOnboarding(user.id, { ...profile, products: '[]' }));
    assert.throws(() => completeOnboarding(user.id, { ...profile, products: 'broken' }));
  }
  const completed = completeOnboarding(user.id, profile);
  const destination = user.role === 'seller' ? 'workspace' : 'buyer-directory';
  assert.equal(getUserPage(completed), destination);
  assert.equal(getSession()?.onboardingCompleted, true);
  logout();
  assert.equal(getSession(), null);
  const returning = await login(user.email, DEMO_PASSWORD);
  assert.equal(getUserPage(returning), destination);
  assert.equal(returning.profile?.interest, 'Coffee');
  assert.deepEqual(completeOnboarding(user.id, { country: 'Other', interest: 'Changed' }), returning);
  logout();
}
await assert.rejects(login('buyer@vybe.demo', 'incorrect'));
assert.equal(getSession(), null);
await assert.rejects(register({ name: 'Test', company: 'Test', email: 'admin2@example.com', password: 'password123', role: 'admin' as never }));
await assert.rejects(register({ name: ' ', company: 'Test', email: 'bad-email', password: 'short', role: 'buyer' }));
for (const role of ['buyer', 'seller'] as const) {
  const user = await register({ name: 'Test User', company: 'Test Trading', email: ` ${role}@example.com `, password: 'TestPassword123!', role });
  assert.equal(getSession()?.id, user.id);
  assert.equal(getUserPage(user), 'onboarding');
  assert.ok(user.salt && user.passwordHash);
  assert.ok(!JSON.stringify(getUsers()).includes('TestPassword123!'));
  await assert.rejects(register({ name: 'Duplicate', company: 'Test', email: user.email.toUpperCase(), password: 'password123', role }));
  logout();
  await assert.rejects(login(user.email, 'WrongPassword123!'));
  assert.equal(getSession(), null);
  const returning = await login(user.email, 'TestPassword123!');
  assert.equal(returning.onboardingCompleted, false);
  assert.throws(() => completeOnboarding('demo-admin', { country: 'VN', interest: 'Ops' }));
  completeOnboarding(user.id, profileFor(role));
  logout();
  assert.equal((await login(user.email, 'TestPassword123!')).onboardingCompleted, true);
  logout();
}
const validData = storage.get('vybe_demo_users_v1')!;
storage.set('vybe_demo_users_v1', '{broken');
assert.throws(getUsers, /không hợp lệ/);
assert.equal(storage.get('vybe_demo_users_v1'), '{broken');
storage.set('vybe_demo_users_v1', validData);
// Existing accounts from the previous short form must fill the new company wizard once.
const previousUser = { ...DEMO_USERS[0], onboardingCompleted: true };
storage.set('vybe_demo_users_v1', JSON.stringify([previousUser]));
assert.equal(getUserPage((await login(previousUser.email, DEMO_PASSWORD))), 'onboarding');
completeOnboarding(previousUser.id, profileFor('buyer'));
assert.equal(getUserPage(getSession()!), 'buyer-directory');
storage.set('vybe_demo_users_v1', validData);

const buyerHtml = renderToStaticMarkup(createElement(BuyerOnboarding, { user: DEMO_USERS[0], onComplete() {}, onLogout() {} }));
assert.ok(buyerHtml.includes('Thông tin công ty') && buyerHtml.includes('Quy mô công ty') && buyerHtml.includes('Khu vực'));
assert.ok(buyerHtml.includes('Nhu cầu tìm nguồn hàng') && buyerHtml.includes('Tiêu chí xác minh') && buyerHtml.includes('Xem lại &amp; hoàn tất'));
const sellerHtml = renderToStaticMarkup(createElement(SellerOnboarding, { account: DEMO_USERS[1], initialStep: 1, onComplete() {}, onLogout() {}, onNavigateHome() {} }));
assert.ok(sellerHtml.includes('Bước 1 / 4') && sellerHtml.includes('Company Onboarding'));
console.log('Demo auth: PASS — buyer/seller company wizards, admin bypass, validation, registration, sessions, once-only onboarding, migration');
