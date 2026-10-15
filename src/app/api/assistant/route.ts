import { NextRequest, NextResponse } from 'next/server';
import { SCHEMES_DATABASE, Scheme } from '@/data/schemes';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Grounded Heuristic Search against verified schemes database
function findMatchingSchemes(query: string): { schemes: Scheme[]; queryKeywords: string[] } {
  const q = query.toLowerCase();
  const keywords = q
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const scored = SCHEMES_DATABASE.map((scheme) => {
    let score = 0;
    const combined = `${scheme.name} ${scheme.shortName} ${scheme.description} ${scheme.categoryName} ${scheme.targetBeneficiaries.join(' ')} ${scheme.tags.join(' ')} ${scheme.ministry}`.toLowerCase();

    // Direct category / occupation signals
    if (q.includes('farmer') || q.includes('agriculture') || q.includes('kisan') || q.includes('tractor') || q.includes('crop')) {
      if (scheme.categoryId === 'cat-2') score += 10;
    }
    if (q.includes('student') || q.includes('scholarship') || q.includes('college') || q.includes('engineering') || q.includes('fee') || q.includes('matric')) {
      if (scheme.categoryId === 'cat-1') score += 10;
    }
    if (q.includes('pension') || q.includes('senior') || q.includes('father') || q.includes('mother') || q.includes('68') || q.includes('old age') || q.includes('60')) {
      if (scheme.categoryId === 'cat-8') score += 10;
    }
    if (q.includes('woman') || q.includes('women') || q.includes('mother') || q.includes('girl') || q.includes('daughter') || q.includes('maternity') || q.includes('mahila')) {
      if (scheme.categoryId === 'cat-4') score += 10;
    }
    if (q.includes('shop') || q.includes('business') || q.includes('loan') || q.includes('artisan') || q.includes('vendor') || q.includes('thela') || q.includes('craft')) {
      if (scheme.categoryId === 'cat-5') score += 10;
    }
    if (q.includes('house') || q.includes('housing') || q.includes('awas') || q.includes('pucca') || q.includes('electricity') || q.includes('solar') || q.includes('bijli')) {
      if (scheme.categoryId === 'cat-6') score += 10;
    }
    if (q.includes('hospital') || q.includes('health') || q.includes('treatment') || q.includes('ayushman') || q.includes('medical') || q.includes('illness')) {
      if (scheme.categoryId === 'cat-7') score += 10;
    }
    if (q.includes('disability') || q.includes('handicap') || q.includes('pwd') || q.includes('divyang')) {
      if (scheme.categoryId === 'cat-9') score += 10;
    }
    if (q.includes('unemployed') || q.includes('job') || q.includes('training') || q.includes('skill') || q.includes('pmkvy')) {
      if (scheme.categoryId === 'cat-3') score += 10;
    }

    // State matches
    if (q.includes('andhra') || q.includes('ap')) {
      if (scheme.stateCode === 'AP' || scheme.level === 'Central') score += 5;
    }
    if (q.includes('telangana') || q.includes('ts') || q.includes('hyderabad')) {
      if (scheme.stateCode === 'TS' || scheme.level === 'Central') score += 5;
    }
    if (q.includes('tamil nadu') || q.includes('tn') || q.includes('chennai')) {
      if (scheme.stateCode === 'TN' || scheme.level === 'Central') score += 5;
    }
    if (q.includes('karnataka') || q.includes('bangalore') || q.includes('bengaluru')) {
      if (scheme.stateCode === 'KA' || scheme.level === 'Central') score += 5;
    }
    if (q.includes('maharashtra') || q.includes('mumbai') || q.includes('pune')) {
      if (scheme.stateCode === 'MH' || scheme.level === 'Central') score += 5;
    }
    if (q.includes('bengal') || q.includes('wb') || q.includes('kolkata')) {
      if (scheme.stateCode === 'WB' || scheme.level === 'Central') score += 5;
    }

    keywords.forEach((kw) => {
      if (combined.includes(kw)) score += 3;
    });

    return { scheme, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const matched = scored.filter((item) => item.score > 2).slice(0, 3).map((item) => item.scheme);
  return {
    schemes: matched.length > 0 ? matched : SCHEMES_DATABASE.slice(0, 2),
    queryKeywords: keywords,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { messages, userProfile } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    const { schemes } = findMatchingSchemes(lastUserMessage);

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && apiKey !== 'your-openai-api-key') {
      try {
        const systemPrompt = `You are Saathi AI, an official scheme discovery assistant for Indian citizens.
Design tone: Objective, respectful, accurate, grounded in verified government data.
Never claim to be an official government representative. Never guarantee approval.
Never invent benefits or deadlines.

Here is the authoritative verified schemes context retrieved from the JanSaathi database for this query:
${JSON.stringify(
  schemes.map((s) => ({
    name: s.name,
    level: s.level,
    state: s.stateName || 'Central (All India)',
    benefit: s.benefitAmountDisplay,
    description: s.description,
    eligibility: s.eligibilitySummary,
    documents: s.documentsRequired,
    portal: s.officialPortalUrl,
    applicationLink: s.officialApplicationUrl,
    deadline: s.deadline,
    status: s.applicationStatus,
    lastVerified: s.lastVerifiedDate,
  })),
  null,
  2
)}

When responding:
1. Greet respectfully.
2. Directly answer the user's specific situation.
3. List 1 to 3 matched schemes with:
   - Scheme Name & Level (Central / State)
   - Verified Financial or Service Benefit
   - Why it matches the user
   - Key eligibility conditions satisfied & potential exclusions
   - Exact required documents
   - Verified official application link (.gov.in / .nic.in)
4. Ask 1 relevant follow-up question (e.g. state domicile, annual family income, or caste category) to narrow down further.
5. End with the disclaimer: "Match indicates potential eligibility only. Verification by the competent authority on the official portal is mandatory."`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.slice(-6),
            ],
            temperature: 0.3,
            max_tokens: 800,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.choices[0]?.message?.content || '';
          return NextResponse.json({
            reply: replyText,
            groundedSchemes: schemes,
          });
        }
      } catch (e) {
        console.warn('OpenAI API call failed, falling back to verified rule engine:', e);
      }
    }

    // High Quality Grounded Heuristic Engine Fallback
    const primary = schemes[0];
    const secondary = schemes[1];

    let reply = `Namaste! Based on your query, here are the verified government welfare programs from our verified directory that may match your situation:\n\n`;

    if (primary) {
      reply += `### 1. ${primary.name.toUpperCase()}\n`;
      reply += `• **Authority / Level:** ${primary.level} (${primary.stateName || 'All India'})\n`;
      reply += `• **Verified Benefit:** **${primary.benefitAmountDisplay}**\n`;
      reply += `• **Why it matches you:** ${primary.description}\n`;
      reply += `• **Key Eligibility Criteria:**\n`;
      primary.eligibilitySummary.slice(0, 3).forEach((crit) => {
        reply += `  - ${crit}\n`;
      });
      reply += `• **Required Documents:** ${primary.documentsRequired.slice(0, 3).join(', ')}\n`;
      reply += `• **Official Portal:** [${primary.officialPortalUrl}](${primary.officialPortalUrl})\n`;
      reply += `• **Application Status:** ${primary.applicationStatus} (Last verified: ${primary.lastVerifiedDate})\n\n`;
    }

    if (secondary) {
      reply += `### 2. ${secondary.name.toUpperCase()}\n`;
      reply += `• **Authority / Level:** ${secondary.level} (${secondary.stateName || 'All India'})\n`;
      reply += `• **Verified Benefit:** **${secondary.benefitAmountDisplay}**\n`;
      reply += `• **Official Portal:** [${secondary.officialPortalUrl}](${secondary.officialPortalUrl})\n\n`;
    }

    reply += `**Follow-up Question:** To help me verify if you qualify for full state-specific top-up grants, could you please specify which **State or District** you reside in, and your approximate **annual household income**?\n\n`;
    reply += `*Note: JanSaathi AI provides algorithmic discovery based on gazette notifications. This is not an official government approval. Always apply directly on verified .gov.in portals.*`;

    return NextResponse.json({
      reply,
      groundedSchemes: schemes,
    });
  } catch (error) {
    console.error('Saathi Assistant API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry with assistant.' },
      { status: 500 }
    );
  }
}
