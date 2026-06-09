"""Generate Right Ads project report PDF."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

OUTPUT = Path(__file__).resolve().parent.parent / "report.pdf"


def build_report():
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=54,
        leftMargin=54,
        topMargin=54,
        bottomMargin=54,
    )

    styles = getSampleStyleSheet()
    title = ParagraphStyle("Title", parent=styles["Title"], fontSize=22, spaceAfter=16, textColor=colors.HexColor("#2563EB"))
    heading = ParagraphStyle("Heading", parent=styles["Heading2"], fontSize=13, spaceBefore=14, spaceAfter=8, textColor=colors.HexColor("#0F172A"))
    body = ParagraphStyle("Body", parent=styles["Normal"], fontSize=10, leading=14, spaceAfter=6)
    bullet = ParagraphStyle("Bullet", parent=body, leftIndent=14, bulletIndent=0, spaceAfter=4)

    story = []

    story.append(Paragraph("RIGHT ADS", title))
    story.append(Paragraph("<b>Developer:</b> Aryan", body))
    story.append(Spacer(1, 0.15 * inch))

    sections = [
        ("Project Overview", [
            "Right Ads Digital evolved from a marketing website into a unified business platform combining "
            "service discovery, lead management, certification services, career and internship portals, "
            "and a future-ready consultation system. The platform serves public clients and a protected admin CRM.",
        ]),
        ("Public Modules", [
            "<b>Services</b> — JustDial-inspired search and service cards with lead submission.",
            "<b>Certificates</b> — NSIC, ISO, and MSME registration cards with detail and application modals.",
            "<b>Career</b> — Job and internship listings with resume upload applications.",
            "<b>Contact</b> — Multi-branch contact form integrated with the backend.",
            "<b>ChatBot</b> — Gemini-powered assistant via server.js gateway.",
        ]),
        ("Admin Modules", [
            "Dashboard analytics, Contacts, Leads, Careers, Internships, Certificates, and Meetings.",
            "JWT-protected routes with sidebar navigation, status badges, and approve/decline workflows.",
            "Approving contacts or leads auto-generates consultation meetings in the database.",
        ]),
        ("Consultation System", [
            "Future Consultation Portal with email-verified room access, WebSocket chat persistence, "
            "participant cards, and video/audio placeholders. WebRTC is architecturally prepared but not implemented.",
        ]),
        ("Backend Architecture", [
            "React Frontend → server.js (Express Gateway) → FastAPI → SQLite Database",
            "ChatBot requests route through server.js to Gemini API separately from business APIs.",
        ]),
        ("Tech Stack", [
            "<b>Frontend:</b> React, CSS, JavaScript",
            "<b>Gateway:</b> Node.js, Express",
            "<b>Backend:</b> Python, FastAPI",
            "<b>Database:</b> SQLite",
            "<b>Authentication:</b> JWT (admin only)",
            "<b>AI:</b> Gemini API",
        ]),
        ("Features Implemented", [
            "Lead management, career portal, internship portal, certificate system, admin dashboard, "
            "meeting workflow, dark/light theme system, glassmorphism UI, and antigravity visual effects.",
        ]),
        ("Future Scope", [
            "WebRTC video conferencing, production WebSocket scaling, email notifications (SMTP), "
            "PostgreSQL migration, and payment gateway integration (Razorpay architecture prepared).",
        ]),
        ("Conclusion", [
            "Right Ads is now a production-ready digital services ecosystem — combining JustDial-style discovery, "
            "CRM administration, compliance services, talent acquisition, and a consultation portal foundation. "
            "The architecture is modular, theme-consistent, and designed for straightforward future expansion.",
        ]),
    ]

    for heading_text, items in sections:
        story.append(Paragraph(heading_text, heading))
        for item in items:
            story.append(Paragraph(f"• {item}" if not item.startswith("<") else f"• {item}", bullet))

    doc.build(story)
    print(f"Report saved to {OUTPUT}")


if __name__ == "__main__":
    build_report()
