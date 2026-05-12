import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, entity, employees, vat, docs, services, note } = body;

  const html = `
    <h2>Nová poptávka — KKFintax</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      <tr><td><b>Jméno</b></td><td>${name}</td></tr>
      <tr><td><b>E-mail</b></td><td>${email}</td></tr>
      <tr><td><b>Telefon</b></td><td>${phone || "—"}</td></tr>
      <tr><td><b>Typ subjektu</b></td><td>${entity}</td></tr>
      <tr><td><b>Počet zaměstnanců</b></td><td>${employees || "—"}</td></tr>
      <tr><td><b>Plátce DPH</b></td><td>${vat || "—"}</td></tr>
      <tr><td><b>Dokladů měsíčně</b></td><td>${docs || "—"}</td></tr>
      <tr><td><b>Služby</b></td><td>${services?.join(", ") || "—"}</td></tr>
      <tr><td><b>Poznámka</b></td><td>${note || "—"}</td></tr>
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
