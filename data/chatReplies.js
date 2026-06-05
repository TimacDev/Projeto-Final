// Keyword-based canned replies. Lowercase keywords; first match wins.
// Replace this whole module later with a real LLM call — the export contract
// (`findReply(message)` returning a string) stays the same.

const REPLIES = [
  { match: ['espresso'],                      reply: 'Espresso is a fast, pressurized brew — try the Brew Methods tab for the full walkthrough.' },
  { match: ['pour over', 'pour-over', 'v60'], reply: 'Pour-over highlights origin character. Aim for ~93°C water and a 1:15 ratio.' },
  { match: ['ethiopia', 'yirgacheffe'],       reply: 'Ethiopia is coffee\'s birthplace. Expect floral, citrus, tea-like cups. Check the Origins tab.' },
  { match: ['grinder', 'grind'],              reply: 'The grinder matters more than the brewer. Burr > blade, every time.' },
  { match: ['water'],                         reply: 'Your cup is ~98% water. SCA target is 150 ppm TDS — see the Water guide.' },
  { match: ['roast', 'dark', 'light'],        reply: 'Light roasts preserve origin character; dark roasts emphasize the roast itself.' },
  { match: ['hello', 'hi', 'hey'],            reply: 'Hi! Ask me about origins, brew methods, water, or grinders.' },
];

const FALLBACK = "I'm not sure about that yet. Try asking about brew methods, origins, water, or grinders.";

export function findReply(message) {
  const lower = message.toLowerCase();
  for (const r of REPLIES) {
    if (r.match.some(kw => lower.includes(kw))) return r.reply;
  }
  return FALLBACK;
}
