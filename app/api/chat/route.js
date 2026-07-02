import { BeanieBot } from '../bot/beanie';
import { getCurrentUser } from '../../../lib/auth';

export async function POST(request) {
  const { message, history } = await request.json();

  if (!message || typeof message !== 'string') {
    return Response.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    const user = await getCurrentUser();
    const { text, prefill, action } = await BeanieBot(message, user, Array.isArray(history) ? history : []);
    return Response.json({ reply: text, prefill, action });
  } catch (err) {
    console.error('chat error:', err);
    // Frontend reads { reply } regardless of status, so return a friendly reply rather than { error }.
    return Response.json({ reply: "Sorry, I couldn't reach Mr. Beanie right now. Please try again." });
  }
}
