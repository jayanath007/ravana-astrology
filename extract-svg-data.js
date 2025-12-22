import fs from 'fs';
import path from 'path';

// Map of zodiac IDs to file names
const zodiacFiles = {
  1: 'aries',
  2: 'taurus',
  3: 'gemini',
  4: 'cancer',
  5: 'leo',
  6: 'virgo',
  7: 'libra',
  8: 'scorpio',
  9: 'sagittarius',
  10: 'capricorn',
  11: 'aquarius',
  12: 'pisces'
};

const zodiacNames = {
  1: { name: 'Mesha', sanskrit: 'मेष', color: '#10b981', darkColor: '#34d399' },
  2: { name: 'Vrishabha', sanskrit: 'वृषभ', color: '#10b981', darkColor: '#34d399' },
  3: { name: 'Mithuna', sanskrit: 'मिथुन', color: '#10b981', darkColor: '#34d399' },
  4: { name: 'Karka', sanskrit: 'कर्क', color: '#10b981', darkColor: '#34d399' },
  5: { name: 'Simha', sanskrit: 'सिंह', color: '#10b981', darkColor: '#34d399' },
  6: { name: 'Kanya', sanskrit: 'कन्या', color: '#10b981', darkColor: '#34d399' },
  7: { name: 'Tula', sanskrit: 'तुला', color: '#10b981', darkColor: '#34d399' },
  8: { name: 'Vrishchika', sanskrit: 'वृश्चिक', color: '#10b981', darkColor: '#34d399' },
  9: { name: 'Dhanu', sanskrit: 'धनु', color: '#10b981', darkColor: '#34d399' },
  10: { name: 'Makara', sanskrit: 'मकर', color: '#10b981', darkColor: '#34d399' },
  11: { name: 'Kumbha', sanskrit: 'कुम्भ', color: '#10b981', darkColor: '#34d399' },
  12: { name: 'Meena', sanskrit: 'मीन', color: '#10b981', darkColor: '#34d399' }
};

const inputDir = 'temp-zodiac-icons';
const outputFile = 'src/components/astrological-grid/zodiac-config.ts';

console.log('Extracting SVG data from zodiac icons...\n');

const zodiacData = [];

for (const [id, fileName] of Object.entries(zodiacFiles)) {
  const filePath = path.join(inputDir, `${fileName}.svg`);

  try {
    const svgContent = fs.readFileSync(filePath, 'utf8');

    // Extract viewBox
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 100 100';

    // Extract path d attribute
    const pathMatch = svgContent.match(/<path[^>]+d="([^"]+)"/);
    const pathData = pathMatch ? pathMatch[1] : '';

    if (!pathData) {
      console.warn(`Warning: No path data found for ${fileName}`);
      continue;
    }

    const info = zodiacNames[id];
    zodiacData.push({
      id: parseInt(id),
      ...info,
      symbol: getZodiacSymbol(parseInt(id)),
      svgPath: pathData,
      svgViewBox: viewBox
    });

    console.log(`✓ Extracted ${fileName}.svg (${pathData.length} chars)`);
  } catch (error) {
    console.error(`Error reading ${fileName}.svg:`, error.message);
  }
}

function getZodiacSymbol(id) {
  const symbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  return symbols[id - 1] || '?';
}

// Generate the TypeScript config file
const tsContent = `export interface ZodiacSign {
  id: number;
  name: string;
  sanskrit: string;
  symbol: string; // Unicode symbol or emoji
  color: string; // Color for the watermark
  darkColor: string; // Color for dark mode
  imageUrl?: string; // Optional image URL for future use
  svgPath?: string; // SVG path data
  svgViewBox?: string; // SVG viewBox attribute
}

// Vedic zodiac signs in traditional order with unique colors and SVG data
export const ZODIAC_SIGNS: ZodiacSign[] = [
${zodiacData.map(sign => `  {
    id: ${sign.id},
    name: '${sign.name}',
    sanskrit: '${sign.sanskrit}',
    symbol: '${sign.symbol}',
    color: '${sign.color}',
    darkColor: '${sign.darkColor}',
    svgPath: '${sign.svgPath}',
    svgViewBox: '${sign.svgViewBox}'
  }`).join(',\n')}
];

// Helper function to get zodiac sign by area ID
export function getZodiacSignByAreaId(areaId: number): ZodiacSign | undefined {
  return ZODIAC_SIGNS.find(sign => sign.id === areaId);
}
`;

fs.writeFileSync(outputFile, tsContent, 'utf8');
console.log(`\n✓ Generated ${outputFile}`);
console.log(`✓ Total file size: ${(tsContent.length / 1024).toFixed(2)} KB`);
