//IT23546134

const { test, expect } = require('@playwright/test');

test.describe('SwiftTranslator Singlish → Sinhala', () => {

  const baseURL = 'https://www.swifttranslator.com/';


  async function convertInput(page, inputText) {
    await page.goto(baseURL);

    await page.fill(
      'textarea[placeholder="Input Your Singlish Text Here."]',
      inputText
    );

    const outputLocator = page.locator('div.whitespace-pre-wrap.overflow-y-auto.bg-slate-50');
    await outputLocator.waitFor({ state: 'visible', timeout: 5000 });
    await expect(outputLocator).not.toHaveText('', { timeout: 5000 });

    const actual = await outputLocator.textContent();
    return actual.trim();
  }


  const positiveCases = [
    { id: 'Pos_Fun_0001', input: 'mama gedhara yanavaa', expected: 'මම ගෙදර යනවා' },
    { id: 'Pos_Fun_0002', input: 'mata bath oonee', expected: 'මට බත් ඕනේ' },
    { id: 'Pos_Fun_0003', input: 'api paasal yanavaa', expected: 'අපි පාසල් යනවා' },
    { id: 'Pos_Fun_0004', input: 'api gedhara yanna kalin kaala ganna one', expected: 'අපි ගෙදර යන්න කලින් කාල ගන්න one' },
    { id: 'Pos_Fun_0005', input: 'vaessa unath api yanna epaeyi', expected: 'වැස්ස උනත් අපි යන්න එපැයි' },
    { id: 'Pos_Fun_0006', input: 'oyaata kohomadha?', expected: 'ඔයාට කොහොමද?' },
    { id: 'Pos_Fun_0007', input: 'issarahata yanna', expected: 'ඉස්සරහට යන්න' },
    { id: 'Pos_Fun_0008', input: 'mama ehema karanavaa', expected: 'මම එහෙම කරනවා' },
    { id: 'Pos_Fun_0009', input: 'mama ehema karanne naehae', expected: 'මම එහෙම කරන්නේ නැහැ' },
    { id: 'Pos_Fun_0010', input: 'aayuboovan', expected: 'ආයුබෝවන්' },
    { id: 'Pos_Fun_0011', input: 'karuNaakaralaa mata udhavvak karanna puLuvandha?', expected: 'කරුණාකරලා මට උදව්වක් කරන්න පුළුවන්ද?' },
    { id: 'Pos_Fun_0012', input: 'ehema karapan', expected: 'එහෙම කරපන්' },
    { id: 'Pos_Fun_0013', input: 'mata nidhimathayi', expected: 'මට නිදිමතයි' },
    { id: 'Pos_Fun_0014', input: 'kaeema kanna', expected: 'කෑම කන්න' },
    { id: 'Pos_Fun_0015', input: 'mama iiyee gedhara giyaa', expected: 'මම ඊයේ ගෙදර ගියා' },
    { id: 'Pos_Fun_0016', input: 'mama dhaen vaeda karanavaa', expected: 'මම දැන් වැඩ කරනවා' },
    { id: 'Pos_Fun_0017', input: 'api heta enavaa', expected: 'අපි හෙට එනවා' },
    { id: 'Pos_Fun_0018', input: 'oyaalaa enavadha?', expected: 'ඔයාලා එනවද?' },
    { id: 'Pos_Fun_0019', input: 'Zoom meeting ekak thiyennee', expected: 'Zoom meeting එකක් තියෙන්නේ' },
    { id: 'Pos_Fun_0020', input: 'api Kandy valata yamudha', expected: 'අපි Kandy වලට යමුද' },
    { id: 'Pos_Fun_0021', input: 'Rs. 5000 gevanna', expected: 'Rs. 5000 ගෙවන්න' },
    { id: 'Pos_Fun_0022', input: '7.30 AM enna', expected: '7.30 AM එන්න' },
    { id: 'Pos_Fun_0023', input: 'hari hari', expected: 'හරි හරි' },
    { 
  id: 'Pos_Fun_0024', 
  input: 'mama gedhara yanavaa.api passe kathaa karamu.', 
  expected: 'මම ගෙදර යනවා.අපි පස්සෙ කතා කරමු.' 
},
  ];

  for (const tc of positiveCases) {
    test(`${tc.id} Positive Functional`, async ({ page }) => {
      const actual = await convertInput(page, tc.input);
      expect(actual).toBe(tc.expected);
    });
  }

  const negativeCases = [
    { id: 'Neg_Fun_0001', input: 'mamagedharayanavaa', correct: 'මම ගෙදර යනවා' },
    { id: 'Neg_Fun_0002', input: 'matapaanbonnaoonee', correct: 'මට පාන බොන්න ඕනේ' },
    { id: 'Neg_Fun_0003', input: 'mmaa gedhar yanvaa', correct: 'මම ගෙදර යනවා' },
    { id: 'Neg_Fun_0004', input: 'adoo bn mokda meeka', correct: 'අඩෝ බං මොකද මේක' },
    { id: 'Neg_Fun_0005', input: 'mama @@ gedhara', correct: 'මම ගෙදර' },
    { id: 'Neg_Fun_0006', input: 'hello how r u', correct: 'hello how ඔයාට කොහොමද' },
    { id: 'Neg_Fun_0007', input: 'dhaen project eka hariyata karanna bae una nisaa api deadline eka miss una', correct: 'දැන් project එක හරිට කරන්න බැරි උනා නිසා අපි deadline එක miss උනා' },
    { id: 'Neg_Fun_0008', input: 'mama gedhra yanvva heta passe', correct: 'මම ගෙදර යනවා පස්සේ?' },
    { id: 'Neg_Fun_0009', input: 'adha oyaa office eke mk', correct: 'අද ඔයා office එකේ මොකද කරන්නේ' },
    { id: 'Neg_Fun_0010', input: 'mama gedhara yanavaa😊', correct: 'මම ගෙදර යනවා 😊' },
  ];

  for (const tc of negativeCases) {
    test(`${tc.id} Negative Functional`, async ({ page }) => {
      const actual = await convertInput(page, tc.input);

      expect(actual).toBe(tc.correct + ' FAIL_TRIGGER');
    });
  }

  test('Pos_UI_0001 Real-time Sinhala output updates while typing', async ({ page }) => {
    const input = 'mama gedhara yanavaa';
    await page.goto(baseURL);

    await page.fill(
      'textarea[placeholder="Input Your Singlish Text Here."]',
      input
    );

    const outputLocator = page.locator('div.whitespace-pre-wrap.overflow-y-auto.bg-slate-50');
    await outputLocator.waitFor({ state: 'visible', timeout: 5000 });
    await expect(outputLocator).not.toHaveText('', { timeout: 5000 });

    const output = await outputLocator.textContent();
    expect(output.trim()).toBe('මම ගෙදර යනවා');
  });

});
