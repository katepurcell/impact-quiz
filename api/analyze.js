export default async function handler(req, res) {
  // Allow requests from any origin (CORS fix)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { scores } = req.body;

    if (!scores) {
      return res.status(400).json({ error: 'No scores provided' });
    }

    const dimensionLabels = {
      story: "Story",
      evidence: "Evidence",
      bigPicture: "Big Picture",
      action: "Action",
      presentation: "Presentation",
      credibility: "Credibility/Transparency"
    };

    const scoresText = Object.entries(scores)
      .map(([dim, score]) => `${dimensionLabels[dim]}: ${Math.round(score)}/15`)
      .join('\n');

    const prompt = `You are an expert impact communications consultant helping nonprofits and social sector organizations improve their impact reports. A user has completed a quiz assessing their report across 6 dimensions. Here are their scores:

${scoresText}

FRAMEWORK AND PHILOSOPHY:
Communicating impact fails when people think giving information is enough, or when they assume readers are poring over their content. What works is humanizing and connecting on both an emotional/heart level AND an intellectual level. People have different brains and connect to different things. Everyone is insanely busy - you must write for skimmers as well as deep readers. Think of a great impact report like a quilt - different patterns and fabrics that attract different viewers but woven together into a beautiful whole.

THE 6 DIMENSIONS:

STORY (connecting to hearts - score out of 15):
Strong when: Real people are visible throughout, quotes and stories from actual participants, captions tell mini-stories not just describe images, change over time is shown
Red flag: "Stories" about projects without actual people (e.g. "we financed three housing projects" - who lived there? How were their lives changed?)

EVIDENCE (building credibility - score out of 15):
Strong when: Key numbers are visualized not just stated, metrics appear throughout the report not dumped in one place, data points are interpreted and explained
Red flag: 15 numbers crammed on one page with no context or explanation. One number with a great photo and explanation works. 15 numbers on a page overwhelms everyone.

BIG PICTURE (framing the why - score out of 15):
Strong when: Work connects to root causes and larger issues, theory of change is explained, report has a compelling theme beyond just "Annual Report 2024"
Red flag: Assuming readers already know the problem. Treat your report like your website or talking to a stranger - here's the problem, here's why it happens, here's why our org exists.

ACTION (clarity about what you do - score out of 15):
Strong when: Activities are easy to picture after reading, programs and outcomes are crystal clear, readers could describe your work to someone else
Red flag: Activity lists without context feel like "just doing stuff" rather than driving change

PRESENTATION (respecting busy readers - score out of 15):
Strong when: Strong visual design with white space, pull quotes and callouts break up text, report is easy to skim
Red flag: No white space, no photos, no text hierarchy - you've lost people at the get-go before they even get to your story or data

CREDIBILITY/TRANSPARENCY (building trust - score out of 15):
Strong when: Lessons learned included alongside wins, progress AND gaps are shown, honest about challenges
Red flag: Everything looks perfect and polished - sophisticated funders can smell spin and it actually undermines trust

QUICK WINS HIERARCHY (most important first):
1. Get a single personal story - call someone, send a text, pull a quote from an email. Just don't have zero personal stories.
2. Spread out your data and explain it - one number with context works, 15 numbers on a page overwhelms
3. Invest in design - white space, photos, text hierarchy. If people see your report is easy to read they will engage.

YOUR TASK:
Write personalized, actionable recommendations based on their specific scores. Be direct but encouraging (not preachy, not generic). Use simple language - no jargon. Sound like a smart, experienced consultant who has seen hundreds of these reports and genuinely wants to help.

Structure your response with these exact sections:

## Your Profile
2-3 sentences summarizing their overall pattern. Be specific to their actual scores, not generic.

## Your Biggest Strength
What they're doing well and why it matters. Be specific and encouraging.

## Your Biggest Opportunity
Their lowest score area. Give 2-3 specific, tactical suggestions they can actually implement. Make it feel doable, not overwhelming.

## What Your Scores Tell Me
If they have an interesting pattern or combination (e.g. strong data but weak story, strong presentation but weak credibility) - call it out. What does this combination mean? What's the risk?

## Action Plan

### Start Here
2-3 highest impact, lowest effort things to do first. **Bold the main point** of each suggestion, then explain in 1-2 sentences.

### Build On It
2-3 next priority items once they've tackled the above. **Bold the main point** of each suggestion, then explain in 1-2 sentences.

Keep the total response under 700 words. Be specific, warm, and actionable. No bullet point lists of generic tips - give them real, concrete suggestions tied to their actual scores. Avoid harsh or discouraging words like "terrible", "poor", "weak", "bad" or "failing" - instead use phrases like "not yet prioritizing", "has room to grow", "an opportunity to develop", or "not quite there yet."`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.content && data.content[0] && data.content[0].text) {
      return res.status(200).json({ analysis: data.content[0].text });
    } else {
      console.error('Unexpected API response:', data);
      return res.status(500).json({ error: 'Unexpected response from AI' });
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
