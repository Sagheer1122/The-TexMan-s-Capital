import { NextResponse } from 'next/server';
import { sanitizeInput } from '@/lib/security';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`ai_interview_${ip}`, 10, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'AI prompt rate limit exceeded. Please wait 1 minute before asking another question.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const userResponse = sanitizeInput(body.message || body.prompt || '');
    const category = sanitizeInput(body.category || 'Audit');

    if (!userResponse) {
      return NextResponse.json({ error: 'Message input is required' }, { status: 400 });
    }

    // AI Mock Interviewer feedback logic for CA/ACCA candidates
    let feedback = "Good response! To enhance your answer in Big 4 partner interviews, ensure you explicitly structure your points using the STAR method (Situation, Task, Action, Result) and reference relevant IFRS standards or tax regulations.";
    let followUp = "How would you handle a situation where a client's management disagrees with your audit adjustment regarding inventory valuation under IAS 2?";

    const lower = userResponse.toLowerCase();
    if (lower.includes('ifrs') || lower.includes('ias') || lower.includes('audit')) {
      feedback = "Excellent technical grounding! Your mention of International Financial Reporting Standards demonstrates solid academic preparation. In partner interviews, emphasize how you apply this in practical audit testing (e.g. verifying cut-off and existence).";
      followUp = "What specific audit procedures would you execute to test the completeness of trade payables at financial year-end?";
    } else if (lower.includes('tax') || lower.includes('income tax')) {
      feedback = "Strong grasp of taxation basics. Make sure to reference the Income Tax Ordinance 2001 and practical compliance timelines during technical screening rounds.";
      followUp = "Can you explain the difference between tax deduction at source (WHT) and advance tax under Section 147?";
    }

    return NextResponse.json({
      feedback,
      followUpQuestion: followUp,
      score: 85,
    });
  } catch (error) {
    console.error('AI Interview Simulator Error:', error);
    return NextResponse.json({ error: 'AI Service currently unavailable.' }, { status: 500 });
  }
}
