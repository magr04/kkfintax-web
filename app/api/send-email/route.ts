import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, entity, vat, employees, dpp, invIn, invOut, cashDocs, assets, bankAccounts, note, website, _t } = body;

  if (website) return NextResponse.json({ ok: true });
  if (typeof _t === "number" && Date.now() - _t < 3000) return NextResponse.json({ ok: true });

  if (!name || !email || !entity) return NextResponse.json({ error: "missing fields" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "invalid email" }, { status: 400 });

  const row = (label: string, val: string) =>
    `<tr><td style="padding:5px 10px 5px 0;color:#6b7280;white-space:nowrap"><b>${label}</b></td><td style="padding:5px 0">${val || "—"}</td></tr>`;

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#111;margin:0 0 20px">Nová poptávka — KKFintax</h2>
    <table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td colspan="2" style="padding:6px 0 2px;font-size:11px;font-weight:700;color:#8B0000;text-transform:uppercase;letter-spacing:.08em">Kontakt</td></tr>
      ${row("Jméno", name)}
      ${row("E-mail", email)}
      ${row("Telefon", phone)}
      ${row("Typ subjektu", entity)}
      ${row("Plátce DPH", vat)}
      <tr><td colspan="2" style="padding:16px 0 2px;font-size:11px;font-weight:700;color:#8B0000;text-transform:uppercase;letter-spacing:.08em">Zaměstnanci</td></tr>
      ${row("Počet zaměstnanců", employees)}
      ${row("z toho na DPP", dpp)}
      <tr><td colspan="2" style="padding:16px 0 2px;font-size:11px;font-weight:700;color:#8B0000;text-transform:uppercase;letter-spacing:.08em">Doklady za měsíc</td></tr>
      ${row("Faktury přijaté", invIn)}
      ${row("Faktury vydané", invOut)}
      ${row("Pokladní doklady", cashDocs)}
      ${row("Majetek", assets)}
      ${row("Počet bank. účtů", bankAccounts)}
      <tr><td colspan="2" style="padding:16px 0 2px;font-size:11px;font-weight:700;color:#8B0000;text-transform:uppercase;letter-spacing:.08em">Poznámka</td></tr>
      ${row("", note)}
    </table>
  `;

  const { error } = await resend.emails.send({
    from: "KKFintax <onboarding@resend.dev>",
    to: "roland.magera@gmail.com",
    subject: `Nová poptávka od ${name}`,
    html,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
